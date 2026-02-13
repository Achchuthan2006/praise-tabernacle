import type { Metadata } from "next"

import Link from "next/link"
import Script from "next/script"

import LatestSermonsPlaylist from "@/components/LatestSermonsPlaylist"
import SermonArchive from "@/components/SermonArchive"
import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import { sermonSeries, sermons } from "@/lib/sermons"
import { siteConfig } from "@/lib/site"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Sermons",
  description: "Watch recent sermons in Tamil and English from Praise Tabernacle.",
  path: "/sermons",
})

function topTopics(limit: number) {
  const counts = new Map<string, number>()
  for (const sermon of sermons) {
    for (const topic of sermon.topics ?? []) counts.set(topic, (counts.get(topic) ?? 0) + 1)
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([topic]) => topic)
}

export default async function SermonsPage({
  searchParams,
}: {
  searchParams?:
    | { series?: string; topic?: string; speaker?: string; language?: string; q?: string }
    | Promise<{ series?: string; topic?: string; speaker?: string; language?: string; q?: string }>
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined
  const sermonsNewestFirst = sermons.slice().sort((a, b) => b.dateIso.localeCompare(a.dateIso))
  const topics = topTopics(12)

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
        descriptionTa="உங்கள் வாரத்திற்கு ஊக்கமளிக்கும் குறுகிய, தெளிவான தமிழ் & ஆங்கில செய்திகள்."
      />

      <section className="bg-white">
        <Container className="pb-10 pt-2">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <a href="#library" className="btn btn-sm btn-primary">
            <Lang en="Browse the sermon library" ta="சர்ச்சை நூலகத்தைப் பார்க்க" taClassName="font-tamil" />
            </a>
            <a href={siteConfig.youtubeChannelUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-secondary">
              <Lang en="Open YouTube" ta="YouTube திறக்க" taClassName="font-tamil" />
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
                      className="focus-ring rounded-full border border-churchBlue/10 bg-white px-4 py-2 text-xs font-semibold text-churchBlue/80 transition-colors hover:bg-churchBlueSoft"
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
                      className="focus-ring rounded-full border border-churchBlue/10 bg-white px-4 py-2 text-xs font-semibold text-churchBlue/80 transition-colors hover:bg-churchBlueSoft"
                    >
                      {topic}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <SermonArchive sermons={sermonsNewestFirst} series={sermonSeries} initialFilters={initialFilters} />

          <p className="text-sm text-churchBlue/70">
            <Lang
              en="Want to browse more? Visit our YouTube channel."
              ta="மேலும் பார்க்க விரும்புகிறீர்களா? எங்கள் YouTube சேனலுக்கு செல்லுங்கள்."
              taClassName="font-tamil"
            />
          </p>
          <a
            href={siteConfig.youtubeChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center justify-center rounded-xl border border-churchBlue/15 bg-churchBlueSoft px-4 py-2 text-sm font-semibold text-churchBlue transition-colors hover:bg-white focus-ring"
          >
            <Lang en="Go to YouTube channel" ta="YouTube சேனலுக்கு செல்லுங்கள்" taClassName="font-tamil" />
          </a>

          {siteConfig.spotifyUrl ? (
            <div className="mt-10 rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow">
              <div className="section-kicker">
                <Lang en="Audio" ta="ஒலி" taClassName="font-tamil" />
              </div>
              <h2 className="section-heading">
                <Lang en="Listen on Spotify" ta="Spotify-ல் கேளுங்கள்" taClassName="font-tamil" />
              </h2>
              <p className="mt-3 text-sm text-churchBlue/70">
                <Lang
                  en="Prefer audio? Listen to sermons on Spotify."
                  ta="ஒலி வடிவம் விருப்பமா? Spotify-ல் பிரசங்கங்களை கேளுங்கள்."
                  taClassName="font-tamil"
                />
              </p>
              <a
                href={siteConfig.spotifyUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 btn btn-md btn-primary"
              >
                <Lang en="Open Spotify" ta="Spotify திறக்க" taClassName="font-tamil" />
              </a>
            </div>
          ) : null}
        </Container>
      </section>

      <LatestSermonsPlaylist variant="page" />
    </>
  )
}
