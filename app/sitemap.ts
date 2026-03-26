import type { MetadataRoute } from "next"

import { blogPosts } from "@/lib/blog"
import { bibleStudies } from "@/lib/bibleStudies"
import { events } from "@/lib/events"
import { ministries } from "@/lib/ministries"
import { publicSermons } from "@/lib/sermons"
import { siteConfig } from "@/lib/site"

function absoluteUrl(path: string) {
  return new URL(path, siteConfig.siteUrl).toString()
}

function toMidnightDate(dateIso: string) {
  return new Date(`${dateIso}T00:00:00`)
}

function maxDate(dates: Date[]) {
  return dates.reduce((latest, current) => (current > latest ? current : latest))
}

const languages = ["en", "ta"] as const

function languageVariants(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`
  const prefixed = languages.map((lang) => (normalized === "/" ? `/${lang}` : `/${lang}${normalized}`))
  return [normalized, ...prefixed]
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const latestSermonDate = maxDate(publicSermons.map((s) => toMidnightDate(s.dateIso)))
  const latestBlogDate = maxDate(blogPosts.map((p) => toMidnightDate(p.dateIso)))
  const latestEventDate = maxDate(
    events
      .map((e) => e.startAtLocal?.slice(0, 10))
      .filter((value): value is string => Boolean(value))
      .map(toMidnightDate),
  )

  const staticRoutes: Array<{
    path: string
    lastModified: Date
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
    priority: number
  }> = [
    { path: "/", lastModified: latestSermonDate, changeFrequency: "weekly", priority: 1 },
    { path: "/visit", lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { path: "/about", lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { path: "/about/beliefs", lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { path: "/about/denomination", lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { path: "/about/history", lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { path: "/resources", lastModified: latestBlogDate, changeFrequency: "weekly", priority: 0.8 },
    { path: "/sermons", lastModified: latestSermonDate, changeFrequency: "weekly", priority: 0.85 },
    { path: "/watch", lastModified: latestSermonDate, changeFrequency: "weekly", priority: 0.8 },
    { path: "/bible-studies", lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { path: "/events", lastModified: latestEventDate, changeFrequency: "weekly", priority: 0.85 },
    { path: "/calendar", lastModified: latestEventDate, changeFrequency: "weekly", priority: 0.8 },
    { path: "/get-involved", lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { path: "/ministries", lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { path: "/groups", lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { path: "/serve", lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { path: "/serve/apply", lastModified: now, changeFrequency: "monthly", priority: 0.65 },
    { path: "/membership", lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { path: "/missions", lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { path: "/give", lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { path: "/give/online", lastModified: now, changeFrequency: "monthly", priority: 0.65 },
    { path: "/give/reports", lastModified: now, changeFrequency: "monthly", priority: 0.55 },
    { path: "/blog", lastModified: latestBlogDate, changeFrequency: "weekly", priority: 0.8 },
    { path: "/testimonies", lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { path: "/magazine", lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { path: "/photos", lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { path: "/prayer-wall", lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { path: "/bible", lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { path: "/contact", lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { path: "/search", lastModified: latestBlogDate, changeFrequency: "weekly", priority: 0.5 },
    { path: "/privacy", lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { path: "/accessibility", lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { path: "/learn/baptism", lastModified: now, changeFrequency: "monthly", priority: 0.65 },
    { path: "/learn/weddings", lastModified: now, changeFrequency: "monthly", priority: 0.65 },
    { path: "/learn/building-rental", lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { path: "/learn/community-safety", lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { path: "/pastor", lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { path: "/care", lastModified: now, changeFrequency: "monthly", priority: 0.65 },
    { path: "/prayer", lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ]

  const items: MetadataRoute.Sitemap = [
    ...staticRoutes.flatMap((route) =>
      languageVariants(route.path).map((variant) => ({
        url: absoluteUrl(variant),
        lastModified: route.lastModified,
        changeFrequency: route.changeFrequency,
        priority: variant === "/" ? 1 : route.path === "/" ? 0.95 : route.priority,
      })),
    ),
    ...publicSermons.flatMap((s) =>
      languageVariants(`/sermons/${s.slug}`).map((variant) => ({
        url: absoluteUrl(variant),
        lastModified: toMidnightDate(s.dateIso),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ),
    ...bibleStudies.flatMap((s) =>
      languageVariants(`/bible-studies/${s.slug}`).map((variant) => ({
        url: absoluteUrl(variant),
        lastModified: s.dateIso ? toMidnightDate(s.dateIso) : now,
        changeFrequency: "monthly" as const,
        priority: 0.65,
      })),
    ),
    ...events.flatMap((e) =>
      languageVariants(`/events/${e.slug}`).map((variant) => ({
        url: absoluteUrl(variant),
        lastModified: e.startAtLocal ? toMidnightDate(e.startAtLocal.slice(0, 10)) : now,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
    ),
    ...blogPosts.flatMap((p) =>
      languageVariants(`/blog/${p.slug}`).map((variant) => ({
        url: absoluteUrl(variant),
        lastModified: toMidnightDate(p.dateIso),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    ),
    ...ministries.flatMap((m) =>
      languageVariants(`/ministries/${m.slug}`).map((variant) => ({
        url: absoluteUrl(variant),
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    ),
  ]

  // Ensure we don't emit invalid URLs in case siteUrl isn't set yet.
  return items.filter((entry) => entry.url.startsWith("http"))
}
