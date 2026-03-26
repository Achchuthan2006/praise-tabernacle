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
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,27,62,0.14)_0%,rgba(18,27,62,0.22)_100%)]" />
      </div>
    ) : (
      <div className="relative h-full w-full overflow-hidden bg-[radial-gradient(44rem_28rem_at_10%_0%,rgba(248,202,69,0.16),transparent_50%),radial-gradient(38rem_26rem_at_100%_0%,rgba(109,51,230,0.20),transparent_48%),linear-gradient(180deg,#fbfbff_0%,#eef2ff_100%)]">
        <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(109,51,230,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(109,51,230,0.05)_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="relative flex h-full items-center justify-center px-6 py-10 sm:px-10">
          <div className="max-w-xl rounded-[28px] border border-white/70 bg-white/78 p-6 text-center shadow-[0_24px_60px_rgb(26_35_72_/_0.12)] backdrop-blur sm:p-8">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#6d33e6,#4d71ff)] text-xl font-bold text-white shadow-[0_18px_32px_rgb(77_113_255_/_0.24)]">
              YT
            </div>
            <div className="text-xl font-semibold tracking-tight text-churchBlue sm:text-2xl">
              {language === "ta" ? "யூடியூபில் ஆராதனையை பாருங்கள்" : "Watch the Service on YouTube"}
            </div>
            <div className="mt-3 text-sm leading-relaxed text-churchBlue/72 sm:text-base">
              {language === "ta"
                ? "சமீபத்திய ஆராதனையையோ முழு சேவை பிளேலிஸ்டையோ திறந்து தொடர்ந்து பாருங்கள்."
                : "Open the latest available service or continue watching from the full services playlist."}
            </div>
            <div className="mt-5 inline-flex rounded-full border border-churchBlue/10 bg-churchBlue/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-churchBlue/70">
              {language === "ta" ? "பிளேலிஸ்ட்" : "Playlist"}
            </div>
          </div>
        </div>
      </div>
    )

  return (
    <div ref={containerRef} className={["relative h-full w-full overflow-hidden", props.className ?? ""].join(" ")}>
      {loaded ? iframe : placeholder}

      {!loaded ? (
        <button
          type="button"
          onClick={onActivate}
          className="absolute inset-0 grid place-items-center focus-ring"
          aria-label={language === "ta" ? `இயக்கு: ${props.title}` : `Play: ${props.title}`}
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
