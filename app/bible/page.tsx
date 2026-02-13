import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { bibleStudies } from "@/lib/bibleStudies"
import { pageMetadata } from "@/lib/seo"
import { TAMIL_BIBLE_INDEX_HREF } from "@/lib/tamilBible"

const NKJV_GATEWAY_HREF =
  "https://www.biblegateway.com/versions/New-King-James-Version-NKJV-Bible/"

export const metadata: Metadata = pageMetadata({
  title: "Bible (NKJV)",
  description: "Read the Bible in the New King James Version (NKJV) online via BibleGateway.",
  path: "/bible",
})

export default function BiblePage() {
  return (
    <>
      <PageHeader
        titleEn="Read the Bible"
        titleTa="வேதாகமம்"
        descriptionEn="NKJV (BibleGateway) + Bible studies"
        descriptionTa="NKJV (BibleGateway) + Bible studies"
      />

      <section className="bg-white">
        <Container className="pb-10 sm:pb-14">
          <div className="mx-auto max-w-6xl rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-6 text-sm text-churchBlue/75 shadow-glow sm:p-8">
            <Lang
              en={
                <>
                  Read NKJV online via{" "}
                  <a href={NKJV_GATEWAY_HREF} target="_blank" rel="noreferrer" className="underline underline-offset-2">
                    BibleGateway (NKJV)
                  </a>
                  . Tamil is shown via an embedded external page (and can always be opened in a new tab) from{" "}
                  <a href={TAMIL_BIBLE_INDEX_HREF} target="_blank" rel="noreferrer" className="underline underline-offset-2">
                    TamilChristianSongs.in
                  </a>
                  .
                </>
              }
              ta={
                <>
                  NKJV-ஐ ஆன்லைனில்{" "}
                  <a href={NKJV_GATEWAY_HREF} target="_blank" rel="noreferrer" className="underline underline-offset-2">
                    BibleGateway
                  </a>{" "}
                  மூலமாக படிக்கலாம். தமிழ் வசனங்களுக்கு{" "}
                  <a
                    href={TAMIL_BIBLE_INDEX_HREF}
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-2"
                  >
                    TamilChristianSongs.in
                  </a>{" "}
                  பயன்படுத்தவும்.
                </>
              }
              taClassName="font-tamil"
            />

            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <a href={NKJV_GATEWAY_HREF} target="_blank" rel="noreferrer" className="btn btn-sm btn-secondary">
                NKJV (BibleGateway)
              </a>
              <a href={TAMIL_BIBLE_INDEX_HREF} target="_blank" rel="noreferrer" className="btn btn-sm btn-secondary">
                Tamil Bible (External)
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="pb-16 sm:pb-20">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="section-kicker">Watch</div>
                <h2 className="section-heading">Bible Studies</h2>
                <p className="mt-1 text-sm text-churchBlue/70">Watch Bible study teachings right here on our website.</p>
              </div>
              <Link href="/bible-studies" className="btn btn-sm btn-secondary">
                View Bible studies page
              </Link>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {bibleStudies.map((study, idx) => {
                const thumb = `https://i.ytimg.com/vi/${study.youtubeVideoId}/hqdefault.jpg`
                return (
                  <Reveal key={study.slug} delay={(idx % 4) as 0 | 1 | 2 | 3}>
                    <article className="card">
                      <div className="card-image">
                        <Link
                          href={`/bible-studies/${study.slug}?play=1`}
                          className="group block focus-ring"
                          aria-label={`Open Bible study: ${study.title}`}
                        >
                          <div className="relative aspect-video w-full bg-churchBlueSoft">
                            <Image
                              src={thumb}
                              alt={study.title}
                              width={1200}
                              height={675}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="h-full w-full object-cover"
                              quality={85}
                            />
                            <div
                              aria-hidden="true"
                              className="pointer-events-none absolute inset-0 z-10 grid place-items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                            >
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
                        {study.dateIso ? (
                          <div className="text-xs font-semibold tracking-wide text-churchBlue/60">{study.dateIso}</div>
                        ) : null}
                        <h3 className="mt-2 text-lg font-semibold tracking-tight text-churchBlue">
                          <Link href={`/bible-studies/${study.slug}?play=1`} className="focus-ring rounded-lg">
                            {study.title}
                          </Link>
                        </h3>

                        <div className="mt-6 grid gap-2">
                          <Link href={`/bible-studies/${study.slug}?play=1`} className="btn btn-sm btn-primary w-full">
                            Watch on site
                          </Link>
                          <a
                            href={`https://www.youtube.com/watch?v=${study.youtubeVideoId}`}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-sm btn-secondary w-full"
                          >
                            Watch on YouTube
                          </a>
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
