"use client"

import type { ComponentPropsWithoutRef } from "react"
import { useLayoutEffect, useRef, useState } from "react"

export default function Reveal({
  className,
  delay = 0,
  children,
  ...props
}: ComponentPropsWithoutRef<"div"> & {
  delay?: 0 | 1 | 2 | 3
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(true)
  const [mounted, setMounted] = useState(false)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      setMounted(true)
      setVisible(true)
      return
    }

    const rect = el.getBoundingClientRect()
    const inView = rect.top < window.innerHeight * 0.9 && rect.bottom > 0

    setMounted(true)
    setVisible(inView)

    if (inView) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      data-visible={mounted ? (visible ? "true" : "false") : undefined}
      className={["reveal", "fade-in-section", visible ? "is-visible" : "", delay ? `reveal-${delay}` : "", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  )
}
