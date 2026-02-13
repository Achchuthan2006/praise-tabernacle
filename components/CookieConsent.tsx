"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

import { siteConfig } from "@/lib/site"

const STORAGE_KEY = "pt_cookie_consent"

type Consent = "accepted" | "declined" | "unset"

function readConsent(): Consent {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY)
    if (v === "accepted" || v === "declined") return v
  } catch {
    // ignore
  }
  return "unset"
}

export function getCookieConsent(): Consent {
  if (typeof window === "undefined") return "unset"
  return readConsent()
}

export default function CookieConsent() {
  const [consent, setConsent] = useState<Consent>("unset")

  useEffect(() => {
    setConsent(readConsent())
  }, [])

  // Only show a banner when analytics is configured (the only non-essential cookie-like storage we use).
  if (!siteConfig.googleAnalyticsId) return null
  if (consent !== "unset") return null

  const set = (value: Exclude<Consent, "unset">) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value)
    } catch {
      // ignore
    }
    window.dispatchEvent(new Event("pt-consent"))
    setConsent(value)
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4">
      <div className="mx-auto max-w-4xl rounded-2xl border border-churchBlue/10 bg-white p-5 shadow-glow backdrop-blur">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="text-sm font-semibold text-churchBlue">Cookies & analytics</div>
            <p className="mt-1 text-sm text-churchBlue/70">
              We use limited analytics to understand site usage and improve content. You can accept or decline.
            </p>
            <div className="mt-2 text-xs text-churchBlue/60">
              <Link href="/privacy" className="underline underline-offset-2">
                Read our privacy policy
              </Link>
              .
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
            <button type="button" className="btn btn-sm btn-secondary" onClick={() => set("declined")}>
              Decline
            </button>
            <button type="button" className="btn btn-sm btn-primary" onClick={() => set("accepted")}>
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
