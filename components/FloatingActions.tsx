"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

import Lang from "@/components/language/Lang"

type LiveState =
  | { live: false; service: 1 | 2 }
  | { live: true; service: 1 | 2 }

function getZonedParts(date: Date, timeZone: string) {
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
    wd.startsWith("sun")
      ? 0
      : wd.startsWith("mon")
        ? 1
        : wd.startsWith("tue")
          ? 2
          : wd.startsWith("wed")
            ? 3
            : wd.startsWith("thu")
              ? 4
              : wd.startsWith("fri")
                ? 5
                : 6

  return {
    weekday,
    hour: Number(byType.get("hour") ?? 0),
    minute: Number(byType.get("minute") ?? 0),
  }
}

function computeLiveState(now = new Date(), timeZone = "America/Toronto"): LiveState {
  const { weekday, hour, minute } = getZonedParts(now, timeZone)
  const mins = hour * 60 + minute

  // Sunday services: 9:15 AM (English) and 10:30 AM (Tamil with English translation).
  const service1Start = 9 * 60 + 15
  const service2Start = 10 * 60 + 30

  const service: 1 | 2 = mins < service2Start ? 1 : 2

  // Show "Live" during a practical Sunday window (keeps UX simple and avoids DST pitfalls).
  const liveWindowStart = 9 * 60 + 10 // 9:10 AM
  const liveWindowEnd = 12 * 60 + 15 // 12:15 PM
  const live = weekday === 0 && mins >= liveWindowStart && mins <= liveWindowEnd

  return live ? { live: true, service } : { live: false, service }
}

function Icon({ name }: { name: "play" | "prayer" | "give" }) {
  if (name === "play") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
        <path
          d="M9.25 8.4v7.2c0 .9.98 1.45 1.75.98l6-3.6a1.15 1.15 0 0 0 0-1.96l-6-3.6c-.77-.47-1.75.08-1.75.98Z"
          fill="currentColor"
        />
      </svg>
    )
  }

  if (name === "prayer") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
        <path
          d="M11.9 2.6c.5 0 .9.4.9.9v6.2l2.2-2.2c.4-.4 1-.4 1.3 0s.4 1 0 1.3l-3.9 3.9c-.2.2-.4.3-.7.3s-.5-.1-.7-.3L7.1 8.8c-.4-.4-.4-1 0-1.3s1-.4 1.3 0l2.6 2.6V3.5c0-.5.4-.9.9-.9ZM6.8 13.7h10.4c.6 0 1.1.5 1.1 1.1v6.2c0 .6-.5 1.1-1.1 1.1H6.8c-.6 0-1.1-.5-1.1-1.1v-6.2c0-.6.5-1.1 1.1-1.1Z"
          fill="currentColor"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M7 6.8c0-1.6 1.3-2.8 2.8-2.8h4.4C15.7 4 17 5.2 17 6.8v1.6h.7c1.3 0 2.3 1 2.3 2.3v7c0 1.3-1 2.3-2.3 2.3H6.3C5 22 4 21 4 19.7v-7c0-1.3 1-2.3 2.3-2.3H7V6.8Zm2.8-.8c-.4 0-.8.4-.8.8v1.6h6V6.8c0-.4-.4-.8-.8-.8H9.8Zm1.7 7.2c0-.5.4-.9.9-.9h.2c.5 0 .9.4.9.9v.2c0 .5-.4.9-.9.9h-.2c-.5 0-.9-.4-.9-.9v-.2Z"
        fill="currentColor"
      />
    </svg>
  )
}

function Action({
  href,
  active,
  variant,
  icon,
  labelEn,
  labelTa,
  badge,
  className,
}: {
  href: string
  active: boolean
  variant: "primary" | "secondary" | "live"
  icon: "play" | "prayer" | "give"
  labelEn: string
  labelTa: string
  badge?: React.ReactNode
  className?: string
}) {
  const pulse = variant === "live" || icon === "prayer" || icon === "give"
  const base = "group relative flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold shadow-glow focus-ring"

  const style =
    variant === "live"
      ? "text-white bg-[linear-gradient(135deg,rgb(var(--primary-purple)),rgb(var(--primary-teal)))]"
      : variant === "primary"
        ? "text-white bg-churchBlue"
        : "text-churchBlue bg-white/95 border border-churchBlue/10 backdrop-blur"

  const dim = active ? "opacity-60 pointer-events-none" : ""

  return (
    <Link
      href={href}
      className={[base, style, pulse ? "cta-pulse" : "", dim, className ?? ""].join(" ").trim()}
      aria-label={`${labelEn} / ${labelTa}`}
    >
      <span className="btn-icon grid h-8 w-8 place-items-center rounded-full bg-black/10 text-current">
        <Icon name={icon} />
      </span>
      <span className="whitespace-nowrap">
        <Lang en={labelEn} ta={labelTa} taClassName="font-tamil" />
      </span>
      {badge ? <span className="ml-1">{badge}</span> : null}
      <span
        className={[
          "pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/0 transition",
          variant === "live" ? "group-hover:ring-white/25 group-focus-visible:ring-white/25" : "group-hover:ring-churchBlue/15 group-focus-visible:ring-churchBlue/15",
        ].join(" ")}
        aria-hidden="true"
      />
    </Link>
  )
}

export default function FloatingActions() {
  const pathname = usePathname()
  const [liveState, setLiveState] = useState<LiveState>({ live: false, service: 1 })

  useEffect(() => {
    const update = () => setLiveState(computeLiveState(new Date(), "America/Toronto"))
    update()
    const id = window.setInterval(update, 30_000)
    return () => window.clearInterval(id)
  }, [])

  const watchHref = useMemo(() => {
    return liveState.service === 1 ? "/watch?service=1" : "/watch?service=2"
  }, [liveState.service])

  const liveBadge = liveState.live ? (
    <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-[11px] font-semibold tracking-wide">
      <span className="relative inline-flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70 opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
      </span>
      LIVE
    </span>
  ) : null

  return (
    <div
      className={[
        "fixed bottom-4 right-4 z-[90]",
        "flex flex-col items-end gap-2",
        "pb-[env(safe-area-inset-bottom)] pr-[env(safe-area-inset-right)]",
      ].join(" ")}
    >
      <Action
        href={watchHref}
        active={pathname.startsWith("/watch")}
        variant={liveState.live ? "live" : "secondary"}
        icon="play"
        labelEn={liveState.live ? "Watch Live" : "Watch"}
        labelTa={liveState.live ? "நேரலை பார்க்க" : "பார்க்க"}
        badge={liveBadge}
        className={undefined}
      />
      <Action
        href="/prayer"
        active={pathname.startsWith("/prayer")}
        variant="secondary"
        icon="prayer"
        labelEn="Prayer Request"
        labelTa="ஜெப வேண்டுகோள்"
      />
      <Action
        href="/give"
        active={pathname.startsWith("/give")}
        variant="primary"
        icon="give"
        labelEn="Give"
        className=""
        labelTa="கொடுங்கள்"
      />
    </div>
  )
}
