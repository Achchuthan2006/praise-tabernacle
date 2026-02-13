import { NextResponse } from "next/server"

import { approvePrayerPost, deletePrayerPost } from "@/lib/prayerWallStore"

function badRequest(message: string) {
  return NextResponse.json({ ok: false, message }, { status: 400 })
}

export async function POST(request: Request) {
  const secret = process.env.PRAYER_WALL_ADMIN_SECRET
  const provided = request.headers.get("x-admin-secret") ?? ""
  if (!secret || provided !== secret) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 })
  }

  let body: any
  try {
    body = await request.json()
  } catch {
    return badRequest("Invalid JSON.")
  }

  const action = String(body.action ?? "")
  const id = String(body.id ?? "").trim()
  if (!id) return badRequest("Missing id.")

  if (action === "approve") {
    const ok = await approvePrayerPost(id)
    return NextResponse.json({ ok })
  }

  if (action === "delete") {
    const ok = await deletePrayerPost(id)
    return NextResponse.json({ ok })
  }

  return badRequest("Unknown action.")
}

