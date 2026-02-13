"use client"

import { useId, useState } from "react"

import { useLanguage } from "@/components/language/LanguageProvider"
import { csrfHeaders } from "@/lib/csrfClient"
import { siteConfig } from "@/lib/site"

type ProgramOption = { labelEn: string; labelTa: string }

type MinistryRegistrationFormProps = {
  ministryNameEn: string
  ministryNameTa: string
  programOptions: ProgramOption[]
}

export default function MinistryRegistrationForm({
  ministryNameEn,
  ministryNameTa,
  programOptions,
}: MinistryRegistrationFormProps) {
  const { language } = useLanguage()
  const formId = useId()
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [honey, setHoney] = useState("")
  const [parentName, setParentName] = useState("")
  const [studentName, setStudentName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [program, setProgram] = useState(programOptions[0]?.labelEn ?? "")
  const [ageGrade, setAgeGrade] = useState("")
  const [notes, setNotes] = useState("")
  const [touched, setTouched] = useState({
    parentName: false,
    studentName: false,
    email: false,
    phone: false,
    program: false,
  })

  const nameOk = parentName.trim().length > 1
  const studentOk = studentName.trim().length > 1
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  const phoneOk = phone.trim().length >= 7
  const programOk = program.trim().length > 0

  const resetIfDone = () => {
    if (status === "success" || status === "error") setStatus("idle")
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === "loading") return
    setTouched({ parentName: true, studentName: true, email: true, phone: true, program: true })
    if (!nameOk || !studentOk || !emailOk || !phoneOk || !programOk) return
    setStatus("loading")
    try {
      const message = [
        `Ministry registration: ${ministryNameEn}`,
        `Program: ${program}`,
        `Parent/Guardian: ${parentName}`,
        `Student: ${studentName}`,
        ageGrade.trim().length ? `Age/Grade: ${ageGrade}` : null,
        `Email: ${email}`,
        `Phone: ${phone}`,
        notes.trim().length ? `Notes: ${notes.trim()}` : null,
      ]
        .filter(Boolean)
        .join("\n")

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: await csrfHeaders({ "content-type": "application/json" }),
        body: JSON.stringify({ name: parentName, email, message, honey }),
      })
      if (!res.ok) throw new Error("bad_response")
      const json = (await res.json()) as { ok?: boolean }
      if (!json.ok) throw new Error("not_ok")
      setParentName("")
      setStudentName("")
      setEmail("")
      setPhone("")
      setProgram(programOptions[0]?.labelEn ?? "")
      setAgeGrade("")
      setNotes("")
      setHoney("")
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  const copy = {
    heading: language === "ta" ? "\u0baa\u0ba4\u0bbf\u0bb5\u0bc1 \u0b9a\u0bc6\u0baf\u0bcd\u0baf\u0bc1\u0b99\u0bcd\u0b95\u0bb3\u0bcd" : "Register for a program",
    body:
      language === "ta"
        ? `${ministryNameTa} \u0ba8\u0bbf\u0b95\u0bb4\u0bcd\u0bb5\u0bc1\u0b95\u0bb3\u0bbf\u0bb2\u0bcd \u0b9a\u0bc7\u0bb0 \u0b95\u0bc2\u0b9f\u0bcd\u0b9f\u0bae\u0bcd \u0b95\u0bcb\u0bb0\u0bcd\u0ba4\u0bcd\u0ba4\u0bbf\u0bb1\u0bcd\u0b95\u0bbe\u0b95 \u0b87\u0ba4\u0ba8\u0bcd\u0ba4\u0ba4\u0bbf\u0ba9\u0bcd \u0bb5\u0bbf\u0bb5\u0bb0\u0b99\u0bcd\u0b95\u0bb3\u0bc8 \u0b85\u0ba9\u0bc1\u0baa\u0bb5\u0bbf\u0b95\u0bcd\u0b95\u0bb5\u0bc1\u0bae\u0bcd.`
        : `Share your details and we’ll help you connect to ${ministryNameEn}.`,
    parentName: language === "ta" ? "\u0baa\u0bc6\u0bb1\u0bcd\u0bb1\u0bcb\u0bb0\u0bcd/\u0b95\u0bbe\u0bb5\u0bb2\u0bb0\u0bcd \u0baa\u0bc6\u0baf\u0bb0\u0bcd" : "Parent/Guardian name",
    studentName: language === "ta" ? "\u0bae\u0bbe\u0ba3\u0bb5\u0bb0\u0bcd \u0baa\u0bc6\u0baf\u0bb0\u0bcd" : "Student name",
    email: language === "ta" ? "\u0bae\u0bbf\u0ba9\u0bcd\u0ba9\u0b9e\u0bcd\u0b9a\u0bb2\u0bcd" : "Email",
    phone: language === "ta" ? "\u0b95\u0bc8\u0baa\u0bc7\u0b9a\u0bbf" : "Phone",
    program: language === "ta" ? "\u0ba4\u0bbf\u0b9f\u0bcd\u0b9f\u0bae\u0bcd" : "Program",
    ageGrade: language === "ta" ? "\u0bb5\u0baf\u0ba4\u0bc1/\u0ba4\u0bb0\u0bae\u0bcd" : "Age / Grade",
    notes: language === "ta" ? "\u0b95\u0bc1\u0bb1\u0bbf\u0baa\u0bcd\u0baa\u0bc1\u0b95\u0bb3\u0bcd" : "Notes",
    send:
      status === "loading"
        ? language === "ta"
          ? "\u0b85\u0ba9\u0bc1\u0baa\u0bcd\u0baa\u0bc1\u0b95\u0bbf\u0bb1\u0ba4\u0bc1..."
          : "Sending..."
        : status === "success"
          ? language === "ta"
            ? "\u0b85\u0ba9\u0bc1\u0baa\u0bcd\u0baa\u0bbf\u0ba9\u0bab\u0bab"
            : "Sent"
          : language === "ta"
            ? "\u0b85\u0ba9\u0bc1\u0baa\u0bcd\u0baa\u0bc1\u0b99\u0bcd\u0b95\u0bb3\u0bcd"
            : "Send",
    note:
      status === "success"
        ? (language === "ta"
          ? "\u0ba8\u0ba9\u0bcd\u0bb1\u0bbf! \u0bb5\u0bbf\u0bb0\u0bb5\u0bc7\u0bb1\u0bcd\u0baa\u0bc1 \u0ba8\u0bbf\u0b95\u0bb4\u0bcd\u0bb5\u0bc1\u0ba9\u0bcd \u0b95\u0bc1\u0bb1\u0bbf\u0baa\u0bcd\u0baa\u0bc1\u0b95\u0bb3\u0bcd \u0b85\u0ba9\u0bc1\u0baa\u0bcd\u0baa\u0bbf\u0ba9\u0bab\u0bab."
          : "Thanks! We received your registration.")
        : status === "error"
          ? language === "ta"
            ? "\u0b87\u0baa\u0bcd\u0baa\u0bcb\u0ba4\u0bc1 \u0b85\u0ba9\u0bc1\u0baa\u0bcd\u0baa \u0bae\u0bc1\u0b9f\u0bbf\u0baf\u0bb5\u0bbf\u0bb2\u0bcd\u0bb2\u0bc8. \u0bae\u0bbf\u0ba9\u0bcd\u0ba9\u0b9e\u0bcd\u0b9a\u0bb2\u0bcd \u0b85\u0ba9\u0bc1\u0baa\u0bcd\u0baa\u0bc1\u0b99\u0bcd\u0b95\u0bb3\u0bcd:"
            : "Couldn’t send right now. Please email us:"
          : language === "ta"
            ? "\u0baa\u0bc6\u0bb1\u0bcd\u0bb1\u0bcb\u0bb0\u0bcd/\u0b95\u0bbe\u0bb5\u0bb2\u0bb0\u0bcd \u0bb5\u0bbf\u0bb5\u0bb0\u0b99\u0bcd\u0b95\u0bb3\u0bc8 \u0ba8\u0bbf\u0bb0\u0baa\u0bcd\u0baa\u0bc1\u0b99\u0bcd\u0b95\u0bb3\u0bcd; \u0ba8\u0bbe\u0b99\u0bcd\u0b95\u0bb3\u0bcd \u0bb5\u0bbf\u0bb0\u0bb5\u0bc7\u0bb1\u0bcd\u0baa\u0bc1 \u0baa\u0ba4\u0bbf\u0bb2\u0bc8 \u0ba4\u0bb0\u0bc1\u0bb5\u0bcb\u0bae\u0bcd."
            : "Share your details and we’ll follow up soon.",
  }

  return (
    <div className="rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow sm:p-8">
      <h2 className="text-xl font-semibold tracking-tight text-churchBlue">{copy.heading}</h2>
      <p className="mt-3 text-sm leading-relaxed text-churchBlue/70 sm:text-base">{copy.body}</p>

      <form className="mt-8 grid gap-5" onSubmit={onSubmit} aria-describedby={`${formId}-note`}>
        <label className="sr-only" aria-hidden="true">
          Honey
          <input tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} />
        </label>

        <label className="block">
          <span className="sr-only">{copy.parentName}</span>
          <div className="float-field">
            <input
              className="float-input has-adornment"
              placeholder={copy.parentName}
              required
              autoComplete="name"
              value={parentName}
              aria-invalid={touched.parentName && !nameOk ? "true" : undefined}
              onChange={(e) => {
                resetIfDone()
                setParentName(e.target.value)
              }}
              onBlur={() => setTouched((v) => ({ ...v, parentName: true }))}
            />
            <span className="float-label">{copy.parentName}</span>
          </div>
        </label>

        <label className="block">
          <span className="sr-only">{copy.studentName}</span>
          <div className="float-field">
            <input
              className="float-input"
              placeholder={copy.studentName}
              required
              value={studentName}
              aria-invalid={touched.studentName && !studentOk ? "true" : undefined}
              onChange={(e) => {
                resetIfDone()
                setStudentName(e.target.value)
              }}
              onBlur={() => setTouched((v) => ({ ...v, studentName: true }))}
            />
            <span className="float-label">{copy.studentName}</span>
          </div>
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="sr-only">{copy.email}</span>
            <div className="float-field">
              <input
                className="float-input"
                placeholder={copy.email}
                type="email"
                required
                autoComplete="email"
                value={email}
                aria-invalid={touched.email && !emailOk ? "true" : undefined}
                onChange={(e) => {
                  resetIfDone()
                  setEmail(e.target.value)
                }}
                onBlur={() => setTouched((v) => ({ ...v, email: true }))}
              />
              <span className="float-label">{copy.email}</span>
            </div>
          </label>

          <label className="block">
            <span className="sr-only">{copy.phone}</span>
            <div className="float-field">
              <input
                className="float-input"
                placeholder={copy.phone}
                type="tel"
                required
                autoComplete="tel"
                value={phone}
                aria-invalid={touched.phone && !phoneOk ? "true" : undefined}
                onChange={(e) => {
                  resetIfDone()
                  setPhone(e.target.value)
                }}
                onBlur={() => setTouched((v) => ({ ...v, phone: true }))}
              />
              <span className="float-label">{copy.phone}</span>
            </div>
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="sr-only">{copy.program}</span>
            <div className="float-field">
              <select
                className="float-input"
                required
                value={program}
                aria-invalid={touched.program && !programOk ? "true" : undefined}
                onChange={(e) => {
                  resetIfDone()
                  setProgram(e.target.value)
                }}
                onBlur={() => setTouched((v) => ({ ...v, program: true }))}
              >
                {programOptions.map((opt) => (
                  <option key={opt.labelEn} value={opt.labelEn}>
                    {language === "ta" ? opt.labelTa : opt.labelEn}
                  </option>
                ))}
              </select>
              <span className="float-label">{copy.program}</span>
            </div>
          </label>

          <label className="block">
            <span className="sr-only">{copy.ageGrade}</span>
            <div className="float-field">
              <input
                className="float-input"
                placeholder={copy.ageGrade}
                value={ageGrade}
                onChange={(e) => {
                  resetIfDone()
                  setAgeGrade(e.target.value)
                }}
              />
              <span className="float-label">{copy.ageGrade}</span>
            </div>
          </label>
        </div>

        <label className="block">
          <span className="sr-only">{copy.notes}</span>
          <div className="float-field">
            <textarea
              className="float-input min-h-28 resize-y"
              placeholder={copy.notes}
              value={notes}
              onChange={(e) => {
                resetIfDone()
                setNotes(e.target.value)
              }}
            />
            <span className="float-label">{copy.notes}</span>
          </div>
        </label>

        <div className="flex flex-col gap-3 border-t border-churchBlue/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <button type="submit" className="btn btn-md btn-primary w-full sm:w-auto" disabled={status === "loading"}>
            {status === "loading" ? <span className="btn-spinner" aria-hidden="true" /> : null}
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
    </div>
  )
}
