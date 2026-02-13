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

  const MESSAGE_MAX = 1000
  const nearLimit = message.length >= Math.floor(MESSAGE_MAX * 0.85)
  const hasMessage = message.trim().length > 0
  const hasName = name.trim().length > 1
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())

  const nameId = `${formId}-name`
  const emailId = `${formId}-email`
  const messageId = `${formId}-message`

  useEffect(() => {
    const prefill = (searchParams?.get("message") ?? "").trim()
    if (!prefill) return
    setMessage((cur) => (cur.trim().length ? cur : prefill))
  }, [searchParams])

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

  const resetIfDone = () => {
    if (status === "success" || status === "error") setStatus("idle")
  }

  const IconCheck = (
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

  const IconWarn = (
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
        ? "உங்களுக்கு கேள்வி இருந்தால், உதவி தேவைப்பட்டால், அல்லது வருகையை திட்டமிட விரும்பினால், எங்களுக்கு செய்தி அனுப்புங்கள்."
        : "If you have a question, need help, or want to plan your visit, we’d love to hear from you.",
    name: language === "ta" ? "பெயர்" : "Name",
    email: language === "ta" ? "மின்னஞ்சல்" : "Email",
    message: language === "ta" ? "செய்தி" : "Message",
    namePlaceholder: language === "ta" ? "உங்கள் பெயர்" : "Your name",
    emailPlaceholder: "you@example.com",
    messagePlaceholder: language === "ta" ? "எப்படி உதவலாம்?" : "How can we help?",
    send:
      status === "loading"
        ? language === "ta"
          ? "அனுப்புகிறது..."
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
          ? "நன்றி! உங்கள் செய்தி அனுப்பப்பட்டது. விரைவில் பதிலளிக்கிறோம்."
          : "Thanks! Your message was sent. We’ll get back to you soon."
        : status === "error"
          ? language === "ta"
            ? "இப்போது அனுப்ப முடியவில்லை. தயவுசெய்து மின்னஞ்சல் செய்யவும்:"
            : "Couldn’t send right now. Please email us:"
          : language === "ta"
            ? "ஸ்பாம் இல்லை. எங்களிடம் தொடர்பு கொள்ளுங்கள்; விரைவில் பதிலளிக்கிறோம்."
            : "No spam. Send a note and we’ll respond as soon as we can.",
  }

  return (
    <>
      <div>
        <h2 className="text-3xl font-semibold tracking-tight text-churchBlue sm:text-4xl">
          {copy.heading}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-churchBlue/70 sm:text-base">{copy.body}</p>
      </div>

      <form
        className={["mt-10 grid gap-5 border-t border-churchBlue/10 pt-8", shake ? "anim-shake" : ""].join(" ")}
        aria-describedby={`${formId}-note`}
        onSubmit={onSubmit}
      >
        <label className="sr-only" aria-hidden="true">
          Honey
          <input tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} />
        </label>
        <label className="block">
          <span className="sr-only">{copy.name}</span>
          <div className="float-field">
            <input
              id={nameId}
              className="float-input has-adornment"
              placeholder={copy.namePlaceholder}
              autoComplete="name"
              required
              disabled={status === "loading"}
              value={name}
              aria-invalid={touched.name && !hasName ? "true" : undefined}
              onChange={(e) => {
                resetIfDone()
                setName(e.target.value)
              }}
              onBlur={() => setTouched((v) => ({ ...v, name: true }))}
            />
            <span className="float-label">{copy.name}</span>
            {touched.name ? (
              <span className={["float-adornment", hasName ? "is-ok" : "is-err"].join(" ")} aria-hidden="true">
                {hasName ? IconCheck : IconWarn}
              </span>
            ) : null}
          </div>
        </label>

        <label className="block">
          <span className="sr-only">{copy.email}</span>
          <div className="float-field">
            <input
              id={emailId}
              className="float-input has-adornment"
              placeholder={copy.emailPlaceholder}
              autoComplete="email"
              type="email"
              required
              disabled={status === "loading"}
              value={email}
              aria-invalid={touched.email && !emailOk ? "true" : undefined}
              onChange={(e) => {
                resetIfDone()
                setEmail(e.target.value)
              }}
              onBlur={() => setTouched((v) => ({ ...v, email: true }))}
            />
            <span className="float-label">{copy.email}</span>
            {touched.email ? (
              <span className={["float-adornment", emailOk ? "is-ok" : "is-err"].join(" ")} aria-hidden="true">
                {emailOk ? IconCheck : IconWarn}
              </span>
            ) : null}
          </div>
        </label>

        <label className="block">
          <span className="sr-only">{copy.message}</span>
          <div className="float-field">
            <textarea
              id={messageId}
              className="float-input min-h-36 resize-y"
              placeholder={copy.messagePlaceholder}
              required
              maxLength={MESSAGE_MAX}
              disabled={status === "loading"}
              value={message}
              aria-invalid={touched.message && !hasMessage ? "true" : undefined}
              onChange={(e) => {
                resetIfDone()
                setMessage(e.target.value)
              }}
              onBlur={() => setTouched((v) => ({ ...v, message: true }))}
            />
            <span className="float-label">{copy.message}</span>
          </div>
          <div className={["field-status", nearLimit ? "is-near" : "", countPulse ? "anim-pop" : ""].join(" ")}>
            <span>
              {status === "error"
                ? language === "ta"
                  ? "மீண்டும் முயற்சிக்கவும்."
                  : "Please try again."
                : touched.message && !hasMessage
                  ? language === "ta"
                    ? "செய்தியை எழுதுங்கள்."
                    : "Please enter a message."
                  : ""}
            </span>
            <span aria-live="polite">
              {message.length} / {MESSAGE_MAX}
            </span>
          </div>
        </label>

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
      </form>
    </>
  )
}
