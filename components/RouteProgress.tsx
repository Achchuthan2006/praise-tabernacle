"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

function isPlainLeftClick(event: MouseEvent) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey
}

function shouldStartForAnchor(anchor: HTMLAnchorElement) {
  const href = anchor.getAttribute("href") ?? ""
  if (!href) return false
  if (href.startsWith("#")) return false

  if (anchor.hasAttribute("download")) return false
  if (anchor.target && anchor.target !== "_self") return false
  if (anchor.getAttribute("rel")?.includes("external")) return false

  try {
    const nextUrl = new URL(href, window.location.href)
    const currentUrl = new URL(window.location.href)

    if (nextUrl.origin !== currentUrl.origin) return false
    if (nextUrl.pathname === currentUrl.pathname && nextUrl.search === currentUrl.search) return false
    return true
  } catch {
    return false
  }
}

export default function RouteProgress() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const routeKey = useMemo(() => `${pathname}?${searchParams?.toString() ?? ""}`, [pathname, searchParams])

  const [active, setActive] = useState(false)
  const [progress, setProgress] = useState(0)

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const finishTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastRouteKeyRef = useRef<string>(routeKey)

  const clearTimers = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = null
    if (finishTimerRef.current) clearTimeout(finishTimerRef.current)
    finishTimerRef.current = null
  }, [])

  const start = useCallback(() => {
    clearTimers()
    setActive(true)
    setProgress(12)

    // Jump to a visible state quickly.
    requestAnimationFrame(() => setProgress(72))

    // Slowly creep towards 90% while navigating.
    intervalRef.current = setInterval(() => {
      setProgress((v) => {
        const next = v + Math.max(0.6, (90 - v) * 0.04)
        return Math.min(90, next)
      })
    }, 220)
  }, [clearTimers])

  const finish = useCallback(() => {
    clearTimers()
    setProgress(100)
    finishTimerRef.current = setTimeout(() => {
      setActive(false)
      setProgress(0)
    }, 220)
  }, [clearTimers])

  useEffect(() => {
    const prev = lastRouteKeyRef.current
    lastRouteKeyRef.current = routeKey
    if (prev !== routeKey && active) finish()
  }, [active, finish, routeKey])

  useEffect(() => {
    const onClickCapture = (event: MouseEvent) => {
      if (!isPlainLeftClick(event)) return

      const target = event.target as Element | null
      const anchor = target?.closest("a") as HTMLAnchorElement | null
      if (!anchor) return

      if (!shouldStartForAnchor(anchor)) return
      start()
    }

    const onPopState = () => {
      start()
    }

    window.addEventListener("popstate", onPopState)
    document.addEventListener("click", onClickCapture, true)
    return () => {
      window.removeEventListener("popstate", onPopState)
      document.removeEventListener("click", onClickCapture, true)
      clearTimers()
    }
  }, [clearTimers, start])

  return (
    <div className={["route-progress", active ? "is-active" : ""].join(" ")} aria-hidden="true">
      <div className="route-progress-bar" style={{ transform: `scaleX(${progress / 100})` }} />
    </div>
  )
}
