"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import type { PromiseKind } from "@/lib/promises"
import { getPromiseVideo, promiseVideos } from "@/lib/promises"

type ExternalLink = {
  kind: "external"
  title: string
  href: string
}

const externalLinks: ExternalLink[] = [
  { kind: "external", title: "Jesus Calls", href: "https://www.jesuscalls.org/" },
  { kind: "external", title: "ACA Church", href: "https://acachurch.org/" },
]

function thumbFor(videoId?: string) {
  const id = (videoId ?? "").trim()
  if (!id) return "/event-teaching.svg"
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
}

export default function PromiseSpotlight() {
  const slides = useMemo(() => promiseVideos.filter((p) => p.kind === "month" || p.kind === "year"), [])
  const [active, setActive] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const id = window.setInterval(() => {
      setActive((v) => (slides.length ? (v + 1) % slides.length : 0))
    }, 6500)
    return () => window.clearInterval(id)
  }, [slides.length])

  const current = slides[active] ?? getPromiseVideo("month")
  const currentKind = (current?.kind ?? "month") as PromiseKind
  const href = `/promises/${currentKind}?play=1`
  const thumbSrc = thumbFor(current?.youtubeVideoId)

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="blob-background blob-right" aria-hidden="true" />
      <Container className="section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="section-kicker">
                <Lang en="Promises" ta="வாக்குத்தத்தங்கள்" />
              </div>
              <h2 className="section-heading gradient-text">
                <Lang en="Promise Spotlight" ta="வாக்குத்தத்த சிறப்பு" />
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-churchBlue/70">
                <Lang
                  en="Promise of the Month and Promise of the Year — plus trusted links you can explore."
                  ta="மாதத்தின் வாக்குத்தத்தமும் ஆண்டின் வாக்குத்தத்தமும் — மேலும் உங்களுக்கு உதவும் இணைப்புகள்."
                  taClassName="font-tamil"
                />
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link href="/promises" className="btn btn-sm btn-secondary">
                <Lang en="View promises" ta="வாக்குத்தத்தங்கள்" taClassName="font-tamil" />
              </Link>
              {externalLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-secondary"
                >
                  {l.title}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <article className="card card-accent-left" data-accent="teaching">
                <div className="card-image video-thumbnail">
                  <Link href={href} className="group block focus-ring" aria-label={`Play: ${current?.titleEn ?? "Promise"}`}>
                    <div className="relative aspect-video w-full bg-churchBlueSoft">
                      <Image
                        src={thumbSrc}
                        alt={current?.titleEn ?? "Promise video"}
                        width={1200}
                        height={675}
                        sizes="(max-width: 1024px) 100vw, 900px"
                        className="h-full w-full object-cover"
                        quality={85}
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 z-20 grid place-items-center"
                      >
                        <div className="play-button grid h-16 w-16 place-items-center rounded-full bg-white/90 shadow-glow backdrop-blur">
                          <svg viewBox="0 0 24 24" className="ml-0.5 h-8 w-8 text-churchBlue" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full border border-white/25 bg-black/25 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                        <span>{currentKind === "month" ? "MONTH" : "YEAR"}</span>
                        {mounted && slides.length > 1 ? (
                          <span className="text-white/80" aria-hidden="true">
                            • {active + 1}/{slides.length}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="card-content">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                        <Lang
                          en={current?.dateIso ? current.dateIso : "Updated regularly"}
                          ta={current?.dateIso ? current.dateIso : "தொடர்ந்து புதுப்பிக்கப்படும்"}
                          taClassName="font-tamil"
                        />
                      </div>
                      <h3 className="mt-2 text-xl font-semibold tracking-tight text-churchBlue">
                        <Lang en={current?.titleEn ?? "Promise"} ta={current?.titleTa ?? "வாக்குத்தத்தம்"} taClassName="font-tamil" />
                      </h3>
                      <p className="mt-2 text-sm text-churchBlue/75 sm:text-base">
                        <Lang
                          en={current?.descriptionEn ?? ""}
                          ta={current?.descriptionTa ?? ""}
                          taClassName="font-tamil"
                        />
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 sm:items-end">
                      <Link href={href} className="btn btn-sm btn-primary">
                        <Lang en="Watch on site" ta="இங்கே பார்க்க" taClassName="font-tamil" />
                      </Link>
                      {current?.youtubeVideoId ? (
                        <a
                          href={`https://www.youtube.com/watch?v=${current.youtubeVideoId}`}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-sm btn-secondary"
                        >
                          <Lang en="Watch on YouTube" ta="YouTube-ல் பார்க்க" taClassName="font-tamil" />
                        </a>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl border border-churchBlue/10 bg-white p-4">
                    <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                      <Lang en="Promise verse" ta="வாக்குத்தத்த வசனம்" taClassName="font-tamil" />
                    </div>
                    <div className="mt-2 text-sm font-semibold text-churchBlue">
                      <Lang
                        en={current?.verseRefEn ?? ""}
                        ta={current?.verseRefTa ?? ""}
                        taClassName="font-tamil"
                      />
                    </div>
                    <div className="mt-2 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                      <Lang
                        en={current?.verseTextEn ?? ""}
                        ta={current?.verseTextTa ?? ""}
                        taClassName="font-tamil"
                      />
                    </div>
                  </div>

                  {slides.length > 1 ? (
                    <div className="mt-6 flex items-center gap-2">
                      {slides.map((s, idx) => (
                        <button
                          key={s.kind}
                          type="button"
                          className={[
                            "h-2.5 w-2.5 rounded-full border border-churchBlue/15 transition",
                            idx === active ? "bg-churchBlue" : "bg-white hover:bg-churchBlueSoft",
                          ].join(" ")}
                          aria-label={`Show ${s.kind}`}
                          onClick={() => setActive(idx)}
                        />
                      ))}
                      <span className="ml-2 text-xs text-churchBlue/60">
                        {mounted ? (
                          <Lang en="Auto-rotates" ta="தானாக மாறும்" taClassName="font-tamil" />
                        ) : null}
                      </span>
                    </div>
                  ) : null}
                </div>
              </article>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-6 shadow-glow">
                <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                  <Lang en="Quick links" ta="விரைவு இணைப்புகள்" taClassName="font-tamil" />
                </div>
                <div className="mt-4 space-y-3">
                  {slides.map((s) => (
                    <Link
                      key={s.kind}
                      href={`/promises/${s.kind}`}
                      className="focus-ring block rounded-2xl border border-churchBlue/10 bg-white p-4 transition hover:bg-churchBlueSoft"
                    >
                      <div className="text-sm font-semibold text-churchBlue">
                        <Lang en={s.titleEn} ta={s.titleTa} taClassName="font-tamil" />
                      </div>
                      <div className="mt-1 text-xs text-churchBlue/70">
                        <Lang en={s.verseRefEn} ta={s.verseRefTa} taClassName="font-tamil" />
                      </div>
                    </Link>
                  ))}
                  {externalLinks.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="focus-ring block rounded-2xl border border-churchBlue/10 bg-white p-4 transition hover:bg-churchBlueSoft"
                    >
                      <div className="text-sm font-semibold text-churchBlue">{l.title}</div>
                      <div className="mt-1 text-xs text-churchBlue/70">{l.href}</div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
