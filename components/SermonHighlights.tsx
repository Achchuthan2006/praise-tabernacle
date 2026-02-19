"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

import Lang from "@/components/language/Lang"
import Tilt from "@/components/ui/Tilt"
import Container from "@/components/ui/Container"
import Reveal from "@/components/ui/Reveal"
import { sermonSeries, sermons } from "@/lib/sermons"
import { siteConfig } from "@/lib/site"

function formatDate(dateIso: string) {
  const date = new Date(dateIso)
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date)
}

type HighlightItem = {
  key: string
  title: string
  dateIso: string
  language: "en" | "ta" | "mixed"
  href: string
  thumbSrc: string
}

function delayForIndex(idx: number): 0 | 1 | 2 | 3 {
  if (idx === 1) return 1
  if (idx === 2) return 2
  if (idx === 3) return 3
  return 0
}

function buildTopicLinks(limit: number) {
  const counts = new Map<string, number>()
  for (const sermon of sermons) {
    for (const topic of sermon.topics ?? []) {
      counts.set(topic, (counts.get(topic) ?? 0) + 1)
    }
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([topic]) => topic)
}

export default function SermonHighlights() {
  const highlights = siteConfig.sermonHighlights
  const topics = buildTopicLinks(10)

  const items: HighlightItem[] =
    highlights.length === 0
      ? sermons
          .slice()
          .sort((a, b) => b.dateIso.localeCompare(a.dateIso))
          .slice(0, 8)
          .map((s) => ({
            key: s.slug,
            title: s.title,
            dateIso: s.dateIso,
            language: s.language,
            href: `/sermons/${s.slug}`,
            thumbSrc: s.youtubeVideoId
              ? `https://i.ytimg.com/vi/${s.youtubeVideoId}/hqdefault.jpg`
              : "/event-teaching.svg",
          }))
      : highlights.slice(0, 8).map((s) => ({
          key: s.youtubeVideoId,
          title: s.title,
          dateIso: s.date,
          language: s.language,
          href: "/sermons",
          thumbSrc: `https://i.ytimg.com/vi/${s.youtubeVideoId}/hqdefault.jpg`,
        }))

  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollToIndex = (index: number) => {
    const el = scrollerRef.current
    if (!el) return
    const cards = el.querySelectorAll<HTMLElement>("[data-sermon-slide]")
    const target = cards[index]
    if (!target) return
    el.scrollTo({ left: target.offsetLeft, behavior: "smooth" })
  }

  const scrollByCard = (dir: -1 | 1) => {
    const next = Math.max(0, Math.min(items.length - 1, activeIndex + dir))
    scrollToIndex(next)
  }

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    const updateActive = () => {
      const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-sermon-slide]"))
      if (!cards.length) {
        setActiveIndex(0)
        return
      }
      const viewportCenter = el.scrollLeft + el.clientWidth / 2
      let next = 0
      let minDist = Number.POSITIVE_INFINITY
      cards.forEach((card, idx) => {
        const center = card.offsetLeft + card.offsetWidth / 2
        const dist = Math.abs(center - viewportCenter)
        if (dist < minDist) {
          minDist = dist
          next = idx
        }
      })
      setActiveIndex(next)
    }

    updateActive()
    el.addEventListener("scroll", updateActive, { passive: true })
    return () => el.removeEventListener("scroll", updateActive)
  }, [items.length])

  return (
    <section className="border-t border-churchBlue/10 bg-white">
      <Container className="section-padding">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="section-kicker">
                  <Lang en="Highlights" ta="சுருக்கங்கள்" taClassName="font-tamil" />
                </div>
                <h2 className="section-heading">
                  <Lang
                    en="Sermon Highlights"
                    ta="சில முக்கிய பிரசங்கங்கள்"
                    taClassName="font-tamil"
                  />
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-churchBlue/70 sm:text-base">
                  <Lang
                    en="A few recent messages to start with. For the full list, visit our sermons page."
                    ta="தொடங்க சில சமீபத்திய செய்திகள். முழுப் பட்டியலுக்காக பிரசங்கங்கள் பக்கத்தைப் பார்க்கவும்."
                    taClassName="font-tamil"
                  />
                </p>
              </div>
              <Link
                href="/sermons"
                className="focus-ring inline-flex items-center justify-center rounded-xl border border-churchBlue/15 bg-white px-5 py-3 text-sm font-semibold text-churchBlue transition-colors hover:bg-churchBlueSoft"
              >
                <Lang en="View all sermons" ta="அனைத்தையும் பார்க்க" taClassName="font-tamil" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 md:hidden">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs font-semibold tracking-wide text-churchBlue/65">
                {items.length > 0 ? `${activeIndex + 1}/${items.length}` : "0/0"}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="btn btn-sm btn-secondary"
                  onClick={() => scrollByCard(-1)}
                  aria-label="Previous sermon"
                >
                  ←
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-secondary"
                  onClick={() => scrollByCard(1)}
                  aria-label="Next sermon"
                >
                  →
                </button>
              </div>
            </div>

            <div
              ref={scrollerRef}
              className="mt-4 flex gap-4 overflow-x-auto pb-2 pr-1 scroll-smooth snap-x snap-mandatory"
              aria-label="Sermon highlights carousel"
            >
              {items.map((item, idx) => {
                const languageLabel =
                  item.language === "ta"
                    ? "Tamil (TA)"
                    : item.language === "en"
                      ? "English (EN)"
                      : "TA + EN"

                return (
                  <div key={`${item.key}-mobile`} data-sermon-slide className="w-[86vw] max-w-[26rem] shrink-0 snap-start">
                    <Tilt>
                      <article className="card overflow-hidden">
                        <Link
                          href={item.href.startsWith("/sermons/") ? `${item.href}?play=1` : item.href}
                          className="group relative block focus-ring"
                          aria-label={`Play sermon: ${item.title}`}
                        >
                          <div className="aspect-video w-full overflow-hidden bg-churchBlueSoft">
                            <Image
                              src={item.thumbSrc}
                              alt={item.title}
                              width={800}
                              height={450}
                              sizes="86vw"
                              className="h-full w-full object-cover"
                              quality={85}
                            />
                          </div>
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 z-20 grid place-items-center opacity-100 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                          >
                            <div className="grid h-14 w-14 place-items-center rounded-full bg-white/90 shadow-glow backdrop-blur">
                              <svg viewBox="0 0 24 24" className="ml-0.5 h-7 w-7 text-churchBlue" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        </Link>
                        <div className="card-content p-5">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full border border-churchBlue/10 bg-churchBlueSoft px-3 py-1 text-xs font-semibold text-churchBlue/80">
                              {languageLabel}
                            </span>
                            <span className="text-xs font-semibold tracking-wide text-churchBlue/60">
                              {formatDate(item.dateIso)}
                            </span>
                          </div>
                          <h3 className="mt-3 text-base font-semibold tracking-tight text-churchBlue">
                            {item.title}
                          </h3>
                          <div className="mt-5">
                            <Link
                              href={item.href.startsWith("/sermons/") ? `${item.href}?play=1` : item.href}
                              className="btn btn-sm btn-primary w-full"
                            >
                              <Lang en="Watch" ta="à®ªà®¾à®°à¯à®™à¯à®•à®³à¯" taClassName="font-tamil" />
                            </Link>
                          </div>
                        </div>
                      </article>
                    </Tilt>
                  </div>
                )
              })}
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              {items.map((item, idx) => (
                <button
                  key={`${item.key}-dot`}
                  type="button"
                  aria-label={`Go to sermon ${idx + 1}`}
                  onClick={() => scrollToIndex(idx)}
                  className={[
                    "h-2.5 w-2.5 rounded-full border border-churchBlue/20 transition",
                    idx === activeIndex ? "bg-churchBlue" : "bg-white hover:bg-churchBlueSoft",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>

          <div className="mt-10 hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-4">
            {items.map((item, idx) => {
              const languageLabel =
                item.language === "ta"
                  ? "Tamil (TA)"
                  : item.language === "en"
                    ? "English (EN)"
                    : "TA + EN"

              return (
                <Reveal key={`${item.key}-desktop`} delay={delayForIndex(idx)}>
                  <Tilt>
                    <article className="card overflow-hidden">
                    <Link
                      href={item.href.startsWith("/sermons/") ? `${item.href}?play=1` : item.href}
                      className="group relative block focus-ring"
                      aria-label={`Play sermon: ${item.title}`}
                    >
                      <div className="aspect-video w-full overflow-hidden bg-churchBlueSoft">
                        <Image
                          src={item.thumbSrc}
                          alt={item.title}
                          width={800}
                          height={450}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          className="h-full w-full object-cover"
                          quality={85}
                        />
                      </div>
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 z-20 grid place-items-center opacity-100 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                      >
                        <div className="grid h-14 w-14 place-items-center rounded-full bg-white/90 shadow-glow backdrop-blur">
                          <svg viewBox="0 0 24 24" className="ml-0.5 h-7 w-7 text-churchBlue" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                    <div className="card-content p-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-churchBlue/10 bg-churchBlueSoft px-3 py-1 text-xs font-semibold text-churchBlue/80">
                          {languageLabel}
                        </span>
                        <span className="text-xs font-semibold tracking-wide text-churchBlue/60">
                          {formatDate(item.dateIso)}
                        </span>
                      </div>
                      <h3 className="mt-3 text-base font-semibold tracking-tight text-churchBlue">
                        {item.title}
                      </h3>
                      <div className="mt-5">
                        <Link
                          href={item.href.startsWith("/sermons/") ? `${item.href}?play=1` : item.href}
                          className="btn btn-sm btn-primary w-full"
                        >
                          <Lang en="Watch" ta="பாருங்கள்" taClassName="font-tamil" />
                        </Link>
                      </div>
                    </div>
                    </article>
                  </Tilt>
                </Reveal>
              )
            })}
          </div>

          <div className="mt-14 rounded-3xl border border-churchBlue/10 bg-churchBlueSoft/40 p-6 shadow-glow md:p-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-xl">
                <div className="section-kicker">
                  <Lang en="Explore" ta="ஆராயுங்கள்" taClassName="font-tamil" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-churchBlue sm:text-2xl">
                  <Lang en="Series playlists & topics" ta="தொடர்கள் & தலைப்புகள்" taClassName="font-tamil" />
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-churchBlue/70 sm:text-base">
                  <Lang
                    en="Browse sermons by series, or jump to a topic you care about."
                    ta="தொடர் அடிப்படையில் பிரசங்கங்களைப் பாருங்கள், அல்லது உங்களுக்கு பிடித்த தலைப்பைத் தேர்வு செய்யுங்கள்."
                    taClassName="font-tamil"
                  />
                </p>

                {topics.length ? (
                  <div className="mt-5 flex flex-wrap items-center justify-start gap-2">
                    {topics.map((topic) => (
                      <Link
                        key={topic}
                        href={`/sermons?topic=${encodeURIComponent(topic)}`}
                        className="focus-ring rounded-full border border-churchBlue/10 bg-white px-4 py-2 text-xs font-semibold text-churchBlue/80 transition-colors hover:bg-churchBlueSoft"
                      >
                        {topic}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="grid w-full gap-4 md:grid-cols-2 lg:w-[520px]">
                {sermonSeries.slice(0, 4).map((series) => (
                  <Link
                    key={series.id}
                    href={`/sermons?series=${encodeURIComponent(series.id)}`}
                    className="card group min-h-[60px] overflow-hidden focus-ring"
                    aria-label={`Open series: ${series.title}`}
                  >
                    <div className="relative aspect-video w-full bg-white">
                      {series.coverImageSrc ? (
                        <Image
                          src={series.coverImageSrc}
                          alt={series.title}
                          width={900}
                          height={506}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-r from-churchBlueSoft to-white" />
                      )}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-churchBlue/70 via-churchBlue/0 to-transparent opacity-90"
                      />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="text-sm font-semibold text-white">{series.title}</div>
                        {series.summary ? (
                          <div className="mt-1 line-clamp-2 text-xs text-white/85">{series.summary}</div>
                        ) : null}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
