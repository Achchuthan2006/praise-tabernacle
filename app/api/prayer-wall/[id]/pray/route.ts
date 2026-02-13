import { NextRequest, NextResponse } from "next/server"

import { incrementPrayerPostPrayedCount, listApprovedPrayerPosts } from "@/lib/prayerWallStore"
import { rateLimit } from "@/lib/rateLimit"
import { enforceSameOrigin, getClientIp, validateCsrf } from "@/lib/requestSecurity"

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const originCheck = enforceSameOrigin(request)
  if (!originCheck.ok) return originCheck.response
  const csrfCheck = validateCsrf(request)
  if (!csrfCheck.ok) return csrfCheck.response

  const { id: rawId } = await context.params
  const id = String(rawId ?? "").trim()
  if (!id) return NextResponse.json({ ok: false, message: "Missing id." }, { status: 400 })

  // Only allow "pray" actions for approved posts.
  const approved = await listApprovedPrayerPosts()
  if (!approved.some((p) => p.id === id)) {
    return NextResponse.json({ ok: false, message: "Not found." }, { status: 404 })
  }

  const ip = getClientIp(request)
  const rl = rateLimit({ key: `pray:${ip}:${id}`, max: 2, windowMs: 60 * 60_000 })
  if (!rl.allowed) {
    return NextResponse.json({ ok: false, message: "Too many requests. Please try again." }, { status: 429 })
  }

  const count = await incrementPrayerPostPrayedCount(id)
  if (count === null) return NextResponse.json({ ok: false, message: "Not found." }, { status: 404 })

  return NextResponse.json({ ok: true, prayedCount: count })
}
