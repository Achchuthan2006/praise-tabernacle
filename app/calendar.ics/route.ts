import { buildIcsCalendar } from "@/lib/ics"
import type { EventRecurrence } from "@/lib/events"
import { events, isPastEvent, nextOccurrenceLocal, timeZone, toLocalDate } from "@/lib/events"
import { siteConfig } from "@/lib/site"

function byDay(dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6) {
  const map = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"] as const
  return map[dayOfWeek]
}

function recurrenceToRrule(recurrence: EventRecurrence) {
  if (recurrence.kind === "weekly") {
    const parts = [`FREQ=WEEKLY`, `BYDAY=${byDay(recurrence.dayOfWeek)}`]
    if (recurrence.everyWeeks && recurrence.everyWeeks > 1) parts.push(`INTERVAL=${recurrence.everyWeeks}`)
    return parts.join(";")
  }

  if (recurrence.kind === "monthly-day") {
    return `FREQ=MONTHLY;BYMONTHDAY=${recurrence.dayOfMonth}`
  }

  if (recurrence.kind === "monthly-nth-dow") {
    return `FREQ=MONTHLY;BYDAY=${byDay(recurrence.dayOfWeek)};BYSETPOS=${recurrence.nth}`
  }

  return `FREQ=YEARLY;BYMONTH=${recurrence.month};BYMONTHDAY=${recurrence.day}`
}

export async function GET(request: Request) {
  const now = new Date()
  const origin = new URL(request.url).origin

  const items = events
    .filter((event) => {
      if (!event.startAtLocal) return true
      return !isPastEvent(event, now)
    })
    .map((event) => {
      const startLocal = event.startAtLocal
        ? toLocalDate(event.startAtLocal)
        : event.recurrence
          ? nextOccurrenceLocal(event.recurrence, now)
          : null
      if (!startLocal) return null

      const endLocal = event.endAtLocal
        ? toLocalDate(event.endAtLocal)
        : new Date(startLocal.getTime() + 60 * 60 * 1000)

      const location = [event.location.name, ...event.location.addressLines].join(", ")
      const url = `${origin}/events/${event.slug}`

      return {
        uid: `${event.slug}@praisetabernacle.org`,
        title: event.title,
        description: event.description,
        location,
        startLocal,
        endLocal,
        url,
        rrule: event.recurrence ? recurrenceToRrule(event.recurrence) : undefined,
      }
    })
    .filter((v) => v !== null)

  const ics = buildIcsCalendar({
    name: `${siteConfig.nameEn} - Events`,
    timeZone,
    events: items,
  })

  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="praise-tabernacle-events.ics"`,
      "Cache-Control": "no-store",
    },
  })
}
