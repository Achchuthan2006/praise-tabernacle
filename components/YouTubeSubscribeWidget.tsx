"use client"

import { useEffect, useMemo, useRef, useState } from "react"

declare global {
  interface Window {
    gapi?: any
  }
}

let platformPromise: Promise<void> | null = null

function loadYouTubePlatform() {
  if (typeof window === "undefined") return Promise.resolve()
  if (platformPromise) return platformPromise

  platformPromise = new Promise<void>((resolve) => {
    const existing = document.querySelector("script[data-yt-platform]")
    if (existing) {
      resolve()
      return
    }

    const script = document.createElement("script")
    script.src = "https://apis.google.com/js/platform.js"
    script.async = true
    script.defer = true
    script.setAttribute("data-yt-platform", "1")
    script.onload = () => resolve()
    script.onerror = () => resolve()
    document.head.appendChild(script)
  })

  return platformPromise
}

function parseChannelData(channelUrl: string) {
  const url = (channelUrl ?? "").trim()
  if (!url) return null

  const channelIdMatch = /youtube\.com\/channel\/([^/?#]+)/i.exec(url)
  if (channelIdMatch?.[1]) return { kind: "channelId" as const, value: channelIdMatch[1] }

  const handleMatch = /youtube\.com\/@([^/?#]+)/i.exec(url)
  if (handleMatch?.[1]) return { kind: "channel" as const, value: handleMatch[1] }

  return null
}

export default function YouTubeSubscribeWidget({
  channelUrl,
  className,
}: {
  channelUrl: string
  className?: string
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [active, setActive] = useState(false)

  const channel = useMemo(() => parseChannelData(channelUrl), [channelUrl])

  useEffect(() => {
    if (active) return
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true)
          io.disconnect()
        }
      },
      { rootMargin: "200px" },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [active])

  useEffect(() => {
    if (!active) return
    if (!channel) return

    let cancelled = false

    const run = async () => {
      await loadYouTubePlatform()
      if (cancelled) return
      window.gapi?.ytsubscribe?.go?.()
    }

    void run()
    return () => {
      cancelled = true
    }
  }, [active, channel])

  if (!channel) return null

  const dataAttrs =
    channel.kind === "channelId"
      ? { "data-channelid": channel.value }
      : { "data-channel": channel.value }

  return (
    <div ref={ref} className={className}>
      <div
        className="g-ytsubscribe"
        {...dataAttrs}
        data-layout="default"
        data-count="default"
      />
    </div>
  )
}

