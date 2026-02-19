"use client"

import { useState } from "react"

import Lang from "@/components/language/Lang"
import { csrfHeaders } from "@/lib/csrfClient"
import { siteConfig } from "@/lib/site"

export default function NewsletterSignupForm({
  variant = "section",
  noteId = "newsletter-note",
  className,
}: {
  variant?: "section" | "footer"
  noteId?: string
  className?: string
}) {
  const [email, setEmail] = useState("")
  const [touched, setTouched] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const emailOk = /^\S+@\S+\.\S+$/.test(email.trim())
  const showInvalid = touched && !emailOk && status !== "loading" && status !== "success"

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (!emailOk) return
    setStatus("loading")
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: await csrfHeaders({ "content-type": "application/json" }),
        body: JSON.stringify({ email, honey: "" }),
      })
      if (!res.ok) throw new Error("bad_response")
      const json = (await res.json()) as { ok?: boolean }
      if (!json.ok) throw new Error("not_ok")
      setEmail("")
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  const inputClass =
    variant === "footer"
      ? "h-11 w-full rounded-xl border border-white/15 bg-white/10 px-4 text-sm text-white placeholder:text-white/55 focus-ring"
      : "h-11 w-full rounded-xl border border-churchBlue/15 bg-white px-4 text-sm text-churchBlue placeholder:text-churchBlue/45 focus-ring"

  const noteClass =
    variant === "footer"
      ? "text-xs text-white/80"
      : "text-xs text-churchBlue/65"

  const noteToneClass =
    showInvalid || status === "error"
      ? variant === "footer"
        ? "text-xs text-red-200"
        : "text-xs text-red-600"
      : noteClass

  const adornment =
    email.trim().length === 0 && !touched ? (
      <IconMail />
    ) : emailOk ? (
      <IconCheck />
    ) : (
      <IconWarn />
    )

  return (
    <form
      className={["grid w-full gap-3", className ?? ""].join(" ")}
      aria-describedby={noteId}
      onSubmit={onSubmit}
    >
      <label className="block">
        <span className="sr-only">Email</span>
        <div className={["float-field", variant === "footer" ? "float-field-invert" : ""].join(" ")}>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="you@example.com"
            autoComplete="email"
            className={inputClass.replace("h-11", "float-input has-adornment")}
            aria-invalid={showInvalid}
          />
          <span
            className={[
              "float-adornment",
              emailOk ? "is-ok" : touched && !emailOk ? "is-err" : "",
            ].join(" ")}
            aria-hidden="true"
          >
            {adornment}
          </span>
          <span className="float-label">Email</span>
        </div>
      </label>

      <button
        type="submit"
        className={["btn btn-md btn-primary w-full", status === "loading" ? "opacity-90" : ""].join(" ")}
        disabled={status === "loading" || status === "success"}
        aria-busy={status === "loading"}
      >
        {status === "loading" ? <span className="btn-spinner" aria-hidden="true" /> : null}
        <Lang
          en={status === "success" ? "Subscribed" : status === "loading" ? "Subscribing..." : "Subscribe"}
          ta={status === "loading" ? "சேர்க்கிறது..." : "சேருங்கள்"}
          taClassName="font-tamil"
        />
      </button>

      {variant === "section" ? (
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-churchBlue/70">
          <Lang en="Sermons & events" ta="பிரசங்கங்கள் & நிகழ்வுகள்" taClassName="font-tamil" />
          <span aria-hidden="true">•</span>
          <Lang en="No spam" ta="ஸ்பாம் இல்லை" taClassName="font-tamil" />
          <span aria-hidden="true">•</span>
          <Lang en="Unsubscribe anytime" ta="எப்போது வேண்டுமானாலும் நிறுத்தலாம்" taClassName="font-tamil" />
        </div>
      ) : null}

      <p id={noteId} className={noteToneClass}>
        {showInvalid ? (
          <Lang en="Please enter a valid email address." ta="தயவுசெய்து சரியான மின்னஞ்சலை உள்ளிடுங்கள்." taClassName="font-tamil" />
        ) : status === "success" ? (
          <Lang en="You're subscribed. Thank you!" ta="நன்றி! நீங்கள் சேர்க்கப்பட்டீர்கள்." taClassName="font-tamil" />
        ) : status === "error" ? (
          <>
            <Lang
              en="Couldn't submit right now. Please email "
              ta="இப்போது சமர்ப்பிக்க முடியவில்லை. தயவு செய்து மின்னஞ்சல் செய்யவும்: "
              taClassName="font-tamil"
            />
            <a
              href={`mailto:${siteConfig.email}?subject=Newsletter%20Signup`}
              className="underline underline-offset-2"
            >
              {siteConfig.email}
            </a>
            .
          </>
        ) : (
          <Lang
            en="No spam. Just church updates."
            ta="ஸ்பாம் இல்லை. சபை புதுப்பிப்புகள் மட்டும்."
            taClassName="font-tamil"
          />
        )}
      </p>
    </form>
  )
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M4.5 7.5A2.25 2.25 0 0 1 6.75 5.25h10.5A2.25 2.25 0 0 1 19.5 7.5v9A2.25 2.25 0 0 1 17.25 18.75H6.75A2.25 2.25 0 0 1 4.5 16.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m5.25 7.5 6.1 4.575a1.5 1.5 0 0 0 1.8 0L19.25 7.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M20 6 9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconWarn() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M12 9v5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M12 17.75h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M10.3 4.35 2.43 18a2 2 0 0 0 1.73 3h15.68a2 2 0 0 0 1.73-3L13.7 4.35a2 2 0 0 0-3.4 0Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  )
}
