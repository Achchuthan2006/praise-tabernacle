"use client"

import { useEffect, useState } from "react"

import Lang from "@/components/language/Lang"
import { useLanguage } from "@/components/language/LanguageProvider"
import { parseWeeklyTimeText } from "@/lib/serviceTimes"
import { siteConfig } from "@/lib/site"

const TIME_ZONE = "America/Toronto"
const DEFAULT_DURATION_MINUTES = 105
const PRELIVE_MINUTES = 10

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

  const currentMinutes = zoned.hour24 * 60 + zoned.minute

  for (const service of siteConfig.serviceTimes) {
    const parsed = parseWeeklyTimeText(service.time)
    if (!parsed) continue
    if (parsed.dayOfWeek !== zoned.dayOfWeek) continue
    const start = parsed.hour24 * 60 + parsed.minute
    const windowStart = start - PRELIVE_MINUTES
    const windowEnd = start + DEFAULT_DURATION_MINUTES
    if (currentMinutes >= windowStart && currentMinutes <= windowEnd) return true
  }

  return false
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

  if (!live) return null

  return (
    <span className={["live-indicator", className ?? ""].join(" ").trim()} aria-label={language === "ta" ? "நேரலை" : "Live"}>
      <span className="live-dot" aria-hidden="true" />
      <span className="text-[11px] font-extrabold tracking-wide">
        <Lang en="LIVE" ta="LIVE" taClassName="font-tamil" />
      </span>
    </span>
  )
}
