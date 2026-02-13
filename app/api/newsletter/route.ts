import { appendSubmission, isValidEmail } from "@/lib/submissions"
import { rateLimit } from "@/lib/rateLimit"
import { enforceSameOrigin, getClientIp, validateCsrf } from "@/lib/requestSecurity"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const originCheck = enforceSameOrigin(req)
    if (!originCheck.ok) return originCheck.response
    const csrfCheck = validateCsrf(req)
    if (!csrfCheck.ok) return csrfCheck.response

    const ip = getClientIp(req)
    const rl = rateLimit({ key: `newsletter:${ip}`, max: 5, windowMs: 60_000 })
    if (!rl.allowed) {
      return Response.json(
        { ok: false, error: "rate_limited" },
        { status: 429, headers: { "retry-after": String(rl.retryAfterSeconds) } },
      )
    }

    const body = (await req.json()) as { email?: unknown; honey?: unknown }
    const honey = typeof body.honey === "string" ? body.honey.trim() : ""
    if (honey) return Response.json({ ok: true })

    const email = typeof body.email === "string" ? body.email.trim() : ""
    if (!isValidEmail(email)) return Response.json({ ok: false, error: "invalid_email" }, { status: 400 })

    await appendSubmission("newsletter", {
      kind: "newsletter",
      email,
      createdAt: new Date().toISOString(),
      userAgent: req.headers.get("user-agent") ?? "",
      ip,
    })

    return Response.json({ ok: true })
  } catch {
    return Response.json({ ok: false, error: "server_error" }, { status: 500 })
  }
}
