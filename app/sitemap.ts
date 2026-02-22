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

const languages = ["en", "ta"] as const

function languageVariants(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`
  const prefixed = languages.map((lang) => (normalized === "/" ? `/${lang}` : `/${lang}${normalized}`))
  return [normalized, ...prefixed]
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes = [
    "/",
    "/visit",
    "/about",
    "/about/beliefs",
    "/about/denomination",
    "/about/history",
    "/sermons",
    "/watch",
    "/bible-studies",
    "/events",
    "/calendar",
    "/ministries",
    "/groups",
    "/serve",
    "/serve/apply",
    "/membership",
    "/missions",
    "/give",
    "/give/online",
    "/give/reports",
    "/blog",
    "/prayer-wall",
    "/bible",
    "/contact",
    "/search",
    "/privacy",
    "/accessibility",
    "/learn/baptism",
    "/learn/weddings",
    "/learn/building-rental",
    "/learn/community-safety",
    "/pastor",
    "/care",
  ]

  const items: MetadataRoute.Sitemap = [
    ...staticRoutes.flatMap((path) =>
      languageVariants(path).map((variant) => ({
        url: absoluteUrl(variant),
        lastModified: now,
        changeFrequency: (path === "/" ? "weekly" : "monthly") as MetadataRoute.Sitemap[number]["changeFrequency"],
        priority: variant === "/" ? 1 : path === "/" ? 0.95 : 0.7,
      })),
    ),
    ...publicSermons.flatMap((s) =>
      languageVariants(`/sermons/${s.slug}`).map((variant) => ({
        url: absoluteUrl(variant),
        lastModified: new Date(`${s.dateIso}T00:00:00`),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ),
    ...bibleStudies.flatMap((s) =>
      languageVariants(`/bible-studies/${s.slug}`).map((variant) => ({
        url: absoluteUrl(variant),
        lastModified: s.dateIso ? new Date(`${s.dateIso}T00:00:00`) : now,
        changeFrequency: "monthly" as const,
        priority: 0.65,
      })),
    ),
    ...events.flatMap((e) =>
      languageVariants(`/events/${e.slug}`).map((variant) => ({
        url: absoluteUrl(variant),
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
    ),
    ...blogPosts.flatMap((p) =>
      languageVariants(`/blog/${p.slug}`).map((variant) => ({
        url: absoluteUrl(variant),
        lastModified: new Date(`${p.dateIso}T00:00:00`),
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
