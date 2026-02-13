import { randomBytes } from "crypto"

import { siteConfig } from "@/lib/site"

export const CSRF_COOKIE = "pt_csrf"
export const CSRF_HEADER = "x-csrf-token"

export function parseCookies(cookieHeader: string | null) {
  const out: Record<string, string> = {}
  if (!cookieHeader) return out
  for (const part of cookieHeader.split(";")) {
    const [k, ...rest] = part.trim().split("=")
    if (!k) continue
    out[k] = decodeURIComponent(rest.join("=") ?? "")
  }
  return out
}

export function getClientIp(req: Request) {
  const xf = req.headers.get("x-forwarded-for") ?? ""
  const first = xf.split(",")[0]?.trim()
  if (first) return first
  return (req.headers.get("x-real-ip") ?? "").trim()
}

export function allowedOrigins() {
  const out = new Set<string>()
  try {
    const origin = new URL(siteConfig.siteUrl).origin
    if (origin) out.add(origin)
  } catch {
    // ignore
  }

  const env = process.env.ALLOWED_ORIGINS
  if (env) {
    for (const o of env.split(",").map((v) => v.trim()).filter(Boolean)) out.add(o)
  }

  if (process.env.NODE_ENV !== "production") {
    out.add("http://localhost:3000")
    out.add("http://127.0.0.1:3000")
    out.add("http://localhost:3001")
    out.add("http://127.0.0.1:3001")
  }
  return Array.from(out)
}

export function isAllowedOrigin(origin: string) {
  return allowedOrigins().includes(origin)
}

export function enforceSameOrigin(req: Request): { ok: true } | { ok: false; response: Response } {
  const origin = req.headers.get("origin")
  if (origin) {
    if (isAllowedOrigin(origin)) return { ok: true }
    return { ok: false, response: Response.json({ ok: false, message: "Invalid origin." }, { status: 403 }) }
  }

  const secFetchSite = (req.headers.get("sec-fetch-site") ?? "").toLowerCase()
  if (secFetchSite && (secFetchSite === "same-origin" || secFetchSite === "same-site")) return { ok: true }

  // Fallback: allow server-to-server or environments without Origin.
  return { ok: true }
}

export function newCsrfToken() {
  return randomBytes(24).toString("hex")
}

export function validateCsrf(req: Request): { ok: true } | { ok: false; response: Response } {
  const cookies = parseCookies(req.headers.get("cookie"))
  const cookieToken = cookies[CSRF_COOKIE] ?? ""
  const headerToken = req.headers.get(CSRF_HEADER) ?? ""
  if (!cookieToken || !headerToken || cookieToken !== headerToken) {
    return { ok: false, response: Response.json({ ok: false, message: "CSRF check failed." }, { status: 403 }) }
  }
  return { ok: true }
}

export function csrfCookieHeader(token: string) {
  const secure = process.env.NODE_ENV === "production"
  const parts = [
    `${CSRF_COOKIE}=${encodeURIComponent(token)}`,
    "Path=/",
    "SameSite=Lax",
    `Max-Age=${60 * 60 * 24 * 30}`,
  ]
  if (secure) parts.push("Secure")
  return parts.join("; ")
}

