import type { Sermon } from "@/lib/content"

function formatDate(dateIso: string) {
  const date = new Date(dateIso)
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date)
}

function youtubeWatchUrl(youtubeId: string) {
  return `https://www.youtube.com/watch?v=${youtubeId}`
}

export default function SermonCard({ sermon }: { sermon: Sermon }) {
  const langShort = sermon.language === "en" ? "EN" : "TA"
  const langLabel = sermon.language === "en" ? "English Service" : "Tamil Service"

  return (
    <article className="overflow-hidden rounded-3xl border border-churchBlue/10 bg-white shadow-glow">
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

      <div className="space-y-4 p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full border border-churchBlue/10 bg-churchBlueSoft px-2.5 py-1 text-churchBlue/80">
            {formatDate(sermon.date)}
          </span>
          <span className="rounded-full border border-churchBlue/10 bg-churchBlueSoft px-2.5 py-1 text-churchBlue/80">
            {langShort}
          </span>
          <span className="rounded-full border border-churchBlue/10 bg-churchBlueSoft px-2.5 py-1 text-churchBlue/80">
            {langLabel}
          </span>
        </div>

        <h3
          className={[
            "text-base font-semibold leading-snug text-churchBlue sm:text-[17px]",
            sermon.language === "ta" ? "font-tamil" : "",
          ].join(" ")}
        >
          {sermon.title}
        </h3>

        <a
          href={youtubeWatchUrl(sermon.youtubeId)}
          target="_blank"
          rel="noreferrer"
          className="focus-ring inline-flex w-full items-center justify-center rounded-xl bg-churchBlue px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-churchBlueLight"
          aria-label={`Watch sermon: ${sermon.title}`}
        >
          Watch
        </a>
      </div>
    </article>
  )
}

