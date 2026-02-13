"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

function prefersReducedMotion() {
  if (typeof window === "undefined") return true
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
}

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

export default function InkTransition() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const routeKey = useMemo(() => `${pathname}?${searchParams?.toString() ?? ""}`, [pathname, searchParams])

  const [active, setActive] = useState(false)
  const timersRef = useRef<{ hide?: number; safety?: number }>({})

  const clearTimers = useCallback(() => {
    const t = timersRef.current
    if (t.hide !== undefined) window.clearTimeout(t.hide)
    if (t.safety !== undefined) window.clearTimeout(t.safety)
    timersRef.current = {}
  }, [])

  const start = useCallback(() => {
    if (prefersReducedMotion()) return
    clearTimers()
    setActive(true)
    timersRef.current.safety = window.setTimeout(() => setActive(false), 2200)
  }, [clearTimers])

  const finish = useCallback(() => {
    clearTimers()
    timersRef.current.hide = window.setTimeout(() => setActive(false), 220)
  }, [clearTimers])

  // Close the ink after route changes.
  const lastRouteKeyRef = useRef(routeKey)
  useEffect(() => {
    const prev = lastRouteKeyRef.current
    lastRouteKeyRef.current = routeKey
    if (prev === routeKey) return
    if (!active) return
    finish()
  }, [active, finish, routeKey])

  // Trigger on internal link clicks.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return
      if (e.button !== 0) return
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return

      const target = e.target as HTMLElement | null
      const anchor = target?.closest?.("a") as HTMLAnchorElement | null
      if (!anchor) return
      if (!isInternalNavigableLink(anchor)) return

      start()
    }

    const options = { capture: true } as const
    document.addEventListener("click", onClick, options)
    return () => document.removeEventListener("click", onClick, options)
  }, [start])

  // Trigger on back/forward.
  useEffect(() => {
    const onPopState = () => start()
    window.addEventListener("popstate", onPopState)
    return () => window.removeEventListener("popstate", onPopState)
  }, [start])

  // Safety cleanup.
  useEffect(() => () => clearTimers(), [clearTimers])

  return <div className={["ink-transition", active ? "active" : ""].join(" ").trim()} aria-hidden="true" />
}

