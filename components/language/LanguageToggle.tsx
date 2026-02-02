"use client"

import { useLanguage } from "@/components/language/LanguageProvider"
import type { Language } from "@/lib/i18n"

const options: Array<{ value: Language; label: string }> = [
  { value: "en", label: "EN" },
  { value: "ta", label: "தமிழ்" },
]

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div
      className="inline-flex items-center rounded-full border border-white/25 bg-white/10 p-1 text-sm text-white"
      role="group"
      aria-label="Language"
    >
      {options.map((opt) => {
        const active = opt.value === language
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setLanguage(opt.value)}
            className={[
              "rounded-full px-3 py-1.5 transition-colors",
              active
                ? "bg-white text-churchBlue shadow-sm"
                : "text-white/80 hover:text-white hover:bg-white/10",
            ].join(" ")}
            aria-pressed={active}
          >
            <span className={opt.value === "ta" ? "font-tamil" : undefined}>
              {opt.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
