import "server-only"

import { mkdir, readFile, rename, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"

export type PrayerWallPost = {
  id: string
  name: string
  request: string
  createdAtIso: string
  approved: boolean
  kind: "request" | "testimony"
  prayedCount: number
}

type StoreShapeV1 = {
  version: 1
  posts: Array<{
    id: string
    name: string
    request: string
    createdAtIso: string
    approved: boolean
  }>
}

type StoreShape = { version: 2; posts: PrayerWallPost[] }

const storePath = join(process.cwd(), "data", "prayer-wall.json")

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
    const parsed = JSON.parse(raw) as StoreShape | StoreShapeV1
    if (!parsed || !Array.isArray((parsed as any).posts)) return { version: 2, posts: [] }

    if ((parsed as any).version === 2) {
      const store = parsed as StoreShape
      return {
        version: 2,
        posts: store.posts.map((p) => ({
          ...p,
          kind: p.kind === "testimony" ? "testimony" : "request",
          prayedCount: Number.isFinite(p.prayedCount) ? Math.max(0, p.prayedCount) : 0,
        })),
      }
    }

    const v1 = parsed as StoreShapeV1
    if (v1.version !== 1) return { version: 2, posts: [] }
    return {
      version: 2,
      posts: v1.posts.map((p) => ({
        id: String(p.id ?? ""),
        name: String(p.name ?? ""),
        request: String(p.request ?? ""),
        createdAtIso: String(p.createdAtIso ?? nowIso()),
        approved: Boolean(p.approved),
        kind: "request",
        prayedCount: 0,
      })),
    }
  } catch {
    return { version: 2, posts: [] }
  }
}

async function writeStore(store: StoreShape) {
  await ensureDir()
  const tmp = `${storePath}.tmp`
  await writeFile(tmp, JSON.stringify(store, null, 2), "utf8")
  await rename(tmp, storePath)
}

export async function listApprovedPrayerPosts() {
  const store = await readStore()
  return store.posts
    .filter((p) => p.approved)
    .slice()
    .sort((a, b) => b.createdAtIso.localeCompare(a.createdAtIso))
}

export async function addPrayerPost(input: { name: string; request: string }) {
  const store = await readStore()
  const post: PrayerWallPost = {
    id: randomId(),
    name: input.name,
    request: input.request,
    createdAtIso: nowIso(),
    approved: false,
    kind: "request",
    prayedCount: 0,
  }
  store.posts.push(post)
  await writeStore(store)
  return post
}

export async function addPrayerPostV2(input: { name: string; request: string; kind: "request" | "testimony" }) {
  const store = await readStore()
  const post: PrayerWallPost = {
    id: randomId(),
    name: input.name,
    request: input.request,
    createdAtIso: nowIso(),
    approved: false,
    kind: input.kind,
    prayedCount: 0,
  }
  store.posts.push(post)
  await writeStore(store)
  return post
}

export async function incrementPrayerPostPrayedCount(id: string) {
  const store = await readStore()
  const idx = store.posts.findIndex((p) => p.id === id)
  if (idx < 0) return null
  const current = store.posts[idx]!
  const next = { ...current, prayedCount: Math.max(0, (current.prayedCount ?? 0) + 1) }
  store.posts[idx] = next
  await writeStore(store)
  return next.prayedCount
}

export async function approvePrayerPost(id: string) {
  const store = await readStore()
  const idx = store.posts.findIndex((p) => p.id === id)
  if (idx < 0) return false
  store.posts[idx] = { ...store.posts[idx]!, approved: true }
  await writeStore(store)
  return true
}

export async function deletePrayerPost(id: string) {
  const store = await readStore()
  const before = store.posts.length
  store.posts = store.posts.filter((p) => p.id !== id)
  if (store.posts.length !== before) {
    await writeStore(store)
    return true
  }
  return false
}
