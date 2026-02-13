import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import YouTubeLiteEmbed from "@/components/lazy/YouTubeLiteEmbedLazy"
import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { getPromiseVideo, type PromiseKind } from "@/lib/promises"
import { pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

export function generateStaticParams() {
  return [{ kind: "month" }, { kind: "year" }]
}

export async function generateMetadata({
  params,
}: {
  params: { kind: string } | Promise<{ kind: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const kind = resolvedParams.kind === "month" || resolvedParams.kind === "year" ? resolvedParams.kind : null
  if (!kind) return { title: "Promises" }

  const p = getPromiseVideo(kind)
  if (!p) return { title: "Promises" }

  const videoId = (p.youtubeVideoId ?? "").trim()
  return pageMetadata({
    title: p.titleEn,
    description: p.descriptionEn,
    path: `/promises/${kind}`,
    openGraphType: "video.other",
    image: videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : siteConfig.branding.logoEnBgSrc,
  })
}

export default async function PromiseDetailPage({
  params,
  searchParams,
}: {
  params: { kind: string } | Promise<{ kind: string }>
  searchParams?: { play?: string } | Promise<{ play?: string }>
}) {
  const resolvedParams = await params
  const resolvedSearchParams = searchParams ? await searchParams : undefined

  const kind = resolvedParams.kind === "month" || resolvedParams.kind === "year" ? (resolvedParams.kind as PromiseKind) : null
  if (!kind) notFound()

  const p = getPromiseVideo(kind)
  if (!p) notFound()

  const videoId = (p.youtubeVideoId ?? "").trim()
  const play = resolvedSearchParams?.play === "1"
  const graphicSrc = (p.graphicSrc ?? "").trim()

  return (
    <>
      <PageHeader
        titleEn={p.titleEn}
        titleTa={p.titleTa}
        descriptionEn={p.descriptionEn}
        descriptionTa={p.descriptionTa}
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
                          title={p.titleEn}
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
                          en="Add the YouTube video id in lib/promises.ts to enable playback here."
                          ta="இங்கே பார்க்க YouTube video id-ஐ lib/promises.ts-இல் சேர்க்கவும்."
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
                    <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                      <Lang en="Promise verse" ta="வாக்குத்தத்த வசனம்" taClassName="font-tamil" />
                    </div>
                    <div className="mt-2 text-sm font-semibold text-churchBlue">
                      <Lang en={p.verseRefEn} ta={p.verseRefTa} taClassName="font-tamil" />
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                      <Lang en={p.verseTextEn} ta={p.verseTextTa} taClassName="font-tamil" />
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={2}>
                  <div className="mt-6 rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow">
                    <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                      <Lang en="Notes" ta="குறிப்புகள்" taClassName="font-tamil" />
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                      <Lang
                        en="Use this space to add a short explanation of the verse and how to apply it this month/year."
                        ta="இந்த இடத்தில் வசனத்தின் சுருக்க விளக்கத்தையும், அதை வாழ்க்கையில் எப்படி பயன்படுத்தலாம் என்பதையும் எழுதலாம்."
                        taClassName="font-tamil"
                      />
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={3}>
                  <div id="transcript" className="mt-6 rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow">
                    <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                      <Lang en="Transcript" ta="உரை (Transcript)" taClassName="font-tamil" />
                    </div>
                    <div className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                      {p.transcriptText ? (
                        <Lang en={p.transcriptText} ta={p.transcriptText} taClassName="font-tamil" />
                      ) : (
                        <Lang
                          en="Transcript coming soon."
                          ta="உரை விரைவில்."
                          taClassName="font-tamil"
                        />
                      )}
                    </div>
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-4">
                <div className="rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-6 shadow-glow">
                  <div className="text-sm font-semibold text-churchBlue">
                    <Lang en="More" ta="மேலும்" taClassName="font-tamil" />
                  </div>
                  <div className="mt-4 grid gap-2">
                    {graphicSrc ? (
                      <a href={graphicSrc} download className="btn btn-sm btn-primary w-full">
                        <Lang en="Download graphic" ta="படத்தை பதிவிறக்கம்" taClassName="font-tamil" />
                      </a>
                    ) : null}
                    <Link href="/promises" className="btn btn-sm btn-secondary w-full">
                      <Lang en="Back to promises" ta="வாக்குத்தத்தங்கள்" taClassName="font-tamil" />
                    </Link>
                    <Link href="/promises/daily" className="btn btn-sm btn-secondary w-full">
                      <Lang en="Today's promise" ta="இன்றைய வாக்குத்தத்தம்" taClassName="font-tamil" />
                    </Link>
                    <Link href="/sermons" className="btn btn-sm btn-secondary w-full">
                      <Lang en="Sermon library" ta="பிரசங்க நூலகம்" taClassName="font-tamil" />
                    </Link>
                    {videoId ? (
                      <a
                        className="btn btn-sm btn-secondary w-full"
                        href={`https://www.youtube.com/watch?v=${videoId}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Lang en="Watch on YouTube" ta="YouTube-ல் பார்க்க" taClassName="font-tamil" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
