"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import type { ReactNode } from "react"
import { useEffect, useMemo, useState } from "react"

import type { BlogCategory } from "@/lib/blog"
import { formatIsoDate } from "@/lib/dates"
import type { Event } from "@/lib/events"
import { getEventImageSrc, isPastEvent, isOneOffEvent, nextOccurrenceLocal, toLocalDate } from "@/lib/events"
import type { Sermon, SermonSeries } from "@/lib/sermons"

type BlogSearchItem = {
  slug: string
  title: string
  excerpt: string
  dateIso: string
  category: BlogCategory
  tags: string[]
  authorName?: string
  content?: string
}

type Props = {
  initialQuery: string
  sermons: Sermon[]
  series: SermonSeries[]
  events: Event[]
  blogPosts: BlogSearchItem[]
  pages: ReadonlyArray<{
    href: string
    titleEn: string
    titleTa: string
    excerptEn: string
    excerptTa: string
    tags: readonly string[]
  }>
}

type Tab = "all" | "pages" | "sermons" | "events" | "blog"

const popularSearches = ["Sunday service", "Prayer", "Youth", "Magazine", "Give", "Tamil"]

function normalizeQuery(query: string) {
  return query.trim().replace(/\s+/g, " ")
}

function queryTerms(query: string) {
  const q = normalizeQuery(query).toLowerCase()
  if (!q) return []
  return q.split(" ").filter(Boolean)
}

function scoreText(text: string, terms: string[]) {
  const hay = text.toLowerCase()
  let score = 0
  for (const t of terms) {
    if (!t) continue
    if (hay.includes(t)) score += 1
  }
  return score
}

function formatDateIso(dateIso: string) {
  return formatIsoDate(dateIso, "en-CA", { year: "numeric", month: "short", day: "2-digit" })
}

function eventSortKey(event: Event) {
  if (event.startAtLocal) return toLocalDate(event.startAtLocal).getTime()
  if (event.recurrence) return nextOccurrenceLocal(event.recurrence).getTime()
  return 0
}

function TabButton({
  active,
  children,
  onClick,
}: {
  active: boolean
  children: ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      className={["btn btn-sm", active ? "btn-primary" : "btn-secondary"].join(" ")}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default function SiteSearch({ initialQuery, sermons, series, events, blogPosts, pages }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [tab, setTab] = useState<Tab>("all")
  const [query, setQuery] = useState(() => normalizeQuery(initialQuery))

  const seriesById = useMemo(() => new Map(series.map((s) => [s.id, s])), [series])
  const terms = useMemo(() => queryTerms(query), [query])
  const hasQuery = terms.length > 0

  useEffect(() => {
    const next = normalizeQuery(searchParams?.get("q") ?? "")
    setQuery((cur) => (cur === next ? cur : next))
  }, [searchParams])

  useEffect(() => {
    const params = new URLSearchParams(searchParams?.toString() ?? "")
    const normalized = normalizeQuery(query)
    if (normalized) params.set("q", normalized)
    else params.delete("q")
    const next = params.toString()
    router.replace(next ? `/search?${next}` : "/search", { scroll: false })
  }, [query, router, searchParams])

  const pageResults = useMemo(() => {
    return pages
      .map((p) => {
        const blob = [p.titleEn, p.titleTa, p.excerptEn, p.excerptTa, ...(p.tags ?? [])].join(" ")
        const score = hasQuery
          ? scoreText(p.titleEn, terms) * 6 +
            scoreText(p.titleTa, terms) * 6 +
            scoreText(blob, terms)
          : 1
        return { page: p, score }
      })
      .filter((r) => (hasQuery ? r.score > 0 : true))
      .sort((a, b) => (hasQuery && b.score !== a.score ? b.score - a.score : a.page.titleEn.localeCompare(b.page.titleEn)))
  }, [hasQuery, pages, terms])

  const sermonResults = useMemo(() => {
    return sermons
      .map((s) => {
        const seriesTitle = s.seriesId ? seriesById.get(s.seriesId)?.title ?? "" : ""
        const blob = [
          s.title,
          s.speaker ?? "",
          s.dateIso,
          s.language,
          seriesTitle,
          ...(s.topics ?? []),
          ...(s.scriptures ?? []),
        ].join(" ")

        const score = hasQuery
          ? scoreText(s.title, terms) * 6 +
            scoreText(seriesTitle, terms) * 3 +
            scoreText(s.speaker ?? "", terms) * 2 +
            scoreText(blob, terms)
          : 1

        return { sermon: s, seriesTitle, score }
      })
      .filter((r) => (hasQuery ? r.score > 0 : true))
      .sort((a, b) => (hasQuery && b.score !== a.score ? b.score - a.score : b.sermon.dateIso.localeCompare(a.sermon.dateIso)))
  }, [hasQuery, sermons, seriesById, terms])

  const eventResults = useMemo(() => {
    const now = new Date()

    return events
      .map((e) => {
        const blob = [
          e.title,
          e.description,
          e.category,
          e.language,
          e.ageGroup,
          e.location?.name ?? "",
          e.location?.mapQuery ?? "",
        ].join(" ")

        const score = hasQuery ? scoreText(e.title, terms) * 6 + scoreText(blob, terms) : 1
        const time = eventSortKey(e)
        const isPast = isPastEvent(e, now)
        return { event: e, score, time, isPast }
      })
      .filter((r) => (hasQuery ? r.score > 0 : true))
      .sort((a, b) => {
        if (hasQuery && b.score !== a.score) return b.score - a.score
        if (a.isPast !== b.isPast) return a.isPast ? 1 : -1
        return b.time - a.time
      })
  }, [events, hasQuery, terms])

  const blogResults = useMemo(() => {
    return blogPosts
      .map((p) => {
        const blob = [p.title, p.excerpt, p.category, p.authorName ?? "", p.content ?? "", ...(p.tags ?? [])].join(" ")
        const score = hasQuery ? scoreText(p.title, terms) * 6 + scoreText(blob, terms) : 1
        return { post: p, score }
      })
      .filter((r) => (hasQuery ? r.score > 0 : true))
      .sort((a, b) => (hasQuery && b.score !== a.score ? b.score - a.score : b.post.dateIso.localeCompare(a.post.dateIso)))
  }, [blogPosts, hasQuery, terms])

  const totals = {
    pages: pageResults.length,
    sermons: sermonResults.length,
    events: eventResults.length,
    blog: blogResults.length,
  }
  const totalResults = totals.pages + totals.sermons + totals.events + totals.blog

  const visiblePages = tab === "all" ? pageResults.slice(0, 6) : pageResults
  const visibleSermons = tab === "all" ? sermonResults.slice(0, 6) : sermonResults
  const visibleEvents = tab === "all" ? eventResults.slice(0, 6) : eventResults
  const visibleBlog = tab === "all" ? blogResults.slice(0, 6) : blogResults

  return (
    <div className="mx-auto max-w-6xl">
      <div className="rounded-[2rem] border border-churchBlue/10 bg-[linear-gradient(135deg,rgba(231,244,255,0.95),rgba(255,255,255,0.98))] p-6 shadow-[0_24px_60px_-40px_rgba(15,84,118,0.4)] sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="section-kicker">Search</div>
            <h2 className="section-heading">Site search</h2>
            <p className="mt-2 text-sm text-churchBlue/70 sm:text-base">
              {hasQuery
                ? `Showing the strongest matches for "${query}" across pages, sermons, events, and blog posts.`
                : "Search across pages, sermons, events, and blog posts from one place."}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/80 bg-white/85 px-4 py-3 backdrop-blur">
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-churchBlue/55">
                {hasQuery ? "Matches" : "Indexed"}
              </div>
              <div className="mt-1 text-2xl font-semibold tracking-tight text-churchBlue">{totalResults}</div>
            </div>
            <div className="rounded-2xl border border-white/80 bg-white/85 px-4 py-3 backdrop-blur">
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-churchBlue/55">Sermons</div>
              <div className="mt-1 text-2xl font-semibold tracking-tight text-churchBlue">{totals.sermons}</div>
            </div>
            <div className="rounded-2xl border border-white/80 bg-white/85 px-4 py-3 backdrop-blur">
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-churchBlue/55">Events</div>
              <div className="mt-1 text-2xl font-semibold tracking-tight text-churchBlue">{totals.events}</div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <label className="block">
              <div className="float-field bg-white/95 shadow-[0_18px_40px_-32px_rgba(15,84,118,0.55)]">
                <input
                  className="float-input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search sermons, events, blog posts, and pages..."
                />
                <span className="float-label">Search</span>
              </div>
            </label>
          </div>
          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-churchBlue/10 bg-white/90 px-4 py-4">
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-churchBlue/55">
                {hasQuery ? "Current view" : "Search includes"}
              </div>
              <div className="mt-2 text-sm text-churchBlue/75">
                {hasQuery
                  ? `Use the tabs to narrow ${totalResults} result${totalResults === 1 ? "" : "s"} by content type.`
                  : "Pages, sermons, events, and blog posts are all included in this search."}
              </div>
            </div>
          </div>
        </div>

        {!hasQuery ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {popularSearches.map((term) => (
              <button
                key={term}
                type="button"
                className="rounded-full border border-churchBlue/12 bg-white/92 px-4 py-2 text-sm font-semibold text-churchBlue transition hover:-translate-y-0.5 hover:border-churchBlue/20 hover:bg-white"
                onClick={() => setQuery(term)}
              >
                {term}
              </button>
            ))}
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-2">
          <TabButton active={tab === "all"} onClick={() => setTab("all")}>
            All ({totalResults})
          </TabButton>
          <TabButton active={tab === "pages"} onClick={() => setTab("pages")}>
            Pages ({totals.pages})
          </TabButton>
          <TabButton active={tab === "sermons"} onClick={() => setTab("sermons")}>
            Sermons ({totals.sermons})
          </TabButton>
          <TabButton active={tab === "events"} onClick={() => setTab("events")}>
            Events ({totals.events})
          </TabButton>
          <TabButton active={tab === "blog"} onClick={() => setTab("blog")}>
            Blog ({totals.blog})
          </TabButton>
        </div>
      </div>

      {hasQuery && totalResults === 0 ? (
        <div className="mt-8 overflow-hidden rounded-[2rem] border border-churchBlue/10 bg-[linear-gradient(180deg,rgba(231,244,255,0.82),rgba(255,255,255,1))] shadow-[0_24px_60px_-44px_rgba(15,84,118,0.45)]">
          <div className="card-content p-8 sm:p-10">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-churchBlue/55">No results</div>
            <div className="mt-3 text-2xl font-semibold tracking-tight text-churchBlue">No matches for "{query}"</div>
            <p className="mt-3 max-w-2xl text-sm text-churchBlue/72 sm:text-base">
              Try a broader keyword, a ministry name, or a content type like sermons, prayer, youth, or give.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {popularSearches.map((term) => (
                <button
                  key={`empty-${term}`}
                  type="button"
                  className="rounded-full border border-churchBlue/12 bg-white px-4 py-2 text-sm font-semibold text-churchBlue transition hover:-translate-y-0.5 hover:border-churchBlue/20"
                  onClick={() => setQuery(term)}
                >
                  Try {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-10 grid gap-10">
          {(tab === "all" || tab === "pages") && visiblePages.length > 0 ? (
            <section>
              <div className="flex items-end justify-between gap-4">
                <h3 className="text-xl font-semibold tracking-tight text-churchBlue sm:text-2xl">Pages</h3>
                {tab === "all" && totals.pages > visiblePages.length ? (
                  <button type="button" className="btn btn-sm btn-secondary" onClick={() => setTab("pages")}>
                    View all
                  </button>
                ) : null}
              </div>
              <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {visiblePages.map(({ page }) => (
                  <article key={page.href} className="card">
                    <div className="card-content p-6">
                      <div className="text-xs font-semibold tracking-wide text-churchBlue/60">Site page</div>
                      <h4 className="mt-2 text-lg font-semibold tracking-tight text-churchBlue">
                        <Link href={page.href} className="focus-ring rounded-lg">
                          {page.titleEn}
                        </Link>
                      </h4>
                      <p className="mt-2 text-sm text-churchBlue/70 line-clamp-3">{page.excerptEn}</p>
                      {page.tags?.length ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {page.tags.slice(0, 3).map((tag) => (
                            <span
                              key={`${page.href}-${tag}`}
                              className="rounded-full border border-churchBlue/10 bg-white px-3 py-1 text-xs font-semibold text-churchBlue/80"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {(tab === "all" || tab === "sermons") && visibleSermons.length > 0 ? (
            <section>
              <div className="flex items-end justify-between gap-4">
                <h3 className="text-xl font-semibold tracking-tight text-churchBlue sm:text-2xl">Sermons</h3>
                {tab === "all" && totals.sermons > visibleSermons.length ? (
                  <button type="button" className="btn btn-sm btn-secondary" onClick={() => setTab("sermons")}>
                    View all
                  </button>
                ) : (
                  <Link href="/sermons" className="btn btn-sm btn-secondary">
                    Open sermons page
                  </Link>
                )}
              </div>
              <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {visibleSermons.map(({ sermon, seriesTitle }) => (
                  <article key={sermon.slug} className="card">
                    <div className="card-content p-6">
                      <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                        {formatDateIso(sermon.dateIso)}
                        {seriesTitle ? ` " ${seriesTitle}` : ""}
                      </div>
                      <h4 className="mt-2 text-lg font-semibold tracking-tight text-churchBlue">
                        <Link href={`/sermons/${sermon.slug}`} className="focus-ring rounded-lg">
                          {sermon.title}
                        </Link>
                      </h4>
                      {sermon.speaker ? <div className="mt-1 text-sm text-churchBlue/70">{sermon.speaker}</div> : null}
                      {sermon.topics?.length ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {sermon.topics.slice(0, 3).map((topic) => (
                            <span
                              key={`${sermon.slug}-${topic}`}
                              className="rounded-full border border-churchBlue/10 bg-white px-3 py-1 text-xs font-semibold text-churchBlue/80"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {(tab === "all" || tab === "events") && visibleEvents.length > 0 ? (
            <section>
              <div className="flex items-end justify-between gap-4">
                <h3 className="text-xl font-semibold tracking-tight text-churchBlue sm:text-2xl">Events</h3>
                {tab === "all" && totals.events > visibleEvents.length ? (
                  <button type="button" className="btn btn-sm btn-secondary" onClick={() => setTab("events")}>
                    View all
                  </button>
                ) : (
                  <Link href="/events" className="btn btn-sm btn-secondary">
                    Open events page
                  </Link>
                )}
              </div>
              <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {visibleEvents.map(({ event }) => {
                  const when = isOneOffEvent(event) && event.startAtLocal ? event.startAtLocal.split("T")[0] : null
                  const imgSrc = getEventImageSrc(event)
                  return (
                    <article key={event.slug} className="card">
                      <div className="card-image card-image-fixed">
                        <div className="relative h-full w-full">
                          <Image
                            src={imgSrc}
                            alt={event.title}
                            fill
                            sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="card-content">
                        <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                          {when ? formatDateIso(when) : event.recurrence ? "Recurring" : "Event"}
                        </div>
                        <h4 className="mt-2 text-lg font-semibold tracking-tight text-churchBlue">
                          <Link href={`/events/${event.slug}`} className="focus-ring rounded-lg">
                            {event.title}
                          </Link>
                        </h4>
                        <p className="mt-2 text-sm text-churchBlue/70 line-clamp-3">{event.description}</p>
                      </div>
                    </article>
                  )
                })}
              </div>
            </section>
          ) : null}

          {(tab === "all" || tab === "blog") && visibleBlog.length > 0 ? (
            <section>
              <div className="flex items-end justify-between gap-4">
                <h3 className="text-xl font-semibold tracking-tight text-churchBlue sm:text-2xl">Blog</h3>
                {tab === "all" && totals.blog > visibleBlog.length ? (
                  <button type="button" className="btn btn-sm btn-secondary" onClick={() => setTab("blog")}>
                    View all
                  </button>
                ) : (
                  <Link href="/blog" className="btn btn-sm btn-secondary">
                    Open blog
                  </Link>
                )}
              </div>
              <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {visibleBlog.map(({ post }) => (
                  <article key={post.slug} className="card">
                    <div className="card-content p-6">
                      <div className="text-xs font-semibold tracking-wide text-churchBlue/60">{formatDateIso(post.dateIso)}</div>
                      <h4 className="mt-2 text-lg font-semibold tracking-tight text-churchBlue">
                        <Link href={`/blog/${post.slug}`} className="focus-ring rounded-lg">
                          {post.title}
                        </Link>
                      </h4>
                      <p className="mt-2 text-sm text-churchBlue/70 line-clamp-3">{post.excerpt}</p>
                      {post.tags?.length ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={`${post.slug}-${tag}`}
                              className="rounded-full border border-churchBlue/10 bg-white px-3 py-1 text-xs font-semibold text-churchBlue/80"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      )}

      <p className="mt-10 text-xs text-churchBlue/60">
        Tip: For advanced sermon filters like series, speaker, topic, and date, use the Sermons page filters.
      </p>
    </div>
  )
}
