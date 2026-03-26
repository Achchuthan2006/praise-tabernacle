import { appendFile, mkdir, readFile } from "node:fs/promises"
import path from "node:path"
import { randomBytes } from "node:crypto"

const NEWSLETTER_DIR = path.join(process.cwd(), ".data", "newsletter")
const PENDING_FILE = path.join(NEWSLETTER_DIR, "pending.jsonl")
const CONFIRMED_FILE = path.join(NEWSLETTER_DIR, "confirmed.jsonl")
const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000

type PendingRecord = {
  email: string
  token: string
  createdAt: string
}

type ConfirmedRecord = {
  email: string
  confirmedAt: string
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

async function readJsonLines<T>(file: string) {
  try {
    const raw = await readFile(file, "utf8")
    return raw
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .flatMap((line) => {
        try {
          return [JSON.parse(line) as T]
        } catch {
          return []
        }
      })
  } catch (error: any) {
    if (error?.code === "ENOENT") return [] as T[]
    throw error
  }
}

async function appendJsonLine(file: string, payload: unknown) {
  await mkdir(NEWSLETTER_DIR, { recursive: true })
  await appendFile(file, `${JSON.stringify(payload)}\n`, "utf8")
}

export async function isNewsletterConfirmed(email: string) {
  const normalized = normalizeEmail(email)
  const confirmed = await readJsonLines<ConfirmedRecord>(CONFIRMED_FILE)
  return confirmed.some((entry) => normalizeEmail(entry.email) === normalized)
}

export function createNewsletterToken() {
  return randomBytes(24).toString("hex")
}

export async function savePendingNewsletterSubscription(email: string, token: string) {
  await appendJsonLine(PENDING_FILE, {
    email: normalizeEmail(email),
    token,
    createdAt: new Date().toISOString(),
  } satisfies PendingRecord)
}

export async function confirmNewsletterSubscription(token: string) {
  const normalizedToken = token.trim()
  if (!normalizedToken) return { status: "invalid" as const }

  const pending = await readJsonLines<PendingRecord>(PENDING_FILE)
  const match = pending
    .slice()
    .reverse()
    .find((entry) => entry.token === normalizedToken)

  if (!match) return { status: "invalid" as const }

  const createdAtMs = Date.parse(match.createdAt)
  if (!Number.isFinite(createdAtMs) || Date.now() - createdAtMs > TOKEN_TTL_MS) {
    return { status: "expired" as const, email: match.email }
  }

  if (await isNewsletterConfirmed(match.email)) {
    return { status: "already_confirmed" as const, email: match.email }
  }

  await appendJsonLine(CONFIRMED_FILE, {
    email: match.email,
    confirmedAt: new Date().toISOString(),
  } satisfies ConfirmedRecord)

  return { status: "confirmed" as const, email: match.email }
}
