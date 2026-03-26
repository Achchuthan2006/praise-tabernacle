import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"

import LatestSermonsPlaylist from "@/components/LatestSermonsPlaylist"
import SermonArchive from "@/components/SermonArchive"
import Lang from "@/components/language/Lang"
import Breadcrumbs from "@/components/ui/Breadcrumbs"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import { pageMetadata } from "@/lib/seo"
import { publicSermons, sermonSeries } from "@/lib/sermons"
import { siteConfig } from "@/lib/site"
import { getYouTubeSermons } from "@/lib/youtubeSermons"

export const metadata: Metadata = pageMetadata({
  title: "Sermons",
  description: "Watch recent sermons in Tamil and English from Praise Tabernacle.",
  path: "/sermons",
})

function topTopics(sermons: typeof publicSermons, limit: number) {
  const counts = new Map<string, number>()
  for (const sermon of sermons) {
    for (const topic of sermon.topics ?? []) counts.set(topic, (counts.get(topic) ?? 0) + 1)
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([topic]) => topic)
}

function getSermonWatchHref(slug: string) {
  return `/sermons/${slug}?play=1`
}

function getPrimarySermonHref(sermon: (typeof publicSermons)[number]) {
  if (sermon.source === "youtube-api" && sermon.platforms?.youtubeUrl) return sermon.platforms.youtubeUrl
  return getSermonWatchHref(sermon.slug)
}

function getSermonThumb(sermon: (typeof publicSermons)[number]) {
  if (sermon.thumbnailImageSrc) return sermon.thumbnailImageSrc
  if (sermon.youtubeVideoId) return `https://img.youtube.com/vi/${sermon.youtubeVideoId}/mqdefault.jpg`
  return "/event-teaching.svg"
}

export default async function SermonsPage({
  searchParams,
}: {
  searchParams?: Promise<{ series?: string; topic?: string; speaker?: string; language?: string; q?: string }>
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined
  const liveSermons = await getYouTubeSermons()
  const sermonsNewestFirst = liveSermons.slice().sort((a, b) => b.dateIso.localeCompare(a.dateIso))
  const featuredSermons = sermonsNewestFirst.slice(0, 6)
  const topics = topTopics(sermonsNewestFirst, 12)

  const initialFilters = resolvedSearchParams
    ? {
        seriesId: (resolvedSearchParams.series ?? "").trim() || undefined,
        topic: (resolvedSearchParams.topic ?? "").trim() || undefined,
        speaker: (resolvedSearchParams.speaker ?? "").trim() || undefined,
        language: (resolvedSearchParams.language ?? "").trim() || undefined,
        query: (resolvedSearchParams.q ?? "").trim() || undefined,
      }
    : undefined

  const jsonLdItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Praise Tabernacle Sermons",
    itemListElement: sermonsNewestFirst.slice(0, 50).map((sermon, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: sermon.title,
      url: `${siteConfig.siteUrl}/sermons/${sermon.slug}`,
    })),
  }

  return (
    <>
      <Script
        id="schema-org-sermons-list"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdItemList) }}
      />
      <PageHeader
        titleEn="Sermons"
        titleTa="பிரசங்கங்கள்"
        descriptionEn="Short, clear messages in Tamil and English to encourage your week."
        descriptionTa="உங்கள் வாரத்துக்கு ஊக்கமளிக்கும் சுருக்கமான, தெளிவான தமிழ் மற்றும் ஆங்கில செய்திகள்."
      />

      <section className="bg-white">
        <Container className="pb-10 pt-2">
          <Breadcrumbs
            className="mb-4"
            items={[
              { href: "/", labelEn: "Home", labelTa: "முகப்பு" },
              { labelEn: "Sermons", labelTa: "பிரசங்கங்கள்" },
            ]}
          />
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <a href="#library" className="btn btn-sm btn-primary">
              <Lang en="Browse the sermon library" ta="பிரசங்க நூலகத்தை பாருங்கள்" taClassName="font-tamil" />
            </a>
            <a href={siteConfig.youtubeChannelUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-secondary">
              <Lang en="Open YouTube" ta="யூடியூப்பைத் திறக்க" taClassName="font-tamil" />
            </a>
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="pb-16 sm:pb-20">
          <div className="mb-10 rounded-3xl border border-churchBlue/10 bg-churchBlueSoft/40 p-6 shadow-glow md:p-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
              <div>
                <div className="text-sm font-semibold text-churchBlue">Series playlists</div>
                <p className="mt-2 text-sm text-churchBlue/70">
                  Pick a series to watch messages in order.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {sermonSeries.map((s) => (
                    <Link
                      key={s.id}
                      href={`/sermons?series=${encodeURIComponent(s.id)}`}
                      className="focus-ring filter-chip"
                    >
                      {s.title}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold text-churchBlue">Topics</div>
                <p className="mt-2 text-sm text-churchBlue/70">
                  Jump to a topic you care about.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {topics.map((topic) => (
                    <Link
                      key={topic}
                      href={`/sermons?topic=${encodeURIComponent(topic)}`}
                      className="focus-ring filter-chip"
                    >
                      {topic}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-10 rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow md:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="section-kicker">
                  <Lang en="Recent" ta="சமீபத்தியவை" taClassName="font-tamil" />
                </div>
                <h2 className="section-heading mt-2">
                  <Lang en="Latest sermons" ta="சமீபத்திய பிரசங்கங்கள்" taClassName="font-tamil" />
                </h2>
                <p className="mt-2 text-sm text-churchBlue/70">
                  <Lang
                    en={`${sermonsNewestFirst.length} sermons are currently available in the archive.`}
                    ta={`களஞ்சியத்தில் தற்போது ${publicSermons.length} பிரசங்கங்கள் உள்ளன.`}
                    taClassName="font-tamil"
                  />
                </p>
              </div>
              <a href="#library" className="btn btn-sm btn-secondary">
                <Lang en="Open full archive" ta="முழு களஞ்சியத்தைத் திற" taClassName="font-tamil" />
              </a>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredSermons.map((sermon) => {
                const detailHref = getPrimarySermonHref(sermon)
                const thumbSrc = getSermonThumb(sermon)
                return (
                  <article key={sermon.slug} className="card">
                    <div className="card-image video-thumbnail">
                      <Link
                        href={detailHref}
                        className="group block focus-ring"
                        aria-label={`Open sermon: ${sermon.title}`}
                      >
                        <div className="relative aspect-video w-full bg-churchBlueSoft">
                          <Image
                            src={thumbSrc}
                            alt={sermon.title}
                            width={1200}
                            height={675}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="h-full w-full object-cover"
                            quality={85}
                          />
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 z-20 grid place-items-center opacity-100"
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
                      <div className="text-xs font-semibold tracking-wide text-churchBlue/60">{sermon.dateIso}</div>
                      <h3 className="mt-2 text-lg font-semibold tracking-tight text-churchBlue">
                        <Link href={detailHref} className="focus-ring rounded-lg">
                          {sermon.title}
                        </Link>
                      </h3>
                      {sermon.speaker ? <div className="mt-1 text-sm text-churchBlue/70">{sermon.speaker}</div> : null}

                      {sermon.topics?.length ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {sermon.topics.slice(0, 3).map((topic) => (
                            <span
                              key={`${sermon.slug}-${topic}`}
                              className="rounded-full border border-churchBlue/10 bg-churchBlueSoft px-3 py-1 text-xs font-semibold text-churchBlue/80"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      ) : null}

                      <div className="mt-6 grid gap-2">
                        <Link href={detailHref} className="btn btn-sm btn-primary w-full">
                          <Lang en="Watch on site" ta="இங்கே பார்க்க" taClassName="font-tamil" />
                        </Link>
                        {sermon.youtubeVideoId ? (
                          <a
                            href={`https://www.youtube.com/watch?v=${sermon.youtubeVideoId}`}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-sm btn-secondary w-full"
                          >
                            <Lang en="Watch on YouTube" ta="யூடியூபில் பார்க்க" taClassName="font-tamil" />
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>

          <SermonArchive sermons={sermonsNewestFirst} series={sermonSeries} initialFilters={initialFilters} />

          <p className="text-sm text-churchBlue/70">
            <Lang
              en="Want to browse more? Visit our YouTube channel."
              ta="மேலும் பார்க்க விரும்புகிறீர்களா? எங்கள் யூடியூப் சேனலுக்குச் செல்லுங்கள்."
              taClassName="font-tamil"
            />
          </p>
          <a
            href={siteConfig.youtubeChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center justify-center rounded-xl border border-churchBlue/15 bg-churchBlueSoft px-4 py-2 text-sm font-semibold text-churchBlue transition-colors hover:bg-white focus-ring"
          >
            <Lang en="Go to YouTube channel" ta="யூடியூப் சேனலுக்குச் செல்லுங்கள்" taClassName="font-tamil" />
          </a>

          {siteConfig.spotifyUrl ? (
            <div className="mt-10 rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow">
              <div className="section-kicker">
                <Lang en="Audio" ta="ஒலி" taClassName="font-tamil" />
              </div>
              <h2 className="section-heading">
                <Lang en="Listen on Spotify" ta="ஸ்பாட்டிபையில் கேளுங்கள்" taClassName="font-tamil" />
              </h2>
              <p className="mt-3 text-sm text-churchBlue/70">
                <Lang
                  en="Prefer audio? Listen to sermons on Spotify."
                  ta="ஒலி வடிவம் விருப்பமா? ஸ்பாட்டிபையில் பிரசங்கங்களை கேளுங்கள்."
                  taClassName="font-tamil"
                />
              </p>
              <a
                href={siteConfig.spotifyUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 btn btn-md btn-primary"
              >
                <Lang en="Open Spotify" ta="ஸ்பாட்டிபையைத் திறக்க" taClassName="font-tamil" />
              </a>
            </div>
          ) : null}
        </Container>
      </section>

      <LatestSermonsPlaylist variant="page" />
    </>
  )
}
