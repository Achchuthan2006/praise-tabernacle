import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import YouTubeLiteEmbed from "@/components/lazy/YouTubeLiteEmbedLazy"
import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { getAllTestimonialSlugs, getTestimonialBySlug } from "@/lib/testimonials"
import { pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

export function generateStaticParams() {
  return getAllTestimonialSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const t = getTestimonialBySlug(resolvedParams.slug)
  if (!t) return { title: "Testimony" }
  const videoId = (t.youtubeVideoId ?? "").trim()
  return pageMetadata({
    title: t.titleEn,
    description: t.quote ?? "Testimony story",
    path: `/testimonies/${t.slug}`,
    openGraphType: "video.other",
    image: videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : siteConfig.branding.logoEnBgSrc,
  })
}

export default async function TestimonyDetailPage({
  params,
  searchParams,
}: {
  params: { slug: string } | Promise<{ slug: string }>
  searchParams?: { play?: string } | Promise<{ play?: string }>
}) {
  const resolvedParams = await params
  const resolvedSearchParams = searchParams ? await searchParams : undefined
  const play = resolvedSearchParams?.play === "1"

  const t = getTestimonialBySlug(resolvedParams.slug)
  if (!t) notFound()

  const videoId = (t.youtubeVideoId ?? "").trim()
  const graphicSrc = (t.graphicSrc ?? "").trim()
  const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(`Testimony: ${t.titleEn}`)}`

  return (
    <>
      <PageHeader
        titleEn={t.titleEn}
        titleTa={t.titleTa}
        descriptionEn={t.quote ?? "Testimony"}
        descriptionTa={t.quote ? "" : "சாட்சி"}
      />

      <section className="bg-white">
        <Container className="pb-16 sm:pb-20">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-8">
                <Reveal>
                  {videoId ? (
                    <div className="overflow-hidden rounded-3xl border border-churchBlue/10 bg-churchBlueSoft shadow-glow">
                      <div className="aspect-video w-full">
                        <YouTubeLiteEmbed
                          kind="video"
                          videoId={videoId}
                          title={t.titleEn}
                          load={play ? "visible" : "click"}
                          autoplayOnLoad={play}
                          posterQuality="hq"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-6">
                      <div className="text-sm font-semibold text-churchBlue">
                        <Lang en="Video coming soon" ta="வீடியோ விரைவில்" taClassName="font-tamil" />
                      </div>
                      <p className="mt-2 text-sm text-churchBlue/70">
                        <Lang
                          en="This testimony will have a short video soon."
                          ta="இந்த சாட்சிக்கான குறுந் வீடியோ விரைவில் சேர்க்கப்படும்."
                          taClassName="font-tamil"
                        />
                      </p>
                    </div>
                  )}
                </Reveal>

                {t.beforeEn || t.afterEn ? (
                  <Reveal delay={1}>
                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow">
                        <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                          <Lang en="Before" ta="முன்பு" taClassName="font-tamil" />
                        </div>
                        <div className="mt-3 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                          <Lang en={t.beforeEn ?? ""} ta={t.beforeTa ?? t.beforeEn ?? ""} taClassName="font-tamil" />
                        </div>
                      </div>
                      <div className="rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-6 shadow-glow">
                        <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                          <Lang en="After" ta="பிறகு" taClassName="font-tamil" />
                        </div>
                        <div className="mt-3 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                          <Lang en={t.afterEn ?? ""} ta={t.afterTa ?? t.afterEn ?? ""} taClassName="font-tamil" />
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ) : null}

                {t.storyEn || t.storyTa ? (
                  <Reveal delay={2}>
                    <div className="mt-8 rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow">
                      <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                        <Lang en="Story" ta="சாட்சி" taClassName="font-tamil" />
                      </div>
                      <div className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                        <Lang en={t.storyEn ?? ""} ta={t.storyTa ?? t.storyEn ?? ""} taClassName="font-tamil" />
                      </div>
                    </div>
                  </Reveal>
                ) : null}

                {t.transcriptText ? (
                  <Reveal delay={3}>
                    <div className="mt-8 rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow" id="transcript">
                      <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                        <Lang en="Transcript" ta="உரை" taClassName="font-tamil" />
                      </div>
                      <div className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                        <Lang en={t.transcriptText} ta={t.transcriptText} taClassName="font-tamil" />
                      </div>
                    </div>
                  </Reveal>
                ) : null}
              </div>

              <div className="lg:col-span-4">
                <div className="rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-6 shadow-glow">
                  <div className="text-sm font-semibold text-churchBlue">
                    <Lang en="Actions" ta="செயல்கள்" taClassName="font-tamil" />
                  </div>
                  <div className="mt-4 grid gap-2">
                    <Link href="/testimonies" className="btn btn-sm btn-secondary w-full">
                      <Lang en="Back to testimonies" ta="சாட்சிகள்" taClassName="font-tamil" />
                    </Link>
                    <a href={mailto} className="btn btn-sm btn-secondary w-full">
                      <Lang en="Share your testimony" ta="உங்கள் சாட்சி" taClassName="font-tamil" />
                    </a>
                    {videoId ? (
                      <a
                        href={`https://www.youtube.com/watch?v=${videoId}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-sm btn-secondary w-full"
                      >
                        <Lang en="Watch on YouTube" ta="YouTube" taClassName="font-tamil" />
                      </a>
                    ) : null}
                    {graphicSrc ? (
                      <a href={graphicSrc} download className="btn btn-sm btn-primary w-full">
                        <Lang en="Download graphic" ta="படத்தை பதிவிறக்கம்" taClassName="font-tamil" />
                      </a>
                    ) : null}
                  </div>

                  {graphicSrc ? (
                    <div className="mt-5 overflow-hidden rounded-2xl border border-churchBlue/10 bg-white">
                      <div className="relative aspect-[4/3] w-full bg-churchBlueSoft">
                        <Image
                          src={graphicSrc}
                          alt="Testimony graphic"
                          fill
                          sizes="(max-width: 1024px) 100vw, 360px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

