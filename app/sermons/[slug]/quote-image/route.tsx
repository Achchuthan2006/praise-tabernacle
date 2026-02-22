import { ImageResponse } from "next/og"
import { notFound } from "next/navigation"

import { getPublicSermonBySlug } from "@/lib/sermons"
import { siteConfig } from "@/lib/site"

export const runtime = "edge"

function quoteForSermon(sermon: { title: string; shareQuote?: string; scriptures?: string[] }) {
  return (sermon.shareQuote ?? sermon.scriptures?.[0] ?? sermon.title).trim()
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> | { slug: string } },
) {
  const resolvedParams = await params
  const sermon = getPublicSermonBySlug(resolvedParams.slug)
  if (!sermon) notFound()

  const quote = quoteForSermon(sermon)
  const isDownload = new URL(req.url).searchParams.get("download") === "1"

  const image = new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #ffffff 0%, #f3f6ff 100%)",
          padding: 64,
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 20, letterSpacing: 2, textTransform: "uppercase", color: "#2a3b69", opacity: 0.7 }}>
            {siteConfig.nameEn} • Share
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, lineHeight: 1.12, color: "#1f2b4d" }}>
            {quote}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: 20, color: "#1f2b4d", opacity: 0.75 }}>{sermon.title}</div>
          <div style={{ fontSize: 20, color: "#1f2b4d", opacity: 0.75 }}>
            {siteConfig.siteUrl.replace(/^https?:\/\//, "")}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )

  if (!isDownload) return image

  const headers = new Headers(image.headers)
  headers.set("content-disposition", `attachment; filename="${sermon.slug}-quote.png"`)
  return new Response(image.body, { headers, status: image.status, statusText: image.statusText })
}
