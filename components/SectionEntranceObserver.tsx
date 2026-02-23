"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

function applySectionEntrance(main: HTMLElement) {
  const targets = Array.from(main.querySelectorAll<HTMLElement>("section, .section-card"))
  const unique = Array.from(new Set(targets))

  const eligibles = unique.filter((el) => {
    if (el.closest(".hero-stage")) return false
    if (el.classList.contains("fade-in-section")) return false
    if (el.dataset.noSectionAnimation === "true") return false
    return true
  })

  if (eligibles.length === 0) return

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
    for (const el of eligibles) {
      el.classList.add("section-card", "visible")
    }
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const target = entry.target as HTMLElement
        target.classList.add("visible")
        observer.unobserve(target)
      }
    },
    { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
  )

  for (const el of eligibles) {
    el.classList.add("section-card")
    observer.observe(el)
  }

  return () => observer.disconnect()
}

export default function SectionEntranceObserver() {
  const pathname = usePathname()

  useEffect(() => {
    let cleanup: (() => void) | undefined
    const raf = window.requestAnimationFrame(() => {
      const main = document.querySelector<HTMLElement>("main#main-content, main")
      if (!main) return
      cleanup = applySectionEntrance(main)
    })

    return () => {
      window.cancelAnimationFrame(raf)
      cleanup?.()
    }
  }, [pathname])

  return null
}
