import { NextResponse } from "next/server"

import { getBookName } from "@/lib/bible"
import { getBookChaptersCount, isBibleBookId } from "@/lib/bibleMeta"

type BibleApiVerse = {
  verse: number
  text: string
}

type BibleApiResponse = {
  reference?: string
  verses?: BibleApiVerse[]
  text?: string
  error?: string
}

function parsePositiveInt(value: string | null) {
  const n = Number(value)
  if (!Number.isFinite(n)) return null
  if (!Number.isInteger(n)) return null
  if (n <= 0) return null
  return n
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const version = (searchParams.get("version") ?? "kjv").toLowerCase()
  const book = searchParams.get("book") ?? ""
  const chapter = parsePositiveInt(searchParams.get("chapter"))

  if (version !== "kjv") {
    return NextResponse.json({ ok: false, error: "unsupported_version" }, { status: 400 })
  }

  if (!isBibleBookId(book)) {
    return NextResponse.json({ ok: false, error: "invalid_book" }, { status: 400 })
  }

  if (!chapter) {
    return NextResponse.json({ ok: false, error: "invalid_chapter" }, { status: 400 })
  }

  const chapterCount = getBookChaptersCount(book)
  if (chapterCount && chapter > chapterCount) {
    return NextResponse.json({ ok: false, error: "chapter_out_of_range" }, { status: 400 })
  }

  const bookName = getBookName(book)
  const ref = `${bookName} ${chapter}`
  const url = `https://bible-api.com/${encodeURIComponent(ref)}?translation=kjv&single_chapter_book_matching=indifferent`

  const res = await fetch(url, {
    next: { revalidate: 60 * 60 * 24 },
  })

  if (!res.ok) {
    return NextResponse.json({ ok: false, error: "upstream_error" }, { status: 502 })
  }

  const json = (await res.json()) as BibleApiResponse
  if (json.error) {
    return NextResponse.json({ ok: false, error: "upstream_error" }, { status: 502 })
  }

  const verses = (json.verses ?? [])
    .map((v) => String(v.text ?? "").replaceAll(/\s+\n/g, " ").trim())
    .filter(Boolean)

  if (!verses.length) {
    return NextResponse.json({ ok: false, error: "no_text" }, { status: 404 })
  }

  return NextResponse.json({
    ok: true,
    version: "kjv",
    bookId: book,
    chapter,
    verses,
  })
}
