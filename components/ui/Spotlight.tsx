"use client"

import type { ComponentPropsWithoutRef } from "react"
import { useEffect, useRef } from "react"

function prefersReducedMotion() {
  if (typeof window === "undefined") return true
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
}

function finePointerHover() {
  if (typeof window === "undefined") return false
  return window.matchMedia?.("(hover: hover) and (pointer: fine)")?.matches ?? false
}

export default function Spotlight({
  className,
  children,
  spotlightSize = 600,
  ...props
}: ComponentPropsWithoutRef<"div"> & {
  spotlightSize?: number
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const lastRef = useRef<{ x: number; y: number } | null>(null)
  const enabledRef = useRef(false)

  useEffect(() => {
    enabledRef.current = finePointerHover() && !prefersReducedMotion()
    const el = ref.current
    if (!el) return
    el.style.setProperty("--spotlight-x", "50%")
    el.style.setProperty("--spotlight-y", "50%")
  }, [])

  const schedule = () => {
    if (rafRef.current !== null) return
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null
      const el = ref.current
      const p = lastRef.current
      if (!el || !p) return
      const rect = el.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      const x = ((p.x - rect.left) / rect.width) * 100
      const y = ((p.y - rect.top) / rect.height) * 100
      el.style.setProperty("--spotlight-x", `${Math.max(0, Math.min(100, x)).toFixed(2)}%`)
      el.style.setProperty("--spotlight-y", `${Math.max(0, Math.min(100, y)).toFixed(2)}%`)
    })
  }

  return (
    <div
      ref={ref}
      className={["spotlight-section", className ?? ""].join(" ").trim()}
      {...props}
      onPointerMove={(e) => {
        props.onPointerMove?.(e)
        if (!enabledRef.current) return
        lastRef.current = { x: e.clientX, y: e.clientY }
        schedule()
      }}
      onPointerLeave={(e) => {
        props.onPointerLeave?.(e)
        if (!enabledRef.current) return
        const el = ref.current
        if (!el) return
        el.style.setProperty("--spotlight-x", "50%")
        el.style.setProperty("--spotlight-y", "50%")
      }}
    >
      <div
        className="spotlight"
        aria-hidden="true"
        style={
          {
            width: `${spotlightSize}px`,
            height: `${spotlightSize}px`,
          } as any
        }
      />
      <div className="spotlight-content">{children}</div>
    </div>
  )
}

