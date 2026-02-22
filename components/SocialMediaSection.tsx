import Image from "next/image"

import Lang from "@/components/language/Lang"
import YouTubeSubscribeWidget from "@/components/YouTubeSubscribeWidget"
import Container from "@/components/ui/Container"
import Reveal from "@/components/ui/Reveal"
import { instagramWallImages, socialFeed, type SocialPost } from "@/lib/social"
import { siteConfig } from "@/lib/site"
import { fetchYouTubePlaylistFeed } from "@/lib/youtubeFeed"

function youtubeSubscribeUrl() {
  if (!siteConfig.youtubeChannelUrl) return ""
  return `${siteConfig.youtubeChannelUrl}?sub_confirmation=1`
}

function formatDateLabel(iso: string) {
  try {
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return ""
    return new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "short", day: "2-digit" }).format(d)
  } catch {
    return ""
  }
}

export default async function SocialMediaSection() {
  const subscribeUrl = youtubeSubscribeUrl()

  let liveFeed: SocialPost[] | null = null
  const uploadsPlaylistId = (siteConfig.youtubeUploadsPlaylistId ?? "").trim()
  if (uploadsPlaylistId) {
    const yt = await fetchYouTubePlaylistFeed(uploadsPlaylistId, { limit: 3 })
    if (yt?.length) {
      liveFeed = [
        ...yt.map((v) => ({
          id: `yt:${v.videoId}`,
          platform: "YouTube" as const,
          title: v.title,
          excerpt: "Latest upload",
          href: v.url,
          dateLabel: formatDateLabel(v.publishedAt) || "Latest",
        })),
        ...socialFeed.filter((p) => p.platform !== "YouTube"),
      ]
    }
  }

  return (
    <section className="relative bg-white">
      <Container className="section-padding">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="section-kicker">
              <Lang en="Social" ta="சமூக ஊடகம்" taClassName="font-tamil" />
            </div>
            <h2 className="section-heading mt-2">
              <Lang en="Church life this week" ta="இந்த வாரம் எங்கள் வாழ்க்கை" taClassName="font-tamil" />
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-churchBlue/70 sm:text-base">
              <Lang
                en="Follow along for highlights, announcements, and stories from our community."
                ta="சிறப்பு நிகழ்வுகள், அறிவிப்புகள், சமூகக் கதைகள் - அனைத்தும் இங்கே."
                taClassName="font-tamil"
              />
            </p>
          </Reveal>

          <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-start">
            <Reveal className="w-full md:w-5/12">
              <div className="rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow">
                <div className="text-sm font-semibold text-churchBlue/70">
                  <Lang en="Live feed" ta="நேரலை புதுப்பிப்புகள்" taClassName="font-tamil" />
                </div>
                <div className="mt-4 space-y-5">
                  {(liveFeed ?? socialFeed).map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="block w-full rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-5 transition-colors hover:bg-white"
                    >
                      <div className="text-xs font-semibold tracking-wide text-churchBlue/60">{item.platform}</div>
                      <div className="mt-2 text-sm font-semibold text-churchBlue">{item.title}</div>
                      <div className="mt-1 text-sm text-churchBlue/70">{item.excerpt}</div>
                      <div className="mt-2 text-xs text-churchBlue/55">{item.dateLabel}</div>
                    </a>
                  ))}
                </div>

                {subscribeUrl ? (
                  <div className="mt-6 rounded-2xl border border-churchBlue/10 bg-white p-4">
                    <div className="text-sm font-semibold text-churchBlue">YouTube</div>
                    <p className="mt-2 text-sm text-churchBlue/70">
                      <Lang
                        en="Subscribe for new sermons and livestreams."
                        ta="புதிய பிரசங்கங்களுக்காக YouTube-ல் subscribe செய்யுங்கள்."
                        taClassName="font-tamil"
                      />
                    </p>
                    <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <YouTubeSubscribeWidget channelUrl={siteConfig.youtubeChannelUrl} />
                      <a href={subscribeUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">
                        <Lang en="Subscribe" ta="Subscribe" taClassName="font-tamil" />
                      </a>
                    </div>
                  </div>
                ) : null}
              </div>
            </Reveal>

            <Reveal className="w-full md:w-7/12" delay={1}>
              <div className="rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <div className="text-sm font-semibold text-churchBlue/70">
                      <Lang en="Instagram wall" ta="Instagram சுவர்படங்கள்" taClassName="font-tamil" />
                    </div>
                    <h3 className="mt-1 text-lg font-semibold text-churchBlue">
                      <Lang en="Moments from church life" ta="எங்கள் வாழ்க்கைத் தருணங்கள்" taClassName="font-tamil" />
                    </h3>
                  </div>
                  {siteConfig.instagramUrl ? (
                    <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-secondary">
                      <Lang en="Open Instagram" ta="Instagram திற" taClassName="font-tamil" />
                    </a>
                  ) : null}
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
                  {instagramWallImages.map((img) => (
                    <a
                      key={img.id}
                      href={siteConfig.instagramUrl || undefined}
                      target={siteConfig.instagramUrl ? "_blank" : undefined}
                      rel={siteConfig.instagramUrl ? "noreferrer" : undefined}
                      className="relative aspect-square overflow-hidden rounded-2xl border border-churchBlue/10 block"
                      aria-label={siteConfig.instagramUrl ? `Open Instagram: ${img.alt}` : img.alt}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(min-width: 1024px) 200px, 33vw"
                        className="object-cover"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
