"use client"

import Image from "next/image"
import { useEffect, useMemo, useRef, useState } from "react"

import { useLanguage } from "@/components/language/LanguageProvider"

type Props =
  | {
      kind: "video"
      videoId: string
      title: string
      className?: string
      iframeClassName?: string
      posterQuality?: "default" | "hq"
      load?: "visible" | "click"
      autoplayOnLoad?: boolean
    }
  | {
      kind: "playlist"
      playlistId: string
      title: string
      className?: string
      iframeClassName?: string
      load?: "visible" | "click"
      autoplayOnLoad?: boolean
    }

export type YouTubeLiteEmbedProps = Props

export default function YouTubeLiteEmbed(props: Props) {
  const { language } = useLanguage()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [loaded, setLoaded] = useState(Boolean(props.autoplayOnLoad))
  const [autoplay, setAutoplay] = useState(Boolean(props.autoplayOnLoad))

  const embedSrc = useMemo(() => {
    const base =
      props.kind === "video"
        ? `https://www.youtube-nocookie.com/embed/${props.videoId}`
        : `https://www.youtube-nocookie.com/embed/videoseries?list=${props.playlistId}`

    const params = new URLSearchParams()
    params.set("rel", "0")
    params.set("modestbranding", "1")
    if (autoplay) params.set("autoplay", "1")
    return `${base}${base.includes("?") ? "&" : "?"}${params.toString()}`
  }, [autoplay, props])

  useEffect(() => {
    if (loaded) return
    if (props.load === "click") return
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoaded(true)
          observer.disconnect()
        }
      },
      { rootMargin: "200px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [loaded, props.load])

  const onActivate = () => {
    setAutoplay(true)
    setLoaded(true)
  }

  const iframe = (
    <iframe
      className={props.iframeClassName ?? "h-full w-full"}
      src={embedSrc}
      title={props.title}
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  )

  const placeholder =
    props.kind === "video" ? (
      <div className="relative h-full w-full">
        <Image
          src={`https://i.ytimg.com/vi/${props.videoId}/${props.posterQuality === "default" ? "default" : "hqdefault"}.jpg`}
          alt={`Thumbnail for ${props.title}`}
          fill
          sizes="(min-width: 1024px) 960px, 100vw"
          className="object-cover"
          quality={85}
        />
        <div className="absolute inset-0 bg-[radial-gradient(30rem_18rem_at_50%_10%,rgba(255,255,255,0.20),transparent_60%)]" />
      </div>
    ) : (
      <div className="relative grid h-full w-full place-items-center bg-[radial-gradient(40rem_26rem_at_50%_0%,rgba(91,33,182,0.10),transparent_60%),radial-gradient(30rem_20rem_at_10%_20%,rgba(14,116,144,0.10),transparent_55%)]">
        <div className="text-center">
          <div className="text-sm font-semibold text-churchBlue">
            {language === "ta" ? "YouTube-இல் பாருங்கள்" : "Watch on YouTube"}
          </div>
          <div className="mt-1 text-xs text-churchBlue/70">
            {language === "ta" ? "சமீபத்திய ஆராதனை பட்டியல்" : "Latest services playlist"}
          </div>
        </div>
      </div>
    )

  return (
    <div
      ref={containerRef}
      className={["relative h-full w-full overflow-hidden", props.className ?? ""].join(" ")}
    >
      {loaded ? iframe : placeholder}

      {!loaded ? (
        <button
          type="button"
          onClick={onActivate}
          className={["absolute inset-0 grid place-items-center", "focus-ring"].join(" ")}
          aria-label={
            language === "ta" ? `இயக்கு: ${props.title}` : `Play: ${props.title}`
          }
        >
          <span className="grid h-16 w-16 place-items-center rounded-full border border-white/25 bg-black/35 text-white shadow-glow backdrop-blur">
            <span className="ml-1 text-2xl" aria-hidden="true">
              ▶
            </span>
          </span>
        </button>
      ) : null}
    </div>
  )
}
