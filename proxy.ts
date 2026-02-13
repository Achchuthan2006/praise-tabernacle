import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

const LANGUAGE_COOKIE = "pt_lang"
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365

function isSupportedLanguage(value: string | undefined): value is "en" | "ta" {
  return value === "en" || value === "ta"
}

function pickLanguageFromAcceptLanguage(headerValue: string | null): "en" | "ta" {
  const header = headerValue ?? ""
  const tokens = header.split(",").map((t) => t.trim().toLowerCase())
  return tokens.some((t) => t === "ta" || t.startsWith("ta-")) ? "ta" : "en"
}

function isHtmlNavigation(request: NextRequest) {
  if (request.method !== "GET") return false
  const accept = request.headers.get("accept") ?? ""
  return accept.includes("text/html")
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const segments = pathname.split("/").filter(Boolean)
  const prefix = segments[0]

  const cookieLang = request.cookies.get(LANGUAGE_COOKIE)?.value
  const hasCookieLang = isSupportedLanguage(cookieLang)

  // Handle language-prefixed URLs like /en/about or /ta/about by rewriting
  // to the underlying route and persisting the language choice in a cookie.
  if (prefix === "en" || prefix === "ta") {
    const lang = prefix
    const url = request.nextUrl.clone()
    url.pathname = `/${segments.slice(1).join("/")}`
    if (url.pathname === "/") url.pathname = "/"

    const response = NextResponse.rewrite(url)
    response.cookies.set(LANGUAGE_COOKIE, lang, {
      path: "/",
      maxAge: ONE_YEAR_SECONDS,
      sameSite: "lax",
    })
    return response
  }

  // If no language cookie exists, infer a default from the browser and set it.
  // Only redirect the home page so deep links keep working unchanged.
  if (!hasCookieLang) {
    const lang = pickLanguageFromAcceptLanguage(request.headers.get("accept-language"))

    if (pathname === "/" && isHtmlNavigation(request)) {
      const url = request.nextUrl.clone()
      url.pathname = `/${lang}`
      const response = NextResponse.redirect(url)
      response.cookies.set(LANGUAGE_COOKIE, lang, {
        path: "/",
        maxAge: ONE_YEAR_SECONDS,
        sameSite: "lax",
      })
      return response
    }

    const response = NextResponse.next()
    response.cookies.set(LANGUAGE_COOKIE, lang, {
      path: "/",
      maxAge: ONE_YEAR_SECONDS,
      sameSite: "lax",
    })
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
