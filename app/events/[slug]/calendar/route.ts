import { buildIcsEvent } from "@/lib/ics"
import { getEventBySlug, nextOccurrenceLocal, timeZone, toLocalDate } from "@/lib/events"

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = getEventBySlug(slug)
  if (!event) return new Response("Not found", { status: 404 })

  const origin = new URL(request.url).origin

  const startLocal = event.startAtLocal
    ? toLocalDate(event.startAtLocal)
    : event.recurrence
      ? nextOccurrenceLocal(event.recurrence)
      : null

  if (!startLocal) return new Response("Not available", { status: 400 })

  const endLocal = event.endAtLocal
    ? toLocalDate(event.endAtLocal)
    : new Date(startLocal.getTime() + 60 * 60 * 1000)

  const location = [event.location.name, ...event.location.addressLines].join(", ")
  const url = `${origin}/events/${event.slug}`

  const ics = buildIcsEvent({
    uid: `${event.slug}@praisetabernacle.org`,
    title: event.title,
    description: event.description,
    location,
    startLocal,
    endLocal,
    timeZone,
    url,
  })

  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${event.slug}.ics"`,
      "Cache-Control": "no-store",
    },
  })
}
