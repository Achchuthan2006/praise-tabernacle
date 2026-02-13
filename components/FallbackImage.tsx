"use client"

import Image, { type ImageProps } from "next/image"
import { useMemo, useState } from "react"

export default function FallbackImage({
  src,
  fallbackSrc,
  onError,
  ...rest
}: ImageProps & { fallbackSrc?: ImageProps["src"] }) {
  const [failed, setFailed] = useState(false)

  const resolvedSrc = useMemo(() => {
    if (!failed) return src
    return fallbackSrc ?? src
  }, [failed, fallbackSrc, src])

  return (
    <Image
      {...rest}
      src={resolvedSrc}
      onError={(e) => {
        if (fallbackSrc) setFailed(true)
        onError?.(e)
      }}
    />
  )
}

