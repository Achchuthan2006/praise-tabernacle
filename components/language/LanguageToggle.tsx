"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { useLanguage } from "@/components/language/LanguageProvider"
import { localizePath, type Language } from "@/lib/language"

const options: Array<{ value: Language; label: string; title: string; ariaLabel: string }> = [
  { value: "en", label: "EN", title: "English", ariaLabel: "Switch to English" },
  { value: "ta", label: "à®¤à®®à®¿à®´à¯", title: "Tamil", ariaLabel: "Switch to Tamil" },
]

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPath = `${pathname || "/"}${searchParams.size ? `?${searchParams.toString()}` : ""}`

  return (
    <div
      className="language-toggle inline-flex h-11 items-center overflow-hidden rounded-full border border-white/55 bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(243,246,255,0.62))] p-1 text-sm text-churchBlue shadow-[0_16px_30px_rgb(15_23_42_/_0.1)] backdrop-blur"
      role="group"
      aria-label={language === "ta" ? "à®®à¯Šà®´à®¿" : "Language"}
    >
      {options.map((opt) => {
        const active = opt.value === language
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => {
              setLanguage(opt.value)
              router.replace(localizePath(currentPath, opt.value))
            }}
            className={[
              "inline-flex h-full min-w-[3rem] items-center justify-center rounded-full px-3 py-2 text-sm font-semibold tracking-wide transition-[background-color,color,box-shadow,transform]",
              active
                ? "bg-[#1d284f] text-white shadow-[0_10px_22px_rgb(29_40_79_/_0.24)]"
                : "text-churchBlue/55 hover:bg-white/80 hover:text-churchBlue",
            ].join(" ")}
            aria-pressed={active}
            aria-label={opt.ariaLabel}
            title={opt.title}
          >
            <span className={opt.value === "ta" ? "font-tamil" : undefined}>{opt.label}</span>
          </button>
        )
      })}
    </div>
  )
}
