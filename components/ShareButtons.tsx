"use client"

import { useMemo, useState } from "react"

type ShareButtonsProps = {
  title: string
  url: string
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const shareUrls = useMemo(() => {
    const encodedUrl = encodeURIComponent(url)
    const encodedText = encodeURIComponent(title)
    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    }
  }, [title, url])

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  const onNativeShare = async () => {
    if (!navigator.share) return
    try {
      await navigator.share({ title, url })
    } catch {
      // no-op
    }
  }

  return (
    <div className="rounded-2xl border border-churchBlue/10 bg-white p-5">
      <div className="text-sm font-semibold text-churchBlue">Share</div>
      <div className="mt-4 grid gap-2 sm:grid-cols-4">
        <button type="button" className="btn btn-sm btn-secondary" onClick={onCopy}>
          {copied ? "Copied" : "Copy link"}
        </button>
        <a href={shareUrls.facebook} target="_blank" rel="noreferrer" className="btn btn-sm btn-secondary">
          Facebook
        </a>
        <a href={shareUrls.twitter} target="_blank" rel="noreferrer" className="btn btn-sm btn-secondary">
          X / Twitter
        </a>
        <a href={shareUrls.whatsapp} target="_blank" rel="noreferrer" className="btn btn-sm btn-secondary">
          WhatsApp
        </a>
      </div>
      {typeof navigator !== "undefined" && typeof (navigator as any).share === "function" ? (
        <button type="button" className="mt-3 btn btn-sm btn-primary" onClick={onNativeShare}>
          Share on device
        </button>
      ) : null}
    </div>
  )
}
