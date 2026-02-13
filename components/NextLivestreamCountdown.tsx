"use client"

import { useEffect, useMemo, useState } from "react"

type Parts = { year: number; month: number; day: number; hour: number; minute: number; weekday: number }

function getZonedParts(date: Date, timeZone: string): Parts {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    weekday: "short",
  })
  const parts = fmt.formatToParts(date)
  const byType = new Map(parts.map((p) => [p.type, p.value]))
  const wd = (byType.get("weekday") ?? "").toLowerCase()
  const weekday =
    wd.startsWith("sun") ? 0 : wd.startsWith("mon") ? 1 : wd.startsWith("tue") ? 2 : wd.startsWith("wed") ? 3 : wd.startsWith("thu") ? 4 : wd.startsWith("fri") ? 5 : 6

  return {
    year: Number(byType.get("year") ?? 0),
    month: Number(byType.get("month") ?? 0),
    day: Number(byType.get("day") ?? 0),
    hour: Number(byType.get("hour") ?? 0),
    minute: Number(byType.get("minute") ?? 0),
    weekday,
  }
}

// Construct a Date that represents the given local time in `timeZone`.
// This accounts for DST by iteratively correcting the UTC guess.
function makeZonedDate(timeZone: string, year: number, month: number, day: number, hour: number, minute: number) {
  let guess = new Date(Date.UTC(year, month - 1, day, hour, minute, 0))
  for (let i = 0; i < 3; i += 1) {
    const actual = getZonedParts(guess, timeZone)
    const diffMinutes =
      (year - actual.year) * 525600 +
      (month - actual.month) * 43200 +
      (day - actual.day) * 1440 +
      (hour - actual.hour) * 60 +
      (minute - actual.minute)
    if (!diffMinutes) break
    guess = new Date(guess.getTime() + diffMinutes * 60_000)
  }
  return guess
}

function getNextSundayServiceStart(timeZone: string, hour: number, minute: number) {
  const now = new Date()
  const zonedNow = getZonedParts(now, timeZone)
  const daysUntilSunday = (7 + 0 - zonedNow.weekday) % 7
  const baseDayOffset = daysUntilSunday === 0 ? 0 : daysUntilSunday

  // Build candidate for "this Sunday" (or next if not Sunday today).
  const todayUtc = makeZonedDate(timeZone, zonedNow.year, zonedNow.month, zonedNow.day, 0, 0)
  const candidateDayUtc = new Date(todayUtc.getTime() + baseDayOffset * 24 * 60 * 60_000)
  const candidateParts = getZonedParts(candidateDayUtc, timeZone)
  let candidate = makeZonedDate(timeZone, candidateParts.year, candidateParts.month, candidateParts.day, hour, minute)

  // If we're on Sunday and the time already passed, jump to next Sunday.
  if (daysUntilSunday === 0) {
    const alreadyPast = zonedNow.hour > hour || (zonedNow.hour === hour && zonedNow.minute >= minute)
    if (alreadyPast) {
      const nextWeek = new Date(candidate.getTime() + 7 * 24 * 60 * 60_000)
      const nextParts = getZonedParts(nextWeek, timeZone)
      candidate = makeZonedDate(timeZone, nextParts.year, nextParts.month, nextParts.day, hour, minute)
    }
  }

  return candidate
}

function pad2(n: number) {
  return String(Math.max(0, n)).padStart(2, "0")
}

export default function NextLivestreamCountdown({
  service = 1,
  timeZone = "America/Toronto",
}: {
  service?: 1 | 2
  timeZone?: string
}) {
  const [target, setTarget] = useState<Date | null>(null)
  const [nowMs, setNowMs] = useState<number | null>(null)

  useEffect(() => {
    const h = service === 1 ? 9 : 10
    const m = service === 1 ? 15 : 30
    setTarget(getNextSundayServiceStart(timeZone, h, m))
    setNowMs(Date.now())

    const id = window.setInterval(() => setNowMs(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [service, timeZone])

  const diffMs = target && nowMs ? Math.max(0, target.getTime() - nowMs) : 0
  const totalSeconds = Math.floor(diffMs / 1000)
  const days = Math.floor(totalSeconds / (24 * 3600))
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  const startsLabel = useMemo(() => {
    if (!target) return ""
    const fmt = new Intl.DateTimeFormat("en-CA", {
      timeZone,
      weekday: "long",
      month: "long",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
    return fmt.format(target)
  }, [target, timeZone])

  return (
    <div className="rounded-3xl border border-churchBlue/10 bg-white p-4 shadow-glow">
      <div className="flex items-center justify-between gap-3">
        <div className="text-[11px] font-semibold tracking-wide text-churchBlue/60">Next livestream begins in</div>
        <div className="text-[10px] text-churchBlue/60">Starts: {startsLabel || "—"}</div>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-1.5 text-center">
        <div className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft px-2 py-2">
          <div className="text-lg font-extrabold tracking-tight text-churchBlue">{pad2(days)}</div>
          <div className="mt-1 text-[10px] font-semibold tracking-wide text-churchBlue/60">DAYS</div>
        </div>
        <div className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft px-2 py-2">
          <div className="text-lg font-extrabold tracking-tight text-churchBlue">{pad2(hours)}</div>
          <div className="mt-1 text-[10px] font-semibold tracking-wide text-churchBlue/60">HRS</div>
        </div>
        <div className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft px-2 py-2">
          <div className="text-lg font-extrabold tracking-tight text-churchBlue">{pad2(minutes)}</div>
          <div className="mt-1 text-[10px] font-semibold tracking-wide text-churchBlue/60">MINS</div>
        </div>
        <div className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft px-2 py-2">
          <div className="text-lg font-extrabold tracking-tight text-churchBlue">{pad2(seconds)}</div>
          <div className="mt-1 text-[10px] font-semibold tracking-wide text-churchBlue/60">SECS</div>
        </div>
      </div>
    </div>
  )
}
