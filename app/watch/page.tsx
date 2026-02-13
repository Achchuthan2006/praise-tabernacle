import type { Metadata } from "next"
import Link from "next/link"

import Lang from "@/components/language/Lang"
import NextLivestreamCountdown from "@/components/NextLivestreamCountdown"
import Container from "@/components/ui/Container"
import Reveal from "@/components/ui/Reveal"
import YouTubeLiteEmbed from "@/components/YouTubeLiteEmbed"
import { formatIsoDate } from "@/lib/dates"
import { pageMetadata } from "@/lib/seo"
import { sermons } from "@/lib/sermons"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Watch",
  description: "Watch our latest service livestream and browse the sermon library.",
  path: "/watch",
})

function pickFeaturedSermon() {
  const sorted = sermons.slice().sort((a, b) => b.dateIso.localeCompare(a.dateIso))
  return sorted.find((s) => Boolean(s.youtubeVideoId)) ?? sorted[0] ?? null
}

function pickFeaturedSermonForService(service: 1 | 2 | null) {
  if (!service) return pickFeaturedSermon()

  const sorted = sermons.slice().sort((a, b) => b.dateIso.localeCompare(a.dateIso))
  const wantLang = service === 1 ? "en" : "ta"

  return (
    sorted.find((s) => Boolean(s.youtubeVideoId) && s.language === wantLang) ??
    sorted.find((s) => {
      if (!s.youtubeVideoId) return false
      if (!/(?:^|\\s)(1st|2nd)\\s+service\\b/i.test(s.title)) return false
      return service === 1 ? /1st/i.test(s.title) : /2nd/i.test(s.title)
    }) ??
    pickFeaturedSermon()
  )
}

function formatMonthDay(dateIso: string) {
  const month = formatIsoDate(dateIso, "en-CA", { month: "short" }).toUpperCase()
  const day = formatIsoDate(dateIso, "en-CA", { day: "2-digit" })
  return { month, day }
}

export default function WatchPage({ searchParams }: { searchParams?: { service?: string } }) {
  const service = searchParams?.service === "1" ? 1 : searchParams?.service === "2" ? 2 : null
  const featured = pickFeaturedSermonForService(service)
  const { month, day } = featured ? formatMonthDay(featured.dateIso) : { month: "", day: "" }
  const videoId = featured?.youtubeVideoId ?? ""

  const watchUrl = videoId
    ? `https://www.youtube.com/watch?v=${videoId}`
    : siteConfig.youtubeServicesPlaylistUrl || siteConfig.youtubeChannelUrl

  const playlistUrl = siteConfig.youtubeServicesPlaylistUrl || siteConfig.youtubeChannelUrl
  const preferredService = service ?? 1
  const calendarGoogle = siteConfig.calendar.googleWebUrl
  const calendarIcal = siteConfig.calendar.googleIcalUrl

  return (
    <section className="bg-white">
      <Container className="section-padding">
        <div className="mx-auto w-full max-w-7xl">
          <Reveal>
            <div className="flex flex-col gap-4 border-b border-churchBlue/10 pb-6 md:flex-row md:items-end md:justify-between">
              <div className="min-w-0">
                <h1 className="text-3xl font-semibold tracking-tight text-churchBlue sm:text-4xl">
                  <Lang
                    en={
                      service === 1
                        ? "Watch 1st Service (English)"
                        : service === 2
                          ? "Watch 2nd Service (Tamil)"
                          : "Watch Our Service"
                    }
                    ta={
                      service === 1
                        ? "முதலாவது ஆராதனை (ஆங்கிலம்)"
                        : service === 2
                          ? "இரண்டாவது ஆராதனை (தமிழ்)"
                          : "ஆராதனையை பாருங்கள்"
                    }
                    taClassName="font-tamil"
                  />
                </h1>
                <p className="mt-2 max-w-2xl text-sm text-churchBlue/70">
                  Latest upload is ready below. Join live or watch the replay anytime.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <Link
                    href="/watch"
                    className={["btn btn-sm", service === null ? "btn-primary" : "btn-secondary"].join(" ")}
                  >
                    <Lang en="Latest" ta="சமீபம்" taClassName="font-tamil" />
                  </Link>
                  <Link
                    href="/watch?service=1"
                    className={["btn btn-sm", service === 1 ? "btn-primary" : "btn-secondary"].join(" ")}
                  >
                    <Lang en="1st service" ta="முதல் ஆராதனை" taClassName="font-tamil" />
                  </Link>
                  <Link
                    href="/watch?service=2"
                    className={["btn btn-sm", service === 2 ? "btn-primary" : "btn-secondary"].join(" ")}
                  >
                    <Lang en="2nd service" ta="இரண்டாம் ஆராதனை" taClassName="font-tamil" />
                  </Link>
                  <a href={playlistUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-secondary">
                    <Lang en="YouTube playlist" ta="YouTube பட்டியல்" taClassName="font-tamil" />
                  </a>
                </div>
              </div>

              <Link href="/sermons#library" className="btn btn-md btn-secondary md:flex-shrink-0">
                <Lang en="View sermon library" ta="பிரசங்க நூலகம்" taClassName="font-tamil" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-8 grid w-full gap-6">
            <Reveal delay={1}>
              <div className="overflow-hidden rounded-3xl border border-churchBlue/10 bg-white shadow-glow">
                <div className="aspect-video w-full bg-churchBlueSoft">
                  {videoId ? (
                    <YouTubeLiteEmbed
                      kind="video"
                      videoId={videoId}
                      title={
                        featured?.title
                          ? `Praise Tabernacle - ${featured.title}`
                          : "Praise Tabernacle - Latest service"
                      }
                      load="click"
                      posterQuality="hq"
                    />
                  ) : (
                    <YouTubeLiteEmbed
                      kind="playlist"
                      playlistId={siteConfig.youtubeServicesPlaylistId}
                      title="Praise Tabernacle - Services playlist"
                      load="click"
                    />
                  )}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2 text-xs text-churchBlue/70">
                  <span className="rounded-full border border-churchBlue/10 bg-white px-3 py-1 font-semibold">
                    Latest upload
                  </span>
                  <span>Press play to start, or open YouTube for the full livestream page.</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <a href={watchUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">
                    <Lang en="Open on YouTube" ta="YouTube-ல் திற" taClassName="font-tamil" />
                  </a>
                  <Link href="/sermons" className="btn btn-sm btn-secondary">
                    <Lang en="Sermon library" ta="பிரசங்க நூலகம்" taClassName="font-tamil" />
                  </Link>
                </div>
              </div>
            </Reveal>

            <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
              <Reveal className="w-full lg:col-span-4" delay={2}>
                <NextLivestreamCountdown service={preferredService} />
                {featured ? (
                  <div className="mt-5 rounded-3xl border border-churchBlue/10 bg-white p-5 shadow-glow">
                    <div className="flex items-center gap-4">
                      <div className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft px-3 py-2 text-center">
                        <div className="text-[11px] font-semibold tracking-wide text-churchBlue/60">
                          {month}
                        </div>
                        <div className="text-3xl font-extrabold tracking-tight text-churchBlue">{day}</div>
                      </div>
                      <div className="min-w-0 text-sm text-churchBlue/70">
                        <div className="text-xs font-semibold tracking-wide text-churchBlue/60">Latest</div>
                        <div className="mt-1 font-semibold text-churchBlue">{featured.title}</div>
                        <div className="mt-1 text-xs text-churchBlue/60">
                          {featured.dateIso ? formatIsoDate(featured.dateIso, "en-CA", { year: "numeric", month: "short", day: "2-digit" }) : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </Reveal>

              <Reveal className="w-full lg:col-span-8" delay={3}>
                <div className="rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow sm:p-8">
                  <p className="text-sm leading-relaxed text-churchBlue/70 sm:text-base">
                    <Lang
                      en={
                        <>
                          Every Sunday we come together to lift high the name of Jesus with worship, corporate prayer,
                          and teaching from God&apos;s Word. Our services are streamed on YouTube and available in our sermon library.
                        </>
                      }
                      ta={
                        <>
                          ஒவ்வொரு ஞாயிறும் நாம் ஆராதனை, ஒருமித்த ஜெபம், மற்றும் தேவ வார்த்தையின் போதனை உடன் ஒன்றாக சேர்ந்து
                          இயேசுவின் நாமத்தை உயர்த்துகிறோம். ஆராதனைகள் YouTube-ல் ஒளிபரப்பப்படுகின்றன; பிரசங்க நூலகத்திலும் பார்க்கலாம்.
                        </>
                      }
                      taClassName="font-tamil"
                    />
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <Link href="/visit" className="btn btn-md btn-secondary w-full">
                      <Lang en="Plan your visit" ta="வருகையை திட்டமிட" taClassName="font-tamil" />
                    </Link>
                    <a href={watchUrl} target="_blank" rel="noreferrer" className="btn btn-md btn-primary w-full">
                      <Lang en="Watch livestream" ta="நேரலை பார்க்க" taClassName="font-tamil" />
                    </a>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link href="/events/calendar" className="btn btn-sm btn-secondary">
                      <Lang en="Add to calendar (iCal)" ta="iCal மூலமாக சேர்க்க" taClassName="font-tamil" />
                    </Link>
                    {calendarGoogle ? (
                      <a href={calendarGoogle} target="_blank" rel="noreferrer" className="btn btn-sm btn-secondary">
                        <Lang en="Open Google Calendar" ta="Google Calendar-ல் திறக்க" taClassName="font-tamil" />
                      </a>
                    ) : null}
                    {calendarIcal ? (
                      <a href={calendarIcal} target="_blank" rel="noreferrer" className="btn btn-sm btn-secondary">
                        <Lang en="Google Calendar iCal link" ta="Google iCal இணைப்பு" taClassName="font-tamil" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
