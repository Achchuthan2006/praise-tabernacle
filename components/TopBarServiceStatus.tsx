"use client"

import { useEffect, useMemo, useState } from "react"

import Lang from "@/components/language/Lang"
import { useLanguage } from "@/components/language/LanguageProvider"
import { parseWeeklyTimeText } from "@/lib/serviceTimes"
import { siteConfig } from "@/lib/site"

const TIME_ZONE = "America/Toronto"

type ZonedParts = {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  weekday: number
}

type ServiceEntry = {
  id: string
  titleEn: string
  titleTa: string
  hour24: number
  minute: number
}

function getZonedParts(date: Date, timeZone: string): ZonedParts {
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
  const byType = new Map(parts.map((part) => [part.type, part.value]))
  const weekdayRaw = (byType.get("weekday") ?? "").toLowerCase()
  const weekday =
    weekdayRaw.startsWith("sun")
      ? 0
      : weekdayRaw.startsWith("mon")
        ? 1
        : weekdayRaw.startsWith("tue")
          ? 2
          : weekdayRaw.startsWith("wed")
            ? 3
            : weekdayRaw.startsWith("thu")
              ? 4
              : weekdayRaw.startsWith("fri")
                ? 5
                : 6

  return {
    year: Number(byType.get("year") ?? 0),
    month: Number(byType.get("month") ?? 0),
    day: Number(byType.get("day") ?? 0),
    hour: Number(byType.get("hour") ?? 0),
    minute: Number(byType.get("minute") ?? 0),
    weekday,
  }
}

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

function formatCountdown(target: Date, nowMs: number) {
  const totalMinutes = Math.max(0, Math.floor((target.getTime() - nowMs) / 60_000))
  const days = Math.floor(totalMinutes / (24 * 60))
  const hours = Math.floor((totalMinutes % (24 * 60)) / 60)
  const minutes = totalMinutes % 60

  if (days > 0) return `${days}d ${hours}h`
  if (hours > 0) return `${hours}h ${minutes}m`
  return `${minutes}m`
}

function serviceLabel(service: ServiceEntry, language: "en" | "ta") {
  return language === "ta" ? service.titleTa : service.titleEn
}

function getNextService(services: ServiceEntry[], now: Date) {
  const zonedNow = getZonedParts(now, TIME_ZONE)
  const baseToday = makeZonedDate(TIME_ZONE, zonedNow.year, zonedNow.month, zonedNow.day, 0, 0)

  return services
    .map((service) => {
      let deltaDays = (7 - zonedNow.weekday) % 7
      const sameDay = deltaDays === 0

      if (sameDay) {
        const currentMinutes = zonedNow.hour * 60 + zonedNow.minute
        const serviceMinutes = service.hour24 * 60 + service.minute
        if (serviceMinutes <= currentMinutes) deltaDays = 7
      }

      const candidateDay = new Date(baseToday.getTime() + deltaDays * 24 * 60 * 60_000)
      const candidateParts = getZonedParts(candidateDay, TIME_ZONE)
      const start = makeZonedDate(
        TIME_ZONE,
        candidateParts.year,
        candidateParts.month,
        candidateParts.day,
        service.hour24,
        service.minute,
      )

      return { service, start }
    })
    .sort((a, b) => a.start.getTime() - b.start.getTime())[0]
}

function formatStart(target: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(target)
}

export default function TopBarServiceStatus() {
  const { language } = useLanguage()
  const [nowMs, setNowMs] = useState<number | null>(null)

  useEffect(() => {
    setNowMs(Date.now())
    const id = window.setInterval(() => setNowMs(Date.now()), 30_000)
    return () => window.clearInterval(id)
  }, [])

  const services = useMemo<ServiceEntry[]>(
    () =>
      siteConfig.serviceTimes.flatMap((service) => {
        const parsed = parseWeeklyTimeText(service.time)
        if (!parsed) return []

        return [
          {
            id: service.id,
            titleEn: service.labelEn,
            titleTa: service.labelTa,
            hour24: parsed.hour24,
            minute: parsed.minute,
          },
        ]
      }),
    [],
  )

  const next = useMemo(() => {
    if (!nowMs || services.length === 0) return null
    return getNextService(services, new Date(nowMs))
  }, [nowMs, services])

  if (!next || !nowMs) return null

  const countdown = formatCountdown(next.start, nowMs)
  const startsAt = formatStart(next.start)

  return (
    <div className="top-bar-status rounded-full border border-white/18 bg-white/12 px-3 py-1.5 text-center text-[10px] font-semibold text-white/95 shadow-[0_10px_24px_rgb(0_0_0_/_0.14)] sm:text-left sm:text-[11px]">
      <div className="leading-[1.2]">
        <Lang
          en={`Next service: ${serviceLabel(next.service, "en")} in ${countdown}`}
          ta={`${serviceLabel(next.service, "ta")} ${countdown} இல்`}
          taClassName="font-tamil"
        />
      </div>
      <div className="mt-0.5 leading-[1.15] text-white/84">
        <Lang en={`Starts ${startsAt}`} ta={`${startsAt} தொடக்கம்`} taClassName="font-tamil" />
      </div>
    </div>
  )
}
