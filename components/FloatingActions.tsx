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

  const service1Start = 9 * 60 + 15
  const service2Start = 10 * 60 + 30
  const service: 1 | 2 = mins < service2Start ? 1 : 2

  const liveWindowStart = 9 * 60 + 10
  const liveWindowEnd = 12 * 60 + 15
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
  icon,
  labelEn,
  labelTa,
  showLiveDot,
}: {
  href: string
  active: boolean
  icon: "play" | "prayer" | "give"
  labelEn: string
  labelTa: string
  showLiveDot?: boolean
}) {
  return (
    <Link
      href={href}
      className={[
        "focus-ring relative flex min-h-14 items-center justify-center gap-2 rounded-xl px-2 text-sm font-semibold transition",
        active
          ? "bg-churchBlue text-white shadow-[0_10px_24px_rgb(2_6_23_/_0.25)]"
          : "bg-transparent text-churchBlue hover:bg-churchBlueSoft",
      ].join(" ")}
      aria-label={`${labelEn} / ${labelTa}`}
    >
      <span
        className={[
          "grid h-7 w-7 place-items-center rounded-full",
          active ? "bg-white/15" : "bg-churchBlue/10",
        ].join(" ")}
      >
        <Icon name={icon} />
      </span>
      <span className="whitespace-nowrap text-[13px] leading-none">
        <Lang en={labelEn} ta={labelTa} taClassName="font-tamil" />
      </span>
      {showLiveDot ? (
        <span className="absolute right-3 top-2 inline-flex h-2 w-2 rounded-full bg-red-500" />
      ) : null}
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

  return (
    <div
      className={[
        "fixed inset-x-0 bottom-0 z-[85] border-t border-churchBlue/10 bg-white/95 px-3 pt-2 shadow-[0_-8px_24px_rgb(2_6_23_/_0.12)] backdrop-blur md:hidden",
        "pb-[max(env(safe-area-inset-bottom),0.5rem)]",
      ].join(" ")}
    >
      <nav aria-label="Quick actions" className="mx-auto grid h-14 w-full max-w-screen-sm grid-cols-3 gap-2">
        <Action
          href={watchHref}
          active={pathname.startsWith("/watch")}
          icon="play"
          labelEn={liveState.live ? "Watch Live" : "Watch"}
          labelTa={
            liveState.live
              ? "\u0BA8\u0BC7\u0BB0\u0BB2\u0BC8 \u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95"
              : "\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95"
          }
          showLiveDot={liveState.live}
        />
        <Action
          href="/prayer"
          active={pathname.startsWith("/prayer")}
          icon="prayer"
          labelEn="Prayer"
          labelTa="\u0B9C\u0BC6\u0BAA\u0BAE\u0BCD"
        />
        <Action
          href="/give"
          active={pathname.startsWith("/give")}
          icon="give"
          labelEn="Give"
          labelTa="\u0B95\u0BCA\u0B9F\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD"
        />
      </nav>
    </div>
  )
}

