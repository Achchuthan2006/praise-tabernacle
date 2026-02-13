import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { pageMetadata } from "@/lib/seo"
import { getDailyPromiseForDate, PROMISES_TIMEZONE, promiseVideos } from "@/lib/promises"

export const metadata: Metadata = pageMetadata({
  title: "Promises",
  description: "Promise of the Month and Promise of the Year — watch, read, and be encouraged.",
  path: "/promises",
})

export const revalidate = 60 * 60

function thumbFor(videoId?: string) {
  const id = (videoId ?? "").trim()
  if (!id) return "/event-teaching.svg"
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
}

export default function PromisesPage() {
  const daily = getDailyPromiseForDate(new Date(), PROMISES_TIMEZONE)
  const items = promiseVideos.slice()
  return (
    <>
      <PageHeader
        titleEn="Promises"
        titleTa="வாக்குத்தத்தங்கள்"
        descriptionEn="Promise of the Month and Promise of the Year — with a short verse and message."
        descriptionTa="மாதத்தின் வாக்குத்தத்தமும் ஆண்டின் வாக்குத்தத்தமும் — வசனம் மற்றும் செய்தியுடன்."
      />

      <section className="bg-white">
        <Container className="pb-16 sm:pb-20">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <article className="card mb-6 overflow-hidden">
                <div className="card-content p-6 sm:p-8">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                        <Lang en="Daily" ta="தினசரி" taClassName="font-tamil" />
                      </div>
                      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-churchBlue sm:text-3xl">
                        <Lang en="Today's Promise" ta="இன்றைய வாக்குத்தத்தம்" taClassName="font-tamil" />
                      </h2>
                      <p className="mt-2 text-sm text-churchBlue/75">
                        <Lang en={`Rotates daily • ${daily.isoDate}`} ta={`தினமும் மாறும் • ${daily.isoDate}`} taClassName="font-tamil" />
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <Link href="/promises/daily?play=1" className="btn btn-sm btn-primary">
                        <Lang en="Watch on site" ta="இங்கே பார்க்க" taClassName="font-tamil" />
                      </Link>
                      <a
                        href={daily.promise.graphicSrc ?? "/verse-1.webp"}
                        download
                        className="btn btn-sm btn-secondary"
                      >
                        <Lang en="Download graphic" ta="படத்தை பதிவிறக்கம்" taClassName="font-tamil" />
                      </a>
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl border border-churchBlue/10 bg-white p-4">
                    <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                      <Lang en="Promise verse" ta="à®µà®¾à®•à¯à®•à¯à®¤à¯à®¤à®¤à¯à®¤ à®µà®šà®©à®®à¯" taClassName="font-tamil" />
                    </div>
                    <div className="mt-2 text-sm font-semibold text-churchBlue">
                      <Lang en={daily.promise.verseRefEn} ta={daily.promise.verseRefTa} taClassName="font-tamil" />
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                      <Lang en={daily.promise.verseTextEn} ta={daily.promise.verseTextTa} taClassName="font-tamil" />
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-2">
              {items.map((p, idx) => {
                const href = `/promises/${p.kind}?play=1`
                const thumb = thumbFor(p.youtubeVideoId)
                const graphicSrc = (p.graphicSrc ?? "").trim()
                return (
                  <Reveal key={p.kind} delay={(idx % 4) as 0 | 1 | 2 | 3}>
                    <article className="card">
                      <div className="card-image">
                        <Link href={href} className="group block focus-ring" aria-label={`Play: ${p.titleEn}`}>
                          <div className="relative aspect-video w-full bg-churchBlueSoft">
                            <Image
                              src={thumb}
                              alt={p.titleEn}
                              width={1200}
                              height={675}
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="h-full w-full object-cover"
                              quality={85}
                            />
                            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 grid place-items-center">
                              <div className="grid h-14 w-14 place-items-center rounded-full bg-white/90 shadow-glow backdrop-blur">
                                <svg viewBox="0 0 24 24" className="ml-0.5 h-7 w-7 text-churchBlue" fill="currentColor">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>

                      <div className="card-content">
                        <div className="text-xs font-semibold tracking-wide text-churchBlue/60">{p.dateIso ?? ""}</div>
                        <h3 className="mt-2 text-lg font-semibold tracking-tight text-churchBlue">
                          <Lang en={p.titleEn} ta={p.titleTa} taClassName="font-tamil" />
                        </h3>
                        <p className="mt-2 text-sm text-churchBlue/75">
                          <Lang en={p.descriptionEn} ta={p.descriptionTa} taClassName="font-tamil" />
                        </p>

                        <div className="mt-4 rounded-2xl border border-churchBlue/10 bg-white p-4">
                          <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                            <Lang en="Promise verse" ta="வாக்குத்தத்த வசனம்" taClassName="font-tamil" />
                          </div>
                          <div className="mt-2 text-sm font-semibold text-churchBlue">
                            <Lang en={p.verseRefEn} ta={p.verseRefTa} taClassName="font-tamil" />
                          </div>
                        </div>

                        <div className="mt-6 grid gap-2 sm:grid-cols-2">
                          <Link href={href} className="btn btn-sm btn-primary w-full">
                            <Lang en="Watch on site" ta="இங்கே பார்க்க" taClassName="font-tamil" />
                          </Link>
                          {graphicSrc ? (
                            <a href={graphicSrc} download className="btn btn-sm btn-secondary w-full">
                              <Lang en="Download graphic" ta="படத்தை பதிவிறக்கம்" taClassName="font-tamil" />
                            </a>
                          ) : null}
                          {p.youtubeVideoId ? (
                            <a
                              href={`https://www.youtube.com/watch?v=${p.youtubeVideoId}`}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn-sm btn-secondary w-full"
                            >
                              <Lang en="Watch on YouTube" ta="YouTube-ல் பார்க்க" taClassName="font-tamil" />
                            </a>
                          ) : (
                            <span className="btn btn-sm btn-secondary w-full opacity-60 cursor-not-allowed" aria-disabled="true">
                              <Lang en="YouTube link coming soon" ta="YouTube இணைப்பு விரைவில்" taClassName="font-tamil" />
                            </span>
                          )}
                        </div>
                      </div>
                    </article>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
