"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from "react"

import type { Language } from "@/lib/i18n"
import { DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY, isLanguage } from "@/lib/i18n"

function readCookieLanguage(): Language | null {
  if (typeof document === "undefined") return null
  const raw = document.cookie ?? ""
  const parts = raw.split(";").map((p) => p.trim())
  const hit = parts.find((p) => p.startsWith(`${LANGUAGE_STORAGE_KEY}=`))
  if (!hit) return null
  const value = decodeURIComponent(hit.split("=").slice(1).join("="))
  return isLanguage(value) ? value : null
}

function inferBrowserLanguage(): Language {
  if (typeof navigator === "undefined") return DEFAULT_LANGUAGE
  const langs = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language]).filter(Boolean)
  return langs.some((l) => l.toLowerCase().startsWith("ta")) ? "ta" : "en"
}

function writeLanguageCookie(lang: Language) {
  if (typeof document === "undefined") return
  const maxAge = 60 * 60 * 24 * 365
  document.cookie = `${LANGUAGE_STORAGE_KEY}=${encodeURIComponent(lang)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`
}

type LanguageContextValue = {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({
  children,
  initialLanguage,
}: {
  children: React.ReactNode
  initialLanguage?: Language
}) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Keep SSR + first client render aligned by honoring `initialLanguage`.
    // If we have an `initialLanguage`, use it for the very first client render too,
    // then reconcile to any saved preference after hydration.
    if (initialLanguage) return initialLanguage
    if (typeof window === "undefined") return DEFAULT_LANGUAGE

    try {
      const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
      if (stored && isLanguage(stored)) return stored
    } catch {
      // Ignore storage issues (private mode / blocked storage).
    }

    const cookieLang = readCookieLanguage()
    if (cookieLang) return cookieLang

    return initialLanguage ?? inferBrowserLanguage()
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle("lang-en", language === "en")
    root.classList.toggle("lang-ta", language === "ta")
    root.setAttribute("lang", language === "ta" ? "ta" : "en")
  }, [language])

  useEffect(() => {
    // After hydration, reconcile with any stronger client preference.
    // This avoids hydration mismatches while still respecting saved choices.
    const cookieLang = readCookieLanguage()
    let desired: Language | null = cookieLang

    try {
      const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
      if (stored && isLanguage(stored)) desired = stored
    } catch {
      // Ignore storage issues.
    }

    if (!desired) desired = inferBrowserLanguage()

    if (desired && desired !== language) {
      setLanguageState(desired)
    }
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang)
    } catch {
      // Ignore storage issues.
    }
    writeLanguageCookie(lang)
  }

  const value = useMemo(() => ({ language, setLanguage }), [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error("useLanguage must be used within <LanguageProvider />")
  }
  return ctx
}
