import "server-only"

import { mkdir, readFile, rename, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"

export type RsvpRecord = {
  id: string
  eventSlug: string
  name: string
  email: string
  seats: number
  createdAtIso: string
  updatedAtIso: string
  reminderSentAtIso?: string
}

type StoreShape = {
  version: 1
  rsvps: RsvpRecord[]
}

const storePath = join(process.cwd(), "data", "rsvps.json")
const STORE_CACHE_TTL_MS = 5_000

type StoreCache = {
  store: StoreShape
  readAtMs: number
}

let storeCache: StoreCache | null = null
let storeReadPromise: Promise<StoreShape> | null = null

function nowIso() {
  return new Date().toISOString()
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

async function ensureStoreDir() {
  await mkdir(dirname(storePath), { recursive: true })
}

async function readStoreUncached(): Promise<StoreShape> {
  try {
    const raw = await readFile(storePath, "utf8")
    const parsed = JSON.parse(raw) as StoreShape
    if (!parsed || parsed.version !== 1 || !Array.isArray(parsed.rsvps)) return { version: 1, rsvps: [] }
    return parsed
  } catch {
    return { version: 1, rsvps: [] }
  }
}

async function readStore(): Promise<StoreShape> {
  const now = Date.now()
  if (storeCache && now - storeCache.readAtMs <= STORE_CACHE_TTL_MS) {
    return storeCache.store
  }

  if (storeReadPromise) return storeReadPromise

  storeReadPromise = (async () => {
    const store = await readStoreUncached()
    storeCache = { store, readAtMs: Date.now() }
    storeReadPromise = null
    return store
  })()

  try {
    return await storeReadPromise
  } finally {
    storeReadPromise = null
  }
}

async function writeStore(store: StoreShape) {
  await ensureStoreDir()
  const tmp = `${storePath}.tmp`
  await writeFile(tmp, JSON.stringify(store, null, 2), "utf8")
  await rename(tmp, storePath)
  storeCache = { store, readAtMs: Date.now() }
}

function randomId() {
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
}

export async function listRsvpsForEvent(eventSlug: string) {
  const store = await readStore()
  return store.rsvps.filter((r) => r.eventSlug === eventSlug)
}

export async function getReservedSeats(eventSlug: string) {
  const rsvps = await listRsvpsForEvent(eventSlug)
  return rsvps.reduce((sum, r) => sum + (Number.isFinite(r.seats) ? r.seats : 0), 0)
}

export async function getReservedSeatsBySlug(eventSlugs: string[]) {
  const store = await readStore()
  const wanted = new Set(eventSlugs)
  const counts = new Map<string, number>()

  for (const rsvp of store.rsvps) {
    if (!wanted.has(rsvp.eventSlug)) continue
    const seats = Number.isFinite(rsvp.seats) ? rsvp.seats : 0
    counts.set(rsvp.eventSlug, (counts.get(rsvp.eventSlug) ?? 0) + seats)
  }

  const out: Record<string, number> = {}
  for (const slug of wanted) out[slug] = counts.get(slug) ?? 0
  return out
}

export async function upsertRsvp(input: {
  eventSlug: string
  name: string
  email: string
  seats: number
}) {
  const { rsvp } = await upsertRsvpDetailed(input)
  return rsvp
}

export async function upsertRsvpDetailed(input: {
  eventSlug: string
  name: string
  email: string
  seats: number
}) {
  const store = await readStore()
  const email = normalizeEmail(input.email)
  const at = nowIso()

  const idx = store.rsvps.findIndex((r) => r.eventSlug === input.eventSlug && normalizeEmail(r.email) === email)
  if (idx >= 0) {
    const existing = store.rsvps[idx]!
    const updated: RsvpRecord = {
      ...existing,
      name: input.name,
      email,
      seats: input.seats,
      updatedAtIso: at,
    }
    store.rsvps[idx] = updated
    await writeStore(store)
    return { kind: "updated" as const, previous: existing, rsvp: updated }
  }

  const record: RsvpRecord = {
    id: randomId(),
    eventSlug: input.eventSlug,
    name: input.name,
    email,
    seats: input.seats,
    createdAtIso: at,
    updatedAtIso: at,
  }
  store.rsvps.push(record)
  await writeStore(store)
  return { kind: "created" as const, previous: null, rsvp: record }
}

export async function cancelRsvp(eventSlug: string, emailRaw: string) {
  const store = await readStore()
  const email = normalizeEmail(emailRaw)
  const before = store.rsvps.length
  store.rsvps = store.rsvps.filter((r) => !(r.eventSlug === eventSlug && normalizeEmail(r.email) === email))
  const removed = before - store.rsvps.length
  if (removed > 0) await writeStore(store)
  return removed
}

export async function listAllRsvps() {
  const store = await readStore()
  return store.rsvps.slice()
}

export async function markReminderSent(rsvpId: string) {
  const store = await readStore()
  const idx = store.rsvps.findIndex((r) => r.id === rsvpId)
  if (idx < 0) return false
  const at = nowIso()
  store.rsvps[idx] = { ...store.rsvps[idx]!, reminderSentAtIso: at, updatedAtIso: at }
  await writeStore(store)
  return true
}
