import { buildIcsCalendar } from "@/lib/ics"
import { events, nextOccurrenceLocal, timeZone, toLocalDate } from "@/lib/events"

function dayOfWeekToByDay(dow: number) {
  return dow === 0 ? "SU" : dow === 1 ? "MO" : dow === 2 ? "TU" : dow === 3 ? "WE" : dow === 4 ? "TH" : dow === 5 ? "FR" : "SA"
}

function buildRrule(recurrence: NonNullable<(typeof events)[number]["recurrence"]>) {
  if (recurrence.kind === "weekly") {
    const interval = recurrence.everyWeeks && recurrence.everyWeeks > 1 ? `;INTERVAL=${recurrence.everyWeeks}` : ""
    return `FREQ=WEEKLY;BYDAY=${dayOfWeekToByDay(recurrence.dayOfWeek)}${interval}`
  }
  if (recurrence.kind === "monthly-day") {
    return `FREQ=MONTHLY;BYMONTHDAY=${recurrence.dayOfMonth}`
  }
  if (recurrence.kind === "monthly-nth-dow") {
    return `FREQ=MONTHLY;BYDAY=${dayOfWeekToByDay(recurrence.dayOfWeek)};BYSETPOS=${recurrence.nth}`
  }
  return `FREQ=YEARLY;BYMONTH=${recurrence.month};BYMONTHDAY=${recurrence.day}`
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const origin = url.origin

  const now = new Date()
  const rangeDays = Math.max(7, Math.min(365, Number(url.searchParams.get("days") ?? "180") || 180))
  const cutoff = new Date(now.getTime() + rangeDays * 24 * 60 * 60 * 1000)

  const calendarEvents = events
    .filter((e) => {
      if (e.startAtLocal) return toLocalDate(e.startAtLocal) <= cutoff
      return Boolean(e.recurrence)
    })
    .map((e) => {
      const startLocal = e.startAtLocal ? toLocalDate(e.startAtLocal) : e.recurrence ? nextOccurrenceLocal(e.recurrence) : null
      if (!startLocal) return null
      const endLocal = e.endAtLocal ? toLocalDate(e.endAtLocal) : new Date(startLocal.getTime() + 60 * 60 * 1000)
      const location = [e.location.name, ...e.location.addressLines].join(", ")
      const eventUrl = `${origin}/events/${e.slug}`
      const rrule = e.recurrence ? buildRrule(e.recurrence) : undefined
      return {
        uid: `${e.slug}@praisetabernacle.org`,
        title: e.title,
        description: e.description,
        location,
        startLocal,
        endLocal,
        url: eventUrl,
        rrule,
      }
    })
    .filter(Boolean) as Array<{
    uid: string
    title: string
    description?: string
    location?: string
    startLocal: Date
    endLocal: Date
    url?: string
    rrule?: string
  }>

  const ics = buildIcsCalendar({
    name: "Praise Tabernacle Events",
    timeZone,
    events: calendarEvents,
  })

  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'inline; filename="praise-tabernacle-events.ics"',
      "Cache-Control": "no-store",
    },
  })
}

