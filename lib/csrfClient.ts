"use client"

import { CSRF_COOKIE, CSRF_HEADER } from "@/lib/requestSecurity"

function readCookie(name: string) {
  if (typeof document === "undefined") return ""
  const parts = document.cookie.split(";").map((p) => p.trim())
  for (const part of parts) {
    if (!part.startsWith(`${name}=`)) continue
    return decodeURIComponent(part.slice(name.length + 1))
  }
  return ""
}

export function getCsrfToken() {
  return readCookie(CSRF_COOKIE)
}

export async function ensureCsrfToken() {
  const existing = getCsrfToken()
  if (existing) return existing
  const res = await fetch("/api/csrf", { method: "GET", credentials: "same-origin" })
  const json = (await res.json()) as { ok?: boolean; token?: string }
  return (json.ok && json.token) || getCsrfToken()
}

export async function csrfHeaders(extra?: Record<string, string>) {
  const token = await ensureCsrfToken()
  return { ...(extra ?? {}), [CSRF_HEADER]: token }
}

