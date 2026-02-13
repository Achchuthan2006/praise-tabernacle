"use client"

import type { ReactNode } from "react"
import { useEffect, useState } from "react"

export default function IdleMount({
  children,
  fallback = null,
  timeoutMs = 1500,
}: {
  children: ReactNode
  fallback?: ReactNode
  timeoutMs?: number
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (mounted) return

    const enable = () => setMounted(true)

    if (typeof (window as any).requestIdleCallback === "function") {
      const id = (window as any).requestIdleCallback(enable, { timeout: timeoutMs })
      return () => (window as any).cancelIdleCallback?.(id)
    }

    const id = window.setTimeout(enable, Math.max(0, timeoutMs))
    return () => window.clearTimeout(id)
  }, [mounted, timeoutMs])

  return mounted ? children : fallback
}

