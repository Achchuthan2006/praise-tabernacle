"use client"

import { useMemo } from "react"

import Lang from "@/components/language/Lang"
import { useLanguage } from "@/components/language/LanguageProvider"

export default function ServeEmailLink({
  email,
  titleEn,
  titleTa,
  className,
}: {
  email: string
  titleEn: string
  titleTa: string
  className?: string
}) {
  const { language } = useLanguage()

  const href = useMemo(() => {
    const subject = language === "ta" ? `சேவை: ${titleTa}` : `Serve: ${titleEn}`
    return `mailto:${email}?subject=${encodeURIComponent(subject)}`
  }, [email, language, titleEn, titleTa])

  return (
    <a href={href} className={className}>
      <Lang en="Email to serve" ta="சேவைக்காக மின்னஞ்சல்" taClassName="font-tamil" />
    </a>
  )
}
