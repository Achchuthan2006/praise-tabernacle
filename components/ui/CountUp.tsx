"use client"

import { useEffect, useMemo, useRef, useState } from "react"

function prefersReducedMotion() {
  if (typeof window === "undefined") return true
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

export default function CountUp({
  value,
  className,
  durationMs = 1200,
  locale = "en-CA",
}: {
  value: number
  className?: string
  durationMs?: number
  locale?: string
}) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const [display, setDisplay] = useState(0)
  const [done, setDone] = useState(false)

  const formatted = useMemo(() => {
    const v = Number.isFinite(value) ? Math.max(0, Math.round(value)) : 0
    try {
      return new Intl.NumberFormat(locale).format(v)
    } catch {
      return String(v)
    }
  }, [locale, value])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const target = Number.isFinite(value) ? Math.max(0, Math.round(value)) : 0
    if (target === 0) {
      setDisplay(0)
      setDone(true)
      return
    }

    if (prefersReducedMotion()) {
      setDisplay(target)
      setDone(true)
      return
    }

    let raf: number | null = null
    let startedAt: number | null = null

    const start = () => {
      if (done) return
      const tick = (ts: number) => {
        if (startedAt === null) startedAt = ts
        const elapsed = ts - startedAt
        const t = Math.min(1, elapsed / Math.max(1, durationMs))
        const eased = easeOutCubic(t)
        const next = Math.round(target * eased)
        setDisplay(next)
        if (t < 1) {
          raf = window.requestAnimationFrame(tick)
        } else {
          setDisplay(target)
          setDone(true)
        }
      }
      raf = window.requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect()
          start()
        }
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0.2 },
    )

    io.observe(el)
    return () => {
      io.disconnect()
      if (raf !== null) window.cancelAnimationFrame(raf)
    }
  }, [done, durationMs, value])

  return (
    <span
      ref={ref}
      className={["counter", className ?? ""].join(" ").trim()}
      aria-label={formatted}
    >
      {formatted}
    </span>
  )
}

