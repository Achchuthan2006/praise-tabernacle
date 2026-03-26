"use client"

import { useEffect, useId, useState } from "react"
import { useSearchParams } from "next/navigation"

import { useLanguage } from "@/components/language/LanguageProvider"
import { csrfHeaders } from "@/lib/csrfClient"
import { siteConfig } from "@/lib/site"

export default function ContactMessageForm() {
  const { language } = useLanguage()
  const formId = useId()
  const searchParams = useSearchParams()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [honey, setHoney] = useState("")
  const [touched, setTouched] = useState({ name: false, email: false, message: false })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [shake, setShake] = useState(false)
  const [countPulse, setCountPulse] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const MESSAGE_MAX = 1000
  const nearLimit = message.length >= Math.floor(MESSAGE_MAX * 0.85)
  const hasMessage = message.trim().length > 0
  const hasName = name.trim().length > 1
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())

  const formNameId = `${formId}-name`
  const formEmailId = `${formId}-email`
  const formMessageId = `${formId}-message`

  useEffect(() => {
    const prefill = (searchParams?.get("message") ?? "").trim()
    if (!prefill) return
    setMessage((cur) => (cur.trim().length ? cur : prefill))
  }, [searchParams])

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

  useEffect(() => {
    if (status !== "success" && status !== "error") {
      setShowToast(false)
      return
    }

    setShowToast(true)
    const t = window.setTimeout(() => setShowToast(false), 3200)
    return () => window.clearTimeout(t)
  }, [status])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === "loading") return
    setTouched({ name: true, email: true, message: true })
    if (!hasName || !emailOk || !hasMessage) return

    setStatus("loading")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: await csrfHeaders({ "content-type": "application/json" }),
        body: JSON.stringify({ name, email, message, honey }),
      })

      if (!res.ok) throw new Error("bad_response")
      const json = (await res.json()) as { ok?: boolean }
      if (!json.ok) throw new Error("not_ok")

      setName("")
      setEmail("")
      setMessage("")
      setHoney("")
      setTouched({ name: false, email: false, message: false })
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  const resetIfDone = () => {
    if (status === "success" || status === "error") setStatus("idle")
  }

  const iconCheck = (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
      <path
        d="M20 6 9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

  const iconWarn = (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
      <path d="M12 9v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 17h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M10.3 4.6 2.7 18.2A2 2 0 0 0 4.4 21h15.2a2 2 0 0 0 1.7-2.8L13.7 4.6a2 2 0 0 0-3.4 0Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )

  const copy = {
    heading: language === "ta" ? "செய்தி அனுப்புங்கள்" : "Send a message",
    body:
      language === "ta"
        ? "உங்களுக்கு கேள்வி இருந்தால், உதவி தேவைப்பட்டால், அல்லது உங்கள் வருகையை திட்டமிட விரும்பினால், எங்களுக்கு ஒரு செய்தி அனுப்புங்கள்."
        : "If you have a question, need help, or want to plan your visit, we'd love to hear from you.",
    name: language === "ta" ? "பெயர்" : "Name",
    email: language === "ta" ? "மின்னஞ்சல்" : "Email",
    message: language === "ta" ? "செய்தி" : "Message",
    namePlaceholder: language === "ta" ? "உங்கள் பெயர்" : "Your name",
    emailPlaceholder: "you@example.com",
    messagePlaceholder: language === "ta" ? "எப்படி உதவலாம்?" : "How can we help?",
    send:
      status === "loading"
        ? language === "ta"
          ? "அனுப்பப்படுகிறது..."
          : "Sending..."
        : status === "success"
          ? language === "ta"
            ? "அனுப்பப்பட்டது"
            : "Sent"
          : language === "ta"
            ? "அனுப்பவும்"
            : "Send",
    note:
      status === "success"
        ? language === "ta"
          ? "நன்றி! உங்கள் செய்தி அனுப்பப்பட்டது. விரைவில் பதிலளிப்போம்."
          : "Thanks! Your message was sent. We'll get back to you soon."
        : status === "error"
          ? language === "ta"
            ? "இப்போது அனுப்ப முடியவில்லை. தயவுசெய்து எங்களுக்கு மின்னஞ்சல் செய்யவும்:"
            : "Couldn't send right now. Please email us:"
          : language === "ta"
            ? "ஸ்பாம் இல்லை. எங்களிடம் தொடர்புகொள்ளுங்கள்; விரைவில் பதிலளிப்போம்."
            : "No spam. Send a note and we'll respond as soon as we can.",
    successTitle: language === "ta" ? "செய்தி அனுப்பப்பட்டது" : "Message sent",
    errorTitle: language === "ta" ? "அனுப்ப முடியவில்லை" : "Message failed",
    successBody:
      language === "ta"
        ? "நன்றி! உங்கள் செய்தி எங்களுக்கு வந்துள்ளது. விரைவில் தொடர்புகொள்கிறோம்."
        : "Thanks! Your message reached us and we'll respond as soon as we can.",
    errorBody:
      language === "ta"
        ? "இப்போது படிவத்தை அனுப்ப முடியவில்லை. தயவுசெய்து மீண்டும் முயற்சிக்கவும் அல்லது எங்களுக்கு மின்னஞ்சல் செய்யவும்."
        : "We couldn't submit the form right now. Please try again or email us directly.",
    dismiss: language === "ta" ? "மூடு" : "Dismiss",
    retry: language === "ta" ? "மீண்டும் முயற்சிக்கவும்." : "Please try again.",
    enterMessage: language === "ta" ? "செய்தியை எழுதுங்கள்." : "Please enter a message.",
    spamNote: language === "ta" ? "இந்த படிவம் அடிப்படை spam பாதுகாப்புடன் உள்ளது." : "This form uses basic spam protection.",
  }

  return (
    <>
      {showToast ? (
        <div className="pointer-events-none fixed inset-x-4 bottom-6 z-[90] flex justify-center sm:inset-x-auto sm:right-6 sm:justify-end">
          <div
            className={[
              "pointer-events-auto w-full max-w-sm rounded-2xl border px-4 py-3 shadow-[0_20px_50px_rgb(2_6_23_/_0.18)] backdrop-blur",
              status === "success"
                ? "border-emerald-200 bg-emerald-50/95 text-emerald-900"
                : "border-red-200 bg-red-50/95 text-red-900",
            ].join(" ")}
            role={status === "error" ? "alert" : "status"}
            aria-live="polite"
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/70">
                {status === "success" ? iconCheck : iconWarn}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold">
                  {status === "success" ? copy.successTitle : copy.errorTitle}
                </div>
                <div className="mt-1 text-xs leading-relaxed">
                  {status === "success" ? copy.successBody : copy.errorBody}
                </div>
              </div>
              <button
                type="button"
                className="focus-ring rounded-lg px-2 py-1 text-xs font-semibold opacity-80 transition hover:opacity-100"
                onClick={() => setShowToast(false)}
                aria-label={copy.dismiss}
              >
                ×
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div>
        <h2 className="text-3xl font-semibold tracking-tight text-churchBlue sm:text-4xl">
          {copy.heading}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-churchBlue/70 sm:text-base">{copy.body}</p>
      </div>

      {status === "success" || status === "error" ? (
        <div
          className={[
            "mt-6 rounded-2xl border px-4 py-4 shadow-glow",
            status === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-900"
              : "border-red-200 bg-red-50 text-red-900",
          ].join(" ")}
          role={status === "error" ? "alert" : "status"}
          aria-live="polite"
        >
          <div className="flex items-start gap-3">
            <span
              className={[
                "mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full",
                status === "success" ? "bg-emerald-100" : "bg-red-100",
              ].join(" ")}
              aria-hidden="true"
            >
              {status === "success" ? iconCheck : iconWarn}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold">
                {status === "success" ? copy.successTitle : copy.errorTitle}
              </p>
              <p className="mt-1 text-sm leading-relaxed">
                {status === "success" ? copy.successBody : copy.errorBody}
              </p>
              {status === "error" ? (
                <p className="mt-2 text-sm">
                  <a href={`mailto:${siteConfig.email}`} className="font-semibold underline underline-offset-2">
                    {siteConfig.email}
                  </a>
                </p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      <form
        className={["mt-10 grid gap-5 border-t border-churchBlue/10 pt-8", shake ? "anim-shake" : ""].join(" ")}
        aria-describedby={`${formId}-note`}
        onSubmit={onSubmit}
      >
        <label className="sr-only" aria-hidden="true">
          Honey
          <input tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} />
        </label>

        <div className="block">
          <label htmlFor={formNameId} className="sr-only">
            {copy.name}
          </label>
          <div className="float-field">
            <input
              id={formNameId}
              className="float-input has-adornment"
              placeholder={copy.namePlaceholder}
              aria-label={copy.name}
              autoComplete="name"
              required
              disabled={status === "loading"}
              value={name}
              aria-invalid={status !== "success" && touched.name && !hasName ? "true" : undefined}
              onChange={(e) => {
                resetIfDone()
                setName(e.target.value)
              }}
              onBlur={() => setTouched((v) => ({ ...v, name: true }))}
            />
            <span className="float-label" aria-hidden="true">{copy.name}</span>
            {status !== "success" && touched.name ? (
              <span className={["float-adornment", hasName ? "is-ok" : "is-err"].join(" ")} aria-hidden="true">
                {hasName ? iconCheck : iconWarn}
              </span>
            ) : null}
          </div>
        </div>

        <div className="block">
          <label htmlFor={formEmailId} className="sr-only">
            {copy.email}
          </label>
          <div className="float-field">
            <input
              id={formEmailId}
              className="float-input has-adornment"
              placeholder={copy.emailPlaceholder}
              aria-label={copy.email}
              autoComplete="email"
              type="email"
              required
              disabled={status === "loading"}
              value={email}
              aria-invalid={status !== "success" && touched.email && !emailOk ? "true" : undefined}
              onChange={(e) => {
                resetIfDone()
                setEmail(e.target.value)
              }}
              onBlur={() => setTouched((v) => ({ ...v, email: true }))}
            />
            <span className="float-label" aria-hidden="true">{copy.email}</span>
            {status !== "success" && touched.email ? (
              <span className={["float-adornment", emailOk ? "is-ok" : "is-err"].join(" ")} aria-hidden="true">
                {emailOk ? iconCheck : iconWarn}
              </span>
            ) : null}
          </div>
        </div>

        <div className="block">
          <label htmlFor={formMessageId} className="sr-only">
            {copy.message}
          </label>
          <div className="float-field">
            <textarea
              id={formMessageId}
              className="float-input min-h-36 resize-y"
              placeholder={copy.messagePlaceholder}
              aria-label={copy.message}
              required
              maxLength={MESSAGE_MAX}
              disabled={status === "loading"}
              value={message}
              aria-invalid={status !== "success" && touched.message && !hasMessage ? "true" : undefined}
              onChange={(e) => {
                resetIfDone()
                setMessage(e.target.value)
              }}
              onBlur={() => setTouched((v) => ({ ...v, message: true }))}
            />
            <span className="float-label" aria-hidden="true">{copy.message}</span>
          </div>
          <div className={["field-status", nearLimit ? "is-near" : "", countPulse ? "anim-pop" : ""].join(" ")}>
            <span className="field-status-copy">
              {status === "error"
                ? copy.retry
                : status !== "success" && touched.message && !hasMessage
                  ? copy.enterMessage
                  : ""}
            </span>
            <span className="field-status-count" aria-live="polite">
              {message.length} / {MESSAGE_MAX}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-churchBlue/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            className="btn btn-md btn-primary w-full sm:w-auto"
            disabled={status === "loading"}
            aria-busy={status === "loading"}
          >
            {status === "loading" ? <span className="btn-spinner" aria-hidden="true" /> : null}
            {status === "success" ? <span aria-hidden="true">✓</span> : null}
            {copy.send}
          </button>
          <p id={`${formId}-note`} className="text-xs text-churchBlue/65">
            {status === "error" ? (
              <>
                {copy.note}{" "}
                <a href={`mailto:${siteConfig.email}`} className="underline underline-offset-2">
                  {siteConfig.email}
                </a>
              </>
            ) : (
              copy.note
            )}
          </p>
        </div>

        <p className="text-xs text-churchBlue/55">{copy.spamNote}</p>
      </form>
    </>
  )
}
