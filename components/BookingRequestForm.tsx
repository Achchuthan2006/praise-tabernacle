"use client"

import { useEffect, useId, useMemo, useState } from "react"

import { useLanguage } from "@/components/language/LanguageProvider"
import { csrfHeaders } from "@/lib/csrfClient"
import { siteConfig } from "@/lib/site"

type BookingType = "building" | "room"

export default function BookingRequestForm({
  bookingType,
  titleEn,
  titleTa,
  subtitleEn,
  subtitleTa,
}: {
  bookingType: BookingType
  titleEn: string
  titleTa: string
  subtitleEn: string
  subtitleTa: string
}) {
  const { language } = useLanguage()
  const formId = useId()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [organization, setOrganization] = useState("")
  const [dateIso, setDateIso] = useState("")
  const [startTimeLocal, setStartTimeLocal] = useState("")
  const [endTimeLocal, setEndTimeLocal] = useState("")
  const [attendees, setAttendees] = useState<number>(0)
  const [details, setDetails] = useState("")
  const [honey, setHoney] = useState("")

  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [shake, setShake] = useState(false)

  const emailOk = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()), [email])
  const hasName = name.trim().length > 1
  const hasDate = /^\d{4}-\d{2}-\d{2}$/.test(dateIso.trim())
  const hasTimes = /^\d{2}:\d{2}$/.test(startTimeLocal.trim()) && /^\d{2}:\d{2}$/.test(endTimeLocal.trim())

  useEffect(() => {
    if (status !== "error") return
    setShake(true)
    const t = setTimeout(() => setShake(false), 520)
    return () => clearTimeout(t)
  }, [status])

  const copy = useMemo(() => {
    const buildingEn = "Building rental request"
    const buildingTa = "கட்டிட வாடகை கோரிக்கை"
    const roomEn = "Meeting room reservation"
    const roomTa = "கூட்ட அறை முன்பதிவு"

    return {
      heading: language === "ta" ? titleTa : titleEn,
      body: language === "ta" ? subtitleTa : subtitleEn,
      kindLabel:
        language === "ta"
          ? bookingType === "building"
            ? buildingTa
            : roomTa
          : bookingType === "building"
            ? buildingEn
            : roomEn,
      name: language === "ta" ? "பெயர்" : "Name",
      email: language === "ta" ? "மின்னஞ்சல்" : "Email",
      phone: language === "ta" ? "தொலைபேசி" : "Phone",
      org: language === "ta" ? "அமைப்பு (விருப்பம்)" : "Organization (optional)",
      date: language === "ta" ? "தேதி" : "Date",
      start: language === "ta" ? "தொடக்கம்" : "Start time",
      end: language === "ta" ? "முடிவு" : "End time",
      attendees: language === "ta" ? "பங்கேற்பாளர்கள் (சுமார்)" : "Attendees (approx.)",
      details: language === "ta" ? "விவரங்கள்" : "Details",
      detailsPh:
        language === "ta"
          ? "நிகழ்வு வகை, அமைப்பு/உபகரணம் தேவைகள், மொழி, மற்றும் ஏதேனும் குறிப்புகள்…"
          : "Event type, setup/equipment needs, language, and any notes…",
      submit:
        status === "loading"
          ? language === "ta"
            ? "அனுப்புகிறது…"
            : "Submitting…"
          : status === "success"
            ? language === "ta"
              ? "கோரிக்கை அனுப்பப்பட்டது"
              : "Request sent"
            : language === "ta"
              ? "கோரிக்கை அனுப்பு"
              : "Submit request",
      success:
        language === "ta"
          ? "நன்றி! உங்கள் கோரிக்கையை பெற்றோம். விரைவில் உறுதிப்படுத்த தொடர்பு கொள்வோம்."
          : "Thank you! We received your request. We’ll follow up to confirm availability.",
      error:
        language === "ta"
          ? "சிக்கல் ஏற்பட்டது. தயவுசெய்து மீண்டும் முயற்சி செய்யுங்கள்."
          : "Something went wrong. Please try again.",
      helper:
        language === "ta"
          ? `அவசர உதவி: ${siteConfig.phone}`
          : `Need help sooner? Call: ${siteConfig.phone}`,
    }
  }, [bookingType, language, status, subtitleEn, subtitleTa, titleEn, titleTa])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === "loading") return
    setTouched({
      name: true,
      email: true,
      dateIso: true,
      startTimeLocal: true,
      endTimeLocal: true,
    })
    if (!hasName || !emailOk || !hasDate || !hasTimes) return

    setStatus("loading")
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: await csrfHeaders({ "content-type": "application/json" }),
        body: JSON.stringify({
          bookingType,
          name,
          email,
          phone,
          organization,
          dateIso,
          startTimeLocal,
          endTimeLocal,
          attendees,
          details,
          honey,
        }),
      })
      const json = (await res.json()) as { ok?: boolean }
      if (!res.ok || !json.ok) throw new Error("bad_response")
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  const resetIfDone = () => {
    if (status === "success" || status === "error") setStatus("idle")
  }

  return (
    <div className={["card", shake ? "anim-shake" : ""].join(" ")}>
      <div className="card-content p-8">
        <div className="section-kicker">{copy.kindLabel}</div>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-churchBlue sm:text-3xl">
          <span className={language === "ta" ? "font-tamil" : ""}>{copy.heading}</span>
        </h2>
        <p className={["mt-3 text-sm leading-relaxed text-churchBlue/70 sm:text-base", language === "ta" ? "font-tamil" : ""].join(" ")}>
          {copy.body}
        </p>

        <form
          className="mt-8 grid gap-5 border-t border-churchBlue/10 pt-8"
          onSubmit={onSubmit}
          aria-describedby={`${formId}-note`}
        >
          <label className="sr-only" aria-hidden="true">
            Honey
            <input tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} />
          </label>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="sr-only">{copy.name}</span>
              <div className="float-field">
                <input
                  className="float-input"
                  placeholder={copy.name}
                  autoComplete="name"
                  required
                  disabled={status === "loading" || status === "success"}
                  value={name}
                  aria-invalid={touched.name && !hasName ? "true" : undefined}
                  onChange={(e) => {
                    resetIfDone()
                    setName(e.target.value)
                  }}
                  onBlur={() => setTouched((v) => ({ ...v, name: true }))}
                />
                <span className={["float-label", language === "ta" ? "font-tamil" : ""].join(" ")}>{copy.name}</span>
              </div>
            </label>

            <label className="block">
              <span className="sr-only">{copy.email}</span>
              <div className="float-field">
                <input
                  className="float-input"
                  placeholder={copy.email}
                  autoComplete="email"
                  type="email"
                  required
                  disabled={status === "loading" || status === "success"}
                  value={email}
                  aria-invalid={touched.email && !emailOk ? "true" : undefined}
                  onChange={(e) => {
                    resetIfDone()
                    setEmail(e.target.value)
                  }}
                  onBlur={() => setTouched((v) => ({ ...v, email: true }))}
                />
                <span className={["float-label", language === "ta" ? "font-tamil" : ""].join(" ")}>{copy.email}</span>
              </div>
            </label>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="sr-only">{copy.phone}</span>
              <div className="float-field">
                <input
                  className="float-input"
                  placeholder={copy.phone}
                  autoComplete="tel"
                  disabled={status === "loading" || status === "success"}
                  value={phone}
                  onChange={(e) => {
                    resetIfDone()
                    setPhone(e.target.value)
                  }}
                />
                <span className={["float-label", language === "ta" ? "font-tamil" : ""].join(" ")}>{copy.phone}</span>
              </div>
            </label>

            <label className="block">
              <span className="sr-only">{copy.org}</span>
              <div className="float-field">
                <input
                  className="float-input"
                  placeholder={copy.org}
                  disabled={status === "loading" || status === "success"}
                  value={organization}
                  onChange={(e) => {
                    resetIfDone()
                    setOrganization(e.target.value)
                  }}
                />
                <span className={["float-label", language === "ta" ? "font-tamil" : ""].join(" ")}>{copy.org}</span>
              </div>
            </label>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <label className="block md:col-span-1">
              <span className="sr-only">{copy.date}</span>
              <div className="float-field">
                <input
                  className="float-input"
                  type="date"
                  required
                  disabled={status === "loading" || status === "success"}
                  value={dateIso}
                  aria-invalid={touched.dateIso && !hasDate ? "true" : undefined}
                  onChange={(e) => {
                    resetIfDone()
                    setDateIso(e.target.value)
                  }}
                  onBlur={() => setTouched((v) => ({ ...v, dateIso: true }))}
                />
                <span className={["float-label", language === "ta" ? "font-tamil" : ""].join(" ")}>{copy.date}</span>
              </div>
            </label>

            <label className="block">
              <span className="sr-only">{copy.start}</span>
              <div className="float-field">
                <input
                  className="float-input"
                  type="time"
                  required
                  disabled={status === "loading" || status === "success"}
                  value={startTimeLocal}
                  aria-invalid={touched.startTimeLocal && !hasTimes ? "true" : undefined}
                  onChange={(e) => {
                    resetIfDone()
                    setStartTimeLocal(e.target.value)
                  }}
                  onBlur={() => setTouched((v) => ({ ...v, startTimeLocal: true }))}
                />
                <span className={["float-label", language === "ta" ? "font-tamil" : ""].join(" ")}>{copy.start}</span>
              </div>
            </label>

            <label className="block">
              <span className="sr-only">{copy.end}</span>
              <div className="float-field">
                <input
                  className="float-input"
                  type="time"
                  required
                  disabled={status === "loading" || status === "success"}
                  value={endTimeLocal}
                  aria-invalid={touched.endTimeLocal && !hasTimes ? "true" : undefined}
                  onChange={(e) => {
                    resetIfDone()
                    setEndTimeLocal(e.target.value)
                  }}
                  onBlur={() => setTouched((v) => ({ ...v, endTimeLocal: true }))}
                />
                <span className={["float-label", language === "ta" ? "font-tamil" : ""].join(" ")}>{copy.end}</span>
              </div>
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-medium text-churchBlue">{copy.attendees}</span>
            <input
              className="mt-2 h-11 w-full rounded-xl border border-churchBlue/15 bg-white px-3 text-sm text-churchBlue focus-ring"
              type="number"
              min={0}
              max={5000}
              disabled={status === "loading" || status === "success"}
              value={Number.isFinite(attendees) ? attendees : 0}
              onChange={(e) => {
                resetIfDone()
                setAttendees(Number(e.target.value))
              }}
            />
          </label>

          <label className="block">
            <span className="sr-only">{copy.details}</span>
            <div className="float-field">
              <textarea
                className="float-input min-h-36 resize-y"
                placeholder={copy.detailsPh}
                maxLength={5000}
                disabled={status === "loading" || status === "success"}
                value={details}
                onChange={(e) => {
                  resetIfDone()
                  setDetails(e.target.value)
                }}
              />
              <span className={["float-label", language === "ta" ? "font-tamil" : ""].join(" ")}>{copy.details}</span>
            </div>
          </label>

          <div className="flex flex-col gap-3 border-t border-churchBlue/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              className="btn btn-md btn-primary w-full sm:w-auto"
              disabled={status === "loading" || status === "success"}
              aria-busy={status === "loading"}
            >
              {copy.submit}
            </button>
            <p id={`${formId}-note`} className="text-xs text-churchBlue/65">
              {status === "success" ? copy.success : status === "error" ? copy.error : copy.helper}
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

