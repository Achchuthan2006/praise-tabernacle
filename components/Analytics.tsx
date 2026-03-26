"use client"

import { usePathname, useSearchParams } from "next/navigation"
import Script from "next/script"
import { useEffect, useMemo, useState } from "react"

import { getCookieConsent } from "@/components/CookieConsent"
import { siteConfig } from "@/lib/site"

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export default function Analytics() {
  const id = siteConfig.googleAnalyticsId
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [consent, setConsent] = useState(() => getCookieConsent())
  const pageLocation = useMemo(() => {
    const query = searchParams?.toString()
    return query ? `${pathname}?${query}` : pathname
  }, [pathname, searchParams])

  useEffect(() => {
    const onChange = () => setConsent(getCookieConsent())
    window.addEventListener("storage", onChange)
    window.addEventListener("pt-consent", onChange as EventListener)
    return () => {
      window.removeEventListener("storage", onChange)
      window.removeEventListener("pt-consent", onChange as EventListener)
    }
  }, [])

  useEffect(() => {
    if (!id || consent !== "accepted") return
    if (typeof window === "undefined" || typeof window.gtag !== "function") return

    window.gtag("event", "page_view", {
      page_path: pageLocation,
      page_title: document.title,
      page_location: `${window.location.origin}${pageLocation}`,
      send_to: id,
    })
  }, [consent, id, pageLocation])

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
            "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}window.gtag = gtag;gtag('js', new Date());gtag('config', '" +
            id +
            "', { anonymize_ip: true, send_page_view: false });",
        }}
      />
    </>
  )
}
