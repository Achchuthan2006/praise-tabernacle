import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import YouTubeLiteEmbed from "@/components/YouTubeLiteEmbed"
import { siteConfig } from "@/lib/site"

export default function LatestSermonsPlaylist({
  variant = "page",
}: {
  variant?: "home" | "page"
}) {
  return (
    <section className={variant === "home" ? "bg-[linear-gradient(180deg,#f6f1e8_0%,#f2f0f7_100%)]" : "bg-white"}>
      <Container className="section-padding">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="section-kicker">
              <Lang en="Watch" ta="பாருங்கள்" taClassName="font-tamil" />
            </div>
            <h2 className="section-heading">
              <Lang en="Watch Our Service" ta="எங்கள் ஆராதனையை பாருங்கள்" taClassName="font-tamil" />
            </h2>
            <p className="mt-1 text-sm text-churchBlue/70">
              <Lang
                en="Watch our Tamil and English services online (YouTube)."
                ta="எங்கள் தமிழ் மற்றும் ஆங்கில ஆராதனைகளை ஆன்லைனில் (யூடியூப்) பாருங்கள்."
                taClassName="font-tamil"
              />
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <a
              href={siteConfig.youtubeServicesPlaylistUrl || siteConfig.youtubeChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-secondary"
            >
              <Lang en="YouTube playlist" ta="யூடியூப் பிளேலிஸ்ட்" taClassName="font-tamil" />
            </a>
            {siteConfig.spotifyUrl ? (
              <a
                href={siteConfig.spotifyUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-secondary"
              >
                <Lang en="Listen on Spotify" ta="ஸ்பாட்டிபையில் கேளுங்கள்" taClassName="font-tamil" />
              </a>
            ) : null}
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-3xl border border-churchBlue/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,246,241,0.98)_100%)] shadow-[0_22px_44px_rgb(18_27_62_/_0.08)] fade-up sm:mt-10">
          <div className="aspect-video w-full bg-[linear-gradient(180deg,#f4f0e8_0%,#e9edf7_100%)]">
            <YouTubeLiteEmbed
              kind="playlist"
              playlistId={siteConfig.youtubeServicesPlaylistId}
              title="Praise Tabernacle Mississauga - Latest Sermons"
              load={variant === "home" ? "click" : "visible"}
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
