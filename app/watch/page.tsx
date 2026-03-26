import type { Metadata } from "next"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import Reveal from "@/components/ui/Reveal"
import YouTubeLiteEmbed from "@/components/YouTubeLiteEmbed"
import { pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"
import { getLatestYouTubeSermon } from "@/lib/youtubeSermons"

export const metadata: Metadata = pageMetadata({
  title: "Watch",
  description: "Watch our Tamil and English services online.",
  path: "/watch",
})

export default async function WatchPage({
  searchParams,
}: {
  searchParams?: Promise<{ service?: string }>
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined
  const service =
    resolvedSearchParams?.service === "1" ? 1 : resolvedSearchParams?.service === "2" ? 2 : null
  const latestSermon = await getLatestYouTubeSermon(service)
  const videoId = latestSermon?.youtubeVideoId ?? ""
  const watchTitleEn =
    service === 2 ? "Watch Our Tamil Service" : service === 1 ? "Watch Our English Service" : "Watch Our Service"
  const watchTitleTa =
    service === 2
      ? "எங்கள் தமிழ் ஆராதனையை பாருங்கள்"
      : service === 1
        ? "எங்கள் ஆங்கில ஆராதனையை பாருங்கள்"
        : "எங்கள் ஆராதனையை பாருங்கள்"

  return (
    <section className="bg-[linear-gradient(180deg,#ffffff_0%,#f8f8fd_100%)]">
      <Container className="section-padding pt-10 md:pt-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="overflow-hidden rounded-[32px] border border-churchBlue/10 bg-[radial-gradient(28rem_18rem_at_10%_10%,rgba(248,202,69,0.14),transparent_42%),radial-gradient(28rem_18rem_at_88%_12%,rgba(109,51,230,0.16),transparent_42%),linear-gradient(180deg,#ffffff_0%,#f7f8fe_100%)] px-6 py-8 shadow-[0_28px_60px_rgb(26_35_72_/_0.08)] sm:px-8 md:px-10 md:py-10">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <div className="section-kicker">
                    <Lang en="Watch" ta="பாருங்கள்" taClassName="font-tamil" />
                  </div>
                  <h1 className="section-heading max-w-3xl">
                    <Lang en={watchTitleEn} ta={watchTitleTa} taClassName="font-tamil" />
                  </h1>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-churchBlue/72 sm:text-base">
                    <Lang
                      en="Join our Tamil and English services online and stay connected with worship, prayer, and the Word throughout the week."
                      ta="எங்கள் தமிழ் மற்றும் ஆங்கில ஆராதனைகளை ஆன்லைனில் பாருங்கள். வாரம் முழுவதும் ஆராதனை, ஜெபம் மற்றும் தேவவார்த்தையுடன் இணைந்திருங்கள்."
                      taClassName="font-tamil"
                    />
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <div className="rounded-full border border-churchBlue/10 bg-white/90 px-4 py-2 text-sm font-semibold text-churchBlue shadow-[0_10px_20px_rgb(26_35_72_/_0.06)]">
                      <Lang en="Tamil & English services" ta="தமிழ் மற்றும் ஆங்கில ஆராதனைகள்" taClassName="font-tamil" />
                    </div>
                    <div className="rounded-full border border-churchBlue/10 bg-white/90 px-4 py-2 text-sm font-semibold text-churchBlue shadow-[0_10px_20px_rgb(26_35_72_/_0.06)]">
                      <Lang en="Latest sermon available" ta="சமீபத்திய ஆராதனை கிடைக்கிறது" taClassName="font-tamil" />
                    </div>
                    <div className="rounded-full border border-churchBlue/10 bg-white/90 px-4 py-2 text-sm font-semibold text-churchBlue shadow-[0_10px_20px_rgb(26_35_72_/_0.06)]">
                      <Lang en="YouTube streaming" ta="யூடியூப் ஒளிபரப்பு" taClassName="font-tamil" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 lg:items-end">
                  <div className="rounded-3xl border border-churchBlue/10 bg-white/90 px-5 py-4 text-sm text-churchBlue/75 shadow-[0_14px_28px_rgb(15_23_42_/_0.08)]">
                    <div className="font-semibold text-churchBlue">
                      <Lang en="Worship online" ta="ஆன்லைனில் ஆராதியுங்கள்" taClassName="font-tamil" />
                    </div>
                    <div className="mt-1">
                      <Lang
                        en="Watch the latest service or open the full playlist."
                        ta="சமீபத்திய ஆராதனையை பாருங்கள் அல்லது முழு பிளேலிஸ்டை திறக்குங்கள்."
                        taClassName="font-tamil"
                      />
                    </div>
                  </div>

                  <a
                    href={siteConfig.youtubeServicesPlaylistUrl || siteConfig.youtubeChannelUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm btn-secondary rounded-full px-6 shadow-[0_14px_28px_rgb(15_23_42_/_0.08)]"
                  >
                    <Lang en="YouTube playlist" ta="யூடியூப் பிளேலிஸ்ட்" taClassName="font-tamil" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div className="mt-8 overflow-hidden rounded-[34px] border border-[#d9ddef] bg-white shadow-[0_30px_70px_rgb(26_35_72_/_0.14)]">
              <div className="flex flex-col gap-3 border-b border-churchBlue/10 bg-[linear-gradient(180deg,#ffffff_0%,#f8f9ff_100%)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.24em] text-churchBlue/55">
                    <Lang en="Featured Service" ta="முக்கிய ஆராதனை" taClassName="font-tamil" />
                  </div>
                  <div className="mt-1 text-sm font-semibold text-churchBlue sm:text-base">
                    {latestSermon?.title ?? "Praise Tabernacle Services Playlist"}
                  </div>
                </div>
                <div className="rounded-full border border-churchBlue/10 bg-white px-4 py-2 text-xs font-semibold text-churchBlue/70">
                  <Lang
                    en={videoId ? "Latest message ready to watch" : "Playlist ready to watch"}
                    ta={videoId ? "சமீபத்திய செய்தி பார்க்க தயாராக உள்ளது" : "பிளேலிஸ்ட் பார்க்க தயாராக உள்ளது"}
                    taClassName="font-tamil"
                  />
                </div>
              </div>

              <div className="aspect-video w-full bg-[radial-gradient(36rem_20rem_at_14%_8%,rgba(248,202,69,0.12),transparent_38%),radial-gradient(34rem_22rem_at_84%_10%,rgba(109,51,230,0.16),transparent_42%),linear-gradient(180deg,#f7f8ff_0%,#edf1ff_100%)]">
                {videoId ? (
                  <YouTubeLiteEmbed
                    kind="video"
                    videoId={videoId}
                    title="Praise Tabernacle - Latest service"
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
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
