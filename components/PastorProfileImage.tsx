"use client"

import Image from "next/image"
import { useState } from "react"

export default function PastorProfileImage({
  src,
  fallbackSrc,
  alt,
}: {
  src: string
  fallbackSrc?: string
  alt: string
}) {
  const safeFallback = fallbackSrc || "/photos/pastor/pastor-placeholder.svg"
  const [currentSrc, setCurrentSrc] = useState(src || safeFallback)

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill
      className="object-cover"
      priority
      onError={() => {
        if (currentSrc !== safeFallback) {
          setCurrentSrc(safeFallback)
        }
      }}
    />
  )
}
