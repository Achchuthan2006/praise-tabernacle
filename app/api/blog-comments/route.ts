import { NextResponse } from "next/server"

import { getBlogPostBySlug } from "@/lib/blog"
import { addComment, listApprovedComments } from "@/lib/blogCommentsStore"
import { rateLimit } from "@/lib/rateLimit"
import { enforceSameOrigin, getClientIp, validateCsrf } from "@/lib/requestSecurity"

function badRequest(message: string) {
  return NextResponse.json({ ok: false, message }, { status: 400 })
}

function normalizeText(value: unknown) {
  return String(value ?? "").trim()
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const postSlug = normalizeText(url.searchParams.get("post"))
  if (!postSlug) return badRequest("Missing post.")
  const post = getBlogPostBySlug(postSlug)
  if (!post) return badRequest("Post not found.")

  const comments = await listApprovedComments(postSlug)
  return NextResponse.json({ ok: true, comments })
}

export async function POST(request: Request) {
  const originCheck = enforceSameOrigin(request)
  if (!originCheck.ok) return originCheck.response
  const csrfCheck = validateCsrf(request)
  if (!csrfCheck.ok) return csrfCheck.response

  const ip = getClientIp(request)
  const rl = rateLimit({ key: `blog-comments:${ip}`, max: 5, windowMs: 60_000 })
  if (!rl.allowed) {
    return NextResponse.json({ ok: false, message: "Too many requests. Please try again." }, { status: 429 })
  }

  let body: any
  try {
    body = await request.json()
  } catch {
    return badRequest("Invalid JSON.")
  }

  const postSlug = normalizeText(body.postSlug)
  const name = normalizeText(body.name)
  const message = normalizeText(body.message)
  const honeypot = normalizeText(body.website)

  if (honeypot) return badRequest("Spam detected.")
  if (!postSlug) return badRequest("Missing post.")
  if (!name || name.length < 2) return badRequest("Please enter your name.")
  if (!message || message.length < 3) return badRequest("Please enter a comment.")
  if (name.length > 60) return badRequest("Name is too long.")
  if (message.length > 1200) return badRequest("Comment is too long.")

  const post = getBlogPostBySlug(postSlug)
  if (!post) return badRequest("Post not found.")

  const comment = await addComment({ postSlug, name, message })
  return NextResponse.json({ ok: true, comment })
}
