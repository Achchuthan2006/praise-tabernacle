"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

import BrandLogo from "@/components/BrandLogo"
import { useLanguage } from "@/components/language/LanguageProvider"
import Magnetic from "@/components/ui/Magnetic"
import Container from "@/components/ui/Container"
import Reveal from "@/components/ui/Reveal"
import TextReveal from "@/components/ui/TextReveal"
import PromiseHeroPanel from "@/components/PromiseHeroPanel"
import { t, ui } from "@/lib/i18n"
import { siteConfig } from "@/lib/site"
import { normalizeBullets } from "@/lib/text"

export default function Hero() {
  const { language } = useLanguage()
  const heroRef = useRef<HTMLElement | null>(null)
  const [videoEnabled, setVideoEnabled] = useState(false)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    let raf: number | null = null

    const update = () => {
      raf = null
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 1
      const total = vh + rect.height
      const progress = total > 0 ? (vh - rect.top) / total : 0.5
      const clamped = Math.max(0, Math.min(1, progress))
      const centered = (clamped - 0.5) * 2
      const y = centered * 18
      el.style.setProperty("--hero-parallax-y", `${y.toFixed(2)}px`)
      el.style.setProperty("--hero-parallax-y2", `${(y * 0.6).toFixed(2)}px`)
    }

    const onScroll = () => {
      if (raf !== null) return
      raf = window.requestAnimationFrame(update)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    update()
    return () => {
      if (raf !== null) cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  useEffect(() => {
    const src = (siteConfig.hero.videoSrc ?? "").trim()
    if (!src) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const nav = navigator as unknown as {
      connection?: { saveData?: boolean; effectiveType?: string }
      mozConnection?: { saveData?: boolean; effectiveType?: string }
      webkitConnection?: { saveData?: boolean; effectiveType?: string }
    }
    const connection = nav.connection ?? nav.mozConnection ?? nav.webkitConnection
    const saveData = Boolean(connection?.saveData)
    const effectiveType = (connection?.effectiveType ?? "").trim()
    const isSlowConnection = effectiveType === "slow-2g" || effectiveType === "2g"

    if (saveData || isSlowConnection) return

    const enable = () => setVideoEnabled(true)

    if (typeof (window as any).requestIdleCallback === "function") {
      const id = (window as any).requestIdleCallback(enable, { timeout: 1500 })
      return () => (window as any).cancelIdleCallback?.(id)
    }

    const id = window.setTimeout(enable, 250)
    return () => window.clearTimeout(id)
  }, [])

  const pillText =
    language === "ta"
      ? `தமிழ் & ஆங்கில ஆராதனைகள் - ${siteConfig.locationShort}`
      : `Tamil & English services - ${siteConfig.locationShort}`

  const heroLead =
    language === "ta"
      ? "கிறிஸ்துவில் நிலைநிறுத்தப்பட்ட வரவேற்கும் சபைக் குடும்பம் - ஆராதனைக்கு வாருங்கள், பிரசங்கங்களை ஆன்லைனில் பார்க்குங்கள், உங்கள் வருகையை திட்டமிடுங்கள்."
      : "A welcoming church family rooted in Christ - worship with us, watch sermons online, and plan your visit."

  const heroHeadline =
    language === "ta" ? "நகருக்கான சபை, நகரத்தில்" : "A CHURCH FOR THE CITY, IN THE CITY"

  return (
    <section ref={heroRef} className="hero-stage hero-background isolate overflow-hidden">
      <div className="hero-gradient-layer" aria-hidden="true" />
      <div className="particles" aria-hidden="true">
        <span className="particle" />
        <span className="particle" />
        <span className="particle" />
        <span className="particle" />
        <span className="particle" />
        <span className="particle" />
        <span className="particle" />
        <span className="particle" />
        <span className="particle" />
        <span className="particle" />
      </div>
      {videoEnabled && siteConfig.hero.videoSrc ? (
        <video
          className="hero-stage-video"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={siteConfig.hero.videoPosterSrc || undefined}
          style={{ opacity: siteConfig.hero.videoOpacity }}
          aria-hidden="true"
        >
          <source src={siteConfig.hero.videoSrc} />
        </video>
      ) : null}
      {!siteConfig.hero.videoSrc && siteConfig.hero.photoSrc ? (
        <Image
          src={siteConfig.hero.photoSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-stage-photo object-cover object-center"
          style={{ opacity: siteConfig.hero.photoOpacity }}
        />
      ) : null}
      <Image
        src="/hero.svg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="hero-stage-texture object-cover object-center"
      />
      <div className="hero-stage-overlay" aria-hidden="true" />

      <Container className="hero-content py-14 sm:py-24">
        <div className="mx-auto max-w-5xl text-center">
          <Reveal>
            <div className="flex flex-col items-center gap-4">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs text-white/85 backdrop-blur">
                <span className="h-1 w-10 rounded-full bg-white/35" aria-hidden="true" />
                <span className={language === "ta" ? "font-tamil" : undefined}>{pillText}</span>
              </div>

              <div className="leading-tight">
                <div className="logo-container hero-logo-wrap mx-auto w-full max-w-[210px] sm:max-w-[300px] lg:max-w-[360px]">
                  <BrandLogo variant="onDark" className="w-full" priority />
                </div>
                <span className="sr-only">{siteConfig.nameEn}</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <h1
              className={[
                "hero-stage-title hero-title-anim mt-6 sm:mt-8 text-balance",
                language === "ta" ? "font-tamil" : "",
              ].join(" ")}
            >
              {heroHeadline}
            </h1>
          </Reveal>

          <Reveal delay={2}>
            <p className="hero-stage-lead hero-lead-anim mx-auto mt-6 max-w-2xl text-balance">
              <span className={language === "ta" ? "font-tamil" : undefined}>{heroLead}</span>
            </p>
          </Reveal>

          <Reveal delay={3}>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Magnetic>
                <Link href="/visit" className="btn btn-md btn-primary">
                  {t(ui.cta.planVisit, language)}
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href="/sermons" className="btn btn-md btn-secondary-invert">
                  {t(ui.cta.watchOnline, language)}
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>

        <Reveal className="mx-auto mt-14 max-w-5xl">
          <div className="overflow-hidden rounded-3xl border border-white/15 bg-white/10 shadow-glow backdrop-blur">
            <div className="w-full bg-[radial-gradient(40rem_18rem_at_50%_0%,rgba(255,255,255,0.18),transparent_60%)]">
              <PromiseHeroPanel />
            </div>
            <div className="border-t border-white/15 px-6 py-6 sm:px-10">
              <div className="grid gap-4 sm:grid-cols-2 sm:items-start">
                <div>
                  <div className={["text-base font-semibold text-white", language === "ta" ? "font-tamil" : ""].join(" ")}>
                    {language === "ta" ? "ஆராதனை நேரங்கள்" : "Service times"}
                  </div>
                  <p className="mt-2 text-sm text-white/75">
                    {language === "ta" ? (
                      <span className="font-tamil">à®‡à®ªà¯à®ª à®µà®¾à®°à®®à¯ à®šà¯‡à®° à®µà®°à¯à®™à¯à®•à®³à¯.</span>
                    ) : (
                      "Join us this Sunday."
                    )}
                  </p>
                </div>
                <div className="divide-y divide-white/15 border-y border-white/15">
                  {siteConfig.serviceTimes.map((service) => (
                    <div key={service.time} className="flex items-start justify-between gap-6 py-4">
                      <div className="min-w-0">
                        <div className="text-base font-semibold text-white">
                          {language === "ta" ? (
                            <span className="font-tamil">{service.labelTa}</span>
                          ) : (
                            service.labelEn
                          )}
                        </div>
                        <div className="mt-1 text-sm text-white/70">
                          {language === "ta" ? service.labelEn : <span className="font-tamil">{service.labelTa}</span>}
                        </div>
                      </div>
                      <div className="whitespace-nowrap rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm font-semibold text-white/90 backdrop-blur">
                        {normalizeBullets(service.time)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
