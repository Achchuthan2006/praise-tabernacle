"use client"

import { useEffect, useId, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"

import { useLanguage } from "@/components/language/LanguageProvider"
import { csrfHeaders } from "@/lib/csrfClient"
import type { ServeOpportunity, VolunteerTrainingEvent } from "@/lib/serve"

type PreferredLanguage = "en" | "ta" | "bilingual"

const availabilityOptions = [
  "Sundays (morning)",
  "Sundays (after service)",
  "Weeknights",
  "Weekdays",
  "Monthly events",
  "Flexible / on-call",
] as const

function toggleSet(cur: string[], value: string) {
  return cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value]
}

export default function VolunteerApplicationForm({
  opportunities,
  trainingEvents,
}: {
  opportunities: ServeOpportunity[]
  trainingEvents: VolunteerTrainingEvent[]
}) {
  const { language } = useLanguage()
  const formId = useId()
  const searchParams = useSearchParams()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [preferredLanguage, setPreferredLanguage] = useState<PreferredLanguage>("bilingual")
  const [opportunityIds, setOpportunityIds] = useState<string[]>([])
  const [availability, setAvailability] = useState<string[]>([])
  const [skills, setSkills] = useState("")
  const [notes, setNotes] = useState("")
  const [trainingId, setTrainingId] = useState<string>("")
  const [honey, setHoney] = useState("")

  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [shake, setShake] = useState(false)

  const emailOk = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()), [email])
  const hasName = name.trim().length > 1
  const hasSelection = opportunityIds.length > 0 || Boolean(trainingId)

  useEffect(() => {
    if (status !== "error") return
    setShake(true)
    const t = setTimeout(() => setShake(false), 520)
    return () => clearTimeout(t)
  }, [status])

  useEffect(() => {
    const fromOpp = (searchParams?.get("opportunity") ?? "").trim()
    const fromTraining = (searchParams?.get("training") ?? "").trim()
    if (fromTraining) setTrainingId((cur) => (cur ? cur : fromTraining))
    if (!fromOpp) return
    const valid = opportunities.some((o) => o.id === fromOpp)
    if (!valid) return
    setOpportunityIds((cur) => (cur.includes(fromOpp) ? cur : [...cur, fromOpp]))
  }, [opportunities, searchParams])

  const copy = useMemo(() => {
    return {
      kicker: language === "ta" ? "தன்னார்வ விண்ணப்பம்" : "Volunteer application",
      heading: language === "ta" ? "சேவைக்கு பதிவு செய்யுங்கள்" : "Sign up to serve",
      body:
        language === "ta"
          ? "ஒரு குழுவைத் தேர்ந்தெடுத்து விண்ணப்பத்தை சமர்ப்பியுங்கள். நாங்கள் விரைவில் தொடர்பு கொள்வோம்."
          : "Pick a team (or training) and send your application. We’ll follow up soon.",
      name: language === "ta" ? "பெயர்" : "Name",
      email: language === "ta" ? "மின்னஞ்சல்" : "Email",
      phone: language === "ta" ? "தொலைபேசி (விருப்பம்)" : "Phone (optional)",
      prefLang: language === "ta" ? "மொழி" : "Language",
      prefLangHelp:
        language === "ta" ? "எங்கள் குழு உங்களை எந்த மொழியில் தொடர்பு கொள்ள வேண்டும்?" : "How should we contact you?",
      opportunities: language === "ta" ? "குழுக்கள்" : "Teams",
      training: language === "ta" ? "பயிற்சி நிகழ்வு" : "Training event",
      availability: language === "ta" ? "உங்கள் கிடைக்கும் நேரம்" : "Availability",
      skills: language === "ta" ? "திறன்கள் / அனுபவம் (விருப்பம்)" : "Skills / experience (optional)",
      notes: language === "ta" ? "குறிப்பு (விருப்பம்)" : "Notes (optional)",
      submit:
        status === "loading"
          ? language === "ta"
            ? "அனுப்புகிறது…"
            : "Submitting…"
          : status === "success"
            ? language === "ta"
              ? "அனுப்பப்பட்டது"
              : "Sent"
            : language === "ta"
              ? "விண்ணப்பத்தை அனுப்பு"
              : "Submit application",
      note:
        status === "success"
          ? language === "ta"
            ? "நன்றி! உங்கள் விண்ணப்பம் கிடைத்தது. விரைவில் தொடர்பு கொள்வோம்."
            : "Thanks! We received your application. We’ll reach out soon."
          : status === "error"
            ? language === "ta"
              ? "இப்போது அனுப்ப முடியவில்லை. தயவுசெய்து மீண்டும் முயற்சிக்கவும்."
              : "Couldn’t submit right now. Please try again."
            : language === "ta"
              ? "தனியுரிமை பாதுகாப்புடன். உங்கள் தகவலை நாங்கள் பாதுகாப்பாக கையாளுகிறோம்."
              : "Privacy-friendly. We handle your info safely.",
      required: language === "ta" ? "தேவை" : "Required",
    }
  }, [language, status])

  const resetIfDone = () => {
    if (status === "success" || status === "error") setStatus("idle")
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === "loading" || status === "success") return
    setTouched({ name: true, email: true, selection: true })
    if (!hasName || !emailOk || !hasSelection) return

    setStatus("loading")
    try {
      const res = await fetch("/api/serve", {
        method: "POST",
        headers: await csrfHeaders({ "content-type": "application/json" }),
        body: JSON.stringify({
          name,
          email,
          phone,
          preferredLanguage,
          opportunityIds,
          availability,
          skills,
          notes,
          trainingId,
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

  return (
    <div className={["card", shake ? "anim-shake" : ""].join(" ")}>
      <div className="card-content p-8">
        <div className="section-kicker">{copy.kicker}</div>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-churchBlue sm:text-3xl">
          <span className={language === "ta" ? "font-tamil" : ""}>{copy.heading}</span>
        </h2>
        <p
          className={[
            "mt-3 text-sm leading-relaxed text-churchBlue/70 sm:text-base",
            language === "ta" ? "font-tamil" : "",
          ].join(" ")}
        >
          {copy.body}
        </p>

        <form className="mt-8 grid gap-5 border-t border-churchBlue/10 pt-8" onSubmit={onSubmit}>
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
              <span className="text-sm font-medium text-churchBlue">
                <span className={language === "ta" ? "font-tamil" : ""}>{copy.prefLang}</span>{" "}
                <span className="text-churchBlue/45">({copy.required})</span>
              </span>
              <select
                value={preferredLanguage}
                disabled={status === "loading" || status === "success"}
                onChange={(e) => {
                  resetIfDone()
                  setPreferredLanguage(e.target.value as PreferredLanguage)
                }}
                className="mt-2 h-11 w-full rounded-xl border border-churchBlue/15 bg-white px-4 text-sm text-churchBlue focus-ring"
              >
                <option value="bilingual">{language === "ta" ? "இருமொழி" : "Bilingual"}</option>
                <option value="en">{language === "ta" ? "ஆங்கிலம்" : "English"}</option>
                <option value="ta">{language === "ta" ? "தமிழ்" : "Tamil"}</option>
              </select>
              <div className={["mt-2 text-xs text-churchBlue/60", language === "ta" ? "font-tamil" : ""].join(" ")}>
                {copy.prefLangHelp}
              </div>
            </label>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <fieldset className="rounded-2xl border border-churchBlue/10 bg-white p-5">
              <legend className="px-1 text-sm font-semibold text-churchBlue">
                <span className={language === "ta" ? "font-tamil" : ""}>{copy.opportunities}</span>{" "}
                <span className="text-churchBlue/45">({copy.required})</span>
              </legend>

              <div className="mt-4 grid gap-3">
                {opportunities.map((o) => {
                  const checked = opportunityIds.includes(o.id)
                  return (
                    <label key={o.id} className="flex cursor-pointer items-start gap-3 rounded-xl border border-churchBlue/10 p-3">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4"
                        checked={checked}
                        disabled={status === "loading" || status === "success"}
                        onChange={() => {
                          resetIfDone()
                          setTouched((v) => ({ ...v, selection: true }))
                          setOpportunityIds((cur) => toggleSet(cur, o.id))
                        }}
                      />
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-churchBlue">
                          <span className={language === "ta" ? "font-tamil" : ""}>{language === "ta" ? o.titleTa : o.titleEn}</span>
                        </div>
                        <div className="mt-1 text-xs text-churchBlue/65">
                          {language === "ta" ? o.commitmentTa : o.commitmentEn}
                        </div>
                      </div>
                    </label>
                  )
                })}
              </div>
            </fieldset>

            <fieldset className="rounded-2xl border border-churchBlue/10 bg-white p-5">
              <legend className="px-1 text-sm font-semibold text-churchBlue">
                <span className={language === "ta" ? "font-tamil" : ""}>{copy.training}</span>{" "}
                <span className="text-churchBlue/45">({language === "ta" ? "விருப்பம்" : "optional"})</span>
              </legend>

              <div className="mt-4">
                <select
                  value={trainingId}
                  disabled={status === "loading" || status === "success"}
                  onChange={(e) => {
                    resetIfDone()
                    setTouched((v) => ({ ...v, selection: true }))
                    setTrainingId(e.target.value)
                  }}
                  className="h-11 w-full rounded-xl border border-churchBlue/15 bg-white px-4 text-sm text-churchBlue focus-ring"
                >
                  <option value="">{language === "ta" ? "எதுவும் இல்லை" : "None"}</option>
                  {trainingEvents.map((t) => (
                    <option key={t.id} value={t.id}>
                      {language === "ta" ? t.titleTa : t.titleEn} — {language === "ta" ? t.whenTa : t.whenEn}
                    </option>
                  ))}
                </select>

                {!hasSelection && touched.selection ? (
                  <div className={["mt-2 text-xs text-red-600", language === "ta" ? "font-tamil" : ""].join(" ")}>
                    {language === "ta" ? "குறைந்தது ஒரு குழுவையாவது தேர்வு செய்யுங்கள்." : "Please select at least one team."}
                  </div>
                ) : null}
              </div>
            </fieldset>
          </div>

          <fieldset className="rounded-2xl border border-churchBlue/10 bg-white p-5">
            <legend className="px-1 text-sm font-semibold text-churchBlue">
              <span className={language === "ta" ? "font-tamil" : ""}>{copy.availability}</span>
            </legend>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {availabilityOptions.map((opt) => {
                const checked = availability.includes(opt)
                return (
                  <label key={opt} className="flex cursor-pointer items-center gap-3 rounded-xl border border-churchBlue/10 px-4 py-3">
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                      checked={checked}
                      disabled={status === "loading" || status === "success"}
                      onChange={() => {
                        resetIfDone()
                        setAvailability((cur) => toggleSet(cur, opt))
                      }}
                    />
                    <span className="text-sm text-churchBlue/80">{opt}</span>
                  </label>
                )
              })}
            </div>
          </fieldset>

          <label className="block">
            <span className={["text-sm font-medium text-churchBlue", language === "ta" ? "font-tamil" : ""].join(" ")}>
              {copy.skills}
            </span>
            <textarea
              className="mt-2 min-h-[120px] w-full rounded-2xl border border-churchBlue/15 bg-white p-4 text-sm text-churchBlue focus-ring"
              value={skills}
              disabled={status === "loading" || status === "success"}
              onChange={(e) => {
                resetIfDone()
                setSkills(e.target.value)
              }}
              placeholder={
                language === "ta"
                  ? "எ.கா. இசை, ஒலி/வீடியோ, குழந்தைகள், மொழிபெயர்ப்பு, வரவேற்பு…"
                  : "Ex: music, sound/video, kids, translation, hospitality…"
              }
            />
          </label>

          <label className="block">
            <span className={["text-sm font-medium text-churchBlue", language === "ta" ? "font-tamil" : ""].join(" ")}>
              {copy.notes}
            </span>
            <textarea
              className="mt-2 min-h-[120px] w-full rounded-2xl border border-churchBlue/15 bg-white p-4 text-sm text-churchBlue focus-ring"
              value={notes}
              disabled={status === "loading" || status === "success"}
              onChange={(e) => {
                resetIfDone()
                setNotes(e.target.value)
              }}
              placeholder={
                language === "ta"
                  ? "எப்போது தொடங்கலாம்? உங்கள் நேரம்? ஏதேனும் குறிப்புகள்…"
                  : "When can you start? Your schedule? Any notes…"
              }
            />
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button type="submit" className="btn btn-md btn-primary" disabled={status === "loading" || status === "success"}>
              <span className={language === "ta" ? "font-tamil" : ""}>{copy.submit}</span>
            </button>
            <div className={["text-xs text-churchBlue/60", language === "ta" ? "font-tamil" : ""].join(" ")} id={`${formId}-note`}>
              {copy.note}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

