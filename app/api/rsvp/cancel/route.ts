import { NextResponse } from "next/server"

import { sendEmail } from "@/lib/email"
import { getEventBySlug } from "@/lib/events"
import { buildRsvpAdminCancellationEmail, buildRsvpCancellationEmail } from "@/lib/rsvpEmails"
import { cancelRsvp, getReservedSeats, listRsvpsForEvent } from "@/lib/rsvpStore"
import { rateLimit } from "@/lib/rateLimit"
import { enforceSameOrigin, getClientIp, validateCsrf } from "@/lib/requestSecurity"
import { siteConfig } from "@/lib/site"

function badRequest(message: string) {
  return NextResponse.json({ ok: false, message }, { status: 400 })
}

function normalizeText(value: unknown) {
  return String(value ?? "").trim()
}

function normalizeEmail(value: unknown) {
  return normalizeText(value).toLowerCase()
}

export async function POST(request: Request) {
  const originCheck = enforceSameOrigin(request)
  if (!originCheck.ok) return originCheck.response
  const csrfCheck = validateCsrf(request)
  if (!csrfCheck.ok) return csrfCheck.response

  const ip = getClientIp(request)
  const rl = rateLimit({ key: `rsvp-cancel:${ip}`, max: 10, windowMs: 5 * 60_000 })
  if (!rl.allowed) {
    return NextResponse.json({ ok: false, message: "Too many requests. Please try again." }, { status: 429 })
  }

  let body: any
  try {
    body = await request.json()
  } catch {
    return badRequest("Invalid JSON.")
  }

  const eventSlug = normalizeText(body.eventSlug)
  const email = normalizeEmail(body.email)
  const honeypot = normalizeText(body.website)
  if (honeypot) return NextResponse.json({ ok: true, removed: 0, capacity: null, remaining: null })
  if (!eventSlug) return badRequest("Missing event.")
  if (!email || !email.includes("@")) return badRequest("Invalid email.")

  const event = getEventBySlug(eventSlug)
  if (!event) return badRequest("Event not found.")

  const existing = (await listRsvpsForEvent(eventSlug)).find((r) => r.email.toLowerCase() === email) ?? null
  const removed = await cancelRsvp(eventSlug, email)
  const reservedAfter = await getReservedSeats(eventSlug)
  const remainingAfter = event.capacity ? Math.max(0, event.capacity - reservedAfter) : null

  const notifyTo = process.env.RSVP_NOTIFY_EMAIL || siteConfig.email
  const providerConfigured = Boolean(process.env.RESEND_API_KEY && process.env.RSVP_FROM_EMAIL)

  let emailResult: { confirmationSent: boolean; notifySent: boolean; providerConfigured: boolean; message?: string } | undefined
  if (removed > 0 && existing) {
    const confirmation = buildRsvpCancellationEmail({ event, rsvp: existing })
    const admin = buildRsvpAdminCancellationEmail({ event, rsvp: existing })
    const confirmationResult = await sendEmail({ to: existing.email, ...confirmation })
    const notifyResult = notifyTo ? await sendEmail({ to: notifyTo, ...admin }) : { ok: false as const, message: "No notify email configured." }
    emailResult = {
      confirmationSent: confirmationResult.ok,
      notifySent: notifyResult.ok,
      providerConfigured,
      message: confirmationResult.ok ? undefined : confirmationResult.message,
    }
  } else {
    emailResult = { confirmationSent: false, notifySent: false, providerConfigured }
  }

  return NextResponse.json({
    ok: true,
    removed,
    capacity: event.capacity ?? null,
    remaining: remainingAfter,
    email: emailResult,
  })
}
