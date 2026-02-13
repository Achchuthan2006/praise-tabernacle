"use client"

import type { CSSProperties, ReactNode } from "react"
import { useEffect, useRef } from "react"

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export default function Tilt({
  children,
  className,
  style,
  maxRotate = 10,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
  maxRotate?: number
}) {
  const ref = useRef<HTMLDivElement | null>(null)
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
    el.style.setProperty("--rotateX", "0deg")
    el.style.setProperty("--rotateY", "0deg")
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

      const rotateY = dx * 2 * maxRotate
      const rotateX = -dy * 2 * maxRotate

      el.style.setProperty("--rotateX", `${rotateX.toFixed(2)}deg`)
      el.style.setProperty("--rotateY", `${rotateY.toFixed(2)}deg`)
    })
  }

  return (
    <div
      ref={ref}
      className={["tilt-card", className ?? ""].join(" ").trim()}
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
        el.style.setProperty("--rotateX", "0deg")
        el.style.setProperty("--rotateY", "0deg")
      }}
    >
      <div className="tilt-card-inner">{children}</div>
    </div>
  )
}

