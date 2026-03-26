"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

function applySectionEntrance(main: HTMLElement) {
  const targets = Array.from(main.querySelectorAll<HTMLElement>("section, .section-card"))
  const unique = Array.from(new Set(targets))

  const assignStaggerItems = (el: HTMLElement) => {
    const getEligibleChildren = (root: HTMLElement) =>
      Array.from(root.children).filter(
        (child): child is HTMLElement =>
          child instanceof HTMLElement &&
          !child.hasAttribute("hidden") &&
          child.getAttribute("aria-hidden") !== "true",
      )

    let items = getEligibleChildren(el)

    if (items.length <= 1 && items[0]) {
      const nested = getEligibleChildren(items[0])
      if (nested.length > 1) items = nested
    }

    items.slice(0, 8).forEach((item, index) => {
      item.classList.add("scroll-stagger-item")
      item.style.setProperty("--stagger-delay", `${60 + index * 80}ms`)
    })
  }

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
      assignStaggerItems(el)
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
    assignStaggerItems(el)
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
