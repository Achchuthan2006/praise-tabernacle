import type { Metadata } from "next"

import Image from "next/image"
import Link from "next/link"
import Script from "next/script"

import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { bibleStudies } from "@/lib/bibleStudies"
import { pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Bible Studies",
  description: "Watch Bible study teachings in Tamil and English.",
  path: "/bible-studies",
})

export default function BibleStudiesPage() {
  const jsonLdItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Praise Tabernacle Bible Studies",
    itemListElement: bibleStudies.slice(0, 50).map((study, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: study.title,
      url: `${siteConfig.siteUrl}/bible-studies/${study.slug}`,
    })),
  }

  const sorted = bibleStudies
    .slice()
    .sort((a, b) => (b.dateIso ?? "").localeCompare(a.dateIso ?? ""))

  return (
    <>
      <Script
        id="schema-org-bible-studies-list"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdItemList) }}
      />

      <PageHeader
        titleEn="Bible Studies"
        titleTa="Bible Studies"
        descriptionEn="Teaching sessions to help you grow in the Word."
        descriptionTa=""
      />

      <section className="bg-white">
        <Container className="pb-16 sm:pb-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sorted.map((study, idx) => {
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
                        {study.speaker ? <div className="mt-1 text-sm text-churchBlue/70">{study.speaker}</div> : null}

                        {study.topics?.length ? (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {study.topics.slice(0, 5).map((topic) => (
                              <span
                                key={`${study.slug}-${topic}`}
                                className="rounded-full border border-churchBlue/10 bg-white px-3 py-1 text-xs font-semibold text-churchBlue/80"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        ) : null}

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
