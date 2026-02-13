import type { BibleBookId } from "@/lib/bible"

export const TAMIL_BIBLE_INDEX_HREF = "https://tamilchristiansongs.in/tamil/bible/"
const TAMIL_BIBLE_BASE = "https://tamilchristiansongs.in/"

function normalizeBookSlug(bookId: BibleBookId): string {
  // tamilchristiansongs.in uses simple English slugs like:
  // `genesis-1`, `1-john-1`, `song-of-solomon-1`, etc.
  return bookId
}

export function tamilBibleChapterHref(bookId: BibleBookId, chapter: number) {
  const slug = normalizeBookSlug(bookId)
  return `${TAMIL_BIBLE_BASE}${slug}-${chapter}/`
}

export function tamilBibleVerseHref(bookId: BibleBookId, chapter: number, verse: number) {
  const slug = normalizeBookSlug(bookId)
  return `${TAMIL_BIBLE_BASE}${slug}-${chapter}-${verse}/`
}
