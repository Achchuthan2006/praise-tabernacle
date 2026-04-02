"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ComponentProps } from "react"

import { useLanguage } from "@/components/language/LanguageProvider"
import { localizePath } from "@/lib/language"

type LocalizedLinkProps = ComponentProps<typeof Link> & {
  disableLocalization?: boolean
}

function shouldLocalizeHref(href: string) {
  return href.startsWith("/") && !href.startsWith("//")
}

export default function LocalizedLink({
  href,
  disableLocalization = false,
  ...props
}: LocalizedLinkProps) {
  const { language } = useLanguage()
  const pathname = usePathname()
  const currentLanguage = pathname?.startsWith("/ta") ? "ta" : pathname?.startsWith("/en") ? "en" : language

  const localizedHref =
    typeof href === "string" && !disableLocalization && shouldLocalizeHref(href)
      ? localizePath(href, currentLanguage)
      : href

  return <Link href={localizedHref} {...props} />
}
