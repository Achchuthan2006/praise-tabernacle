"use client"

import Link from "next/link"
import type { ReactNode } from "react"
import { useEffect, useMemo, useState } from "react"

import { useLanguage } from "@/components/language/LanguageProvider"
import type { BibleBookId, BibleSearchHit, BibleVersionId, BibleVerseRef } from "@/lib/bible"
import { bibleVersions, getAvailableBooks, getAvailableChapters, getBookName, parseReference } from "@/lib/bible"
import type { ReadingPlanId, ReadingPlanStep } from "@/lib/biblePlans"
import { readingPlans } from "@/lib/biblePlans"
import { TAMIL_BIBLE_INDEX_HREF, tamilBibleChapterHref, tamilBibleVerseHref } from "@/lib/tamilBible"

type Highlight = {
  key: string
  color: "gold" | "purple"
  note?: string
  createdAtIso: string
}

type Bookmark = {
  key: string
  label: string
  createdAtIso: string
}

const STORAGE = {
  bookmark: "pt:bible:bookmarks",
  highlight: "pt:bible:highlights",
  lastRef: "pt:bible:last-ref",
  planProgress: "pt:bible:plan-progress",
} as const

function refKey(ref: BibleVerseRef) {
  return `${ref.versionId}:${ref.bookId}:${ref.chapter}:${ref.verse}`
}

function chapterKey(versionId: BibleVersionId, bookId: BibleBookId, chapter: number) {
  return `${versionId}:${bookId}:${chapter}`
}

function safeJsonParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback
  try {
    return JSON.parse(value) as T
  } catch {
    return fallback
  }
}

function formatVerseLabel(bookId: BibleBookId, chapter: number, verse?: number) {
  const book = getBookName(bookId)
  return verse ? `${book} ${chapter}:${verse}` : `${book} ${chapter}`
}

function isKjvAvailable(versionId: BibleVersionId) {
  return versionId === "kjv"
}

function getPlanById(id: ReadingPlanId | "") {
  return readingPlans.find((p) => p.id === id) ?? null
}

export default function BibleReader() {
  const { language } = useLanguage()
  const books = useMemo(() => getAvailableBooks(), [])
  const [primaryVersion, setPrimaryVersion] = useState<BibleVersionId>("kjv")
  const [secondaryVersion, setSecondaryVersion] = useState<BibleVersionId>("tamil")
  const [parallel, setParallel] = useState(false)

  const [bookId, setBookId] = useState<BibleBookId>(books[0] ?? "john")
  const [chapter, setChapter] = useState<number>(getAvailableChapters(bookId)[0] ?? 1)

  const [searchQuery, setSearchQuery] = useState("")
  const [referenceJump, setReferenceJump] = useState("")
  const [primaryText, setPrimaryText] = useState<readonly string[] | null>(null)
  const [primaryLoading, setPrimaryLoading] = useState(false)
  const [primaryError, setPrimaryError] = useState<string>("")
  const [secondaryText, setSecondaryText] = useState<readonly string[] | null>(null)
  const [secondaryLoading, setSecondaryLoading] = useState(false)
  const [secondaryError, setSecondaryError] = useState<string>("")

  const [selectedPlanId, setSelectedPlanId] = useState<ReadingPlanId | "">("")
  const [planIndex, setPlanIndex] = useState<number>(0)

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [highlights, setHighlights] = useState<Record<string, Highlight>>({})

  useEffect(() => {
    setBookmarks(safeJsonParse(localStorage.getItem(STORAGE.bookmark), [] as Bookmark[]))
    setHighlights(safeJsonParse(localStorage.getItem(STORAGE.highlight), {} as Record<string, Highlight>))

    const last = safeJsonParse(localStorage.getItem(STORAGE.lastRef), null as null | { bookId: BibleBookId; chapter: number })
    if (last?.bookId && last.chapter) {
      setBookId(last.bookId)
      setChapter(last.chapter)
    }

    const progress = safeJsonParse(localStorage.getItem(STORAGE.planProgress), {} as Record<string, number>)
    const savedPlanId = Object.keys(progress)[0] as ReadingPlanId | undefined
    if (savedPlanId) {
      setSelectedPlanId(savedPlanId)
      setPlanIndex(progress[savedPlanId] ?? 0)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE.bookmark, JSON.stringify(bookmarks))
  }, [bookmarks])

  useEffect(() => {
    localStorage.setItem(STORAGE.highlight, JSON.stringify(highlights))
  }, [highlights])

  useEffect(() => {
    localStorage.setItem(STORAGE.lastRef, JSON.stringify({ bookId, chapter }))
  }, [bookId, chapter])

  useEffect(() => {
    if (!selectedPlanId) return
    const progress = safeJsonParse(localStorage.getItem(STORAGE.planProgress), {} as Record<string, number>)
    progress[selectedPlanId] = planIndex
    localStorage.setItem(STORAGE.planProgress, JSON.stringify(progress))
  }, [planIndex, selectedPlanId])

  useEffect(() => {
    const chapters = getAvailableChapters(bookId)
    if (!chapters.includes(chapter)) setChapter(chapters[0] ?? 1)
  }, [bookId, chapter])

  useEffect(() => {
    let cancelled = false
    const controller = new AbortController()

    const load = async () => {
      setPrimaryError("")
      if (!isKjvAvailable(primaryVersion)) {
        setPrimaryText(null)
        return
      }
      setPrimaryLoading(true)
      try {
        const res = await fetch(
          `/api/bible/chapter?version=kjv&book=${encodeURIComponent(bookId)}&chapter=${chapter}`,
          { signal: controller.signal },
        )
        const json = (await res.json()) as { ok?: boolean; verses?: string[]; error?: string }
        if (!res.ok || !json.ok) throw new Error(json.error ?? "fetch_failed")
        if (cancelled) return
        setPrimaryText(json.verses ?? null)
      } catch (err) {
        if (controller.signal.aborted) return
        setPrimaryText(null)
        setPrimaryError(err instanceof Error ? err.message : "fetch_failed")
      } finally {
        if (!cancelled) setPrimaryLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
      controller.abort()
    }
  }, [bookId, chapter, primaryVersion])

  useEffect(() => {
    let cancelled = false
    const controller = new AbortController()

    const load = async () => {
      setSecondaryError("")
      if (!parallel) {
        setSecondaryText(null)
        return
      }
      if (!isKjvAvailable(secondaryVersion)) {
        setSecondaryText(null)
        return
      }
      setSecondaryLoading(true)
      try {
        const res = await fetch(
          `/api/bible/chapter?version=kjv&book=${encodeURIComponent(bookId)}&chapter=${chapter}`,
          { signal: controller.signal },
        )
        const json = (await res.json()) as { ok?: boolean; verses?: string[]; error?: string }
        if (!res.ok || !json.ok) throw new Error(json.error ?? "fetch_failed")
        if (cancelled) return
        setSecondaryText(json.verses ?? null)
      } catch (err) {
        if (controller.signal.aborted) return
        setSecondaryText(null)
        setSecondaryError(err instanceof Error ? err.message : "fetch_failed")
      } finally {
        if (!cancelled) setSecondaryLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
      controller.abort()
    }
  }, [bookId, chapter, parallel, secondaryVersion])

  const searchHits = useMemo<BibleSearchHit[]>(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return []
    const verses = primaryText ?? []
    const hits: BibleSearchHit[] = []
    for (let i = 0; i < verses.length; i++) {
      const text = verses[i] ?? ""
      if (!text.toLowerCase().includes(q)) continue
      hits.push({ versionId: "kjv", bookId, chapter, verse: i + 1, text })
      if (hits.length >= 100) break
    }
    return hits
  }, [bookId, chapter, primaryText, searchQuery])

  const plan = useMemo(() => getPlanById(selectedPlanId), [selectedPlanId])
  const planStep: ReadingPlanStep | null = plan?.steps?.[planIndex] ?? null

  const missingTextNote = useMemo(() => {
    const primary = bibleVersions.find((v) => v.id === primaryVersion)
    const secondary = bibleVersions.find((v) => v.id === secondaryVersion)
    const notes: string[] = []
    if (primary && !primary.available) notes.push(primary.licenseNote)
    if (parallel && secondary && !secondary.available) notes.push(secondary.licenseNote)
    return notes
  }, [parallel, primaryVersion, secondaryVersion])

  const onJump = () => {
    const parsed = parseReference(referenceJump)
    if (!parsed) return
    setBookId(parsed.bookId)
    setChapter(parsed.chapter)
    // verse scroll is best-effort (only works when verse exists in current chapter).
    if (parsed.verse) {
      const el = document.getElementById(`verse-${parsed.bookId}-${parsed.chapter}-${parsed.verse}`)
      el?.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  const toggleHighlight = (ref: BibleVerseRef) => {
    const key = refKey(ref)
    setHighlights((prev) => {
      const existing = prev[key]
      if (existing) {
        const copy = { ...prev }
        delete copy[key]
        return copy
      }
      return {
        ...prev,
        [key]: { key, color: "gold", createdAtIso: new Date().toISOString() },
      }
    })
  }

  const addBookmark = (label: string) => {
    const key = chapterKey(primaryVersion, bookId, chapter)
    const exists = bookmarks.some((b) => b.key === key)
    if (exists) return
    setBookmarks((prev) => [{ key, label, createdAtIso: new Date().toISOString() }, ...prev].slice(0, 25))
  }

  const clearAll = () => {
    setBookmarks([])
    setHighlights({})
    localStorage.removeItem(STORAGE.planProgress)
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="section-kicker">Bible</div>
          <h2 className="section-heading">Bible Reader</h2>
          <p className="mt-1 text-sm text-churchBlue/70">
            Multi-version UI, reading plans, search, bookmarks, and highlights.
          </p>
          <p className="mt-2 text-xs text-churchBlue/60">
            KJV chapter text loads on-demand. Other versions require licensed data or an API integration.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Link href="/#verse-of-the-day" className="btn btn-sm btn-secondary">
            Verse of the Day
          </Link>
          <button type="button" className="btn btn-sm btn-secondary" onClick={clearAll}>
            Clear bookmarks/highlights
          </button>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="card">
            <div className="card-content p-6">
              <div className="text-sm font-semibold text-churchBlue">Reading</div>

              <div className="mt-4 grid gap-3">
                <Field label="Book">
                  <select
                    className="h-11 w-full rounded-xl border border-churchBlue/15 bg-white px-3 text-sm text-churchBlue focus-ring"
                    value={bookId}
                    onChange={(e) => setBookId(e.target.value as BibleBookId)}
                  >
                    {books.map((id) => (
                      <option key={id} value={id}>
                        {getBookName(id)}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Chapter">
                  <select
                    className="h-11 w-full rounded-xl border border-churchBlue/15 bg-white px-3 text-sm text-churchBlue focus-ring"
                    value={chapter}
                    onChange={(e) => setChapter(Number(e.target.value))}
                  >
                    {getAvailableChapters(bookId).map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Primary version">
                  <select
                    className="h-11 w-full rounded-xl border border-churchBlue/15 bg-white px-3 text-sm text-churchBlue focus-ring"
                    value={primaryVersion}
                    onChange={(e) => setPrimaryVersion(e.target.value as BibleVersionId)}
                  >
                    {bibleVersions.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.label}
                      </option>
                    ))}
                  </select>
                </Field>

                <label className="flex items-center justify-between gap-3 rounded-xl border border-churchBlue/10 bg-churchBlueSoft px-4 py-3">
                  <span className="text-sm font-semibold text-churchBlue">Parallel Bible</span>
                  <input
                    type="checkbox"
                    checked={parallel}
                    onChange={(e) => setParallel(e.target.checked)}
                    className="h-5 w-5"
                  />
                </label>

                {parallel ? (
                  <Field label="Secondary version">
                    <select
                      className="h-11 w-full rounded-xl border border-churchBlue/15 bg-white px-3 text-sm text-churchBlue focus-ring"
                      value={secondaryVersion}
                      onChange={(e) => setSecondaryVersion(e.target.value as BibleVersionId)}
                    >
                      {bibleVersions.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                ) : null}

                {missingTextNote.length ? (
                  <div className="rounded-2xl border border-churchBlue/10 bg-white p-4 text-xs text-churchBlue/70">
                    {missingTextNote.map((n, idx) => (
                      <p key={idx} className={idx === 0 ? "" : "mt-2"}>
                        {n}
                      </p>
                    ))}
                  </div>
                ) : null}

                <div className="grid gap-2 sm:grid-cols-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-primary w-full"
                    onClick={() => addBookmark(formatVerseLabel(bookId, chapter))}
                  >
                    Bookmark chapter
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary w-full"
                    onClick={() => setSearchQuery("")}
                  >
                    Clear search
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 card">
            <div className="card-content p-6">
              <div className="text-sm font-semibold text-churchBlue">Search</div>
              <p className="mt-2 text-xs text-churchBlue/60">
                Searches the currently loaded chapter (KJV).
              </p>
              <div className="mt-4 float-field">
                <input
                  className="float-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Keyword search…"
                />
                <span className="float-label">Keyword</span>
              </div>

              {searchQuery.trim() ? (
                <div className="mt-4 max-h-72 space-y-2 overflow-auto rounded-2xl border border-churchBlue/10 bg-white p-3">
                  {searchHits.length ? (
                    searchHits.map((hit) => (
                      <button
                        key={refKey(hit)}
                        type="button"
                        className="w-full rounded-xl px-3 py-2 text-left text-sm text-churchBlue hover:bg-churchBlueSoft focus-ring"
                        onClick={() => {
                          setBookId(hit.bookId)
                          setChapter(hit.chapter)
                          setTimeout(() => {
                            document
                              .getElementById(`verse-${hit.bookId}-${hit.chapter}-${hit.verse}`)
                              ?.scrollIntoView({ behavior: "smooth", block: "center" })
                          }, 50)
                        }}
                      >
                        <div className="text-xs font-semibold text-churchBlue/60">
                          {formatVerseLabel(hit.bookId, hit.chapter, hit.verse)}
                        </div>
                        <div className="mt-1 line-clamp-2 text-churchBlue/80">{hit.text}</div>
                      </button>
                    ))
                  ) : (
                    <div className="p-3 text-sm text-churchBlue/70">No matches.</div>
                  )}
                </div>
              ) : null}

              <div className="mt-6 border-t border-churchBlue/10 pt-6">
                <div className="text-sm font-semibold text-churchBlue">Jump to verse</div>
                <div className="mt-3 flex gap-2">
                  <input
                    className="h-11 w-full rounded-xl border border-churchBlue/15 bg-white px-4 text-sm text-churchBlue placeholder:text-churchBlue/45 focus-ring"
                    value={referenceJump}
                    onChange={(e) => setReferenceJump(e.target.value)}
                    placeholder="e.g. John 1:14"
                  />
                  <button type="button" className="btn btn-sm btn-primary" onClick={onJump}>
                    Go
                  </button>
                </div>
                <p className="mt-2 text-xs text-churchBlue/60">Currently supported: John.</p>
              </div>
            </div>
          </div>

          <div className="mt-6 card">
            <div className="card-content p-6">
              <div className="text-sm font-semibold text-churchBlue">Reading plans</div>
              <select
                className="mt-4 h-11 w-full rounded-xl border border-churchBlue/15 bg-white px-3 text-sm text-churchBlue focus-ring"
                value={selectedPlanId}
                onChange={(e) => {
                  const id = e.target.value as ReadingPlanId | ""
                  setSelectedPlanId(id)
                  setPlanIndex(0)
                }}
              >
                <option value="">Select a plan…</option>
                {readingPlans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>

              {plan ? (
                <div className="mt-4 rounded-2xl border border-churchBlue/10 bg-white p-4">
                  <div className="text-sm font-semibold text-churchBlue">{plan.title}</div>
                  <p className="mt-2 text-xs text-churchBlue/60">{plan.description}</p>
                  {plan.availabilityNote ? (
                    <p className="mt-3 text-xs text-churchBlue/70">{plan.availabilityNote}</p>
                  ) : null}

                  {planStep ? (
                    <div className="mt-4">
                      <div className="text-xs font-semibold text-churchBlue/60">Next reading</div>
                      <div className="mt-1 text-sm font-semibold text-churchBlue">{planStep.label}</div>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-primary w-full"
                          onClick={() => {
                            setPrimaryVersion(planStep.versionId)
                            setBookId(planStep.bookId)
                            setChapter(planStep.chapter)
                          }}
                        >
                          Open
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-secondary w-full"
                          onClick={() => setPlanIndex((v) => Math.min(v + 1, Math.max(0, (plan.steps?.length ?? 1) - 1)))}
                        >
                          Mark done
                        </button>
                      </div>
                      <div className="mt-3 text-xs text-churchBlue/60">
                        Step {Math.min(planIndex + 1, plan.steps.length)} of {plan.steps.length}
                      </div>
                    </div>
                  ) : (
                    <p className="mt-4 text-sm text-churchBlue/70">This plan has no steps yet.</p>
                  )}
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-6 card">
            <div className="card-content p-6">
              <div className="text-sm font-semibold text-churchBlue">Bookmarks</div>
              {bookmarks.length ? (
                <div className="mt-4 space-y-2">
                  {bookmarks.map((b) => (
                    <button
                      key={b.key}
                      type="button"
                      className="w-full rounded-xl border border-churchBlue/10 bg-white px-4 py-3 text-left text-sm text-churchBlue hover:bg-churchBlueSoft focus-ring"
                      onClick={() => {
                        const [_v, bId, ch] = b.key.split(":")
                        setBookId(bId as BibleBookId)
                        setChapter(Number(ch))
                      }}
                    >
                      <div className="text-sm font-semibold">{b.label}</div>
                      <div className="mt-1 text-xs text-churchBlue/60">{b.key}</div>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-churchBlue/70">No bookmarks yet.</p>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="card">
            <div className="card-content p-6 sm:p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                    {formatVerseLabel(bookId, chapter)}
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-churchBlue/10 bg-churchBlueSoft px-3 py-1 text-xs font-semibold text-churchBlue/80">
                      {bibleVersions.find((v) => v.id === primaryVersion)?.label ?? primaryVersion}
                    </span>
                    {parallel ? (
                      <span className="rounded-full border border-churchBlue/10 bg-white px-3 py-1 text-xs font-semibold text-churchBlue/70">
                        Parallel: {bibleVersions.find((v) => v.id === secondaryVersion)?.label ?? secondaryVersion}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className={["mt-8 grid gap-8", parallel ? "lg:grid-cols-2" : ""].join(" ")}>
                <VerseColumn
                  title={primaryVersion === "kjv" ? "KJV" : "Not available"}
                  verses={primaryText}
                  versionId={primaryVersion}
                  bookId={bookId}
                  chapter={chapter}
                  loading={primaryLoading}
                  error={primaryError}
                  highlights={highlights}
                  onToggleHighlight={toggleHighlight}
                  tamilLinks={parallel && secondaryVersion === "tamil"}
                />

                {parallel ? (
                  <VerseColumn
                    title={secondaryVersion === "kjv" ? "KJV" : "Not available"}
                    verses={secondaryText}
                    versionId={secondaryVersion}
                    bookId={bookId}
                    chapter={chapter}
                    loading={secondaryLoading}
                    error={secondaryError}
                    highlights={highlights}
                    onToggleHighlight={toggleHighlight}
                    placeholderNote={
                      bibleVersions.find((v) => v.id === secondaryVersion)?.available
                        ? undefined
                        : bibleVersions.find((v) => v.id === secondaryVersion)?.licenseNote
                    }
                  />
                ) : null}
              </div>

              <div className="mt-10 border-t border-churchBlue/10 pt-6 text-xs text-churchBlue/60">
                Highlighting and notes are stored locally in your browser (no login).
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-churchBlue">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  )
}

function VerseColumn({
  title,
  verses,
  versionId,
  bookId,
  chapter,
  loading,
  error,
  highlights,
  onToggleHighlight,
  placeholderNote,
  tamilLinks = false,
}: {
  title: string
  verses: readonly string[] | null
  versionId: BibleVersionId
  bookId: BibleBookId
  chapter: number
  loading?: boolean
  error?: string
  highlights: Record<string, Highlight>
  onToggleHighlight: (ref: BibleVerseRef) => void
  placeholderNote?: string
  tamilLinks?: boolean
}) {
  const { language } = useLanguage()
  if (!isKjvAvailable(versionId)) {
    if (versionId === "tamil") {
      return (
        <div className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-5">
          <div className="text-sm font-semibold text-churchBlue">{title}</div>
          <p className="mt-3 text-sm text-churchBlue/70">
            Tamil Bible text is hosted externally. If it doesn’t load below (some browsers block embeds), use the buttons.
          </p>
          <div className="mt-4 overflow-hidden rounded-2xl border border-churchBlue/10 bg-white">
            <iframe
              src={tamilBibleChapterHref(bookId, chapter)}
              title={`Tamil Bible - ${formatVerseLabel(bookId, chapter)}`}
              className="h-[520px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={tamilBibleChapterHref(bookId, chapter)}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-secondary"
            >
              Open chapter
            </a>
            <a
              href={TAMIL_BIBLE_INDEX_HREF}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-secondary"
            >
              Browse books
            </a>
          </div>
        </div>
      )
    }
    return (
      <div className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-5">
        <div className="text-sm font-semibold text-churchBlue">{title}</div>
        <p className="mt-3 text-sm text-churchBlue/70">
          {placeholderNote ?? "Text not available in this build."}
        </p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-5">
        <div className="text-sm font-semibold text-churchBlue">{title}</div>
        <p className="mt-3 text-sm text-churchBlue/70">Loading chapter…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-5">
        <div className="text-sm font-semibold text-churchBlue">{title}</div>
        <p className="mt-3 text-sm text-churchBlue/70">
          Couldn’t load this chapter right now. Please try again.
        </p>
      </div>
    )
  }

  if (!verses) {
    return (
      <div className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-5">
        <div className="text-sm font-semibold text-churchBlue">{title}</div>
        <p className="mt-3 text-sm text-churchBlue/70">
          No text available for this chapter.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="text-sm font-semibold text-churchBlue">{title}</div>
      <ol className="mt-4 space-y-4 text-base leading-7 text-churchBlue">
        {verses.map((text, idx) => {
          const verse = idx + 1
          const ref: BibleVerseRef = { versionId: "kjv", bookId, chapter, verse }
          const key = refKey(ref)
          const isHighlighted = Boolean(highlights[key])
          return (
            <li
              key={key}
              id={`verse-${bookId}-${chapter}-${verse}`}
              className={[
                "group flex gap-4 rounded-xl border px-4 py-3 transition-colors",
                isHighlighted ? "border-churchGold/40 bg-churchGold/10" : "border-churchBlue/10 bg-white",
              ].join(" ")}
            >
              <span className="mt-[1px] w-9 shrink-0 text-right text-sm font-semibold text-churchBlue/50">
                {verse}
              </span>
              <span className="flex-1">{text}</span>
              {tamilLinks ? (
                <a
                  href={tamilBibleVerseHref(bookId, chapter, verse)}
                  target="_blank"
                  rel="noreferrer"
                  className={[
                    "btn btn-sm h-11 w-11 !rounded-xl border px-0",
                    "border-churchBlue/10 bg-churchBlueSoft text-churchBlue/80 opacity-0 group-hover:opacity-100",
                  ].join(" ")}
                  title={language === "ta" ? "தமிழ் வசனத்தைத் திற" : "Open Tamil verse"}
                  aria-label={language === "ta" ? "தமிழ் வசனத்தைத் திற" : "Open Tamil verse"}
                >
                  TA
                </a>
              ) : null}
              <button
                type="button"
                className={[
                  "btn btn-sm h-11 w-11 !rounded-xl border px-0",
                  isHighlighted
                    ? "border-churchGold/40 bg-churchGold/20 text-churchBlue"
                    : "border-churchBlue/10 bg-churchBlueSoft text-churchBlue/80 opacity-0 group-hover:opacity-100",
                ].join(" ")}
                title={
                  isHighlighted
                    ? language === "ta"
                      ? "உயர்விளக்கத்தை அகற்று"
                      : "Remove highlight"
                    : language === "ta"
                      ? "வசனத்தை உயர்விளக்கு"
                      : "Highlight verse"
                }
                onClick={() => onToggleHighlight(ref)}
                aria-label={
                  isHighlighted
                    ? language === "ta"
                      ? "உயர்விளக்கத்தை அகற்று"
                      : "Remove highlight"
                    : language === "ta"
                      ? "வசனத்தை உயர்விளக்கு"
                      : "Highlight verse"
                }
              >
                {"\u2726"}
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
