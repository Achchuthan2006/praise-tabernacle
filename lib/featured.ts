import { events } from "@/lib/events"
import { getCurrentSeries, getSermonsBySeries } from "@/lib/sermons"
import { siteConfig } from "@/lib/site"

export type FeaturedCta = {
  href: string
  labelEn: string
  labelTa: string
  variant?: "primary" | "secondary" | "secondary-soft"
}

export type FeaturedSlide = {
  id: string
  kickerEn: string
  kickerTa: string
  titleEn: string
  titleTa: string
  descriptionEn: string
  descriptionTa: string
  imageSrc?: string
  ctas: FeaturedCta[]
}

const featuredEventSlugs = [
  "community-prayer-night",
  "fasting-prayer-feb-2026",
  "newcomers-welcome",
] as const

function buildEventSlides(): FeaturedSlide[] {
  const bySlug = new Map(events.map((e) => [e.slug, e]))

  return featuredEventSlugs
    .map((slug) => bySlug.get(slug))
    .filter((event): event is NonNullable<typeof event> => Boolean(event))
    .map((event) => ({
      id: `event:${event.slug}`,
      kickerEn: "Featured event",
      kickerTa: "முக்கிய நிகழ்வு",
      titleEn: event.title,
      titleTa: event.title,
      descriptionEn: event.description,
      descriptionTa: event.description,
      imageSrc: event.imageSrc,
      ctas: [
        { href: `/events/${event.slug}`, labelEn: "View details", labelTa: "விவரம் பார்க்க", variant: "primary" },
        { href: "/events", labelEn: "All events", labelTa: "அனைத்து நிகழ்வுகள்", variant: "secondary" },
      ],
    }))
}

function buildSeriesSlide(): FeaturedSlide | null {
  const series = getCurrentSeries()
  if (!series) return null

  const sermonsInSeries = getSermonsBySeries(series.id)
  const latest = sermonsInSeries[0] ?? null

  return {
    id: `series:${series.id}`,
    kickerEn: "Current series",
    kickerTa: "தற்போதைய தொடர்",
    titleEn: series.title,
    titleTa: series.title,
    descriptionEn:
      series.summary ??
      "Sermon series highlights, notes, and discussion questions to help you grow in the Word.",
    descriptionTa:
      series.summary ??
      "வேதாகமத்தில் வளர உதவும் பிரசங்கத் தொடர், குறிப்புகள் மற்றும் குழு கேள்விகள்.",
    imageSrc: series.coverImageSrc,
    ctas: [
      latest
        ? {
            href: `/sermons/${latest.slug}`,
            labelEn: "Watch latest",
            labelTa: "சமீபம் பார்க்க",
            variant: "primary",
          }
        : { href: "/sermons", labelEn: "Sermons", labelTa: "பிரசங்கங்கள்", variant: "primary" },
      { href: "/sermons", labelEn: "Sermon library", labelTa: "பிரசங்க நூலகம்", variant: "secondary" },
    ],
  }
}

function buildAnnouncementSlide(): FeaturedSlide | null {
  const en = (siteConfig.topBar.announcementEn ?? "").trim()
  const ta = (siteConfig.topBar.announcementTa ?? "").trim()
  const href = (siteConfig.topBar.announcementHref ?? "").trim()
  if (!en && !ta) return null

  return {
    id: "announcement:topbar",
    kickerEn: "Announcement",
    kickerTa: "அறிவிப்பு",
    titleEn: en || "Announcement",
    titleTa: ta || "அறிவிப்பு",
    descriptionEn: "Tap to read the full update and next steps.",
    descriptionTa: "முழு விவரம் மற்றும் அடுத்த படிகளை பார்க்க தட்டுங்கள்.",
    imageSrc: "/hero-photo-placeholder.svg",
    ctas: [
      { href: href || "/events", labelEn: "Learn more", labelTa: "மேலும் பார்க்க", variant: "primary" },
      { href: siteConfig.topBar.watchLatestHref || "/watch", labelEn: "Watch", labelTa: "பார்க்க", variant: "secondary" },
    ],
  }
}

export function getFeaturedSlides(): FeaturedSlide[] {
  const slides: FeaturedSlide[] = []

  const announcement = buildAnnouncementSlide()
  if (announcement) slides.push(announcement)

  const series = buildSeriesSlide()
  if (series) slides.push(series)

  slides.push(...buildEventSlides())

  return slides
}
