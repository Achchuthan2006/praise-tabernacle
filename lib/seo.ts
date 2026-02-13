import type { Metadata } from "next"

import { siteConfig } from "@/lib/site"
import type { BlogPost } from "@/lib/blog"
import type { Event } from "@/lib/events"
import type { Sermon } from "@/lib/sermons"

export function pageMetadata({
  title,
  description,
  path,
  image,
  openGraphType = "website",
}: {
  title: string
  description: string
  path: string
  image?: string
  openGraphType?: "website" | "article" | "video.other"
}): Metadata {
  const resolvedImage = toAbsoluteUrl(image ?? siteConfig.branding.logoEnBgSrc)
  const canonicalUrl = toAbsoluteUrl(path)
  const enUrl = toAbsoluteUrl(`/en${path === "/" ? "" : path}`)
  const taUrl = toAbsoluteUrl(`/ta${path === "/" ? "" : path}`)
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: enUrl,
        ta: taUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteConfig.nameEn,
      type: openGraphType,
      locale: "en_CA",
      images: [
        {
          url: resolvedImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      title,
      description,
      card: "summary_large_image",
      images: [resolvedImage],
    },
  }
}

export function toAbsoluteUrl(urlOrPath: string) {
  if (!urlOrPath) return siteConfig.siteUrl
  if (urlOrPath.startsWith("http://") || urlOrPath.startsWith("https://")) return urlOrPath
  return new URL(urlOrPath, siteConfig.siteUrl).toString()
}

export function churchJsonLd() {
  const addressText = siteConfig.addressLines.join(", ")
  const mapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(addressText)}`
  return {
    "@context": "https://schema.org",
    "@type": "Church",
    "@id": `${siteConfig.siteUrl}#church`,
    name: siteConfig.nameEn,
    url: siteConfig.siteUrl,
    description: "A welcoming Tamil & English church family in Mississauga, Ontario.",
    keywords: ["Tamil church Mississauga", "Tamil church", "Church in Mississauga", "Bible teaching", "Prayer"].join(
      ", ",
    ),
    email: siteConfig.email,
    telephone: siteConfig.phone,
    image: siteConfig.branding.logoEnBgSrc,
    logo: siteConfig.branding.logoEnSrc,
    knowsLanguage: ["English", "Tamil"],
    areaServed: ["Mississauga, ON", "Greater Toronto Area"],
    hasMap: mapsUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: addressText,
      addressLocality: "Mississauga",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    sameAs: [
      siteConfig.youtubeChannelUrl,
      ...(siteConfig.facebookUrl ? [siteConfig.facebookUrl] : []),
      ...(siteConfig.instagramUrl ? [siteConfig.instagramUrl] : []),
      ...(siteConfig.spotifyUrl ? [siteConfig.spotifyUrl] : []),
    ],
  }
}

export function websiteJsonLd() {
  const url = siteConfig.siteUrl
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url}#website`,
    url,
    name: `${siteConfig.nameEn} | ${siteConfig.locationShort}`,
    description: "Tamil & English church in Mississauga. Watch sermons, find events, and get connected.",
    publisher: { "@type": "Church", "@id": `${url}#church`, name: siteConfig.nameEn },
    potentialAction: {
      "@type": "SearchAction",
      target: `${url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  }
}

export function blogPostJsonLd(post: BlogPost) {
  const url = toAbsoluteUrl(`/blog/${post.slug}`)
  const image = post.coverImageSrc ? [toAbsoluteUrl(post.coverImageSrc)] : undefined
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#blogposting`,
    headline: post.title,
    description: post.excerpt,
    url,
    datePublished: post.dateIso,
    ...(post.authorName
      ? { author: { "@type": "Person", name: post.authorName } }
      : { author: { "@type": "Organization", name: siteConfig.nameEn } }),
    publisher: {
      "@type": "Church",
      "@id": `${siteConfig.siteUrl}#church`,
      name: siteConfig.nameEn,
      url: siteConfig.siteUrl,
      logo: { "@type": "ImageObject", url: toAbsoluteUrl(siteConfig.branding.logoEnSrc) },
    },
    ...(image ? { image } : {}),
    mainEntityOfPage: url,
    ...(post.tags?.length ? { keywords: post.tags.join(", ") } : {}),
  }
}

export function sermonJsonLd(sermon: Sermon, opts?: { seriesTitle?: string | null }) {
  const url = toAbsoluteUrl(`/sermons/${sermon.slug}`)
  const description = `Sermon from ${sermon.dateIso}${sermon.speaker ? ` • ${sermon.speaker}` : ""}`

  // If a YouTube video is available, prefer VideoObject (most useful for rich results).
  if (sermon.youtubeVideoId) {
    const videoId = sermon.youtubeVideoId
    return {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "@id": `${url}#video`,
      name: sermon.title,
      description,
      uploadDate: sermon.dateIso,
      url,
      thumbnailUrl: [`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`],
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}`,
      contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
      publisher: { "@type": "Church", "@id": `${siteConfig.siteUrl}#church`, name: siteConfig.nameEn },
      mainEntityOfPage: url,
      ...(opts?.seriesTitle ? { isPartOf: { "@type": "CreativeWorkSeries", name: opts.seriesTitle } } : {}),
    }
  }

  // Fallback: basic CreativeWork when no video exists yet.
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#sermon`,
    name: sermon.title,
    description,
    url,
    datePublished: sermon.dateIso,
    publisher: { "@type": "Church", "@id": `${siteConfig.siteUrl}#church`, name: siteConfig.nameEn },
    mainEntityOfPage: url,
    ...(opts?.seriesTitle ? { isPartOf: { "@type": "CreativeWorkSeries", name: opts.seriesTitle } } : {}),
  }
}

export function eventJsonLd(event: Event, opts?: { startIso?: string; endIso?: string }) {
  const url = toAbsoluteUrl(`/events/${event.slug}`)
  const heroImageSrc = event.imageSrc ? toAbsoluteUrl(event.imageSrc) : undefined

  const attendanceMode =
    event.location.name.toLowerCase().includes("online") || event.location.name.toLowerCase().includes("livestream")
      ? "https://schema.org/OnlineEventAttendanceMode"
      : "https://schema.org/OfflineEventAttendanceMode"

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${url}#event`,
    name: event.title,
    description: event.description,
    url,
    mainEntityOfPage: url,
    ...(opts?.startIso ? { startDate: opts.startIso } : {}),
    ...(opts?.endIso ? { endDate: opts.endIso } : {}),
    eventAttendanceMode: attendanceMode,
    eventStatus: "https://schema.org/EventScheduled",
    organizer: {
      "@type": "Church",
      "@id": `${siteConfig.siteUrl}#church`,
      name: siteConfig.nameEn,
      url: siteConfig.siteUrl,
    },
    ...(heroImageSrc ? { image: [heroImageSrc] } : {}),
    location:
      attendanceMode === "https://schema.org/OnlineEventAttendanceMode"
        ? { "@type": "VirtualLocation", url: siteConfig.youtubeChannelUrl }
        : {
            "@type": "Place",
            name: event.location.name,
            address: {
              "@type": "PostalAddress",
              streetAddress: event.location.addressLines.join(", "),
              addressLocality: "Mississauga",
              addressRegion: "ON",
              addressCountry: "CA",
            },
          },
  }
}
