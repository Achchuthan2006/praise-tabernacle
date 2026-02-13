"use client"

import { useEffect, useMemo, useState } from "react"

import { csrfHeaders } from "@/lib/csrfClient"

type Props = {
  eventSlug: string
  eventTitle: string
  initialRemaining: number | null
  capacity: number | null
}

export type EventRsvpFormProps = Props

type ApiOk = {
  ok: true
  rsvp: { id: string; eventSlug: string; name: string; email: string; seats: number }
  capacity: number | null
  remaining: number | null
  email?: {
    confirmationSent: boolean
    notifySent: boolean
    providerConfigured: boolean
    message?: string
  }
}

type ApiErr = { ok: false; message: string }

type CancelOk = {
  ok: true
  removed: number
  remaining: number | null
  email?: {
    confirmationSent: boolean
    notifySent: boolean
    providerConfigured: boolean
    message?: string
  }
}

type CancelErr = { ok: false; message: string }

export default function EventRsvpForm({ eventSlug, eventTitle, initialRemaining, capacity }: Props) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [seats, setSeats] = useState(1)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState<string>("")
  const [remaining, setRemaining] = useState<number | null>(initialRemaining)
  const [shake, setShake] = useState(false)

  const isFull = useMemo(() => (remaining !== null ? remaining <= 0 : false), [remaining])

  useEffect(() => {
    if (status !== "error") return
    setShake(true)
    const t = setTimeout(() => setShake(false), 520)
    return () => clearTimeout(t)
  }, [status])

  const submit = async () => {
    setStatus("loading")
    setMessage("")
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: await csrfHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ eventSlug, name, email, seats, website: "" }),
      })
      const json = (await res.json()) as ApiOk | ApiErr
      if (!res.ok || !json.ok) {
        setStatus("error")
        setMessage(("message" in json && json.message) || "Could not RSVP.")
        return
      }
      setRemaining(json.remaining ?? null)
      setStatus("success")
      const emailSent = Boolean(json.email?.confirmationSent)
      setMessage(
        emailSent
          ? `RSVP confirmed for ${json.rsvp.seats} seat(s). A confirmation email was sent to ${json.rsvp.email}.`
          : `RSVP confirmed for ${json.rsvp.seats} seat(s). If you don't receive an email, please contact us.`,
      )
    } catch {
      setStatus("error")
      setMessage("Network error. Please try again.")
    }
  }

  const cancel = async () => {
    setStatus("loading")
    setMessage("")
    try {
      const res = await fetch("/api/rsvp/cancel", {
        method: "POST",
        headers: await csrfHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ eventSlug, email, website: "" }),
      })
      const json = (await res.json()) as CancelOk | CancelErr
      if (!res.ok || !json.ok) {
        setStatus("error")
        setMessage(("message" in json && json.message) || "Could not cancel RSVP.")
        return
      }
      setRemaining(json.remaining ?? null)
      setStatus("success")
      const emailSent = Boolean(json.email?.confirmationSent)
      setMessage(
        json.removed
          ? emailSent
            ? "RSVP canceled. A confirmation email was sent."
            : "RSVP canceled."
          : "No RSVP found for that email.",
      )
    } catch {
      setStatus("error")
      setMessage("Network error. Please try again.")
    }
  }

  return (
    <div id="rsvp" className="scroll-mt-24 rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow">
      <div className="section-kicker">RSVP</div>
      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-churchBlue">Reserve your spot</h3>
      <p className="mt-2 text-sm text-churchBlue/70">
        {capacity ? (
          remaining !== null ? (
            <>
              {remaining} spot{remaining === 1 ? "" : "s"} left for <span className="font-semibold text-churchBlue">{eventTitle}</span>.
            </>
          ) : (
            <>Reserve a spot for <span className="font-semibold text-churchBlue">{eventTitle}</span>.</>
          )
        ) : (
          <>Let us know you're coming to <span className="font-semibold text-churchBlue">{eventTitle}</span>.</>
        )}
      </p>

      <div className={["mt-6 grid gap-3 sm:grid-cols-2", shake ? "anim-shake" : ""].join(" ")}>
        <label className="block">
          <div className="float-field">
            <input
              className="float-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              disabled={status === "loading"}
            />
            <span className="float-label">Name</span>
          </div>
        </label>
        <label className="block">
          <div className="float-field">
            <input
              className="float-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              inputMode="email"
              disabled={status === "loading"}
            />
            <span className="float-label">Email</span>
          </div>
        </label>
        <label className="block sm:col-span-2">
          <div className="float-field">
            <input
              type="number"
              min={1}
              max={10}
              className="float-input"
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
              disabled={status === "loading" || isFull}
            />
            <span className="float-label">Seats</span>
          </div>
        </label>
      </div>

      {message ? (
        <div
          className={[
            "mt-4 rounded-2xl border p-4 text-sm",
            status === "error"
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-churchBlue/10 bg-churchBlueSoft text-churchBlue/80",
          ].join(" ")}
        >
          {message}
        </div>
      ) : null}

      <div className="mt-6 grid gap-2 sm:grid-cols-2">
        <button
          type="button"
          className="btn btn-md btn-primary w-full"
          onClick={submit}
          disabled={status === "loading" || isFull}
          aria-busy={status === "loading"}
        >
          {status === "loading" ? <span className="btn-spinner" aria-hidden="true" /> : null}
          {isFull ? "Event full" : status === "loading" ? "Saving..." : "RSVP"}
        </button>
        <button
          type="button"
          className="btn btn-md btn-secondary w-full"
          onClick={cancel}
          disabled={status === "loading" || !email}
          aria-busy={status === "loading"}
          title="Cancel by email"
        >
          {status === "loading" ? <span className="btn-spinner" aria-hidden="true" /> : null}
          Cancel RSVP
        </button>
      </div>

      <p className="mt-4 text-xs text-churchBlue/60">
        After RSVP, add a reminder by saving this event to your calendar (Google Calendar or iCal).
      </p>
    </div>
  )
}
