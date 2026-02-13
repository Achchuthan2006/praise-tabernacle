export type YouTubeFeedItem = {
  videoId: string
  title: string
  url: string
  publishedAt: string
}

function decodeXml(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
}

function firstMatch(text: string, re: RegExp) {
  const m = re.exec(text)
  return m?.[1] ?? ""
}

export async function fetchYouTubePlaylistFeed(
  playlistId: string,
  opts?: { limit?: number },
): Promise<YouTubeFeedItem[] | null> {
  const id = (playlistId ?? "").trim()
  if (!id) return null

  const limit = Math.max(1, Math.min(12, opts?.limit ?? 4))
  const url = `https://www.youtube.com/feeds/videos.xml?playlist_id=${encodeURIComponent(id)}`

  try {
    const res = await fetch(url, {
      next: { revalidate: 600 },
      headers: {
        "User-Agent": "PraiseTabernacleSite/1.0 (+https://praisetabernacle.org)",
      },
    })
    if (!res.ok) return null

    const xml = await res.text()
    const entries = xml.match(/<entry[\s\S]*?<\/entry>/g) ?? []

    const items: YouTubeFeedItem[] = []
    for (const entry of entries.slice(0, limit * 2)) {
      const videoId = firstMatch(entry, /<yt:videoId>([^<]+)<\/yt:videoId>/)
      const titleRaw = firstMatch(entry, /<title>([\s\S]*?)<\/title>/)
      const href = firstMatch(entry, /<link[^>]+rel="alternate"[^>]+href="([^"]+)"/)
      const publishedAt = firstMatch(entry, /<published>([^<]+)<\/published>/)

      const title = decodeXml(titleRaw.trim())
      const finalUrl = href || (videoId ? `https://www.youtube.com/watch?v=${videoId}` : "")

      if (!finalUrl || !title) continue
      items.push({ videoId, title, url: finalUrl, publishedAt })
      if (items.length >= limit) break
    }

    return items.length ? items : null
  } catch {
    return null
  }
}

