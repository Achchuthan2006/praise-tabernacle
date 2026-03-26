import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import { bibleStudies } from "@/lib/bibleStudies"
import { pageMetadata } from "@/lib/seo"
import { TAMIL_BIBLE_INDEX_HREF } from "@/lib/tamilBible"

const NKJV_GATEWAY_HREF =
  "https://www.biblegateway.com/passage/?search=Genesis%201&version=NKJV"

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
        descriptionTa="NKJV (BibleGateway) மற்றும் வேதாகமப் படிப்புகள்"
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
                  . Tamil is available through{" "}
                  <a href={TAMIL_BIBLE_INDEX_HREF} target="_blank" rel="noreferrer" className="underline underline-offset-2">
                    TamilChristianSongs.in
                  </a>
                  , and you can always open it in a new tab.
                </>
              }
              ta={
                <>
                  NKJV-ஐ ஆன்லைனில்{" "}
                  <a href={NKJV_GATEWAY_HREF} target="_blank" rel="noreferrer" className="underline underline-offset-2">
                    BibleGateway
                  </a>{" "}
                  மூலம் படிக்கலாம். தமிழ் வேதாகமத்தை{" "}
                  <a
                    href={TAMIL_BIBLE_INDEX_HREF}
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-2"
                  >
                    TamilChristianSongs.in
                  </a>{" "}
                  மூலம் திறந்து படிக்கலாம்.
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
                <div className="section-kicker">
                  <Lang en="Watch" ta="பாருங்கள்" taClassName="font-tamil" />
                </div>
                <h2 className="section-heading">
                  <Lang en="Bible Studies" ta="வேதாகமப் படிப்புகள்" taClassName="font-tamil" />
                </h2>
                <p className="mt-1 text-sm text-churchBlue/70">
                  <Lang
                    en="Watch Bible study teachings right here on our website."
                    ta="வேதாகமப் படிப்பு போதனைகளை எங்கள் இணையதளத்திலேயே பாருங்கள்."
                    taClassName="font-tamil"
                  />
                </p>
              </div>
              <Link href="/bible-studies" className="btn btn-sm btn-secondary">
                <Lang en="View Bible studies page" ta="வேதாகமப் படிப்பு பக்கத்தைத் திற" taClassName="font-tamil" />
              </Link>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {bibleStudies.map((study) => {
                const thumb = `https://i.ytimg.com/vi/${study.youtubeVideoId}/hqdefault.jpg`
                return (
                  <div key={study.slug}>
                    <article className="card">
                      <div className="card-image">
                        <Link
                          href={`/bible-studies/${study.slug}?play=1`}
                          className="group block focus-ring"
                          aria-label={`Open Bible study: ${study.titleEn}`}
                        >
                          <div className="relative aspect-video w-full bg-churchBlueSoft">
                            <Image
                              src={thumb}
                              alt={study.titleEn}
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
                            <Lang en={study.titleEn} ta={study.titleTa} taClassName="font-tamil" />
                          </Link>
                        </h3>

                        {study.descriptionEn || study.descriptionTa ? (
                          <p className="mt-3 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                            <Lang en={study.descriptionEn ?? ""} ta={study.descriptionTa ?? ""} taClassName="font-tamil" />
                          </p>
                        ) : null}

                        <div className="mt-6 grid gap-2">
                          <Link href={`/bible-studies/${study.slug}?play=1`} className="btn btn-sm btn-primary w-full">
                            <Lang en="Watch on site" ta="இங்கே பார்க்க" taClassName="font-tamil" />
                          </Link>
                          <a
                            href={`https://www.youtube.com/watch?v=${study.youtubeVideoId}`}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-sm btn-secondary w-full"
                          >
                            <Lang en="Watch on YouTube" ta="யூடியூபில் பார்க்க" taClassName="font-tamil" />
                          </a>
                        </div>
                      </div>
                    </article>
                  </div>
                )
              })}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
