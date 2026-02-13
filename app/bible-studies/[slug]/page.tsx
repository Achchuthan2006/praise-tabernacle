import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { notFound } from "next/navigation"

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
  return pageMetadata({
    title: study.title,
    description: "Bible study teaching.",
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

  const study = getBibleStudyBySlug(resolvedParams?.slug)
  if (!study) notFound()

  const play = resolvedSearchParams?.play === "1"

  const pageUrl = `${siteConfig.siteUrl}/bible-studies/${study.slug}`
  const jsonLdVideo = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${pageUrl}#video`,
    name: study.title,
    description: "Bible study teaching.",
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

      <PageHeader titleEn={study.title} titleTa="" descriptionEn={study.dateIso ?? ""} descriptionTa="" />

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
                        title={study.title}
                        load={play ? "visible" : "click"}
                        autoplayOnLoad={play}
                        posterQuality="hq"
                      />
                    </div>
                  </div>

                  {study.topics?.length ? (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {study.topics.map((t) => (
                        <span
                          key={`${study.slug}-${t}`}
                          className="rounded-full border border-churchBlue/10 bg-white px-3 py-1 text-xs font-semibold text-churchBlue/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-8 grid gap-2 sm:grid-cols-3">
                    <Link href="/bible-studies" className="btn btn-md btn-secondary">
                      Back to Bible studies
                    </Link>
                    <Link href="/sermons" className="btn btn-md btn-secondary">
                      Sermon library
                    </Link>
                    <a
                      className="btn btn-md btn-secondary"
                      href={`https://www.youtube.com/watch?v=${study.youtubeVideoId}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Watch on YouTube
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
