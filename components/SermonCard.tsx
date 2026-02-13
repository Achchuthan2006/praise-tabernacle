import { siteConfig } from "@/lib/site"
import YouTubeLiteEmbed from "@/components/YouTubeLiteEmbed"

export default function SermonCard() {
  return (
    <article className="card">
      <div className="``aspect-video w-full bg-churchBlueSoft">
        <YouTubeLiteEmbed
          kind="playlist"
          playlistId={siteConfig.youtubeServicesPlaylistId}
          title="Praise Tabernacle Mississauga - Sermons"
          load="visible"
        />
      </div>
    </article>
  )
}
