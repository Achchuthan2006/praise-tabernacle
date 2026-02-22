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
      className="language-toggle inline-flex items-center overflow-hidden rounded-full border border-white/40 bg-white/8 p-1 text-sm text-white shadow-[0_8px_24px_rgb(0_0_0_/_0.2)] backdrop-blur-md"
      role="group"
      aria-label={language === "ta" ? "\u0bae\u0bca\u0bb4\u0bbf" : "Language"}
    >
      {options.map((opt) => {
        const active = opt.value === language
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setLanguage(opt.value)}
            className={[
              "min-h-11 min-w-[3.1rem] rounded-full px-3 py-2 text-sm font-semibold tracking-wide transition-[background-color,color,box-shadow,transform]",
              active
                ? "bg-white text-churchBlue shadow-[0_8px_20px_rgb(255_255_255_/_0.35)]"
                : "text-white/80 hover:bg-white/15 hover:text-white",
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
