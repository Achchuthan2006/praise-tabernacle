"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

import Lang from "@/components/language/Lang"
import type { DailyPromise, PromiseVideo } from "@/lib/promises"
import { dailyPromises, getDailyPromiseForDate, getPromiseVideo, PROMISES_TIMEZONE } from "@/lib/promises"

function PromiseTile({ promise }: { promise: PromiseVideo }) {
  const hasVideo = Boolean((promise.youtubeVideoId ?? "").trim())
  const href = hasVideo ? `/promises/${promise.kind}?play=1` : `/promises/${promise.kind}`

  return (
    <article className="promise-card group relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-5 shadow-[0_18px_48px_rgba(0,0,0,0.18)] backdrop-blur">
      <div
        aria-hidden="true"
        className="promise-card-overlay pointer-events-none absolute inset-0 bg-[radial-gradient(30rem_18rem_at_10%_0%,rgba(255,255,255,0.20),transparent_55%),radial-gradient(24rem_16rem_at_90%_90%,rgba(var(--accent-gold),0.14),transparent_60%)] opacity-90"
      />

      <div className="promise-card-content relative">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-xs font-semibold tracking-wide text-white/70">
              <Lang en="PROMISE" ta="வாக்குத்தத்தம்" taClassName="font-tamil" />
            </div>
            <h3 className="mt-2 text-lg font-semibold tracking-tight text-white sm:text-xl">
              <Lang en={promise.titleEn} ta={promise.titleTa} taClassName="font-tamil" />
            </h3>
            <div className="mt-2 text-sm text-white/75">
              <Lang en={promise.verseRefEn} ta={promise.verseRefTa} taClassName="font-tamil" />
            </div>
          </div>

          <div className="flex-shrink-0">
            <div
              className={[
                "grid h-11 w-11 place-items-center rounded-full border",
                hasVideo ? "border-white/20 bg-white/10" : "border-white/15 bg-white/5",
              ].join(" ")}
              aria-hidden="true"
            >
              {hasVideo ? (
                <svg viewBox="0 0 24 24" className="promise-icon ml-0.5 h-6 w-6 text-white" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="promise-icon h-6 w-6 text-white/70" fill="none">
                  <path
                    d="M12 8v4m0 4h.01M10.3 4.6 2.7 18.2A2 2 0 0 0 4.4 21h15.2a2 2 0 0 0 1.7-2.8L13.7 4.6a2 2 0 0 0-3.4 0Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-white/75 line-clamp-2">
          <Lang en={promise.descriptionEn} ta={promise.descriptionTa} taClassName="font-tamil" />
        </p>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Link
            href={href}
            className={[
              "focus-ring promise-btn inline-flex min-h-11 items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition",
              "border border-white/20 bg-white/15 text-white backdrop-blur hover:bg-white/20",
            ].join(" ")}
          >
            <Lang en={hasVideo ? "Watch" : "View"} ta={hasVideo ? "பார்க்க" : "விவரம்"} taClassName="font-tamil" />
          </Link>
          <Link
            href="/promises"
            className="focus-ring promise-btn inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-transparent px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
          >
            <Lang en="All promises" ta="அனைத்து வாக்குத்தத்தங்கள்" taClassName="font-tamil" />
          </Link>
        </div>
      </div>
    </article>
  )
}

function DailyPromiseTile({
  promise,
  hydrated,
}: {
  promise: DailyPromise | null
  hydrated: boolean
}) {
  const verseRefEn = promise?.verseRefEn ?? ""
  const verseRefTa = promise?.verseRefTa ?? ""
  const descriptionEn = promise?.descriptionEn ?? "A daily promise verse with a short devotional."
  const descriptionTa = promise?.descriptionTa ?? "தினசரி வாக்குத்தத்த வசனம் மற்றும் குறுந் தியானம்."

  return (
    <article className="promise-card group relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-5 shadow-[0_18px_48px_rgba(0,0,0,0.18)] backdrop-blur">
      <div
        aria-hidden="true"
        className="promise-card-overlay pointer-events-none absolute inset-0 bg-[radial-gradient(30rem_18rem_at_10%_0%,rgba(255,255,255,0.20),transparent_55%),radial-gradient(24rem_16rem_at_90%_90%,rgba(var(--accent-gold),0.14),transparent_60%)] opacity-90"
      />

      <div className="promise-card-content relative">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-xs font-semibold tracking-wide text-white/70">
              <Lang en="TODAY" ta="இன்று" taClassName="font-tamil" />
            </div>
            <h3 className="mt-2 text-lg font-semibold tracking-tight text-white sm:text-xl">
              <Lang en="Today's Promise" ta="இன்றைய வாக்குத்தத்தம்" taClassName="font-tamil" />
            </h3>
            <div className="mt-2 text-sm text-white/75">
              {hydrated ? (
                <Lang en={verseRefEn} ta={verseRefTa} taClassName="font-tamil" />
              ) : (
                <Lang en="Daily rotation" ta="தினசரி மாறும்" taClassName="font-tamil" />
              )}
            </div>
          </div>

          <div className="flex-shrink-0">
            <div className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="promise-icon h-6 w-6 text-white" fill="none">
                <path
                  d="M12 8v4m0 4h.01M10.3 4.6 2.7 18.2A2 2 0 0 0 4.4 21h15.2a2 2 0 0 0 1.7-2.8L13.7 4.6a2 2 0 0 0-3.4 0Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-white/75 line-clamp-2">
          <Lang en={descriptionEn} ta={descriptionTa} taClassName="font-tamil" />
        </p>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Link
            href="/promises/daily?play=1"
            className={[
              "focus-ring promise-btn inline-flex min-h-11 items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition",
              "border border-white/20 bg-white/15 text-white backdrop-blur hover:bg-white/20",
            ].join(" ")}
          >
            <Lang en="Watch" ta="பார்க்க" taClassName="font-tamil" />
          </Link>
          <Link
            href="/promises"
            className="focus-ring promise-btn inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-transparent px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
          >
            <Lang en="All promises" ta="அனைத்து வாக்குத்தத்தங்கள்" taClassName="font-tamil" />
          </Link>
        </div>
      </div>
    </article>
  )
}

export default function PromiseHeroPanel() {
  const month = getPromiseVideo("month")
  const year = getPromiseVideo("year")
  const [hydrated, setHydrated] = useState(false)
  const daily = useMemo(() => (hydrated ? getDailyPromiseForDate(new Date(), PROMISES_TIMEZONE).promise : null), [hydrated])

  useEffect(() => {
    setHydrated(true)
  }, [])

  if (!month && !year && dailyPromises.length === 0) return null

  return (
    <div className="p-5 sm:p-7">
      <div className="-mx-5 overflow-x-auto px-5 pb-2 md:mx-0 md:overflow-visible md:px-0 md:pb-0">
        <div className="flex snap-x snap-mandatory gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
          <div className="w-[85vw] max-w-[26rem] shrink-0 snap-start md:w-auto md:max-w-none md:shrink md:snap-none">
            <DailyPromiseTile promise={daily} hydrated={hydrated} />
          </div>
          {month ? (
            <div className="w-[85vw] max-w-[26rem] shrink-0 snap-start md:w-auto md:max-w-none md:shrink md:snap-none">
              <PromiseTile promise={month} />
            </div>
          ) : null}
          {year ? (
            <div className="w-[85vw] max-w-[26rem] shrink-0 snap-start md:w-auto md:max-w-none md:shrink md:snap-none">
              <PromiseTile promise={year} />
            </div>
          ) : null}
        </div>
      </div>
      <p className="mt-2 text-xs text-white/70 md:hidden">Swipe for more promises {"->"}</p>
    </div>
  )
}
