"use client"

import type { CSSProperties, ReactNode } from "react"
import { useEffect, useRef } from "react"

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export default function Magnetic({
  children,
  className,
  style,
  maxTranslate = 10,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
  maxTranslate?: number
}) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const enabledRef = useRef(false)
  const rafRef = useRef<number | null>(null)
  const lastPointerRef = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
    const finePointer = window.matchMedia?.("(hover: hover) and (pointer: fine)")?.matches ?? false
    enabledRef.current = finePointer && !prefersReducedMotion

    const el = ref.current
    if (!el) return
    el.style.transform = "translate3d(0px, 0px, 0)"
  }, [])

  const scheduleUpdate = () => {
    if (rafRef.current !== null) return
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null
      const el = ref.current
      const point = lastPointerRef.current
      if (!el || !point) return

      const rect = el.getBoundingClientRect()
      const px = rect.width ? (point.x - rect.left) / rect.width : 0.5
      const py = rect.height ? (point.y - rect.top) / rect.height : 0.5
      const dx = clamp(px, 0, 1) - 0.5
      const dy = clamp(py, 0, 1) - 0.5

      const tx = dx * 2 * maxTranslate
      const ty = dy * 2 * maxTranslate
      el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`
    })
  }

  return (
    <span
      ref={ref}
      className={["magnetic-btn", className ?? ""].join(" ").trim()}
      style={style}
      onPointerMove={(e) => {
        if (!enabledRef.current) return
        lastPointerRef.current = { x: e.clientX, y: e.clientY }
        scheduleUpdate()
      }}
      onPointerLeave={() => {
        if (!enabledRef.current) return
        const el = ref.current
        if (!el) return
        el.style.transform = "translate3d(0px, 0px, 0)"
      }}
      onPointerDown={() => {
        if (!enabledRef.current) return
        const el = ref.current
        if (!el) return
        el.style.transform = "translate3d(0px, 0px, 0)"
      }}
    >
      {children}
    </span>
  )
}

