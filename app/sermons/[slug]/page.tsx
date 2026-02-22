import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import { notFound } from "next/navigation"

import YouTubeLiteEmbed from "@/components/lazy/YouTubeLiteEmbedLazy"
import ShareButtons from "@/components/ShareButtons"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { pageMetadata, sermonJsonLd } from "@/lib/seo"
import { getAllPublicSermonSlugs, getPublicSermonBySlug, getPublicSermonsBySeries, getSeriesById } from "@/lib/sermons"
import { siteConfig } from "@/lib/site"

export function generateStaticParams() {
  return getAllPublicSermonSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const sermon = getPublicSermonBySlug(resolvedParams.slug)
  if (!sermon) return { title: "Sermon" }
  return pageMetadata({
    title: sermon.title,
    description: `Sermon from ${sermon.dateIso}${sermon.speaker ? ` • ${sermon.speaker}` : ""}`,
    path: `/sermons/${sermon.slug}`,
    openGraphType: "video.other",
    image: `/sermons/${sermon.slug}/opengraph-image`,
  })
}

export default async function SermonDetailPage({
  params,
  searchParams,
}: {
  params: { slug: string } | Promise<{ slug: string }>
  searchParams?: { play?: string } | Promise<{ play?: string }>
}) {
  const resolvedParams = await params
  const resolvedSearchParams = searchParams ? await searchParams : undefined

  const sermon = getPublicSermonBySlug(resolvedParams.slug)
  if (!sermon) notFound()

  const series = getSeriesById(sermon.seriesId ?? undefined)
  const seriesSermons = sermon.seriesId ? getPublicSermonsBySeries(sermon.seriesId) : []
  const currentIdx = seriesSermons.findIndex((s) => s.slug === sermon.slug)
  const prev = currentIdx >= 0 ? seriesSermons[currentIdx + 1] : null
  const next = currentIdx >= 1 ? seriesSermons[currentIdx - 1] : null

  const videoId = sermon.youtubeVideoId ?? ""
  const coverSrc = series?.coverImageSrc ?? ""
  const play = resolvedSearchParams?.play === "1"

  const discussionQuestions =
    sermon.discussionQuestions?.length
      ? sermon.discussionQuestions
      : [
          "What stood out to you from this message?",
          "What is one step you can take this week to apply it?",
          "How can we pray for you?",
        ]

  const jsonLdVideo = sermonJsonLd(sermon, { seriesTitle: series?.title ?? null })
  const shareUrl = `${siteConfig.siteUrl}/sermons/${sermon.slug}`

  return (
    <>
      {jsonLdVideo ? (
        <Script
          id={`schema-org-sermon-${sermon.slug}`}
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdVideo) }}
        />
      ) : null}
      <PageHeader
        titleEn={sermon.title}
        titleTa={sermon.language === "ta" ? "\u0baa\u0bbf\u0bb0\u0b9a\u0b99\u0bcd\u0b95\u0bae\u0bcd" : ""}
        descriptionEn={[
          sermon.dateIso,
          sermon.speaker ? `• ${sermon.speaker}` : "",
          series ? `• ${series.title}` : "",
        ]
          .filter(Boolean)
          .join(" ")}
        descriptionTa=""
      />

      <section className="bg-white">
        <Container className="pb-16 sm:pb-20">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <div className="card">
                <div className="card-content p-6 sm:p-8">
                  {coverSrc || sermon.durationMinutes ? (
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      {coverSrc ? (
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-20 overflow-hidden rounded-xl border border-churchBlue/10 bg-churchBlueSoft">
                            <Image
                              src={coverSrc}
                              alt={series?.title ?? "Series artwork"}
                              width={400}
                              height={225}
                              sizes="80px"
                              className="h-full w-full object-cover"
                              quality={85}
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-semibold tracking-wide text-churchBlue/60">Series</div>
                            <div className="truncate text-sm font-semibold text-churchBlue">{series?.title}</div>
                          </div>
                        </div>
                      ) : null}

                      {sermon.durationMinutes ? (
                        <div className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft px-4 py-3 text-sm font-semibold text-churchBlue/80">
                          {sermon.durationMinutes} min
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                  {videoId ? (
                    <div className="overflow-hidden rounded-2xl border border-churchBlue/10 bg-churchBlueSoft">
                      <div className="aspect-video w-full">
                        <YouTubeLiteEmbed
                          kind="video"
                          videoId={videoId}
                          title={sermon.title}
                          load={play ? "visible" : "click"}
                          autoplayOnLoad={play}
                          posterQuality="hq"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-6">
                      <div className="text-sm font-semibold text-churchBlue">Video not available</div>
                      <p className="mt-2 text-sm text-churchBlue/70">This message doesn&apos;t have a video link yet.</p>
                      <a
                        href={siteConfig.youtubeChannelUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex items-center justify-center rounded-xl border border-churchBlue/15 bg-white px-4 py-2 text-sm font-semibold text-churchBlue transition-colors hover:bg-churchBlueSoft focus-ring"
                      >
                        Visit our YouTube channel
                      </a>
                    </div>
                  )}

                  {sermon.scriptures?.length ? (
                    <div className="mt-7 text-sm text-churchBlue/75 sm:text-base">
                      <span className="font-semibold text-churchBlue">Scripture:</span>{" "}
                      {sermon.scriptures.join(", ")}
                    </div>
                  ) : null}

                  {sermon.topics?.length ? (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {sermon.topics.map((t) => (
                        <span
                          key={`${sermon.slug}-${t}`}
                          className="rounded-full border border-churchBlue/10 bg-white px-3 py-1 text-xs font-semibold text-churchBlue/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-8 grid gap-2 sm:grid-cols-3">
                    <Link href="/sermons" className="btn btn-md btn-secondary">
                      Back to archive
                    </Link>
                    {sermon.notesPdfHref ? (
                      <a
                        className="btn btn-md btn-primary"
                        href={sermon.notesPdfHref}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Download notes (PDF)
                      </a>
                    ) : (
                      <Link className="btn btn-md btn-primary" href={`/sermons/${sermon.slug}/notes`}>
                        Sermon notes
                      </Link>
                    )}
                    {sermon.discussionGuidePdfHref ? (
                      <a
                        className="btn btn-md btn-secondary"
                        href={sermon.discussionGuidePdfHref}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Discussion guide (PDF)
                      </a>
                    ) : (
                      <Link className="btn btn-md btn-secondary" href={`/sermons/${sermon.slug}/discussion-guide`}>
                        Discussion guide
                      </Link>
                    )}
                    {sermon.youtubeVideoId ? (
                      <a
                        className="btn btn-md btn-secondary"
                        href={`https://www.youtube.com/watch?v=${sermon.youtubeVideoId}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Watch on YouTube
                      </a>
                    ) : null}
                    <a className="btn btn-md btn-secondary" href={`/sermons/${sermon.slug}/quote-image?download=1`}>
                      Quote graphic (PNG)
                    </a>
                  </div>

                  {sermon.platforms?.mp3Url ||
                  sermon.platforms?.mp4Url ||
                  sermon.platforms?.spotifyEpisodeUrl ||
                  sermon.platforms?.applePodcastsUrl ||
                  sermon.platforms?.youtubeMusicUrl ? (
                    <div className="mt-10 border-t border-churchBlue/10 pt-8">
                      <div className="text-sm font-semibold text-churchBlue">Listen & Downloads</div>
                      {sermon.platforms?.mp3Url ? (
                        <div className="mt-4 rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-5">
                          <div className="text-xs font-semibold tracking-wide text-churchBlue/70">Audio (MP3)</div>
                          <audio controls preload="none" className="mt-3 w-full" aria-label="Sermon audio player">
                            <source src={sermon.platforms.mp3Url} type="audio/mpeg" />
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                      ) : null}
                      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                        {sermon.platforms?.spotifyEpisodeUrl ? (
                          <a
                            href={sermon.platforms.spotifyEpisodeUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-sm btn-secondary"
                          >
                            Spotify
                          </a>
                        ) : null}
                        {sermon.platforms?.applePodcastsUrl ? (
                          <a
                            href={sermon.platforms.applePodcastsUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-sm btn-secondary"
                          >
                            Apple Podcasts
                          </a>
                        ) : null}
                        {sermon.platforms?.youtubeMusicUrl ? (
                          <a
                            href={sermon.platforms.youtubeMusicUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-sm btn-secondary"
                          >
                            YouTube Music
                          </a>
                        ) : null}
                      </div>
                    </div>
                  ) : null}

                  {discussionQuestions.length ? (
                    <div className="mt-10 border-t border-churchBlue/10 pt-8">
                      <div className="text-sm font-semibold text-churchBlue">Discussion questions</div>
                      <div className="mt-4 grid gap-3">
                        {discussionQuestions.map((q) => (
                          <div key={`${sermon.slug}-${q}`} className="rounded-2xl border border-churchBlue/10 bg-white p-4">
                            {q}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-10 border-t border-churchBlue/10 pt-8">
                    <div className="text-sm font-semibold text-churchBlue">Next steps</div>
                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      <Link href="/groups" className="btn btn-md btn-secondary">
                        Join a small group
                      </Link>
                      <Link href="/care" className="btn btn-md btn-secondary">
                        Request care
                      </Link>
                    </div>
                  </div>

                  <div className="mt-10 grid gap-2 sm:grid-cols-3">
                    {prev ? (
                      <Link href={`/sermons/${prev.slug}`} className="btn btn-md btn-secondary">
                        Previous sermon
                      </Link>
                    ) : null}
                    {next ? (
                      <Link href={`/sermons/${next.slug}`} className="btn btn-md btn-secondary">
                        Next sermon
                      </Link>
                    ) : null}
                    <Link href="/sermons" className="btn btn-md btn-secondary">
                      Sermon library
                    </Link>
                  </div>

                  <div className="mt-10 border-t border-churchBlue/10 pt-8">
                    <ShareButtons title={sermon.title} url={shareUrl} />
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
