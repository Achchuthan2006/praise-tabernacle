import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import Lang from "@/components/language/Lang"
import YouTubeLiteEmbed from "@/components/YouTubeLiteEmbed"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { formatIsoDate } from "@/lib/dates"
import { getAllDevotionalSlugs, getDevotionalBySlug } from "@/lib/devotionals"
import { pageMetadata } from "@/lib/seo"

export function generateStaticParams() {
  return getAllDevotionalSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const devotional = getDevotionalBySlug(params.slug)
  if (!devotional) return { title: "Devotional" }

  return pageMetadata({
    title: devotional.titleEn,
    description: devotional.summaryEn,
    path: `/devotionals/${devotional.slug}`,
  })
}

function formatDate(dateIso: string, locale: string) {
  return formatIsoDate(dateIso, locale, { year: "numeric", month: "long", day: "2-digit" })
}

export default function DevotionalPage({ params }: { params: { slug: string } }) {
  const devotional = getDevotionalBySlug(params.slug)
  if (!devotional) notFound()

  return (
    <>
      <PageHeader
        titleEn={devotional.titleEn}
        titleTa={devotional.titleTa}
        descriptionEn={`${formatDate(devotional.dateIso, "en-CA")} • ${devotional.verseRef}`}
        descriptionTa={`${formatDate(devotional.dateIso, "ta-IN")} • ${devotional.verseRef}`}
      />

      <section className="bg-white">
        <Container className="pb-16 sm:pb-20">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <article className="card">
                <div className="card-content p-8">
                  <div className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft/40 p-6">
                    <div className="text-xs font-semibold tracking-wide text-churchBlue/60">{devotional.verseRef}</div>
                    <div className="mt-3 space-y-3 text-sm leading-relaxed text-churchBlue/80 sm:text-base">
                      <p data-lang="en" lang="en">
                        {devotional.verseEn}
                      </p>
                      <p data-lang="ta" lang="ta" className="font-tamil">
                        {devotional.verseTa}
                      </p>
                    </div>
                  </div>

                  {devotional.youtubeVideoId ? (
                    <div className="mt-8 overflow-hidden rounded-2xl border border-churchBlue/10 bg-churchBlueSoft shadow-glow">
                      <div className="aspect-video">
                        <YouTubeLiteEmbed
                          kind="video"
                          videoId={devotional.youtubeVideoId}
                          title={devotional.titleEn}
                          posterQuality="hq"
                        />
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-8 space-y-8">
                    <section>
                      <h2 className="text-lg font-semibold tracking-tight text-churchBlue">
                        <Lang en="Devotional" ta="தியானம்" taClassName="font-tamil" />
                      </h2>
                      <div className="mt-4 space-y-4 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                        {devotional.contentEn.map((p) => (
                          <p key={`en-${p}`} data-lang="en" lang="en">
                            {p}
                          </p>
                        ))}
                        {devotional.contentTa.map((p) => (
                          <p key={`ta-${p}`} data-lang="ta" lang="ta" className="font-tamil">
                            {p}
                          </p>
                        ))}
                      </div>
                    </section>
                  </div>

                  <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                    <Link href="/devotionals" className="btn btn-md btn-secondary">
                      <Lang en="Back to devotionals" ta="தியானங்களுக்கு திரும்ப" taClassName="font-tamil" />
                    </Link>
                    <Link href="/promises" className="btn btn-md btn-secondary-soft">
                      <Lang en="Promises" ta="வாக்குத்தத்தங்கள்" taClassName="font-tamil" />
                    </Link>
                    <Link href="/prayer" className="btn btn-md btn-primary">
                      <Lang en="Request prayer" ta="ஜெப வேண்டுகோள்" taClassName="font-tamil" />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  )
}

