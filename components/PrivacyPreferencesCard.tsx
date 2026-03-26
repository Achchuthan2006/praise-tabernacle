"use client"

import { useEffect, useState } from "react"

import Lang from "@/components/language/Lang"
import { getCookieConsent, setCookieConsent, type Consent } from "@/components/CookieConsent"
import { siteConfig } from "@/lib/site"

export default function PrivacyPreferencesCard() {
  const [consent, setConsent] = useState<Consent>("unset")

  useEffect(() => {
    setConsent(getCookieConsent())

    const sync = () => setConsent(getCookieConsent())
    window.addEventListener("storage", sync)
    window.addEventListener("pt-consent", sync as EventListener)
    return () => {
      window.removeEventListener("storage", sync)
      window.removeEventListener("pt-consent", sync as EventListener)
    }
  }, [])

  if (!siteConfig.googleAnalyticsId) return null

  const statusLabel =
    consent === "accepted"
      ? { en: "Optional analytics are enabled.", ta: "விருப்பமான பகுப்பாய்வு இயக்கப்பட்டுள்ளது." }
      : consent === "declined"
        ? { en: "Optional analytics are disabled.", ta: "விருப்பமான பகுப்பாய்வு முடக்கப்பட்டுள்ளது." }
        : { en: "You have not chosen an analytics preference yet.", ta: "நீங்கள் இன்னும் பகுப்பாய்வு தேர்வை செய்யவில்லை." }

  return (
    <div className="rounded-3xl border border-churchBlue/10 bg-churchBlueSoft/40 p-6 shadow-glow">
      <div className="text-lg font-semibold tracking-tight text-churchBlue">
        <Lang en="Privacy preferences" ta="தனியுரிமை விருப்பங்கள்" taClassName="font-tamil" />
      </div>
      <p className="mt-2 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
        <Lang
          en="Manage your optional analytics choice here. Necessary site preferences such as language selection may still be stored so the website works properly."
          ta="உங்கள் விருப்பமான பகுப்பாய்வு தேர்வை இங்கே நிர்வகிக்கலாம். இணையதளம் சரியாக செயல்பட மொழித் தேர்வு போன்ற அவசியமான தள விருப்பங்கள் இன்னும் சேமிக்கப்படலாம்."
          taClassName="font-tamil"
        />
      </p>

      <div className="mt-4 rounded-2xl border border-churchBlue/10 bg-white px-4 py-3 text-sm font-semibold text-churchBlue/80">
        <Lang en={statusLabel.en} ta={statusLabel.ta} taClassName="font-tamil" />
      </div>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={() => {
            setCookieConsent("accepted")
            setConsent("accepted")
          }}
        >
          <Lang en="Accept analytics" ta="பகுப்பாய்வை ஏற்று" taClassName="font-tamil" />
        </button>
        <button
          type="button"
          className="btn btn-sm btn-secondary"
          onClick={() => {
            setCookieConsent("declined")
            setConsent("declined")
          }}
        >
          <Lang en="Decline analytics" ta="பகுப்பாய்வை நிராகரி" taClassName="font-tamil" />
        </button>
      </div>
    </div>
  )
}
