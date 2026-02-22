"use client"

import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { useMemo, useState } from "react"

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
}

type Props = {
  initialQuery: string
  sermons: Sermon[]
  series: SermonSeries[]
  events: Event[]
  blogPosts: BlogSearchItem[]
}

type Tab = "all" | "sermons" | "events" | "blog"

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

export default function SiteSearch({ initialQuery, sermons, series, events, blogPosts }: Props) {
  const [tab, setTab] = useState<Tab>("all")
  const [query, setQuery] = useState(() => normalizeQuery(initialQuery))

  const seriesById = useMemo(() => new Map(series.map((s) => [s.id, s])), [series])
  const terms = useMemo(() => queryTerms(query), [query])

  const sermonResults = useMemo(() => {
    const q = normalizeQuery(query)
    if (!q) return []

    return sermons
      .map((s) => {
        const seriesTitle = s.seriesId ? seriesById.get(s.seriesId)?.title ?? "" : ""
        const blob = [
          s.title,
          s.speaker ?? "",
          s.dateIso,
          seriesTitle,
          ...(s.topics ?? []),
          ...(s.scriptures ?? []),
        ].join(" ")

        const score =
          scoreText(s.title, terms) * 6 +
          scoreText(seriesTitle, terms) * 3 +
          scoreText(s.speaker ?? "", terms) * 2 +
          scoreText(blob, terms)

        return { sermon: s, seriesTitle, score }
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => (b.score !== a.score ? b.score - a.score : b.sermon.dateIso.localeCompare(a.sermon.dateIso)))
  }, [query, sermons, seriesById, terms])

  const eventResults = useMemo(() => {
    const q = normalizeQuery(query)
    if (!q) return []

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

        const score = scoreText(e.title, terms) * 6 + scoreText(blob, terms)
        const time = eventSortKey(e)
        const isPast = isPastEvent(e, now)
        return { event: e, score, time, isPast }
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score
        if (a.isPast !== b.isPast) return a.isPast ? 1 : -1
        return b.time - a.time
      })
  }, [events, query, terms])

  const blogResults = useMemo(() => {
    const q = normalizeQuery(query)
    if (!q) return []

    return blogPosts
      .map((p) => {
        const blob = [p.title, p.excerpt, p.category, ...(p.tags ?? [])].join(" ")
        const score = scoreText(p.title, terms) * 6 + scoreText(blob, terms)
        return { post: p, score }
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => (b.score !== a.score ? b.score - a.score : b.post.dateIso.localeCompare(a.post.dateIso)))
  }, [blogPosts, query, terms])

  const totals = {
    sermons: sermonResults.length,
    events: eventResults.length,
    blog: blogResults.length,
  }

  const empty = !normalizeQuery(query)

  const visibleSermons = tab === "all" ? sermonResults.slice(0, 6) : sermonResults
  const visibleEvents = tab === "all" ? eventResults.slice(0, 6) : eventResults
  const visibleBlog = tab === "all" ? blogResults.slice(0, 6) : blogResults

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="section-kicker">Search</div>
          <h2 className="section-heading">Site search</h2>
          <p className="mt-1 text-sm text-churchBlue/70">Sermons, events, and blog posts.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <TabButton active={tab === "all"} onClick={() => setTab("all")}>
            All ({totals.sermons + totals.events + totals.blog})
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

      <div className="mt-8 grid gap-3 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <label className="block">
            <div className="float-field">
              <input
                className="float-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sermons, events, blog posts..."
              />
              <span className="float-label">Search</span>
            </div>
          </label>
        </div>
        <div className="lg:col-span-4">
          <div className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft px-4 py-3">
            <div className="text-xs font-semibold tracking-wide text-churchBlue/60">Results</div>
            <div className="mt-1 text-sm font-semibold text-churchBlue">
              {totals.sermons + totals.events + totals.blog}
            </div>
          </div>
        </div>
      </div>

      {empty ? (
        <div className="mt-8 card">
          <div className="card-content p-8">
            <div className="text-sm font-semibold text-churchBlue">Start typing to search</div>
            <p className="mt-2 text-sm text-churchBlue/70">
              Try a series name, a speaker, "prayer", "youth", or a Bible reference like "Psalm 46".
            </p>
          </div>
        </div>
      ) : totals.sermons + totals.events + totals.blog === 0 ? (
        <div className="mt-8 card">
          <div className="card-content p-8">
            <div className="text-sm font-semibold text-churchBlue">No results</div>
            <p className="mt-2 text-sm text-churchBlue/70">Try a different keyword.</p>
          </div>
        </div>
      ) : (
        <div className="mt-10 grid gap-10">
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
                        {seriesTitle ? ` • ${seriesTitle}` : ""}
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
        Tip: For advanced sermon filters (series/speaker/topic/date), use the filters on the Sermons page.
      </p>
    </div>
  )
}
