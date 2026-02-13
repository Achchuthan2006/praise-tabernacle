"use client"

import { useEffect, useMemo, useState } from "react"

import { useLanguage } from "@/components/language/LanguageProvider"

export default function GoogleMapEmbed({
  title,
  src,
  className,
  iframeClassName,
  ctaClassName,
  ctaLabel,
}: {
  title: string
  src: string
  className?: string
  iframeClassName?: string
  ctaClassName?: string
  ctaLabel?: string
}) {
  const { language } = useLanguage()
  const [interactive, setInteractive] = useState(false)

  const isCoarsePointer = useMemo(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia?.("(pointer: coarse)")?.matches ?? false
  }, [])

  useEffect(() => {
    if (!isCoarsePointer) setInteractive(true)
  }, [isCoarsePointer])

  return (
    <div className={["relative", className ?? ""].filter(Boolean).join(" ")}>
      <iframe
        title={title}
        src={src}
        className={[iframeClassName ?? "h-full w-full", interactive ? "" : "pointer-events-none"].join(" ")}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />

      {!interactive ? (
        <button
          type="button"
          className={[
            "absolute inset-0 grid place-items-center",
            "bg-black/10 text-churchBlue",
            "focus-ring",
          ].join(" ")}
          onClick={() => setInteractive(true)}
          aria-label={language === "ta" ? "வரைபடத்தை இயக்கவும்" : "Enable map interactions"}
          title={language === "ta" ? "வரைபடத்துடன் தொடர்பு கொள்ளத் தொடவும்" : "Tap to interact with the map"}
        >
          <span className={ctaClassName ?? "btn btn-sm btn-secondary"}>
            {ctaLabel ?? (language === "ta" ? "தொடுவதன் மூலம் இயக்கவும்" : "Tap to interact")}
          </span>
        </button>
      ) : null}
    </div>
  )
}
