import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import YouTubeLiteEmbed from "@/components/lazy/YouTubeLiteEmbedLazy"
import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { getDailyPromiseForDate, PROMISES_TIMEZONE } from "@/lib/promises"
import { pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

export const dynamic = "force-dynamic"

export async function generateMetadata(): Promise<Metadata> {
  const { promise } = getDailyPromiseForDate(new Date(), PROMISES_TIMEZONE)
  const videoId = (promise.youtubeVideoId ?? "").trim()
  return pageMetadata({
    title: "Today's Promise",
    description: promise.descriptionEn || "Daily promise verse with a short devotional video.",
    path: "/promises/daily",
    openGraphType: "video.other",
    image: videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : siteConfig.branding.logoEnBgSrc,
  })
}

export default async function DailyPromisePage({
  searchParams,
}: {
  searchParams?: { play?: string } | Promise<{ play?: string }>
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined
  const play = resolvedSearchParams?.play === "1"

  const { isoDate, promise } = getDailyPromiseForDate(new Date(), PROMISES_TIMEZONE)
  const videoId = (promise.youtubeVideoId ?? "").trim()
  const graphicSrc = (promise.graphicSrc ?? "").trim() || "/verse-1.webp"

  return (
    <>
      <PageHeader
        titleEn="Today's Promise"
        titleTa="இன்றைய வாக்குத்தத்தம்"
        descriptionEn="A daily promise verse with a short devotional video and a shareable graphic."
        descriptionTa="தினசரி வாக்குத்தத்த வசனம் — குறுந் தியான வீடியோவும் பகிரக்கூடிய படமும்."
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
                          title={promise.verseRefEn}
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
                          en="Add a 2–3 minute YouTube devotional id in lib/promises.ts (dailyPromises) to enable playback here."
                          ta="இங்கே இயக்க 2–3 நிமிட YouTube தியான வீடியோ id-ஐ lib/promises.ts (dailyPromises) இல் சேர்க்கவும்."
                          taClassName="font-tamil"
                        />
                      </p>
                      <a
                        href={siteConfig.youtubeChannelUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex items-center justify-center rounded-xl border border-churchBlue/15 bg-white px-4 py-2 text-sm font-semibold text-churchBlue transition-colors hover:bg-churchBlueSoft focus-ring"
                      >
                        <Lang en="Open YouTube channel" ta="YouTube சேனல்" taClassName="font-tamil" />
                      </a>
                    </div>
                  )}
                </Reveal>

                <Reveal delay={1}>
                  <div className="mt-8 rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                        <Lang en="Daily promise verse" ta="தினசரி வாக்குத்தத்த வசனம்" taClassName="font-tamil" />
                      </div>
                      <div className="text-xs font-semibold tracking-wide text-churchBlue/55">{isoDate}</div>
                    </div>
                    <div className="mt-2 text-sm font-semibold text-churchBlue">
                      <Lang en={promise.verseRefEn} ta={promise.verseRefTa} taClassName="font-tamil" />
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                      <Lang en={promise.verseTextEn} ta={promise.verseTextTa} taClassName="font-tamil" />
                    </p>
                    <p className="mt-4 text-sm text-churchBlue/70">
                      <Lang en={promise.descriptionEn} ta={promise.descriptionTa} taClassName="font-tamil" />
                    </p>
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-4">
                <Reveal>
                  <div className="rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-6 shadow-glow">
                    <div className="text-sm font-semibold text-churchBlue">
                      <Lang en="Share graphic" ta="பகிரும் படம்" taClassName="font-tamil" />
                    </div>
                    <p className="mt-2 text-sm text-churchBlue/70">
                      <Lang
                        en="Download and share this promise on social media."
                        ta="இந்த வாக்குத்தத்தத்தைப் பதிவிறக்கம் செய்து சமூக ஊடகங்களில் பகிருங்கள்."
                        taClassName="font-tamil"
                      />
                    </p>

                    <div className="mt-4 overflow-hidden rounded-2xl border border-churchBlue/10 bg-white">
                      <div className="relative aspect-[4/3] w-full bg-churchBlueSoft">
                        <Image
                          src={graphicSrc}
                          alt="Promise graphic"
                          fill
                          sizes="(max-width: 1024px) 100vw, 360px"
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <div className="mt-4 grid gap-2">
                      <a href={graphicSrc} download className="btn btn-sm btn-primary w-full">
                        <Lang en="Download graphic" ta="படத்தை பதிவிறக்கம்" taClassName="font-tamil" />
                      </a>
                      <a href={graphicSrc} target="_blank" rel="noreferrer" className="btn btn-sm btn-secondary w-full">
                        <Lang en="Open image" ta="படத்தை திறக்க" taClassName="font-tamil" />
                      </a>
                    </div>

                    <div className="mt-6 grid gap-2">
                      <Link href="/promises" className="btn btn-sm btn-secondary w-full">
                        <Lang en="All promises" ta="அனைத்து வாக்குத்தத்தங்கள்" taClassName="font-tamil" />
                      </Link>
                      <Link href="/partnership" className="btn btn-sm btn-secondary w-full">
                        <Lang en="Support the mission" ta="சேவைக்கு ஆதரவு" taClassName="font-tamil" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

