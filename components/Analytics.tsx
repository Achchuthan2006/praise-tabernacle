"use client"

import Script from "next/script"
import { useEffect, useState } from "react"

import { getCookieConsent } from "@/components/CookieConsent"
import { siteConfig } from "@/lib/site"

export default function Analytics() {
  const id = siteConfig.googleAnalyticsId
  const [consent, setConsent] = useState(() => getCookieConsent())

  useEffect(() => {
    const onChange = () => setConsent(getCookieConsent())
    window.addEventListener("storage", onChange)
    window.addEventListener("pt-consent", onChange as EventListener)
    return () => {
      window.removeEventListener("storage", onChange)
      window.removeEventListener("pt-consent", onChange as EventListener)
    }
  }, [])

  if (!id) return null
  if (consent !== "accepted") return null

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html:
            "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '" +
            id +
            "');",
        }}
      />
    </>
  )
}
