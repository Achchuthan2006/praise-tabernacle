"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

import Lang from "@/components/language/Lang"
import { siteConfig } from "@/lib/site"

const STORAGE_KEY = "pt_cookie_consent"

export type Consent = "accepted" | "declined" | "unset"

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

export function setCookieConsent(value: Exclude<Consent, "unset">) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // ignore
  }
  window.dispatchEvent(new Event("pt-consent"))
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
    setCookieConsent(value)
    setConsent(value)
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4">
      <div
        role="dialog"
        aria-live="polite"
        aria-label="Privacy and analytics consent"
        className="mx-auto max-w-5xl rounded-3xl border border-churchBlue/10 bg-white p-5 shadow-glow backdrop-blur sm:p-6"
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-churchBlue/10 bg-churchBlueSoft px-3 py-1 text-xs font-semibold text-churchBlue/80">
                <Lang en="Privacy choices" ta="தனியுரிமை தேர்வுகள்" taClassName="font-tamil" />
              </span>
              <span className="rounded-full border border-churchBlue/10 bg-white px-3 py-1 text-xs font-semibold text-churchBlue/65">
                <Lang en="Optional analytics" ta="விருப்ப பகுப்பாய்வு" taClassName="font-tamil" />
              </span>
            </div>

            <div className="mt-3 text-base font-semibold text-churchBlue">
              <Lang en="Cookies & analytics consent" ta="குக்கீகள் மற்றும் பகுப்பாய்வு ஒப்புதல்" taClassName="font-tamil" />
            </div>

            <p className="mt-2 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
              <Lang
                en="We use one necessary browser preference to remember settings like language, and optional Google Analytics only if you allow it. This helps us understand general site usage and improve the church website."
                ta="மொழி போன்ற அமைப்புகளை நினைவில் வைத்திருக்க தேவையான ஒரு உலாவி விருப்பத்தை மட்டுமே பயன்படுத்துகிறோம். நீங்கள் அனுமதித்தால் மட்டுமே விருப்பமான Google Analytics பயன்படுத்தப்படும். இது தள பயன்பாட்டை பொதுவாகப் புரிந்து கொண்டு சபை இணையதளத்தை மேம்படுத்த உதவுகிறது."
                taClassName="font-tamil"
              />
            </p>

            <div className="mt-3 text-xs leading-relaxed text-churchBlue/60">
              <Lang
                en="You can accept or decline optional analytics now, and you can change this later on the privacy page."
                ta="விருப்பமான பகுப்பாய்வை இப்போது ஏற்கலாம் அல்லது நிராகரிக்கலாம். பின்னர் தனியுரிமை பக்கத்தில் இந்த தேர்வை மாற்றலாம்."
                taClassName="font-tamil"
              />{" "}
              <Link href="/privacy" className="underline underline-offset-2">
                <Lang en="Privacy policy" ta="தனியுரிமைக் கொள்கை" taClassName="font-tamil" />
              </Link>
              .
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
            <button type="button" className="btn btn-sm btn-secondary" onClick={() => set("declined")}>
              <Lang en="Decline analytics" ta="பகுப்பாய்வை நிராகரி" taClassName="font-tamil" />
            </button>
            <button type="button" className="btn btn-sm btn-primary" onClick={() => set("accepted")}>
              <Lang en="Accept analytics" ta="பகுப்பாய்வை ஏற்று" taClassName="font-tamil" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
