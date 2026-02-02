import type { Sermon } from "@/lib/content"

export default function SermonEmbed({ sermon }: { sermon: Sermon }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-churchBlue/10 bg-white shadow-glow">
      <div className="relative w-full bg-churchBlueSoft pt-[56.25%]">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${sermon.youtubeId}`}
          title={sermon.title}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  )
}
