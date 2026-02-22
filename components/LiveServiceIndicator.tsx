"use client"

import { useEffect, useState } from "react"

import Lang from "@/components/language/Lang"
import { useLanguage } from "@/components/language/LanguageProvider"
const TIME_ZONE = "America/Toronto"
const LIVE_WINDOW_START_MINUTES = 9 * 60
const LIVE_WINDOW_END_MINUTES = 12 * 60 + 30

const dowByShort: Record<string, 0 | 1 | 2 | 3 | 4 | 5 | 6> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
}

function getZonedParts(now: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now)

  const weekday = parts.find((p) => p.type === "weekday")?.value ?? ""
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "")
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "")

  const dayOfWeek = dowByShort[weekday] ?? null
  if (dayOfWeek === null) return null
  if (!Number.isFinite(hour) || !Number.isFinite(minute)) return null
  return { dayOfWeek, hour24: hour, minute }
}

function isLiveNow(now = new Date()) {
  const zoned = getZonedParts(now)
  if (!zoned) return false

  if (zoned.dayOfWeek !== 0) return false
  const currentMinutes = zoned.hour24 * 60 + zoned.minute
  return currentMinutes >= LIVE_WINDOW_START_MINUTES && currentMinutes <= LIVE_WINDOW_END_MINUTES
}

export default function LiveServiceIndicator({ className }: { className?: string }) {
  const { language } = useLanguage()
  const [live, setLive] = useState(false)

  useEffect(() => {
    const update = () => setLive(isLiveNow(new Date()))
    update()
    const id = window.setInterval(update, 30_000)
    return () => window.clearInterval(id)
  }, [])

  if (!live) {
    return (
      <span
        className="inline-flex min-h-9 items-center rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white/85"
        aria-label={language === "ta" ? "மீள்பார்வு" : "Watch replay"}
      >
        <Lang en="WATCH REPLAY" ta="மீள்பார்வு" taClassName="font-tamil" />
      </span>
    )
  }

  return (
    <span className={["live-indicator", className ?? ""].join(" ").trim()} aria-label={language === "ta" ? "நேரலை" : "Live"}>
      <span className="live-dot" aria-hidden="true" />
      <span className="text-[11px] font-extrabold tracking-wide">
        <Lang en="LIVE" ta="LIVE" taClassName="font-tamil" />
      </span>
    </span>
  )
}
