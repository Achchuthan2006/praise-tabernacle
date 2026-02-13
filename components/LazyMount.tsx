"use client"

import type { ReactNode } from "react"
import { useEffect, useRef, useState } from "react"

export default function LazyMount({
  children,
  fallback = null,
  rootMargin = "600px 0px",
}: {
  children: ReactNode
  fallback?: ReactNode
  rootMargin?: string
}) {
  const [mounted, setMounted] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (mounted) return
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMounted(true)
          io.disconnect()
        }
      },
      { rootMargin },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [mounted, rootMargin])

  return <div ref={ref}>{mounted ? children : fallback}</div>
}

