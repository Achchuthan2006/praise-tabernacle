"use client"

import type { ComponentPropsWithoutRef } from "react"
import { useEffect, useRef, useState } from "react"

function prefersReducedMotion() {
  if (typeof window === "undefined") return true
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
}

export default function Reveal({
  className,
  delay = 0,
  children,
  ...props
}: ComponentPropsWithoutRef<"div"> & {
  delay?: 0 | 1 | 2 | 3
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(prefersReducedMotion())

  useEffect(() => {
    if (prefersReducedMotion()) {
      setVisible(true)
      return
    }

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry?.isIntersecting) return
        setVisible(true)
        observer.disconnect()
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.16,
      },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      data-visible={visible ? "true" : "false"}
      className={["reveal", "fade-in-section", "is-visible", delay ? `reveal-${delay}` : "", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  )
}
