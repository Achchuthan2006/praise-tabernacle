import type { Event } from "@/lib/events"
import { defaultEventLocation } from "@/lib/events"
import { siteConfig } from "@/lib/site"

type ParsedIcsEvent = {
  uid?: string
  summary?: string
  description?: string
  location?: string
  url?: string
  start?: string
  end?: string
}

function unfoldIcsLines(raw: string) {
  return raw.replace(/\r?\n[ \t]/g, "")
}

function parseIcsBlocks(raw: string) {
  const content = unfoldIcsLines(raw)
  const blocks = content.match(/BEGIN:VEVENT[\s\S]*?END:VEVENT/g) ?? []

  return blocks.map((block) => {
    const parsed: ParsedIcsEvent = {}
    for (const line of block.split(/\r?\n/)) {
      const idx = line.indexOf(":")
      if (idx === -1) continue

      const key = line.slice(0, idx).split(";")[0]?.toUpperCase()
      const value = line.slice(idx + 1).trim()
      if (!key || !value) continue

      if (key === "UID") parsed.uid = value
      if (key === "SUMMARY") parsed.summary = value
      if (key === "DESCRIPTION") parsed.description = value.replace(/\\n/g, "\n")
      if (key === "LOCATION") parsed.location = value.replace(/\\,/g, ",")
      if (key === "URL") parsed.url = value
      if (key === "DTSTART") parsed.start = value
      if (key === "DTEND") parsed.end = value
    }
    return parsed
  })
}

function pad2(value: number) {
  return String(value).padStart(2, "0")
}

function toLocalDateTimeString(date: Date) {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}T${pad2(date.getHours())}:${pad2(date.getMinutes())}`
}

function parseIcsDate(value?: string) {
  if (!value) return null

  const trimmed = value.trim()
  const utcMatch = trimmed.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/)
  if (utcMatch) {
    const [, y, m, d, hh, mm, ss] = utcMatch
    return new Date(Date.UTC(Number(y), Number(m) - 1, Number(d), Number(hh), Number(mm), Number(ss)))
  }

  const localMatch = trimmed.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})$/)
  if (localMatch) {
    const [, y, m, d, hh, mm, ss] = localMatch
    return new Date(Number(y), Number(m) - 1, Number(d), Number(hh), Number(mm), Number(ss))
  }

  const dateOnlyMatch = trimmed.match(/^(\d{4})(\d{2})(\d{2})$/)
  if (dateOnlyMatch) {
    const [, y, m, d] = dateOnlyMatch
    return new Date(Number(y), Number(m) - 1, Number(d), 0, 0, 0)
  }

  return null
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function isFutureEvent(start: Date, now: Date) {
  return start.getTime() >= now.getTime()
}

function buildLocation(name?: string) {
  if (!name) return defaultEventLocation
  return {
    ...defaultEventLocation,
    name,
    mapQuery: name,
  }
}

export async function getCalendarFeedEvents(now = new Date()): Promise<Event[]> {
  const feedUrl = siteConfig.calendar.googleIcalUrl?.trim()
  if (!feedUrl) return []

  try {
    const response = await fetch(feedUrl, {
      next: { revalidate: 300 },
      headers: { Accept: "text/calendar,text/plain;q=0.9,*/*;q=0.8" },
    })

    if (!response.ok) return []
    const text = await response.text()
    const parsed = parseIcsBlocks(text)

    const sermonsFromFeed: Array<Event | null> = parsed.map((item) => {
        const start = parseIcsDate(item.start)
        if (!start || !item.summary) return null
        if (!isFutureEvent(start, now)) return null

        const end = parseIcsDate(item.end)
        const slugBase = item.uid || item.summary

        return {
          slug: slugify(slugBase),
          title: item.summary,
          description: item.description?.trim() || "Upcoming church event.",
          category: "community",
          language: "bilingual",
          ageGroup: "all-ages",
          imageSrc: "/event-community.svg",
          isMajor: true,
          startAtLocal: toLocalDateTimeString(start),
          endAtLocal: end ? toLocalDateTimeString(end) : undefined,
          registrationUrl: item.url?.trim() || undefined,
          registrationLabel: item.url?.trim() ? "Register" : undefined,
          location: buildLocation(item.location),
        } satisfies Event
      })
    return sermonsFromFeed
      .filter((event): event is Event => event !== null)
      .sort((a, b) => (a.startAtLocal ?? "").localeCompare(b.startAtLocal ?? ""))
  } catch {
    return []
  }
}
