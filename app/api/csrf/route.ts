import { CSRF_COOKIE, csrfCookieHeader, enforceSameOrigin, newCsrfToken, parseCookies } from "@/lib/requestSecurity"

export const runtime = "nodejs"

export async function GET(req: Request) {
  const originCheck = enforceSameOrigin(req)
  if (!originCheck.ok) return originCheck.response

  const cookies = parseCookies(req.headers.get("cookie"))
  const existing = cookies[CSRF_COOKIE]
  const token = existing || newCsrfToken()
  return new Response(JSON.stringify({ ok: true, token }), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "set-cookie": csrfCookieHeader(token),
    },
  })
}
