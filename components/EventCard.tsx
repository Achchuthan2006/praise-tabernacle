import type { EventItem } from "@/lib/content"

function formatDate(dateIso: string) {
  const date = new Date(dateIso)
  return new Intl.DateTimeFormat("en-CA", { month: "short", day: "2-digit" }).format(date)
}

export default function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="rounded-3xl border border-churchBlue/10 bg-white p-5 shadow-glow transition-colors hover:border-churchBlue/20">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl border border-churchBlue/10 bg-churchBlueSoft">
            <span className="text-sm font-semibold text-churchBlue">{formatDate(event.date)}</span>
          </div>
          <div className="leading-tight">
            <h3
              className={[
                "text-base font-semibold text-churchBlue",
                event.language === "ta" ? "font-tamil" : "",
              ].join(" ")}
            >
              {event.title}
            </h3>
            <div className="mt-1 text-sm text-churchBlue/70">{event.time}</div>
          </div>
        </div>

        <span
          className={[
            "rounded-full border border-churchBlue/10 bg-churchBlueSoft px-2.5 py-1 text-xs text-churchBlue/80",
            event.language === "ta" ? "font-tamil" : "",
          ].join(" ")}
        >
          {event.language === "en" ? "EN" : "தமிழ்"}
        </span>
      </div>

      {event.description ? (
        <p className="mt-4 text-sm text-churchBlue/75">{event.description}</p>
      ) : null}
    </article>
  )
}
