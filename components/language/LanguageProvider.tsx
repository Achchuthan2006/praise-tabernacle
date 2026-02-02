"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from "react"

import type { Language } from "@/lib/i18n"
import { DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY, isLanguage } from "@/lib/i18n"

type LanguageContextValue = {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
      if (stored && isLanguage(stored)) setLanguageState(stored)
    } catch {
      // Ignore storage issues (private mode / blocked storage).
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang)
    } catch {
      // Ignore storage issues.
    }
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

