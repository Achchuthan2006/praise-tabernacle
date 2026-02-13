import { siteConfig } from "@/lib/site"
import type { Language } from "@/lib/i18n"

export type EventLanguage = "en" | "ta" | "bilingual"
export type EventCategory = "prayer" | "youth" | "family" | "community" | "teaching" | "holiday"
export type EventAgeGroup =
  | "all-ages"
  | "kids"
  | "youth"
  | "adults"
  | "women"
  | "men"

export type EventContact = {
  name: string
  role?: string
  email?: string
  phone?: string
  photoSrc?: string
}

export type EventLocation = {
  name: string
  addressLines: readonly string[]
  mapQuery: string
}

export type EventRecurrence =
  | { kind: "weekly"; dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6; time: string; everyWeeks?: number }
  | { kind: "monthly-day"; dayOfMonth: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28; time: string }
  | {
      kind: "monthly-nth-dow"
      nth: 1 | 2 | 3 | 4
      dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6
      time: string
    }
  | { kind: "yearly"; month: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; day: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31; time: string }

export type Event = {
  slug: string
  title: string
  description: string
  category: EventCategory
  language: EventLanguage
  ageGroup: EventAgeGroup
  imageSrc?: string
  registrationUrl?: string
  registrationLabel?: string
  isMajor?: boolean
  location: EventLocation
  contact?: EventContact
  capacity?: number
  spotsRemaining?: number
  // One-off events
  startAtLocal?: string // YYYY-MM-DDTHH:mm
  endAtLocal?: string // YYYY-MM-DDTHH:mm
  // Recurring events
  recurrence?: EventRecurrence
  // Past event media
  galleryImageSrcs?: string[]
}

export const defaultEventLocation: EventLocation = {
  name: siteConfig.nameEn,
  addressLines: siteConfig.addressLines,
  mapQuery: siteConfig.addressLines.join(", "),
}

export const timeZone = "America/Toronto"

export const eventCategoryFallbackImageSrc: Record<EventCategory, string> = {
  prayer: "/event-prayer.svg",
  youth: "/event-community.svg",
  family: "/event-family.svg",
  community: "/event-community.svg",
  teaching: "/event-teaching.svg",
  holiday: "/event-holiday.svg",
}

export function getEventImageSrc(event: Event) {
  return event.imageSrc ?? eventCategoryFallbackImageSrc[event.category]
}

export function toLocalDate(dateTimeLocal: string) {
  // Treat as local time on the server/runtime environment.
  // We intentionally avoid timezone conversion libraries here.
  // Keep the ISO "T" separator for more consistent parsing across engines.
  return new Date(`${dateTimeLocal}:00`)
}

function pad2(n: number) {
  return String(n).padStart(2, "0")
}

export function toLocalDateTimeString(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}T${pad2(d.getHours())}:${pad2(d.getMinutes())}`
}

export function computeSpotsLabel(event: Event, lang: Language = "en") {
  if (!event.capacity || event.spotsRemaining === undefined) return null
  const remaining = Math.max(0, Math.min(event.spotsRemaining, event.capacity))
  if (remaining === 0) return lang === "ta" ? "நிரம்பியது" : "Full"
  if (remaining <= 10)
    return lang === "ta" ? `${remaining} இடங்கள் மட்டுமே மீதம்` : `${remaining} spots left`
  if (remaining <= 25) return lang === "ta" ? `${remaining} இடங்கள் மீதம்` : `${remaining} spots remaining`
  return lang === "ta"
    ? `${remaining} / ${event.capacity} கிடைக்கிறது`
    : `${remaining} / ${event.capacity} available`
}

export function mapLinkForLocation(location: EventLocation) {
  const url = new URL("https://www.google.com/maps/search/")
  url.searchParams.set("api", "1")
  url.searchParams.set("query", location.mapQuery)
  return url.toString()
}

export function embedMapUrlForLocation(location: EventLocation) {
  const url = new URL("https://www.google.com/maps")
  url.pathname = "/maps"
  url.searchParams.set("q", location.mapQuery)
  url.searchParams.set("output", "embed")
  return url.toString()
}

export function nextOccurrenceLocal(recurrence: EventRecurrence, now = new Date()) {
  const base = new Date(now.getTime())
  base.setSeconds(0, 0)

  const [hh, mm] = recurrence.time.split(":").map((v) => Number(v))
  const setTime = (d: Date) => {
    const out = new Date(d.getTime())
    out.setHours(hh, mm, 0, 0)
    return out
  }

  if (recurrence.kind === "weekly") {
    const target = recurrence.dayOfWeek
    const current = base.getDay()
    let delta = (target - current + 7) % 7
    const candidate = setTime(new Date(base.getFullYear(), base.getMonth(), base.getDate()))
    if (delta === 0 && candidate <= base) delta = 7
    const next = new Date(base.getFullYear(), base.getMonth(), base.getDate() + delta)
    return setTime(next)
  }

  if (recurrence.kind === "monthly-day") {
    const year = base.getFullYear()
    const month = base.getMonth()
    const candidate = setTime(new Date(year, month, recurrence.dayOfMonth))
    if (candidate > base) return candidate
    return setTime(new Date(year, month + 1, recurrence.dayOfMonth))
  }

  if (recurrence.kind === "monthly-nth-dow") {
    const computeForMonth = (year: number, monthIndex: number) => {
      const first = new Date(year, monthIndex, 1)
      const firstDow = first.getDay()
      const offset = (recurrence.dayOfWeek - firstDow + 7) % 7
      const day = 1 + offset + (recurrence.nth - 1) * 7
      return setTime(new Date(year, monthIndex, day))
    }
    const year = base.getFullYear()
    const month = base.getMonth()
    const candidate = computeForMonth(year, month)
    if (candidate > base) return candidate
    return computeForMonth(year, month + 1)
  }

  // yearly
  const year = base.getFullYear()
  const candidate = setTime(new Date(year, recurrence.month - 1, recurrence.day))
  if (candidate > base) return candidate
  return setTime(new Date(year + 1, recurrence.month - 1, recurrence.day))
}

export const events: Event[] = [
  // One-off events
  {
    slug: "community-prayer-night",
    title: "Community Prayer Night",
    description: "A quiet evening of worship and prayer. Families and youth are welcome.",
    category: "prayer",
    language: "en",
    ageGroup: "all-ages",
    imageSrc: "/event-prayer.svg",
    isMajor: true,
    startAtLocal: "2026-02-08T19:30",
    endAtLocal: "2026-02-08T21:00",
    registrationUrl: "/events/community-prayer-night#rsvp",
    registrationLabel: "RSVP",
    location: defaultEventLocation,
    contact: { name: "Prayer Team", email: siteConfig.email },
    capacity: 120,
    spotsRemaining: 10,
  },
  {
    slug: "fasting-prayer-feb-2026",
    title: "Fasting Prayer",
    description: "A focused time of prayer and fasting together.",
    category: "prayer",
    language: "ta",
    ageGroup: "all-ages",
    imageSrc: "/event-prayer.svg",
    startAtLocal: "2026-02-14T10:00",
    endAtLocal: "2026-02-14T12:00",
    registrationUrl: "/events/fasting-prayer-feb-2026#rsvp",
    registrationLabel: "RSVP",
    location: defaultEventLocation,
    contact: { name: "Church Office", email: siteConfig.email },
  },
  {
    slug: "newcomers-welcome",
    title: "Newcomers Welcome",
    description: "Meet a friendly team, ask questions, and find your next step.",
    category: "community",
    language: "en",
    ageGroup: "all-ages",
    imageSrc: "/event-community.svg",
    isMajor: true,
    startAtLocal: "2026-02-22T12:00",
    endAtLocal: "2026-02-22T12:45",
    registrationUrl: "/visit",
    registrationLabel: "Plan your visit",
    location: defaultEventLocation,
    contact: { name: "Welcome Team", email: siteConfig.email },
  },

  // Recurring events (Weekly)
  {
    slug: "intercessory-prayer-wednesday",
    title: "Intercessory Prayer",
    description: "A weekly time of intercession and prayer together.",
    category: "prayer",
    language: "bilingual",
    ageGroup: "all-ages",
    imageSrc: "/event-prayer.svg",
    recurrence: { kind: "weekly", dayOfWeek: 3, time: "10:30" }, // Wednesday
    location: defaultEventLocation,
    contact: { name: "Prayer Team", email: siteConfig.email },
  },
  {
    slug: "bible-study-thursday",
    title: "Bible Study (Livestream)",
    description: "Midweek Bible study through livestream.",
    category: "teaching",
    language: "bilingual",
    ageGroup: "all-ages",
    imageSrc: "/event-teaching.svg",
    recurrence: { kind: "weekly", dayOfWeek: 4, time: "19:30" }, // Thursday
    location: {
      ...defaultEventLocation,
      name: "Online (Livestream)",
      mapQuery: defaultEventLocation.mapQuery,
    },
    contact: { name: "Bible Study Team", email: siteConfig.email },
  },

  // Recurring events (Monthly)
  {
    slug: "communion-first-day",
    title: "Communion Service",
    description: "A monthly communion service (Lord’s Table).",
    category: "community",
    language: "bilingual",
    ageGroup: "all-ages",
    imageSrc: "/event-community.svg",
    recurrence: { kind: "monthly-day", dayOfMonth: 1, time: "05:00" },
    location: defaultEventLocation,
    contact: { name: "Church Office", email: siteConfig.email },
  },
  {
    slug: "fasting-prayer-first-saturday",
    title: "Fasting Prayer",
    description: "Monthly fasting prayer.",
    category: "prayer",
    language: "bilingual",
    ageGroup: "all-ages",
    imageSrc: "/event-prayer.svg",
    recurrence: { kind: "monthly-nth-dow", nth: 1, dayOfWeek: 6, time: "09:30" }, // Saturday
    location: defaultEventLocation,
    contact: { name: "Prayer Team", email: siteConfig.email },
  },
  {
    slug: "womens-prayer-second-saturday",
    title: "Women’s Prayer",
    description: "A monthly prayer gathering for women.",
    category: "prayer",
    language: "bilingual",
    ageGroup: "women",
    imageSrc: "/event-prayer.svg",
    recurrence: { kind: "monthly-nth-dow", nth: 2, dayOfWeek: 6, time: "10:30" }, // Saturday
    location: defaultEventLocation,
    contact: { name: "Women’s Prayer Team", email: siteConfig.email },
  },
  {
    slug: "night-prayer-third-friday",
    title: "Night Prayer",
    description: "A monthly late-night prayer gathering.",
    category: "prayer",
    language: "bilingual",
    ageGroup: "all-ages",
    imageSrc: "/event-prayer.svg",
    recurrence: { kind: "monthly-nth-dow", nth: 3, dayOfWeek: 5, time: "22:00" }, // Friday
    location: defaultEventLocation,
    contact: { name: "Prayer Team", email: siteConfig.email },
  },

  // Annual (examples / placeholders)
  {
    slug: "vbs",
    title: "Vacation Bible School (VBS)",
    description: "A week of Bible lessons, songs, and activities for kids.",
    category: "family",
    language: "bilingual",
    ageGroup: "kids",
    imageSrc: "/event-family.svg",
    isMajor: true,
    recurrence: { kind: "yearly", month: 7, day: 15, time: "18:30" },
    location: defaultEventLocation,
    contact: { name: "Kids Ministry Team", email: siteConfig.email },
  },
  {
    slug: "christmas-service",
    title: "Christmas Service",
    description: "Celebrate the birth of Jesus with worship and the Word.",
    category: "holiday",
    language: "bilingual",
    ageGroup: "all-ages",
    imageSrc: "/event-holiday.svg",
    isMajor: true,
    recurrence: { kind: "yearly", month: 12, day: 25, time: "10:00" },
    location: defaultEventLocation,
    contact: { name: "Church Office", email: siteConfig.email },
  },

  // Past events (gallery examples)
  {
    slug: "harvest-celebration-2025",
    title: "Harvest Celebration (2025)",
    description: "A joyful celebration with worship, food, and fellowship.",
    category: "community",
    language: "bilingual",
    ageGroup: "all-ages",
    imageSrc: "/event-community.svg",
    startAtLocal: "2025-10-12T18:00",
    endAtLocal: "2025-10-12T20:30",
    location: defaultEventLocation,
    galleryImageSrcs: ["/event-community.svg", "/event-community.svg"],
  },
]

export function isOneOffEvent(event: Event) {
  return Boolean(event.startAtLocal)
}

export function isPastEvent(event: Event, now = new Date()) {
  const start = event.startAtLocal ? toLocalDate(event.startAtLocal) : null
  if (!start) return false
  return start.getTime() < now.getTime()
}

export function isUpcomingOneOffEvent(event: Event, now = new Date()) {
  const start = event.startAtLocal ? toLocalDate(event.startAtLocal) : null
  if (!start) return false
  return start.getTime() >= now.getTime()
}

export function getUpcomingEvents(now = new Date()) {
  return events
    .filter((e) => isUpcomingOneOffEvent(e, now))
    .slice()
    .sort((a, b) => (a.startAtLocal ?? "").localeCompare(b.startAtLocal ?? ""))
}

export function getNextMajorEvent(now = new Date()) {
  const candidates = events
    .filter((e) => e.isMajor)
    .map((e) => {
      const nextStart =
        e.startAtLocal ? toLocalDate(e.startAtLocal) : e.recurrence ? nextOccurrenceLocal(e.recurrence, now) : null
      return { event: e, nextStart }
    })
    .filter((x): x is { event: Event; nextStart: Date } => {
      if (!(x.nextStart instanceof Date)) return false
      return !Number.isNaN(x.nextStart.getTime())
    })
    .filter((x) => x.nextStart.getTime() >= now.getTime())
    .sort((a, b) => a.nextStart.getTime() - b.nextStart.getTime())

  const next = candidates[0]
  if (!next) return null

  // Ensure startAtLocal is present for countdown/calendar links even for recurring events.
  if (!next.event.startAtLocal) {
    return {
      ...next.event,
      startAtLocal: toLocalDateTimeString(next.nextStart),
    }
  }

  return next.event
}

export function getPastEvents(now = new Date()) {
  return events
    .filter((e) => isPastEvent(e, now))
    .slice()
    .sort((a, b) => (b.startAtLocal ?? "").localeCompare(a.startAtLocal ?? ""))
}

export function getRecurringEvents() {
  return events.filter((e) => e.recurrence)
}

export function getEventBySlug(slug: string) {
  return events.find((e) => e.slug === slug) ?? null
}

export function getAllEventSlugs() {
  return events.map((e) => e.slug)
}
