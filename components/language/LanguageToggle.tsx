"use client"

import { useLanguage } from "@/components/language/LanguageProvider"
import type { Language } from "@/lib/i18n"

const options: Array<{ value: Language; label: string }> = [
  { value: "en", label: "EN" },
  { value: "ta", label: "\u0ba4\u0bae\u0bbf\u0bb4\u0bcd" }, // ?????
]

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div
      className="language-toggle inline-flex items-center overflow-hidden rounded-full border border-white/35 bg-white/10 p-1 text-sm text-white backdrop-blur-sm"
      role="group"
      aria-label={language === "ta" ? "????" : "Language"}
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
                ? "bg-white text-churchBlue shadow-sm"
                : "text-white/85 hover:bg-white/15 hover:text-white",
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
