import { ImageResponse } from "next/og"
import { notFound } from "next/navigation"

import { getPublicSermonBySlug } from "@/lib/sermons"
import { siteConfig } from "@/lib/site"

export const runtime = "edge"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default async function OpenGraphImage({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const sermon = getPublicSermonBySlug(resolvedParams.slug)
  if (!sermon) notFound()

  const quote = (sermon.shareQuote ?? sermon.scriptures?.[0] ?? sermon.title).trim()

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: 64,
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 20, letterSpacing: 2, textTransform: "uppercase", color: "#2a3b69", opacity: 0.7 }}>
            {siteConfig.nameEn} • Sermon
          </div>
          <div style={{ fontSize: 54, fontWeight: 800, lineHeight: 1.1, color: "#1f2b4d" }}>
            {sermon.title}
          </div>
          <div style={{ fontSize: 32, lineHeight: 1.25, color: "#1f2b4d", opacity: 0.85 }}>
            {quote}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: 20, color: "#1f2b4d", opacity: 0.75 }}>
            {sermon.dateIso}
            {sermon.speaker ? ` • ${sermon.speaker}` : ""}
          </div>
          <div style={{ fontSize: 20, color: "#1f2b4d", opacity: 0.75 }}>{siteConfig.locationShort}</div>
        </div>
      </div>
    ),
    size,
  )
}
