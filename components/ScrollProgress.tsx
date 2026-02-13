"use client"

import { useEffect, useRef } from "react"

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = barRef.current
    if (!el) return

    let raf: number | null = null

    const update = () => {
      raf = null
      const doc = document.documentElement
      const scrollTop = window.scrollY || doc.scrollTop || 0
      const scrollHeight = doc.scrollHeight || 0
      const clientHeight = doc.clientHeight || 0
      const total = Math.max(1, scrollHeight - clientHeight)
      const pct = Math.max(0, Math.min(1, scrollTop / total)) * 100
      el.style.width = `${pct.toFixed(2)}%`
    }

    const onScroll = () => {
      if (raf !== null) return
      raf = window.requestAnimationFrame(update)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    update()

    return () => {
      if (raf !== null) cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return <div ref={barRef} className="scroll-progress pointer-events-none" aria-hidden="true" />
}

