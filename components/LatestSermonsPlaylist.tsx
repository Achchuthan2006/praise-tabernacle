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
    <section className={variant === "home" ? "bg-churchBlueSoft" : "bg-white"}>
      <Container className="section-padding">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="section-kicker">
              <Lang en="Watch" ta="பாருங்கள்" />
            </div>
            <h2 className="section-heading">
              <Lang en="Watch Our Service" ta="எங்கள் ஆராதனையை பாருங்கள்" />
            </h2>
            <p className="mt-1 text-sm text-churchBlue/70">
              <Lang
                en="Watch our Tamil and English services online (YouTube)."
                ta="எங்கள் தமிழ் மற்றும் ஆங்கில ஆராதனைகளை ஆன்லைனில் (YouTube) பாருங்கள்."
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
              <Lang en="YouTube playlist" ta="YouTube பிளேலிஸ்ட்" />
            </a>
            {siteConfig.spotifyUrl ? (
              <a
                href={siteConfig.spotifyUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-secondary"
              >
                <Lang en="Listen on Spotify" ta="Spotify-ல் கேளுங்கள்" />
              </a>
            ) : null}
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-3xl border border-churchBlue/10 bg-white shadow-glow fade-up sm:mt-10">
          <div className="aspect-video w-full bg-churchBlueSoft">
            <YouTubeLiteEmbed
              kind="playlist"
              playlistId={siteConfig.youtubeServicesPlaylistId}
              title="Praise Tabernacle Mississauga - Latest Sermons"
              load="visible"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
