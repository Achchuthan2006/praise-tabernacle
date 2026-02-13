import { NextResponse } from "next/server"

import { addPrayerPostV2, listApprovedPrayerPosts } from "@/lib/prayerWallStore"
import { rateLimit } from "@/lib/rateLimit"
import { enforceSameOrigin, getClientIp, validateCsrf } from "@/lib/requestSecurity"

function badRequest(message: string) {
  return NextResponse.json({ ok: false, message }, { status: 400 })
}

function normalizeText(value: unknown) {
  return String(value ?? "").trim()
}

export async function GET() {
  const posts = await listApprovedPrayerPosts()
  return NextResponse.json({ ok: true, posts })
}

export async function POST(request: Request) {
  const originCheck = enforceSameOrigin(request)
  if (!originCheck.ok) return originCheck.response
  const csrfCheck = validateCsrf(request)
  if (!csrfCheck.ok) return csrfCheck.response

  const ip = getClientIp(request)
  const rl = rateLimit({ key: `prayer-wall:${ip}`, max: 3, windowMs: 60_000 })
  if (!rl.allowed) {
    return NextResponse.json({ ok: false, message: "Too many requests. Please try again." }, { status: 429 })
  }

  let body: any
  try {
    body = await request.json()
  } catch {
    return badRequest("Invalid JSON.")
  }

  const name = normalizeText(body.name) || "Anonymous"
  const requestText = normalizeText(body.request)
  const honeypot = normalizeText(body.website)
  const kindRaw = normalizeText(body.kind).toLowerCase()
  const kind = kindRaw === "testimony" ? "testimony" : "request"

  if (honeypot) return badRequest("Spam detected.")
  if (!requestText || requestText.length < 5) return badRequest("Please write a prayer request.")
  if (name.length > 60) return badRequest("Name is too long.")
  if (requestText.length > 1200) return badRequest("Prayer request is too long.")

  const post = await addPrayerPostV2({ name, request: requestText, kind })
  return NextResponse.json({
    ok: true,
    post: {
      id: post.id,
      name: post.name,
      request: post.request,
      createdAtIso: post.createdAtIso,
      approved: post.approved,
      kind: post.kind,
      prayedCount: post.prayedCount,
    },
  })
}
