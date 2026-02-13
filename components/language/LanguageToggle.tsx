"use client"

import { useLanguage } from "@/components/language/LanguageProvider"
import type { Language } from "@/lib/i18n"

const options: Array<{ value: Language; label: string }> = [
  { value: "en", label: "EN" },
  { value: "ta", label: "\u0ba4\u0bae\u0bbf\u0bb4\u0bcd" }, // தமிழ்
]

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div
      className="language-toggle inline-flex items-center rounded-full border border-churchBlue/15 bg-churchBlueSoft p-1.5 text-sm text-churchBlue"
      role="group"
      aria-label={language === "ta" ? "மொழி" : "Language"}
    >
      {options.map((opt) => {
        const active = opt.value === language
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setLanguage(opt.value)}
            className={[
              "min-h-11 rounded-full px-3 py-2 transition-colors",
              active
                ? "bg-churchBlue text-white shadow-sm"
                : "text-churchBlue/70 hover:text-churchBlue hover:bg-white",
            ].join(" ")}
            aria-pressed={active}
          >
            <span className={opt.value === "ta" ? "font-tamil" : undefined}>{opt.label}</span>
          </button>
        )
      })}
    </div>
  )
}
