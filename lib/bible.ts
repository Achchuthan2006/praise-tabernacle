import type { BibleBookId as MetaBookId } from "@/lib/bibleMeta"
import { bookNameLookup, getBookChaptersCount, getBookNameEn, listBookIds } from "@/lib/bibleMeta"

export type BibleVersionId = "kjv" | "niv" | "esv" | "nasb" | "tamil"

export type BibleBookId = MetaBookId

export type BibleVerseRef = {
  versionId: BibleVersionId
  bookId: BibleBookId
  chapter: number
  verse: number
}

export type BibleSearchHit = BibleVerseRef & {
  text: string
}

export const bibleVersions: Array<{
  id: BibleVersionId
  label: string
  licenseNote: string
  available: boolean
}> = [
  { id: "kjv", label: "KJV (Public Domain)", licenseNote: "Public domain.", available: true },
  {
    id: "niv",
    label: "NIV",
    licenseNote: "Not included here due to copyright. Requires a licensed source or API integration.",
    available: false,
  },
  {
    id: "esv",
    label: "ESV",
    licenseNote: "Not included here due to copyright. Requires a licensed source or API integration.",
    available: false,
  },
  {
    id: "nasb",
    label: "NASB",
    licenseNote: "Not included here due to copyright. Requires a licensed source or API integration.",
    available: false,
  },
  {
    id: "tamil",
    label: "Tamil Bible",
    licenseNote: "Not included here by default. Add a licensed text dataset or API integration.",
    available: false,
  },
]

export function getAvailableBooks() {
  return listBookIds()
}

export function getBookName(bookId: BibleBookId) {
  return getBookNameEn(bookId)
}

export function getAvailableChapters(bookId: BibleBookId) {
  const count = getBookChaptersCount(bookId)
  return Array.from({ length: count }, (_, idx) => idx + 1)
}

export function parseReference(input: string): { bookId: BibleBookId; chapter: number; verse?: number } | null {
  const raw = input.trim()
  if (!raw) return null

  const normalized = raw
    .replaceAll(".", " ")
    .replaceAll(/\s+/g, " ")
    .trim()

  // Pattern: "<Book> <chapter>[:<verse>]"
  const match = normalized.match(/^(.+?)\s+(\d+)(?::(\d+))?$/i)
  if (!match) return null

  const bookPart = match[1]?.trim().toLowerCase() ?? ""
  const chapter = Number(match[2])
  const verse = match[3] ? Number(match[3]) : undefined

  const bookId = bookNameLookup[bookPart]
  if (!bookId) return null
  if (!Number.isFinite(chapter) || chapter <= 0) return null
  if (verse !== undefined && (!Number.isFinite(verse) || verse <= 0)) return null

  const chapters = getBookChaptersCount(bookId)
  if (chapters && chapter > chapters) return null
  return { bookId, chapter, verse }
}
