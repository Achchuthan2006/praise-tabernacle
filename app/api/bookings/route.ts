import { appendSubmission, isValidEmail } from "@/lib/submissions"
import { rateLimit } from "@/lib/rateLimit"
import { enforceSameOrigin, getClientIp, validateCsrf } from "@/lib/requestSecurity"

export const runtime = "nodejs"

type BookingType = "building" | "room"

function normalizeText(value: unknown) {
  return String(value ?? "").trim()
}

function normalizeEmail(value: unknown) {
  return normalizeText(value).toLowerCase()
}

function normalizePhone(value: unknown) {
  return normalizeText(value).replace(/[^\d+]/g, "").slice(0, 30)
}

function isIsoDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value)
}

function isLocalTime(value: string) {
  return /^\d{2}:\d{2}$/.test(value)
}

export async function POST(req: Request) {
  try {
    const originCheck = enforceSameOrigin(req)
    if (!originCheck.ok) return originCheck.response
    const csrfCheck = validateCsrf(req)
    if (!csrfCheck.ok) return csrfCheck.response

    const ip = getClientIp(req)
    const rl = rateLimit({ key: `booking:${ip}`, max: 6, windowMs: 60_000 })
    if (!rl.allowed) {
      return Response.json(
        { ok: false, error: "rate_limited" },
        { status: 429, headers: { "retry-after": String(rl.retryAfterSeconds) } },
      )
    }

    const body = (await req.json()) as Record<string, unknown>
    const honey = normalizeText(body.honey)
    if (honey) return Response.json({ ok: true })

    const bookingType = normalizeText(body.bookingType) as BookingType
    const name = normalizeText(body.name)
    const email = normalizeEmail(body.email)
    const phone = normalizePhone(body.phone)
    const organization = normalizeText(body.organization)
    const dateIso = normalizeText(body.dateIso)
    const startTimeLocal = normalizeText(body.startTimeLocal)
    const endTimeLocal = normalizeText(body.endTimeLocal)
    const attendees = Number(body.attendees ?? 0)
    const details = normalizeText(body.details)

    if (bookingType !== "building" && bookingType !== "room")
      return Response.json({ ok: false, error: "invalid_type" }, { status: 400 })
    if (!name || name.length > 120) return Response.json({ ok: false, error: "invalid_name" }, { status: 400 })
    if (!isValidEmail(email)) return Response.json({ ok: false, error: "invalid_email" }, { status: 400 })
    if (phone && phone.length < 7) return Response.json({ ok: false, error: "invalid_phone" }, { status: 400 })
    if (!isIsoDate(dateIso)) return Response.json({ ok: false, error: "invalid_date" }, { status: 400 })
    if (!isLocalTime(startTimeLocal) || !isLocalTime(endTimeLocal))
      return Response.json({ ok: false, error: "invalid_time" }, { status: 400 })
    if (!Number.isFinite(attendees) || attendees < 0 || attendees > 5000)
      return Response.json({ ok: false, error: "invalid_attendees" }, { status: 400 })
    if (details.length > 5000) return Response.json({ ok: false, error: "invalid_details" }, { status: 400 })
    if (organization.length > 160) return Response.json({ ok: false, error: "invalid_org" }, { status: 400 })

    await appendSubmission("booking", {
      kind: "booking",
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
      createdAt: new Date().toISOString(),
      userAgent: req.headers.get("user-agent") ?? "",
      ip,
    })

    return Response.json({ ok: true })
  } catch {
    return Response.json({ ok: false, error: "server_error" }, { status: 500 })
  }
}

