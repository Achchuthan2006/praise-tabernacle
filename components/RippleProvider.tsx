"use client"

import { useEffect } from "react"

function prefersReducedMotion() {
  if (typeof window === "undefined") return true
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
}

function isDisabled(el: HTMLElement) {
  return el.matches("[disabled], [aria-disabled='true']")
}

function findRippleTarget(start: EventTarget | null) {
  const el = start instanceof HTMLElement ? start : null
  if (!el) return null
  return el.closest<HTMLElement>(".ripple, .btn")
}

export default function RippleProvider() {
  useEffect(() => {
    if (typeof window === "undefined") return
    if (prefersReducedMotion()) return

    document.body?.setAttribute("data-ripples", "1")

    const onPointerDown = (e: PointerEvent) => {
      if (!e.isPrimary) return
      const target = findRippleTarget(e.target)
      if (!target) return
      if (target.hasAttribute("data-no-ripple")) return
      if (isDisabled(target)) return

      const rect = target.getBoundingClientRect()
      if (!rect.width || !rect.height) return

      const size = Math.max(rect.width, rect.height) * 2
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      const ripple = document.createElement("span")
      ripple.className = "ripple-effect"
      ripple.style.width = `${size}px`
      ripple.style.height = `${size}px`
      ripple.style.left = `${x}px`
      ripple.style.top = `${y}px`

      target.appendChild(ripple)

      const cleanup = () => ripple.remove()
      ripple.addEventListener("animationend", cleanup, { once: true })
      window.setTimeout(cleanup, 900)
    }

    window.addEventListener("pointerdown", onPointerDown, { passive: true })
    return () => {
      window.removeEventListener("pointerdown", onPointerDown)
      document.body?.removeAttribute("data-ripples")
    }
  }, [])

  return null
}

