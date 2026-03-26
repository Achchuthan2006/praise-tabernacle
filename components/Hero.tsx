"use client"

import Image from "next/image"
import Link from "next/link"

import { useLanguage } from "@/components/language/LanguageProvider"
import Container from "@/components/ui/Container"
import Magnetic from "@/components/ui/Magnetic"
import Reveal from "@/components/ui/Reveal"
import { t, ui } from "@/lib/i18n"
import { siteConfig } from "@/lib/site"
import { fixMojibakeText, normalizeBullets } from "@/lib/text"

const ta = fixMojibakeText

export default function Hero() {
  const { language } = useLanguage()

  const pillText =
    language === "ta"
      ? ta(`à®¤à®®à®¿à®´à¯ à®®à®±à¯à®±à¯à®®à¯ à®†à®™à¯à®•à®¿à®² à®†à®°à®¾à®¤à®©à¯ˆà®•à®³à¯ - ${siteConfig.locationShort}`)
      : `Tamil & English services - ${siteConfig.locationShort}`

  const heroLead =
    language === "ta"
      ? ta(
          "à®•à®¿à®±à®¿à®¸à¯à®¤à¯à®µà®¿à®²à¯ à®¨à®¿à®²à¯ˆà®¨à®¿à®±à¯à®¤à¯à®¤à®ªà¯à®ªà®Ÿà¯à®Ÿ à®µà®°à®µà¯‡à®±à¯à®•à¯à®®à¯ à®šà®ªà¯ˆà®•à¯ à®•à¯à®Ÿà¯à®®à¯à®ªà®®à¯. à®Žà®™à¯à®•à®³à¯à®Ÿà®©à¯ à®†à®°à®¾à®¤à®¿à®¯à¯à®™à¯à®•à®³à¯, à®ªà®¿à®°à®šà®™à¯à®•à®™à¯à®•à®³à¯ˆ à®†à®©à¯à®²à¯ˆà®©à®¿à®²à¯ à®ªà®¾à®°à¯à®™à¯à®•à®³à¯, à®‰à®™à¯à®•à®³à¯ à®µà®°à¯à®•à¯ˆà®¯à¯ˆ à®¨à®®à¯à®ªà®¿à®•à¯à®•à¯ˆà®¯à¯à®Ÿà®©à¯ à®¤à®¿à®Ÿà¯à®Ÿà®®à®¿à®Ÿà¯à®™à¯à®•à®³à¯.",
        )
      : "A welcoming church family rooted in Christ. Worship with us, watch sermons online, and plan your visit with confidence."

  const heroHeadline =
    language === "ta"
      ? ta("à®®à®¿à®šà®¿à®šà®¾à®•à®¾à®µà®¿à®²à¯ à®‰à®™à¯à®•à®³à¯ à®šà®ªà¯ˆà®•à¯ à®•à¯à®Ÿà¯à®®à¯à®ªà®®à¯")
      : "Your Church Family in Mississauga"

  return (
    <section className="hero-stage hero-background isolate overflow-hidden">
      <div className="hero-gradient-layer" aria-hidden="true" />
      {siteConfig.hero.photoSrc ? (
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
      <div className="hero-stage-overlay" aria-hidden="true" />

      <Container className="hero-content py-8 sm:py-10 lg:py-14">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="flex flex-col items-center gap-4">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs text-white/85 backdrop-blur">
                <span className="h-1 w-10 rounded-full bg-white/35" aria-hidden="true" />
                <span className={language === "ta" ? "font-tamil" : undefined}>{pillText}</span>
              </div>

              <div className="leading-tight">
                <div className="logo-container mx-auto w-full max-w-[180px] sm:max-w-[230px] lg:max-w-[270px]">
                  <Image
                    src={language === "ta" ? siteConfig.branding.logoTaSrc : siteConfig.branding.logoEnSrc}
                    alt={ta(language === "ta" ? siteConfig.nameTa : siteConfig.nameEn)}
                    width={520}
                    height={240}
                    priority
                    className="logo-icon h-auto w-full select-none drop-shadow-[0_10px_18px_rgba(0,0,0,0.25)]"
                  />
                </div>
                <span className="sr-only">{siteConfig.nameEn}</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <h1
              className={[
                "hero-stage-title hero-title-anim mx-auto mt-4 max-w-[14ch] text-balance leading-tight sm:max-w-[16ch]",
                language === "ta" ? "font-tamil" : "",
              ].join(" ")}
            >
              {heroHeadline}
            </h1>
          </Reveal>

          <Reveal delay={2}>
            <p className="hero-stage-lead hero-lead-anim mx-auto mt-4 max-w-2xl text-balance">
              <span className={language === "ta" ? "font-tamil" : undefined}>{heroLead}</span>
            </p>
          </Reveal>

          <Reveal delay={3}>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Magnetic>
                <Link href="/visit" className="btn btn-md btn-primary">
                  {t(ui.cta.planVisit, language)}
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href="/watch" className="btn btn-md btn-secondary-invert">
                  {t(ui.cta.watchOnline, language)}
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>

        <Reveal className="mx-auto mt-8 max-w-5xl">
          <div className="overflow-hidden rounded-3xl border border-white/15 bg-white/10 shadow-glow backdrop-blur">
            <div className="grid gap-0 lg:grid-cols-[1.2fr,1fr]">
              <div className="border-b border-white/15 px-6 py-6 sm:px-8 lg:border-b-0 lg:border-r">
                <div className={["text-base font-semibold text-white", language === "ta" ? "font-tamil" : ""].join(" ")}>
                  {language === "ta" ? ta("à®†à®°à®¾à®¤à®©à¯ˆ à®¨à¯‡à®°à®™à¯à®•à®³à¯") : "Service times"}
                </div>
                <p className="mt-2 text-sm text-white/75">
                  <span className={language === "ta" ? "font-tamil" : undefined}>
                    {language === "ta" ? ta("à®‡à®¨à¯à®¤ à®žà®¾à®¯à®¿à®±à¯ à®Žà®™à¯à®•à®³à¯à®Ÿà®©à¯ à®šà¯‡à®°à¯à®™à¯à®•à®³à¯.") : "Join us this Sunday."}
                  </span>
                </p>

                <div className="mt-5 divide-y divide-white/15 border-y border-white/15">
                  {siteConfig.serviceTimes.map((service) => (
                    <div key={service.time} className="flex items-start justify-between gap-4 py-4">
                      <div className="min-w-0">
                        <div className="text-base font-semibold text-white">
                          {language === "ta" ? <span className="font-tamil">{ta(service.labelTa)}</span> : service.labelEn}
                        </div>
                        <div className="mt-1 text-sm text-white/70">
                          {language === "ta" ? service.labelEn : <span className="font-tamil">{ta(service.labelTa)}</span>}
                        </div>
                      </div>
                      <div className="whitespace-nowrap rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm font-semibold text-white/90 backdrop-blur">
                        {normalizeBullets(service.time)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-6 py-6 sm:px-8">
                <div className={["text-base font-semibold text-white", language === "ta" ? "font-tamil" : ""].join(" ")}>
                  {language === "ta" ? ta("à®…à®Ÿà¯à®¤à¯à®¤ à®ªà®Ÿà®¿à®•à®³à¯") : "Next steps"}
                </div>
                <p className="mt-2 text-sm text-white/75">
                  <span className={language === "ta" ? "font-tamil" : undefined}>
                    {language === "ta"
                      ? ta(
                          "à®ªà¯à®¤à®¿à®¯à®µà®°à®¾à®• à®µà®°à¯à®•à®¿à®±à¯€à®°à¯à®•à®³à®¾? à®¤à®¿à®Ÿà¯à®Ÿà®®à®¿à®Ÿà¯à®Ÿ à®µà®°à¯à®•à¯ˆ, à®†à®©à¯à®²à¯ˆà®©à¯ à®ªà®¿à®°à®šà®™à¯à®•à®™à¯à®•à®³à¯, à®®à®±à¯à®±à¯à®®à¯ à®¤à¯Šà®Ÿà®°à¯à®ªà¯ à®•à¯Šà®³à¯à®³à¯à®®à¯ à®µà®´à®¿à®•à®³à¯ à®‡à®™à¯à®•à¯‡.",
                        )
                      : "New here? Start with a planned visit, watch recent messages, or contact us directly."}
                  </span>
                </p>
                <div className="mt-5 grid gap-3">
                  <Link href="/visit" className="btn btn-sm btn-primary w-full justify-center">
                    {language === "ta" ? ta("à®µà®°à¯à®•à¯ˆà®¯à¯ˆ à®¤à®¿à®Ÿà¯à®Ÿà®®à®¿à®Ÿà¯à®™à¯à®•à®³à¯") : "Plan your visit"}
                  </Link>
                  <Link href="/watch" className="btn btn-sm btn-secondary-invert w-full justify-center">
                    {language === "ta" ? ta("à®†à®©à¯à®²à¯ˆà®©à®¿à®²à¯ à®ªà®¾à®°à¯à®™à¯à®•à®³à¯") : "Watch online"}
                  </Link>
                  <Link href="/contact" className="btn btn-sm btn-secondary w-full justify-center">
                    {language === "ta" ? ta("à®¤à¯Šà®Ÿà®°à¯à®ªà¯ à®•à¯Šà®³à¯à®³à¯à®™à¯à®•à®³à¯") : "Contact us"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
