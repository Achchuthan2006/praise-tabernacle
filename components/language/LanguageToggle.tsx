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
      className="language-toggle inline-flex h-11 items-center overflow-hidden rounded-full border border-churchBlue/10 bg-white p-1 text-sm text-churchBlue shadow-[0_12px_30px_rgb(15_23_42_/_0.08)]"
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
              "inline-flex h-full min-w-[3rem] items-center justify-center rounded-full px-3 py-2 text-sm font-semibold tracking-wide transition-[background-color,color,box-shadow,transform]",
              active
                ? "bg-[#1d284f] text-white shadow-[0_10px_22px_rgb(29_40_79_/_0.24)]"
                : "text-churchBlue/55 hover:bg-[#f5f7ff] hover:text-churchBlue",
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
