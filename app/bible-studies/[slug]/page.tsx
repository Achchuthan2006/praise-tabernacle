import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { notFound } from "next/navigation"
import { headers } from "next/headers"

import Lang from "@/components/language/Lang"
import YouTubeLiteEmbed from "@/components/lazy/YouTubeLiteEmbedLazy"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { getAllBibleStudySlugs, getBibleStudyBySlug } from "@/lib/bibleStudies"
import { pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

export function generateStaticParams() {
  return getAllBibleStudySlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const study = getBibleStudyBySlug(resolvedParams?.slug)
  if (!study) return { title: "Bible Study" }

  const requestHeaders = await headers()
  const routeLang = requestHeaders.get("x-pt-route-lang")
  const title = routeLang === "ta" ? study.titleTa : study.titleEn
  const description =
    routeLang === "ta"
      ? study.descriptionTa ?? "வேதாகமப் பாடம்."
      : study.descriptionEn ?? "Bible study teaching."

  return pageMetadata({
    title,
    description,
    path: `/bible-studies/${study.slug}`,
    openGraphType: "video.other",
    image: `https://i.ytimg.com/vi/${study.youtubeVideoId}/hqdefault.jpg`,
  })
}

export default async function BibleStudyDetailPage({
  params,
  searchParams,
}: {
  params: { slug: string } | Promise<{ slug: string }>
  searchParams?: { play?: string } | Promise<{ play?: string }>
}) {
  const resolvedParams = await params
  const resolvedSearchParams = searchParams ? await searchParams : undefined
  const requestHeaders = await headers()
  const routeLang = requestHeaders.get("x-pt-route-lang")
  const isTamil = routeLang === "ta"

  const study = getBibleStudyBySlug(resolvedParams?.slug)
  if (!study) notFound()

  const play = resolvedSearchParams?.play === "1"
  const pageUrl = `${siteConfig.siteUrl}/bible-studies/${study.slug}`
  const title = isTamil ? study.titleTa : study.titleEn
  const description = isTamil
    ? study.descriptionTa ?? "வேதாகமப் பாடம்."
    : study.descriptionEn ?? "Bible study teaching."

  const jsonLdVideo = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${pageUrl}#video`,
    name: title,
    description,
    uploadDate: study.dateIso ?? undefined,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    thumbnailUrl: [`https://i.ytimg.com/vi/${study.youtubeVideoId}/hqdefault.jpg`],
    embedUrl: `https://www.youtube-nocookie.com/embed/${study.youtubeVideoId}`,
    contentUrl: `https://www.youtube.com/watch?v=${study.youtubeVideoId}`,
    publisher: { "@type": "Church", "@id": `${siteConfig.siteUrl}#church`, name: siteConfig.nameEn },
  }

  return (
    <>
      <Script
        id={`schema-org-bible-study-${study.slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdVideo) }}
      />

      <PageHeader
        titleEn={study.titleEn}
        titleTa={study.titleTa}
        descriptionEn={study.descriptionEn ?? study.dateIso ?? ""}
        descriptionTa={study.descriptionTa ?? study.dateIso ?? ""}
      />

      <section className="bg-white">
        <Container className="pb-16 sm:pb-20">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <div className="card">
                <div className="card-content p-6 sm:p-8">
                  <div className="overflow-hidden rounded-2xl border border-churchBlue/10 bg-churchBlueSoft">
                    <div className="aspect-video w-full">
                      <YouTubeLiteEmbed
                        kind="video"
                        videoId={study.youtubeVideoId}
                        title={title}
                        load={play ? "visible" : "click"}
                        autoplayOnLoad={play}
                        posterQuality="hq"
                      />
                    </div>
                  </div>

                  {study.topicsEn?.length || study.topicsTa?.length ? (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {(study.topicsEn ?? []).map((topic, index) => (
                        <span
                          key={`${study.slug}-${topic}-${index}`}
                          className="rounded-full border border-churchBlue/10 bg-white px-3 py-1 text-xs font-semibold text-churchBlue/80"
                        >
                          <Lang en={topic} ta={study.topicsTa?.[index] ?? topic} taClassName="font-tamil" />
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-8 grid gap-2 sm:grid-cols-3">
                    <Link href="/bible-studies" className="btn btn-md btn-secondary">
                      <Lang en="Back to Bible studies" ta="வேதாகமப் படிப்புகளுக்கு திரும்ப" taClassName="font-tamil" />
                    </Link>
                    <Link href="/sermons" className="btn btn-md btn-secondary">
                      <Lang en="Sermon library" ta="பிரசங்க நூலகம்" taClassName="font-tamil" />
                    </Link>
                    <a
                      className="btn btn-md btn-secondary"
                      href={`https://www.youtube.com/watch?v=${study.youtubeVideoId}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Lang en="Watch on YouTube" ta="யூடியூபில் பார்க்க" taClassName="font-tamil" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  )
}
