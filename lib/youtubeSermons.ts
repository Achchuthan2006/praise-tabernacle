import type { Sermon } from "@/lib/sermons"
import { publicSermons } from "@/lib/sermons"
import { siteConfig } from "@/lib/site"

type YouTubePlaylistItem = {
  snippet?: {
    title?: string
    description?: string
    publishedAt?: string
    channelTitle?: string
    thumbnails?: {
      maxres?: { url?: string }
      standard?: { url?: string }
      high?: { url?: string }
      medium?: { url?: string }
      default?: { url?: string }
    }
    resourceId?: {
      videoId?: string
    }
  }
}

type YouTubePlaylistResponse = {
  items?: YouTubePlaylistItem[]
  nextPageToken?: string
}

function readServerEnv(key: string) {
  const value = process.env[key]?.trim()
  return value ? value : ""
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function normalizeTitle(value: string) {
  return value
    .replace(/\b20216\b/g, "2026")
    .replace(/[–—]/g, "-")
    .trim()
}

function inferLanguage(title: string): Sermon["language"] {
  const normalized = title.toLowerCase()
  if (normalized.includes("2nd service") || normalized.includes("tamil") || normalized.includes("தமிழ")) return "ta"
  if (normalized.includes("1st service") || normalized.includes("english")) return "en"
  return "mixed"
}

function inferTopics(title: string) {
  const normalized = title.toLowerCase()
  const topics = new Set<string>()

  if (normalized.includes("service")) topics.add("Sunday Service")
  if (normalized.includes("prayer")) topics.add("Prayer")
  if (normalized.includes("healing")) topics.add("Healing")
  if (normalized.includes("deliverance")) topics.add("Deliverance")
  if (normalized.includes("fasting")) topics.add("Fasting")
  if (normalized.includes("christmas")) topics.add("Christmas")
  if (normalized.includes("communion")) topics.add("Communion")
  if (normalized.includes("new year")) topics.add("New Year")
  if (normalized.includes("worship")) topics.add("Worship")
  if (normalized.includes("program")) topics.add("Program")

  return Array.from(topics)
}

function formatDateIso(value?: string) {
  if (!value) return ""
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ""
  return date.toISOString().slice(0, 10)
}

function buildThumbnail(item: YouTubePlaylistItem) {
  const thumbs = item.snippet?.thumbnails
  return (
    thumbs?.maxres?.url ??
    thumbs?.standard?.url ??
    thumbs?.high?.url ??
    thumbs?.medium?.url ??
    thumbs?.default?.url ??
    ""
  )
}

async function fetchPlaylistItems(playlistId: string, apiKey: string, limit: number) {
  const items: YouTubePlaylistItem[] = []
  let pageToken = ""

  while (items.length < limit) {
    const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems")
    url.searchParams.set("part", "snippet")
    url.searchParams.set("playlistId", playlistId)
    url.searchParams.set("maxResults", String(Math.min(50, limit - items.length)))
    url.searchParams.set("key", apiKey)
    if (pageToken) url.searchParams.set("pageToken", pageToken)

    const response = await fetch(url.toString(), {
      next: { revalidate: 900 },
      headers: { Accept: "application/json" },
    })

    if (!response.ok) return []
    const data = (await response.json()) as YouTubePlaylistResponse
    items.push(...(data.items ?? []))
    if (!data.nextPageToken) break
    pageToken = data.nextPageToken
  }

  return items
}

export async function getYouTubeSermons(limit = 40): Promise<Sermon[]> {
  const apiKey = readServerEnv("YOUTUBE_API_KEY")
  const playlistId = (siteConfig.youtubeUploadsPlaylistId ?? "").trim()
  if (!apiKey || !playlistId) return publicSermons

  try {
    const items = await fetchPlaylistItems(playlistId, apiKey, limit)
    if (!items.length) return publicSermons

    const seededByVideoId = new Map(
      publicSermons
        .filter((sermon) => sermon.youtubeVideoId)
        .map((sermon) => [sermon.youtubeVideoId as string, sermon]),
    )

    const mapped: Array<Sermon | null> = items.map((item) => {
        const videoId = item.snippet?.resourceId?.videoId?.trim() ?? ""
        const title = normalizeTitle(item.snippet?.title ?? "")
        const dateIso = formatDateIso(item.snippet?.publishedAt)
        if (!videoId || !title || !dateIso) return null

        const seeded = seededByVideoId.get(videoId)
        if (seeded) {
          return {
            ...seeded,
            source: "seed",
            title,
            dateIso,
            speaker: seeded.speaker ?? item.snippet?.channelTitle ?? "Praise Tabernacle",
            thumbnailImageSrc: seeded.thumbnailImageSrc ?? (buildThumbnail(item) || undefined),
            platforms: {
              ...seeded.platforms,
              youtubeUrl: seeded.platforms?.youtubeUrl ?? `https://www.youtube.com/watch?v=${videoId}`,
            },
          } satisfies Sermon
        }

        return {
          slug: `${slugify(title)}-${videoId.slice(0, 6)}`,
          dateIso,
          source: "youtube-api",
          title,
          speaker: item.snippet?.channelTitle ?? "Praise Tabernacle",
          language: inferLanguage(title),
          youtubeVideoId: videoId,
          thumbnailImageSrc: buildThumbnail(item) || undefined,
          topics: inferTopics(title),
          platforms: {
            youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
          },
        } satisfies Sermon
      })

    const sermons = mapped
      .filter((sermon): sermon is Sermon => sermon !== null)
      .sort((a, b) => b.dateIso.localeCompare(a.dateIso))

    return sermons.length ? sermons : publicSermons
  } catch {
    return publicSermons
  }
}

export async function getLatestYouTubeSermon(service: 1 | 2 | null = null) {
  const sermons = await getYouTubeSermons(20)
  if (service) {
    const targetLanguage = service === 1 ? "en" : "ta"
    const match = sermons.find((sermon) => sermon.youtubeVideoId && sermon.language === targetLanguage)
    if (match) return match
  }
  return sermons.find((sermon) => sermon.youtubeVideoId) ?? null
}
