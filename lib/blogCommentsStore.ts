import "server-only"

import { mkdir, readFile, rename, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"

export type BlogComment = {
  id: string
  postSlug: string
  name: string
  message: string
  createdAtIso: string
  approved: boolean
}

type StoreShape = { version: 1; comments: BlogComment[] }

const storePath = join(process.cwd(), "data", "blog-comments.json")

function nowIso() {
  return new Date().toISOString()
}

function randomId() {
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
}

async function ensureDir() {
  await mkdir(dirname(storePath), { recursive: true })
}

async function readStore(): Promise<StoreShape> {
  try {
    const raw = await readFile(storePath, "utf8")
    const parsed = JSON.parse(raw) as StoreShape
    if (!parsed || parsed.version !== 1 || !Array.isArray(parsed.comments)) return { version: 1, comments: [] }
    return parsed
  } catch {
    return { version: 1, comments: [] }
  }
}

async function writeStore(store: StoreShape) {
  await ensureDir()
  const tmp = `${storePath}.tmp`
  await writeFile(tmp, JSON.stringify(store, null, 2), "utf8")
  await rename(tmp, storePath)
}

export async function listApprovedComments(postSlug: string) {
  const store = await readStore()
  return store.comments
    .filter((c) => c.postSlug === postSlug && c.approved)
    .slice()
    .sort((a, b) => a.createdAtIso.localeCompare(b.createdAtIso))
}

export async function addComment(input: { postSlug: string; name: string; message: string }) {
  const store = await readStore()
  const comment: BlogComment = {
    id: randomId(),
    postSlug: input.postSlug,
    name: input.name,
    message: input.message,
    createdAtIso: nowIso(),
    approved: true,
  }
  store.comments.push(comment)
  await writeStore(store)
  return comment
}

