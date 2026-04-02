import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import Lang from "@/components/language/Lang"
import NextLivestreamCountdown from "@/components/NextLivestreamCountdown"
import Container from "@/components/ui/Container"
import Reveal from "@/components/ui/Reveal"
import YouTubeLiteEmbed from "@/components/YouTubeLiteEmbed"
import { pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"
import { getLatestYouTubeSermon } from "@/lib/youtubeSermons"

export const metadata: Metadata = pageMetadata({
  title: "Watch Live",
  description: "Join Praise Tabernacle online for Sunday worship, livestreams, and service resources.",
  path: "/watch",
})

type ServiceChoice = 1 | 2

function getServiceMeta(service: ServiceChoice | null) {
  if (service === 1) {
    return {
      id: 1 as const,
      titleEn: "English Livestream",
      titleTa: "à®†à®™à¯à®•à®¿à®² à®¨à¯‡à®°à®²à¯ˆ",
      subtitleEn: "Sunday worship with prayer, Scripture, and a Christ-centred message.",
      subtitleTa: "à®œà¯†à®ªà®®à¯, à®µà¯‡à®¤à®¾à®•à®® à®µà®¾à®šà®¿à®ªà¯à®ªà¯, à®®à®±à¯à®±à¯à®®à¯ à®•à®¿à®±à¯à®¸à¯à®¤à¯à®µà¯ˆ à®®à¯ˆà®¯à®®à®¾à®•à®•à¯ à®•à¯Šà®£à¯à®Ÿ à®šà¯†à®¯à¯à®¤à®¿à®¯à¯à®Ÿà®©à¯ à®žà®¾à®¯à®¿à®±à¯ à®†à®°à®¾à®¤à®©à¯ˆ.",
      timeEn: "Sundays at 9:15 AM",
      timeTa: "à®žà®¾à®¯à®¿à®±à¯à®±à¯à®•à¯à®•à®¿à®´à®®à¯ˆà®•à®³à¯ à®•à®¾à®²à¯ˆ 9:15",
      pastorEn: "Pastor Mano",
      pastorRoleEn: "Lead Pastor",
      watchLabelEn: "English service selected",
      watchLabelTa: "à®†à®™à¯à®•à®¿à®² à®†à®°à®¾à®¤à®©à¯ˆ à®¤à¯‡à®°à¯à®µà¯",
    }
  }

  if (service === 2) {
    return {
      id: 2 as const,
      titleEn: "Tamil Livestream",
      titleTa: "à®¤à®®à®¿à®´à¯ à®¨à¯‡à®°à®²à¯ˆ",
      subtitleEn: "Tamil service with English translation for families worshipping together.",
      subtitleTa: "à®•à¯à®Ÿà¯à®®à¯à®ªà®™à¯à®•à®³à¯ à®’à®©à¯à®±à®¾à®• à®†à®°à®¾à®¤à®¿à®•à¯à®• à®¤à®®à®¿à®´à¯ à®†à®°à®¾à®¤à®©à¯ˆ à®®à®±à¯à®±à¯à®®à¯ à®†à®™à¯à®•à®¿à®² à®®à¯Šà®´à®¿à®ªà¯†à®¯à®°à¯à®ªà¯à®ªà¯.",
      timeEn: "Sundays at 10:30 AM",
      timeTa: "à®žà®¾à®¯à®¿à®±à¯à®±à¯à®•à¯à®•à®¿à®´à®®à¯ˆà®•à®³à¯ à®•à®¾à®²à¯ˆ 10:30",
      pastorEn: "Pastor Mano",
      pastorRoleEn: "Lead Pastor",
      watchLabelEn: "Tamil service selected",
      watchLabelTa: "à®¤à®®à®¿à®´à¯ à®†à®°à®¾à®¤à®©à¯ˆ à®¤à¯‡à®°à¯à®µà¯",
    }
  }

  return {
    id: null,
    titleEn: "Watch Praise Tabernacle Live",
    titleTa: "Praise Tabernacle à®¨à¯‡à®°à®²à¯ˆ à®†à®°à®¾à®¤à®©à¯ˆ",
    subtitleEn: "Worship with our church family online and open the latest available livestream or replay.",
    subtitleTa: "à®Žà®™à¯à®•à®³à¯ à®šà®ªà¯ˆà®•à¯ à®•à¯à®Ÿà¯à®®à¯à®ªà®¤à¯à®¤à¯à®Ÿà®©à¯ à®†à®©à¯à®²à¯ˆà®©à®¿à®²à¯ à®†à®°à®¾à®¤à®¿à®¯à¯à®™à¯à®•à®³à¯; à®šà®®à¯€à®ªà®¤à¯à®¤à®¿à®¯ à®¨à¯‡à®°à®²à¯ˆ à®…à®²à¯à®²à®¤à¯ à®®à®±à¯à®ªà®¾à®°à¯à®µà¯ˆà®¯à¯ˆà®¤à¯ à®¤à®¿à®±à®•à¯à®•à®²à®¾à®®à¯.",
    timeEn: "English 9:15 AM • Tamil 10:30 AM",
    timeTa: "à®†à®™à¯à®•à®¿à®²à®®à¯ 9:15 • à®¤à®®à®¿à®´à¯ 10:30",
    pastorEn: "Pastor Mano",
    pastorRoleEn: "Lead Pastor",
    watchLabelEn: "Sunday livestream",
    watchLabelTa: "à®žà®¾à®¯à®¿à®±à¯ à®¨à¯‡à®°à®²à¯ˆ",
  }
}

export default async function WatchPage({
  searchParams,
}: {
  searchParams?: Promise<{ service?: string }>
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined
  const service =
    resolvedSearchParams?.service === "1" ? 1 : resolvedSearchParams?.service === "2" ? 2 : null

  const selected = getServiceMeta(service)
  const countdownService = service === 2 ? 2 : 1
  const latestSermon = await getLatestYouTubeSermon(service)
  const videoId = latestSermon?.youtubeVideoId ?? ""
  const givingHref = siteConfig.giving.onlineGivingUrl || "/give"
  const playlistHref = siteConfig.youtubeServicesPlaylistUrl || siteConfig.youtubeChannelUrl
  const serviceOptions = [
    {
      id: 1 as const,
      href: "/watch?service=1",
      titleEn: "English Service",
      titleTa: "à®†à®™à¯à®•à®¿à®² à®†à®°à®¾à®¤à®©à¯ˆ",
      timeEn: "Sunday at 9:15 AM",
      timeTa: "à®žà®¾à®¯à®¿à®±à¯ à®•à®¾à®²à¯ˆ 9:15",
      noteEn: "Prayer, worship, Scripture, and preaching in English.",
      noteTa: "à®†à®™à¯à®•à®¿à®²à®®à®¿à®²à¯ à®œà¯†à®ªà®®à¯, à®†à®°à®¾à®¤à®©à¯ˆ, à®µà¯‡à®¤à®¾à®•à®®, à®ªà®¿à®°à®šà®™à¯à®•à®®à¯.",
    },
    {
      id: 2 as const,
      href: "/watch?service=2",
      titleEn: "Tamil Service",
      titleTa: "à®¤à®®à®¿à®´à¯ à®†à®°à®¾à®¤à®©à¯ˆ",
      timeEn: "Sunday at 10:30 AM",
      timeTa: "à®žà®¾à®¯à®¿à®±à¯ à®•à®¾à®²à¯ˆ 10:30",
      noteEn: "Tamil worship with English translation support for families.",
      noteTa: "à®•à¯à®Ÿà¯à®®à¯à®ªà®™à¯à®•à®³à¯à®•à¯à®•à®¾à®© à®†à®™à¯à®•à®¿à®² à®®à¯Šà®´à®¿à®ªà¯†à®¯à®°à¯à®ªà¯à®ªà¯à®Ÿà®©à¯ à®¤à®®à®¿à®´à¯ à®†à®°à®¾à®¤à®©à¯ˆ.",
    },
  ]

  return (
    <section className="overflow-hidden bg-[radial-gradient(56rem_28rem_at_12%_-4%,rgba(223,185,79,0.16),transparent_52%),radial-gradient(44rem_24rem_at_100%_0%,rgba(255,255,255,0.08),transparent_45%),linear-gradient(180deg,#1a1a1a_0%,#121212_46%,#0d0d0d_100%)] text-white">
      <Container className="py-8 sm:py-10 lg:py-14">
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/82 backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-[#dfb94f] shadow-[0_0_18px_rgba(223,185,79,0.8)]" aria-hidden="true" />
              <Lang en={selected.watchLabelEn} ta={selected.watchLabelTa} taClassName="font-tamil" />
            </div>

            <h1 className="mt-6 max-w-4xl text-balance text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              <Lang en={selected.titleEn} ta={selected.titleTa} taClassName="font-tamil" />
            </h1>

            <p className="mt-5 max-w-2xl text-pretty text-sm leading-7 text-white/72 sm:text-base">
              <Lang en={selected.subtitleEn} ta={selected.subtitleTa} taClassName="font-tamil" />
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
              <div className="rounded-full border border-[#dfb94f]/25 bg-[#dfb94f]/10 px-4 py-2 font-semibold text-[#f4df96]">
                {selected.timeEn}
              </div>
              <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-white/74 font-tamil">
                {selected.timeTa}
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.55fr),360px] xl:items-start">
          <Reveal>
            <div className="overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] shadow-[0_32px_90px_rgba(0,0,0,0.34)] backdrop-blur">
              <div className="flex flex-col gap-4 border-b border-white/8 px-5 py-5 sm:px-6 sm:py-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="min-w-0">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#dfb94f]">
                    <Lang en="Watch now" ta="à®‡à®ªà¯à®ªà¯‹à®¤à¯ à®ªà®¾à®°à¯à®™à¯à®•à®³à¯" taClassName="font-tamil" />
                  </div>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-[2rem]">
                    {latestSermon?.title ?? "Praise Tabernacle Sunday Worship"}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-white/66">
                    <Lang
                      en="Join the latest livestream or replay, then continue into the full YouTube playlist for previous worship gatherings."
                      ta="à®šà®®à¯€à®ªà®¤à¯à®¤à®¿à®¯ à®¨à¯‡à®°à®²à¯ˆ à®…à®²à¯à®²à®¤à¯ à®®à®±à¯à®ªà®¾à®°à¯à®µà¯ˆà®¯à¯ˆ à®ªà®¾à®°à¯à®™à¯à®•à®³à¯; à®ªà®¿à®±à®•à¯ à®®à¯à®¨à¯à®¤à¯ˆà®¯ à®†à®°à®¾à®¤à®©à¯ˆà®•à®³à¯ˆ à®®à¯à®´à¯ à®ªà®¿à®³à¯‡à®²à®¿à®¸à¯à®Ÿà®¿à®²à¯ à®¤à¯Šà®Ÿà®°à¯à®¨à¯à®¤à¯ à®ªà®¾à®°à¯à®™à¯à®•à®³à¯."
                      taClassName="font-tamil"
                    />
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={playlistHref}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm btn-primary"
                  >
                    <Lang en="Open YouTube" ta="à®¯à¯‚à®Ÿà®¿à®¯à¯‚à®ªà¯ à®¤à®¿à®±à®•à¯à®•" taClassName="font-tamil" />
                  </a>
                  <Link href="/sermons" className="btn btn-sm btn-secondary-invert">
                    <Lang en="Browse Sermons" ta="à®ªà®¿à®°à®šà®™à¯à®•à®™à¯à®•à®³à¯ˆ à®ªà®¾à®°à¯à®™à¯à®•à®³à¯" taClassName="font-tamil" />
                  </Link>
                </div>
              </div>

              <div className="aspect-video w-full bg-black">
                {videoId ? (
                  <YouTubeLiteEmbed
                    kind="video"
                    videoId={videoId}
                    title="Praise Tabernacle livestream"
                    load="click"
                    posterQuality="hq"
                  />
                ) : (
                  <YouTubeLiteEmbed
                    kind="playlist"
                    playlistId={siteConfig.youtubeServicesPlaylistId}
                    title="Praise Tabernacle services playlist"
                    load="click"
                  />
                )}
              </div>

              <div className="grid gap-4 border-t border-white/8 px-5 py-5 sm:grid-cols-3 sm:px-6">
                <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#dfb94f]">
                    <Lang en="Current focus" ta="à®¤à®±à¯à®ªà¯‹à®¤à¯ˆà®¯ à®•à®µà®©à®®à¯" taClassName="font-tamil" />
                  </div>
                  <div className="mt-3 text-base font-semibold text-white">
                    <Lang en={selected.titleEn} ta={selected.titleTa} taClassName="font-tamil" />
                  </div>
                  <div className="mt-2 text-sm text-white/62">{selected.timeEn}</div>
                </div>

                <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#dfb94f]">
                    <Lang en="Worship rhythm" ta="à®†à®°à®¾à®¤à®©à¯ˆ à®’à®´à¯à®™à¯à®•à¯" taClassName="font-tamil" />
                  </div>
                  <div className="mt-3 text-sm leading-7 text-white/66">
                    <Lang
                      en="Come ready with your Bible, gather your family, and worship prayerfully from home."
                      ta="à®‰à®™à¯à®•à®³à¯ à®µà¯‡à®¤à®¾à®•à®®à®¤à¯à®¤à¯à®Ÿà®©à¯, à®•à¯à®Ÿà¯à®®à¯à®ªà®¤à¯à®¤à¯à®Ÿà®©à¯, à®œà¯†à®ª à®®à®¨à®¤à¯à®Ÿà®©à¯ à®†à®°à®¾à®¤à®¨à¯ˆà®•à¯à®•à¯ à®‡à®£à¯ˆà®™à¯à®•à®³à¯."
                      taClassName="font-tamil"
                    />
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#dfb94f]">
                    <Lang en="Need prayer?" ta="à®œà¯†à®ªà®®à¯ à®¤à¯‡à®µà¯ˆà®¯à®¾?" taClassName="font-tamil" />
                  </div>
                  <div className="mt-3 text-sm leading-7 text-white/66">
                    <Lang
                      en="Reach out during the week and let our church family stand with you in prayer."
                      ta="à®µà®¾à®°à®¤à¯à®¤à®¿à®²à¯ à®Žà®ªà¯à®ªà¯‹à®¤à¯à®®à¯ à®Žà®™à¯à®•à®³à¯ à®šà®ªà¯ˆ à®•à¯à®Ÿà¯à®®à¯à®ªà®¤à¯à®¤à¯à®Ÿà®©à¯ à®œà¯†à®ªà®¤à¯à®¤à®¿à®²à¯ à®‡à®£à¯ˆà®™à¯à®•à®³à¯."
                      taClassName="font-tamil"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="xl:sticky xl:top-28 xl:self-start">
            <aside className="space-y-5 rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-5 shadow-[0_28px_70px_rgba(0,0,0,0.32)] backdrop-blur sm:p-6">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#dfb94f]">
                  <Lang en="Next live gathering" ta="à®…à®Ÿà¯à®¤à¯à®¤ à®¨à¯‡à®°à®²à¯ˆ à®†à®°à®¾à®¤à®©à¯ˆ" taClassName="font-tamil" />
                </div>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                  <Lang en="Join us this Sunday" ta="à®‡à®¨à¯à®¤ à®žà®¾à®¯à®¿à®±à¯ à®‡à®£à¯ˆà®™à¯à®•à®³à¯" taClassName="font-tamil" />
                </h2>
                <p className="mt-3 text-sm leading-7 text-white/68">
                  <Lang
                    en="Choose your service and be ready a few minutes early so worship can begin without distraction."
                    ta="à®‰à®™à¯à®•à®³à¯ à®†à®°à®¾à®¤à®©à¯ˆà®¯à¯ˆ à®¤à¯‡à®°à¯à®µà¯à®šà¯†à®¯à¯à®¤à¯, à®†à®°à®¾à®¤à®©à¯ˆ à®†à®°à®®à¯à®ªà®¿à®•à¯à®•à¯à®®à¯ à®®à¯à®©à¯ à®šà®¿à®² à®¨à®¿à®®à®¿à®Ÿà®™à¯à®•à®³à¯ à®®à¯à®©à¯à®©à®¤à®¾à®• à®¤à®¯à®¾à®°à®¾à®• à®‡à®°à¯à®™à¯à®•à®³à¯."
                    taClassName="font-tamil"
                  />
                </p>
              </div>

              <div className="rounded-[28px] border border-white/8 bg-white/[0.05] p-2">
                <NextLivestreamCountdown service={countdownService} />
              </div>

              <div className="rounded-[28px] border border-white/8 bg-white/[0.04] p-5">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full border border-white/12 bg-white/10">
                    <Image
                      src="/Pastor Mano.jpg"
                      alt="Pastor Mano"
                      fill
                      sizes="64px"
                      className="object-cover object-[center_18%]"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="text-base font-semibold text-white">{selected.pastorEn}</div>
                    <div className="text-sm text-white/58">{selected.pastorRoleEn}</div>
                  </div>
                </div>

                <div className="mt-5 grid gap-3">
                  <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#dfb94f]">English</div>
                    <div className="mt-1 text-sm text-white/72">Sunday at 9:15 AM</div>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#dfb94f]">Tamil</div>
                    <div className="mt-1 text-sm text-white/72">Sunday at 10:30 AM</div>
                  </div>
                </div>
              </div>

              <div className="grid gap-3">
                <a
                  href={givingHref}
                  target={givingHref.startsWith("http") ? "_blank" : undefined}
                  rel={givingHref.startsWith("http") ? "noreferrer" : undefined}
                  className="btn btn-primary w-full justify-center"
                >
                  <Lang en="Give Online" ta="à®†à®©à¯à®²à¯ˆà®©à®¿à®²à¯ à®•à¯Šà®Ÿà¯à®™à¯à®•à®³à¯" taClassName="font-tamil" />
                </a>
                <Link href="/prayer" className="btn btn-secondary-invert w-full justify-center">
                  <Lang en="Request Prayer" ta="à®œà¯†à®ªà®®à¯ à®•à¯‹à®°à¯à®™à¯à®•à®³à¯" taClassName="font-tamil" />
                </Link>
                <Link href="/magazine" className="btn btn-secondary-invert w-full justify-center">
                  <Lang en="View Church Magazine" ta="à®šà®ªà¯ˆ à®‡à®¤à®´à¯ˆ à®ªà®¾à®°à¯à®™à¯à®•à®³à¯" taClassName="font-tamil" />
                </Link>
              </div>
            </aside>
          </Reveal>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.1fr),minmax(0,0.9fr)]">
          <Reveal delay={1}>
            <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.24)] backdrop-blur sm:p-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#dfb94f]">
                    <Lang en="Choose your stream" ta="à®‰à®™à¯à®•à®³à¯ à®’à®³à®¿à®ªà®°à®ªà¯à®ªà¯ˆà®¤à¯ à®¤à¯‡à®°à¯à®µà¯à®šà¯†à®¯à¯à®•" taClassName="font-tamil" />
                  </div>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                    <Lang en="Pick the service that fits your household" ta="à®‰à®™à¯à®•à®³à¯ à®•à¯à®Ÿà¯à®®à¯à®ªà®¤à¯à®¤à®¿à®±à¯à®•à¯ à®ªà¯Šà®°à¯à®¤à¯à®¤à®®à®¾à®© à®†à®°à®¾à®¤à®©à¯ˆà®¯à¯ˆ à®¤à¯‡à®°à¯à®µà¯à®šà¯†à®¯à¯à®•" taClassName="font-tamil" />
                  </h2>
                </div>
                <div className="text-sm text-white/58">
                  <Lang en="Both services stream here every Sunday." ta="à®‡à®°à®£à¯à®Ÿà¯ à®†à®°à®¾à®¤à®©à¯ˆà®•à®³à¯à®®à¯ à®’à®µà¯à®µà¯Šà®°à¯ à®žà®¾à®¯à®¿à®±à¯à®®à¯ à®‡à®™à¯à®•à¯‡ à®’à®³à®¿à®ªà®°à®ªà¯à®ªà®¾à®•à¯à®®à¯." taClassName="font-tamil" />
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {serviceOptions.map((option) => {
                  const isActive = service === option.id || (service === null && option.id === 1)

                  return (
                    <Link
                      key={option.id}
                      href={option.href}
                      aria-current={isActive ? "page" : undefined}
                      className={[
                        "group rounded-[26px] border p-5 transition duration-300",
                        isActive
                          ? "border-[#dfb94f]/35 bg-[linear-gradient(180deg,rgba(223,185,79,0.18),rgba(223,185,79,0.08))] shadow-[0_24px_50px_rgba(223,185,79,0.12)]"
                          : "border-white/10 bg-white/[0.03] hover:border-white/18 hover:bg-white/[0.06]",
                      ].join(" ")}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-lg font-semibold text-white">{option.titleEn}</div>
                          <div className="mt-1 text-sm font-tamil text-white/66">{option.titleTa}</div>
                        </div>
                        <span
                          className={[
                            "rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]",
                            isActive ? "bg-[#f3df9b] text-[#3a2d05]" : "border border-white/12 bg-white/[0.05] text-white/58",
                          ].join(" ")}
                        >
                          {isActive ? "Selected" : "Watch"}
                        </span>
                      </div>
                      <div className="mt-5 text-sm font-semibold text-white/86">{option.timeEn}</div>
                      <div className="mt-1 text-sm font-tamil text-white/62">{option.timeTa}</div>
                      <p className="mt-4 text-sm leading-7 text-white/64">
                        <Lang en={option.noteEn} ta={option.noteTa} taClassName="font-tamil" />
                      </p>
                    </Link>
                  )
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={2}>
            <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.24)] backdrop-blur sm:p-7">
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#dfb94f]">
                <Lang en="Stay connected" ta="à®‡à®£à¯ˆà®¨à¯à®¤à®¿à®°à¯à®™à¯à®•à®³à¯" taClassName="font-tamil" />
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                <Lang en="Keep worship going through the week" ta="à®µà®¾à®°à®®à¯ à®®à¯à®´à¯à®µà®¤à¯à®®à¯ à®†à®°à®¾à®¤à®©à¯ˆà®¯à¯ˆ à®¤à¯Šà®Ÿà®°à¯à®™à¯à®•à®³à¯" taClassName="font-tamil" />
              </h2>

              <div className="mt-5 space-y-4 text-sm leading-7 text-white/68">
                <p>
                  <Lang
                    en="If you’re joining from home, prepare your Bible, set aside distractions, and worship with expectation in real time."
                    ta="à®¨à¯€à®™à¯à®•à®³à¯ à®µà¯€à®Ÿà¯à®Ÿà®¿à®²à®¿à®°à¯à®¨à¯à®¤à¯ à®‡à®£à¯ˆà®¯à¯à®®à¯à®ªà¯‹à®¤à¯, à®µà¯‡à®¤à®¾à®•à®®à®¤à¯à®¤à¯ˆà®¤à¯ à®¤à®¯à®¾à®°à®¿à®¤à¯à®¤à¯, à®‡à®Ÿà¯ˆà®žà¯à®šà®²à¯à®•à®³à¯ˆ à®’à®¤à¯à®•à¯à®•à®¿, à®Žà®¤à®¿à®°à¯à®ªà®¾à®°à¯à®ªà¯à®ªà¯à®Ÿà®©à¯ à®†à®°à®¾à®¤à®¨à¯ˆà®•à¯à®•à¯ à®‡à®£à¯ˆà®™à¯à®•à®³à¯."
                    taClassName="font-tamil"
                  />
                </p>
                <p>
                  <Lang
                    en="After the stream, continue with prayer, giving, and sermon replays using the links below."
                    ta="à®¨à¯‡à®°à®²à¯ˆà®•à¯à®•à¯à®ªà¯ à®ªà®¿à®±à®•à¯, à®•à¯€à®´à¯‡ à®‰à®³à¯à®³ à®‡à®£à¯ˆà®ªà¯à®ªà¯à®•à®³à¯ à®®à¯‚à®²à®®à¯ à®œà¯†à®ªà®®à¯, à®•à¯Šà®Ÿà¯ˆ, à®®à®±à¯à®±à¯à®®à¯ à®®à®±à¯à®ªà®¾à®°à¯à®µà¯ˆ à®ªà®¿à®°à®šà®™à¯à®•à®™à¯à®•à®³à¯ˆà®¤à¯ à®¤à¯Šà®Ÿà®°à¯à®™à¯à®•à®³à¯."
                    taClassName="font-tamil"
                  />
                </p>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Link href="/prayer" className="btn btn-secondary-invert w-full justify-center">
                  <Lang en="Request Prayer" ta="à®œà¯†à®ªà®®à¯ à®•à¯‹à®°à¯à®™à¯à®•à®³à¯" taClassName="font-tamil" />
                </Link>
                <Link href="/contact" className="btn btn-secondary-invert w-full justify-center">
                  <Lang en="Contact Church" ta="à®šà®ªà¯ˆà®¯à¯ˆ à®¤à¯Šà®Ÿà®°à¯à®ªà¯à®•à¯Šà®³à¯à®³" taClassName="font-tamil" />
                </Link>
                <Link href="/sermons" className="btn btn-secondary-invert w-full justify-center">
                  <Lang en="Browse Sermons" ta="à®ªà®¿à®°à®šà®™à¯à®•à®™à¯à®•à®³à¯ˆ à®ªà®¾à®°à¯à®™à¯à®•à®³à¯" taClassName="font-tamil" />
                </Link>
                <a
                  href={playlistHref}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary w-full justify-center"
                >
                  <Lang en="Full Playlist" ta="à®®à¯à®´à¯ à®ªà®¿à®³à¯‡à®²à®¿à®¸à¯à®Ÿà¯" taClassName="font-tamil" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
