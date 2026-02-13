"use client"

import Link from "next/link"
import { useEffect, useId, useMemo, useState } from "react"

import { useLanguage } from "@/components/language/LanguageProvider"
import Container from "@/components/ui/Container"
import Reveal from "@/components/ui/Reveal"
import { csrfHeaders } from "@/lib/csrfClient"
import { siteConfig } from "@/lib/site"

type SubmitMode = "private" | "public"

export default function PrayerRequestForm({
  titleEn = "Prayer Request",
  titleTa = "ஜெப வேண்டுகோள்",
  subtitleEn = "We would be honored to pray for you.",
  subtitleTa = "உங்களுக்காக ஜெபிப்பது எங்களுக்கு மரியாதை.",
  wrapInSection = true,
  enablePrayerWallOption = false,
}: {
  titleEn?: string
  titleTa?: string
  subtitleEn?: string
  subtitleTa?: string
  wrapInSection?: boolean
  enablePrayerWallOption?: boolean
}) {
  const { language } = useLanguage()
  const formId = useId()

  const title = language === "ta" ? titleTa : titleEn
  const subtitle = language === "ta" ? subtitleTa : subtitleEn

  const [mode, setMode] = useState<SubmitMode>(enablePrayerWallOption ? "private" : "private")
  const [isTestimony, setIsTestimony] = useState(false)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [honey, setHoney] = useState("") // honeypot

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [shake, setShake] = useState(false)
  const [countPulse, setCountPulse] = useState(false)

  const MESSAGE_MAX = 1000
  const nearLimit = message.length >= Math.floor(MESSAGE_MAX * 0.85)

  const resetIfDone = () => {
    if (status === "success" || status === "error") setStatus("idle")
  }

  const noteText = useMemo(() => {
    if (status === "success") {
      if (mode === "public") {
        return language === "ta"
          ? "நன்றி. உங்கள் பதிவு பரிசீலனைக்குப் பிறகு Prayer Wall-ல் வெளியிடப்படும்."
          : "Thank you. Your post was submitted for review before appearing on the Prayer Wall."
      }
      return language === "ta"
        ? "நன்றி. உங்கள் ஜெப வேண்டுகோள் அனுப்பப்பட்டது."
        : "Thank you. Your prayer request was sent."
    }

    if (status === "error") {
      return language === "ta"
        ? "இப்போது அனுப்ப முடியவில்லை. தயவுசெய்து மின்னஞ்சல் செய்யவும்:"
        : "Couldn't send right now. Please email us:"
    }

    if (mode === "public") {
      return language === "ta"
        ? "தயவு செய்து தனிப்பட்ட தகவல்களை சேர்க்க வேண்டாம். பதிவுகள் பரிசீலனைக்குப் பிறகு வெளியிடப்படும்."
        : "Please avoid private details. Public posts are reviewed before appearing on the Prayer Wall."
    }

    return language === "ta"
      ? "நாங்கள் உங்களுக்காக ஜெபிப்போம். வேண்டுகோளை இங்கே சமர்ப்பிக்கவும்."
      : "We'll pray for you. Submit your request here."
  }, [language, mode, status])

  const submitLabel = useMemo(() => {
    if (status === "loading") return language === "ta" ? "சமர்ப்பிக்கிறது..." : "Submitting..."
    if (status === "success") return language === "ta" ? "சமர்ப்பிக்கப்பட்டது" : "Submitted"
    return language === "ta" ? "சமர்ப்பிக்கவும்" : "Submit"
  }, [language, status])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === "loading") return
    setStatus("loading")

    try {
      if (mode === "public") {
        const res = await fetch("/api/prayer-wall", {
          method: "POST",
          headers: await csrfHeaders({ "content-type": "application/json" }),
          body: JSON.stringify({
            name,
            request: message,
            website: honey,
            kind: isTestimony ? "testimony" : "request",
          }),
        })
        const json = (await res.json()) as { ok?: boolean }
        if (!res.ok || !json.ok) throw new Error("bad_response")
      } else {
        const res = await fetch("/api/prayer", {
          method: "POST",
          headers: await csrfHeaders({ "content-type": "application/json" }),
          body: JSON.stringify({ name, email, message, honey }),
        })
        const json = (await res.json()) as { ok?: boolean }
        if (!res.ok || !json.ok) throw new Error("bad_response")
      }

      setName("")
      setEmail("")
      setMessage("")
      setHoney("")
      setIsTestimony(false)
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  useEffect(() => {
    if (status !== "error") return
    setShake(true)
    const t = setTimeout(() => setShake(false), 460)
    return () => clearTimeout(t)
  }, [status])

  useEffect(() => {
    if (!nearLimit) return
    setCountPulse(true)
    const t = setTimeout(() => setCountPulse(false), 240)
    return () => clearTimeout(t)
  }, [nearLimit])

  const form = (
    <>
      <Reveal>
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-churchBlue sm:text-4xl">{title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-churchBlue/70 sm:text-base">{subtitle}</p>
        </div>
      </Reveal>

      <Reveal delay={1} className="mt-10">
        <form
          className={["grid gap-5", shake ? "anim-shake" : ""].join(" ")}
          aria-describedby={`${formId}-note`}
          onSubmit={onSubmit}
        >
          <label className="sr-only" aria-hidden="true">
            Honey
            <input tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} />
          </label>

          {enablePrayerWallOption ? (
            <div className="rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-4">
              <div className="text-sm font-semibold text-churchBlue">
                {language === "ta" ? "எப்படி பகிர விரும்புகிறீர்கள்?" : "How would you like to share this?"}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  className={["btn btn-sm", mode === "private" ? "btn-primary" : "btn-secondary"].join(" ")}
                  onClick={() => {
                    resetIfDone()
                    setMode("private")
                  }}
                >
                  {language === "ta" ? "தனிப்பட்டது" : "Private"}
                </button>
                <button
                  type="button"
                  className={["btn btn-sm", mode === "public" ? "btn-primary" : "btn-secondary"].join(" ")}
                  onClick={() => {
                    resetIfDone()
                    setMode("public")
                  }}
                >
                  {language === "ta" ? "Prayer Wall" : "Prayer Wall"}
                </button>

                <Link href="/prayer-wall" className="btn btn-sm btn-secondary">
                  {language === "ta" ? "Prayer Wall பார்க்க" : "View Prayer Wall"}
                </Link>
              </div>

              {mode === "public" ? (
                <label className="mt-4 flex items-start gap-3 rounded-2xl border border-churchBlue/10 bg-white p-4 text-sm text-churchBlue/75">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-churchBlue/20"
                    checked={isTestimony}
                    onChange={(e) => {
                      resetIfDone()
                      setIsTestimony(e.target.checked)
                    }}
                  />
                  <span className={language === "ta" ? "font-tamil" : undefined}>
                    {language === "ta"
                      ? "இது பதிலான ஜெபத்தின் சாட்சியா (Testimony) பகிர்கிறேன்"
                      : "This is an answered prayer / testimony (public)"}
                  </span>
                </label>
              ) : null}
            </div>
          ) : null}

          <label className="block">
            <span className="sr-only">{language === "ta" ? "பெயர் (விருப்பம்)" : "Name (optional)"}</span>
            <div className="float-field">
              <input
                className="float-input"
                placeholder={language === "ta" ? "உங்கள் பெயர்" : "Your name"}
                autoComplete="name"
                value={name}
                disabled={status === "loading"}
                onChange={(e) => {
                  resetIfDone()
                  setName(e.target.value)
                }}
              />
              <span className={["float-label", language === "ta" ? "font-tamil" : ""].join(" ")}>
                {language === "ta" ? "பெயர் (விருப்பம்)" : "Name (optional)"}
              </span>
            </div>
          </label>

          {mode === "private" ? (
            <label className="block">
              <span className="sr-only">{language === "ta" ? "மின்னஞ்சல் (விருப்பம்)" : "Email (optional)"}</span>
              <div className="float-field">
                <input
                  className="float-input"
                  placeholder="you@example.com"
                  autoComplete="email"
                  inputMode="email"
                  value={email}
                  disabled={status === "loading"}
                  onChange={(e) => {
                    resetIfDone()
                    setEmail(e.target.value)
                  }}
                />
                <span className={["float-label", language === "ta" ? "font-tamil" : ""].join(" ")}>
                  {language === "ta" ? "மின்னஞ்சல் (விருப்பம்)" : "Email (optional)"}
                </span>
              </div>
            </label>
          ) : null}

          <label className="block">
            <span className="sr-only">{language === "ta" ? "செய்தி" : "Message"}</span>
            <div className="float-field">
              <textarea
                className="float-input min-h-40 resize-y"
                placeholder={language === "ta" ? "எப்படி ஜெபிக்கலாம்?" : "How can we pray for you?"}
                required
                maxLength={MESSAGE_MAX}
                value={message}
                disabled={status === "loading"}
                onChange={(e) => {
                  resetIfDone()
                  setMessage(e.target.value)
                }}
              />
              <span className={["float-label", language === "ta" ? "font-tamil" : ""].join(" ")}>
                {language === "ta" ? "செய்தி" : "Message"}
              </span>
            </div>
            <div className={["field-status", nearLimit ? "is-near" : "", countPulse ? "anim-pop" : ""].join(" ")}>
              <span />
              <span aria-live="polite">
                {message.length} / {MESSAGE_MAX}
              </span>
            </div>
          </label>

          <div className="flex flex-col gap-3 border-t border-churchBlue/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              className="btn btn-md btn-primary"
              disabled={status === "loading"}
              aria-busy={status === "loading"}
            >
              {status === "loading" ? <span className="btn-spinner" aria-hidden="true" /> : null}
              {status === "success" ? <span aria-hidden="true">✓</span> : null}
              {submitLabel}
            </button>
            <p id={`${formId}-note`} className={["text-xs text-churchBlue/65", language === "ta" ? "font-tamil" : ""].join(" ")}>
              {noteText}{" "}
              {status === "error" ? (
                <a href={`mailto:${siteConfig.email}`} className="underline underline-offset-2">
                  {siteConfig.email}
                </a>
              ) : null}
            </p>
          </div>
        </form>
      </Reveal>
    </>
  )

  if (!wrapInSection) {
    return <div className="mx-auto max-w-3xl">{form}</div>
  }

  return (
    <section className="border-t border-churchBlue/10 bg-white">
      <Container className="section-padding">
        {form}
      </Container>
    </section>
  )
}

