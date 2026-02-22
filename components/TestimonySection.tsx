"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import Reveal from "@/components/ui/Reveal"
import type { Testimonial, TestimonyCategory } from "@/lib/testimonials"
import { listTestimonialsNewestFirst } from "@/lib/testimonials"
import { siteConfig } from "@/lib/site"

type CategoryOption = { id: "all" | TestimonyCategory; labelEn: string; labelTa: string }

const categories: CategoryOption[] = [
  { id: "all", labelEn: "All", labelTa: "à®…à®©à¯ˆà®¤à¯à®¤à¯" },
  { id: "healing", labelEn: "Healing", labelTa: "à®šà¯à®•à®®à®Ÿà¯ˆà®¤à®²à¯" },
  { id: "financial", labelEn: "Financial", labelTa: "à®¨à®¿à®¤à®¿" },
  { id: "family", labelEn: "Family", labelTa: "à®•à¯à®Ÿà¯à®®à¯à®ªà®®à¯" },
  { id: "deliverance", labelEn: "Deliverance", labelTa: "à®µà®¿à®Ÿà¯à®¤à®²à¯ˆ" },
  { id: "salvation", labelEn: "Salvation", labelTa: "à®°à®Ÿà¯à®šà®¿à®ªà¯à®ªà¯" },
  { id: "guidance", labelEn: "Guidance", labelTa: "à®µà®´à®¿à®•à®¾à®Ÿà¯à®Ÿà¯à®¤à®²à¯" },
]

function categoryLabel(id: TestimonyCategory) {
  const opt = categories.find((c) => c.id === id)
  return opt ?? { id, labelEn: id, labelTa: id }
}

function thumbFor(videoId?: string) {
  const id = (videoId ?? "").trim()
  if (!id) return "/event-teaching.svg"
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
}

function initials(name: string) {
  const parts = name
    .trim()
    .split(/\s+/g)
    .filter(Boolean)
    .slice(0, 2)
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("")
}

function showLabel(t: Testimonial) {
  return t.name ?? t.attribution ?? ""
}

function getDetailHref(t: Testimonial) {
  return t.youtubeVideoId ? `/testimonies/${t.slug}?play=1` : `/testimonies/${t.slug}`
}

function formatTestimonyDate(dateIso?: string) {
  if (!dateIso) return ""
  const date = new Date(dateIso)
  if (Number.isNaN(date.getTime())) return dateIso
  return date.toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })
}

function Card({
  t,
  delay,
}: {
  t: Testimonial
  delay: 0 | 1 | 2 | 3
}) {
  const hasVideo = Boolean((t.youtubeVideoId ?? "").trim())
  const href = getDetailHref(t)
  const thumb = hasVideo ? thumbFor(t.youtubeVideoId) : (t.graphicSrc ?? "").trim() || "/event-teaching.svg"

  return (
    <Reveal delay={delay} className="h-full">
      <article className="card overflow-hidden h-full">
        <div className="card-image">
          <Link href={href} className="group relative block focus-ring" aria-label={t.titleEn}>
            <div className="relative aspect-video w-full overflow-hidden bg-churchBlueSoft">
              <Image
                src={thumb}
                alt={t.titleEn}
                fill
                sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 360px"
                className="object-cover"
                quality={85}
              />
              {hasVideo ? (
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
              ) : null}
            </div>
          </Link>
        </div>

        <div className="card-content p-6">
          <div className="flex flex-wrap items-center gap-2">
            {t.categories.slice(0, 3).map((c) => {
              const label = categoryLabel(c)
              return (
                <span
                  key={`${t.slug}-${c}`}
                  className="rounded-full border border-churchBlue/10 bg-churchBlueSoft px-3 py-1 text-xs font-semibold text-churchBlue/80"
                >
                  <Lang en={label.labelEn} ta={label.labelTa} taClassName="font-tamil" />
                </span>
              )
            })}
            {t.dateIso ? (
              <span className="text-xs font-semibold tracking-wide text-churchBlue/55">
                {formatTestimonyDate(t.dateIso)}
              </span>
            ) : null}
          </div>

          <h3 className="mt-3 text-lg font-semibold tracking-tight text-churchBlue">
            <Lang en={t.titleEn} ta={t.titleTa} taClassName="font-tamil" />
          </h3>

          {t.quote ? (
            <p className="mt-3 text-sm leading-relaxed text-churchBlue/75 line-clamp-3">
              &ldquo;{t.quote}&rdquo;
            </p>
          ) : null}

          {t.beforeEn || t.afterEn ? (
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <div className="rounded-2xl border border-churchBlue/10 bg-white p-3">
                <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                  <Lang en="Before" ta="à®®à¯à®©à¯à®ªà¯" taClassName="font-tamil" />
                </div>
                <div className="mt-1 text-sm text-churchBlue/75 line-clamp-2">
                  <Lang en={t.beforeEn ?? ""} ta={t.beforeTa ?? t.beforeEn ?? ""} taClassName="font-tamil" />
                </div>
              </div>
              <div className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-3">
                <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                  <Lang en="After" ta="à®ªà®¿à®±à®•à¯" taClassName="font-tamil" />
                </div>
                <div className="mt-1 text-sm text-churchBlue/75 line-clamp-2">
                  <Lang en={t.afterEn ?? ""} ta={t.afterTa ?? t.afterEn ?? ""} taClassName="font-tamil" />
                </div>
              </div>
            </div>
          ) : null}

          {showLabel(t) ? (
            <div className="mt-5 flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full border border-churchBlue/10 bg-churchBlueSoft">
                {t.photoSrc ? (
                  <Image
                    src={t.photoSrc}
                    alt={showLabel(t) || "Testimonial"}
                    width={80}
                    height={80}
                    sizes="40px"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-xs font-semibold text-churchBlue/70" aria-hidden="true">
                    {t.name ? initials(t.name) : "âœ“"}
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-churchBlue/80">
                  {showLabel(t)}
                  {t.detail ? <span className="text-churchBlue/55">{" \u2022 "}{t.detail}</span> : null}
                </div>
              </div>
            </div>
          ) : null}

          <div className="mt-6">
            <Link href={href} className="btn btn-sm btn-primary w-full">
              <Lang en={hasVideo ? "Watch video" : "Read story"} ta={hasVideo ? "à®µà¯€à®Ÿà®¿à®¯à¯‹ à®ªà®¾à®°à¯à®•à¯à®•" : "à®šà®¾à®Ÿà¯à®šà®¿"} taClassName="font-tamil" />
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  )
}

export default function TestimonySection() {
  const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Testimony")}`
  const all = useMemo(() => listTestimonialsNewestFirst(), [])
  const [selected, setSelected] = useState<CategoryOption["id"]>("all")
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollerRef = useRef<HTMLDivElement | null>(null)

  const filtered = useMemo(() => {
    if (selected === "all") return all
    return all.filter((t) => t.categories.includes(selected))
  }, [all, selected])

  useEffect(() => {
    scrollerRef.current?.scrollTo({ left: 0, behavior: "smooth" })
  }, [selected])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    const updateActive = () => {
      const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-testimony-slide]"))
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
  }, [filtered.length])

  const scrollToIndex = (index: number) => {
    const el = scrollerRef.current
    if (!el) return
    const cards = el.querySelectorAll<HTMLElement>("[data-testimony-slide]")
    const target = cards[index]
    if (!target) return
    el.scrollTo({ left: target.offsetLeft, behavior: "smooth" })
  }

  const scrollByCards = (dir: -1 | 1) => {
    const el = scrollerRef.current
    if (!el) return
    const amount = Math.max(280, Math.min(520, el.clientWidth * 0.85))
    el.scrollBy({ left: dir * amount, behavior: "smooth" })
  }

  return (
    <section className="bg-churchBlueSoft">
      <Container className="section-padding">
        <div className="rounded-3xl border border-churchBlue/10 bg-white p-8 shadow-glow md:p-12 fade-up">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="section-kicker">
                <Lang en="Community" ta="à®šà®®à¯‚à®•à®®à¯" taClassName="font-tamil" />
              </div>
              <div className="mt-3">
                <h2 className="section-heading">
                  <Lang en="Testimonies" ta="à®šà®¾à®Ÿà¯à®šà®¿à®•à®³à¯" taClassName="font-tamil" />
                </h2>
              </div>
              <p className="mt-3 max-w-2xl text-sm text-churchBlue/70 sm:text-base">
                <Lang
                  en="Watch and read real stories of Godâ€™s work â€” and filter by category."
                  ta="à®¤à¯‡à®µà®©à¯ à®šà¯†à®¯à¯à®¤ à®•à®¾à®°à®¿à®¯à®™à¯à®•à®³à¯ˆà®ªà¯ à®ªà®¾à®°à¯à®™à¯à®•à®³à¯/à®ªà®Ÿà®¿à®•à¯à®•à®µà¯à®®à¯ â€” à®¤à®²à¯ˆà®ªà¯à®ªà¯ à®…à®Ÿà®¿à®ªà¯à®ªà®Ÿà¯ˆà®¯à®¿à®²à¯ à®¤à¯‡à®°à¯à®µà¯ à®šà¯†à®¯à¯à®¯à¯à®™à¯à®•à®³à¯."
                  taClassName="font-tamil"
                />
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:items-end">
              <div className="flex flex-wrap gap-2">
                <button type="button" className="btn btn-sm btn-secondary" onClick={() => scrollByCards(-1)} aria-label="Scroll left">
                  â†
                </button>
                <button type="button" className="btn btn-sm btn-secondary" onClick={() => scrollByCards(1)} aria-label="Scroll right">
                  â†’
                </button>
                <Link href="/testimonies" className="btn btn-sm btn-secondary">
                  <Lang en="View all" ta="à®…à®©à¯ˆà®¤à¯à®¤à¯à®®à¯" taClassName="font-tamil" />
                </Link>
                <a href={mailto} className="btn btn-sm btn-secondary">
                  <Lang en="Share a story" ta="à®šà®¾à®Ÿà¯à®šà®¿ à®ªà®•à®¿à®°" taClassName="font-tamil" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-start gap-2">
            {categories.map((c) => {
              const active = selected === c.id
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelected(c.id)}
                  className={[
                    "focus-ring rounded-full border px-4 py-2 text-xs font-semibold transition",
                    active
                      ? "border-churchBlue/15 bg-churchBlueSoft text-churchBlue"
                      : "border-churchBlue/10 bg-white text-churchBlue/75 hover:bg-churchBlueSoft",
                  ].join(" ")}
                >
                  <Lang en={c.labelEn} ta={c.labelTa} taClassName="font-tamil" />
                </button>
              )
            })}
          </div>

          <div className="mt-6">
            <div className="section-divider" aria-hidden="true" />
          </div>

          <div className="mt-8">
            <div
              ref={scrollerRef}
              className="no-scrollbar flex gap-4 overflow-x-auto pb-2 pr-1 scroll-smooth snap-x snap-mandatory"
              aria-label="Testimonies carousel"
            >
              {filtered.map((t, idx) => (
                <div
                  key={t.slug}
                  data-testimony-slide
                  className="w-[85vw] shrink-0 snap-start sm:w-[340px] md:w-[380px]"
                >
                  <Card t={t} delay={(idx % 4) as 0 | 1 | 2 | 3} />
                </div>
              ))}
            </div>
            {filtered.length > 0 ? (
              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="text-xs font-semibold tracking-wide text-churchBlue/65">
                  {`${activeIndex + 1}/${filtered.length}`}
                </div>
                <div className="flex items-center gap-2">
                  {filtered.map((t, idx) => (
                    <button
                      key={`${t.slug}-dot`}
                      type="button"
                      aria-label={`Go to testimony ${idx + 1}`}
                      onClick={() => scrollToIndex(idx)}
                      className={[
                        "h-2.5 w-2.5 rounded-full border border-churchBlue/20 transition",
                        idx === activeIndex ? "bg-churchBlue" : "bg-white hover:bg-churchBlueSoft",
                      ].join(" ")}
                    />
                  ))}
                </div>
              </div>
            ) : null}
            {filtered.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-5 text-sm text-churchBlue/75">
                <Lang
                  en="No testimonies in this category yet. Check back soon."
                  ta="à®‡à®¨à¯à®¤ à®¤à®²à¯ˆà®ªà¯à®ªà®¿à®²à¯ à®‡à®©à¯à®©à¯à®®à¯ à®šà®¾à®Ÿà¯à®šà®¿à®•à®³à¯ à®‡à®²à¯à®²à¯ˆ. à®µà®¿à®°à¯ˆà®µà®¿à®²à¯ à®ªà¯à®¤à¯à®ªà¯à®ªà®¿à®•à¯à®•à®ªà¯à®ªà®Ÿà¯à®®à¯."
                  taClassName="font-tamil"
                />
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  )
}
