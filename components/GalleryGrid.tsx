"use client"

import Image from "next/image"
import { useEffect, useMemo, useRef, useState } from "react"

import { useLanguage } from "@/components/language/LanguageProvider"
import Reveal from "@/components/ui/Reveal"

type Props = {
  images: string[]
  aspectClassName?: string
  sizes?: string
}

export type GalleryGridProps = Props

function delayForIndex(idx: number): 0 | 1 | 2 | 3 {
  return (idx % 4) as 0 | 1 | 2 | 3
}

export default function GalleryGrid({
  images,
  aspectClassName = "aspect-[16/10]",
  sizes = "(min-width: 640px) 50vw, 100vw",
}: Props) {
  const { language } = useLanguage()
  const items = useMemo(() => images.filter(Boolean), [images])
  const [loaded, setLoaded] = useState<Record<number, boolean>>({})
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    if (activeIndex === null) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null)
      if (e.key === "ArrowRight") setActiveIndex((v) => (v === null ? v : Math.min(items.length - 1, v + 1)))
      if (e.key === "ArrowLeft") setActiveIndex((v) => (v === null ? v : Math.max(0, v - 1)))
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [activeIndex, items.length])

  if (items.length === 0) return null

  const activeSrc = activeIndex !== null ? items[activeIndex] : null

  return (
    <>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {items.map((src, idx) => (
          <Reveal key={`${src}-${idx}`} delay={delayForIndex(idx)}>
            <button
              type="button"
              className="card focus-ring text-left"
              onClick={() => setActiveIndex(idx)}
              aria-label={
                language === "ta"
                  ? `புகைப்படத்தைத் திற: ${idx + 1}`
                  : `Open photo ${idx + 1}`
              }
            >
              <div className="card-image">
                <div className={["relative w-full", aspectClassName].join(" ")}>
                  {!loaded[idx] ? (
                    <div className="skeleton absolute inset-0" aria-hidden="true" />
                  ) : null}
                  <Image
                    src={src}
                    alt={`Praise Tabernacle gallery photo ${idx + 1}`}
                    fill
                    sizes={sizes}
                    className={["object-cover transition-opacity duration-300", loaded[idx] ? "opacity-100" : "opacity-0"].join(" ")}
                    onLoad={() => setLoaded((v) => ({ ...v, [idx]: true }))}
                  />
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {activeSrc ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={language === "ta" ? "புகைப்பட பார்வையாளர்" : "Photo viewer"}
          onClick={() => setActiveIndex(null)}
          onTouchStart={(e) => {
            const t = e.touches[0]
            if (!t) return
            touchStartRef.current = { x: t.clientX, y: t.clientY }
          }}
          onTouchEnd={(e) => {
            const start = touchStartRef.current
            touchStartRef.current = null
            if (!start) return
            const t = e.changedTouches[0]
            if (!t) return
            const dx = t.clientX - start.x
            const dy = t.clientY - start.y
            if (Math.abs(dx) < 50) return
            if (Math.abs(dx) < Math.abs(dy) * 1.2) return
            if (dx < 0) setActiveIndex((v) => (v === null ? v : Math.min(items.length - 1, v + 1)))
            else setActiveIndex((v) => (v === null ? v : Math.max(0, v - 1)))
          }}
        >
          <div className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between gap-3 pb-3">
              <div className="text-sm font-semibold text-white/90">
                {activeIndex !== null ? `${activeIndex + 1} / ${items.length}` : ""}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="btn btn-sm btn-secondary-invert !rounded-xl"
                  onClick={() => setActiveIndex((v) => (v === null ? v : Math.max(0, v - 1)))}
                  disabled={activeIndex === 0}
                >
                  {language === "ta" ? "முந்தையது" : "Prev"}
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-secondary-invert !rounded-xl"
                  onClick={() => setActiveIndex((v) => (v === null ? v : Math.min(items.length - 1, v + 1)))}
                  disabled={activeIndex === items.length - 1}
                >
                  {language === "ta" ? "அடுத்தது" : "Next"}
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-secondary-invert !rounded-xl"
                  onClick={() => setActiveIndex(null)}
                >
                  {language === "ta" ? "மூடு" : "Close"}
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={activeSrc}
                  alt={`Praise Tabernacle gallery photo ${activeIndex !== null ? activeIndex + 1 : 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
