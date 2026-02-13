import { appendSubmission, isValidEmail } from "@/lib/submissions"
import { rateLimit } from "@/lib/rateLimit"
import { enforceSameOrigin, getClientIp, validateCsrf } from "@/lib/requestSecurity"
import { serveOpportunities } from "@/lib/serve"

export const runtime = "nodejs"

type PreferredLanguage = "en" | "ta" | "bilingual"

function normalizeText(value: unknown) {
  return String(value ?? "").trim()
}

function normalizeEmail(value: unknown) {
  return normalizeText(value).toLowerCase()
}

function normalizePhone(value: unknown) {
  return normalizeText(value).replace(/[^\d+]/g, "").slice(0, 30)
}

function asStringArray(value: unknown) {
  if (!Array.isArray(value)) return []
  return value.map((v) => normalizeText(v)).filter(Boolean)
}

export async function POST(req: Request) {
  try {
    const originCheck = enforceSameOrigin(req)
    if (!originCheck.ok) return originCheck.response
    const csrfCheck = validateCsrf(req)
    if (!csrfCheck.ok) return csrfCheck.response

    const ip = getClientIp(req)
    const rl = rateLimit({ key: `serve:${ip}`, max: 5, windowMs: 60_000 })
    if (!rl.allowed) {
      return Response.json(
        { ok: false, error: "rate_limited" },
        { status: 429, headers: { "retry-after": String(rl.retryAfterSeconds) } },
      )
    }

    const body = (await req.json()) as Record<string, unknown>
    const honey = normalizeText(body.honey)
    if (honey) return Response.json({ ok: true })

    const name = normalizeText(body.name)
    const email = normalizeEmail(body.email)
    const phone = normalizePhone(body.phone)
    const preferredLanguage = normalizeText(body.preferredLanguage) as PreferredLanguage
    const opportunityIds = asStringArray(body.opportunityIds)
    const availability = asStringArray(body.availability)
    const skills = normalizeText(body.skills)
    const notes = normalizeText(body.notes)
    const trainingId = normalizeText(body.trainingId)

    const validOpportunityIds = new Set(serveOpportunities.map((o) => o.id))
    const selectedOpportunityIds = opportunityIds.filter((id) => validOpportunityIds.has(id)).slice(0, 10)

    if (!name || name.length > 120) return Response.json({ ok: false, error: "invalid_name" }, { status: 400 })
    if (!isValidEmail(email)) return Response.json({ ok: false, error: "invalid_email" }, { status: 400 })
    if (phone && phone.length < 7) return Response.json({ ok: false, error: "invalid_phone" }, { status: 400 })
    if (preferredLanguage !== "en" && preferredLanguage !== "ta" && preferredLanguage !== "bilingual") {
      return Response.json({ ok: false, error: "invalid_language" }, { status: 400 })
    }
    if (selectedOpportunityIds.length === 0 && !trainingId) {
      return Response.json({ ok: false, error: "missing_opportunity" }, { status: 400 })
    }
    if (skills.length > 2000) return Response.json({ ok: false, error: "invalid_skills" }, { status: 400 })
    if (notes.length > 5000) return Response.json({ ok: false, error: "invalid_notes" }, { status: 400 })
    if (availability.join(",").length > 800)
      return Response.json({ ok: false, error: "invalid_availability" }, { status: 400 })
    if (trainingId.length > 80) return Response.json({ ok: false, error: "invalid_training" }, { status: 400 })

    await appendSubmission("serve", {
      kind: "serve",
      name,
      email,
      phone,
      preferredLanguage,
      opportunityIds: selectedOpportunityIds,
      availability,
      skills,
      notes,
      trainingId,
      createdAt: new Date().toISOString(),
      userAgent: req.headers.get("user-agent") ?? "",
      ip,
    })

    return Response.json({ ok: true })
  } catch {
    return Response.json({ ok: false, error: "server_error" }, { status: 500 })
  }
}

