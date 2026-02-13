"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

type Phase = "idle" | "loading" | "finishing"

function isInternalNavigableLink(anchor: HTMLAnchorElement) {
  const href = anchor.getAttribute("href") ?? ""
  if (!href) return false
  if (href.startsWith("#")) return false
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return false
  if (anchor.target && anchor.target !== "_self") return false
  if (anchor.hasAttribute("download")) return false
  if (anchor.getAttribute("rel")?.toLowerCase().includes("external")) return false

  try {
    const url = new URL(href, window.location.href)
    if (url.origin !== window.location.origin) return false
    return true
  } catch {
    return false
  }
}

export default function PageProgressBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const routeKey = useMemo(() => `${pathname}?${searchParams?.toString() ?? ""}`, [pathname, searchParams])

  const [phase, setPhase] = useState<Phase>("idle")
  const [progress, setProgress] = useState(0)

  const cleanupRef = useRef<{
    t1?: number
    t2?: number
    t3?: number
    safety?: number
  }>({})

  const clearTimers = useCallback(() => {
    const c = cleanupRef.current
    if (c.t1 !== undefined) window.clearTimeout(c.t1)
    if (c.t2 !== undefined) window.clearTimeout(c.t2)
    if (c.t3 !== undefined) window.clearTimeout(c.t3)
    if (c.safety !== undefined) window.clearTimeout(c.safety)
    cleanupRef.current = {}
  }, [])

  const finish = useCallback(() => {
    clearTimers()
    setPhase("finishing")
    setProgress(100)
    cleanupRef.current.t3 = window.setTimeout(() => {
      setPhase("idle")
      setProgress(0)
    }, 350)
  }, [clearTimers])

  const start = useCallback(() => {
    clearTimers()
    setPhase("loading")
    setProgress(0)

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
    if (reduced) {
      setProgress(100)
      cleanupRef.current.t3 = window.setTimeout(() => {
        setPhase("idle")
        setProgress(0)
      }, 200)
      return
    }

    cleanupRef.current.t1 = window.setTimeout(() => setProgress(18), 30)
    cleanupRef.current.t2 = window.setTimeout(() => setProgress(62), 280)
    cleanupRef.current.safety = window.setTimeout(() => finish(), 4000)
  }, [clearTimers, finish])

  // Show a quick progress bar on first load.
  useEffect(() => {
    start()
    return () => clearTimers()
  }, [clearTimers, start])

  // Finish when the route key changes after a started navigation.
  const lastRouteKeyRef = useRef(routeKey)
  useEffect(() => {
    const prev = lastRouteKeyRef.current
    lastRouteKeyRef.current = routeKey
    if (prev === routeKey) return
    if (phase === "loading") finish()
  }, [finish, phase, routeKey])

  // Start on internal link clicks.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return
      if (e.button !== 0) return
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return

      const target = e.target as HTMLElement | null
      const anchor = target?.closest?.("a") as HTMLAnchorElement | null
      if (!anchor) return
      if (!isInternalNavigableLink(anchor)) return

      if (phase === "loading") return
      start()
    }

    const options = { capture: true } as const
    document.addEventListener("click", onClick, options)
    return () => document.removeEventListener("click", onClick, options)
  }, [phase, start])

  const visible = phase !== "idle"

  return (
    <div
      className="progress-bar"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
      style={{
        width: `${progress}%`,
        opacity: visible ? 1 : 0,
        pointerEvents: "none",
      }}
    />
  )
}
