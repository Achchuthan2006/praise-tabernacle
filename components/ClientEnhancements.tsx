"use client"

import dynamic from "next/dynamic"

const RouteProgress = dynamic(() => import("@/components/RouteProgress"), { ssr: false })
const CookieConsent = dynamic(() => import("@/components/CookieConsent"), { ssr: false })
const Analytics = dynamic(() => import("@/components/Analytics"), { ssr: false })
const ServiceWorkerRegister = dynamic(() => import("@/components/ServiceWorkerRegister"), { ssr: false })
const SectionEntranceObserver = dynamic(() => import("@/components/SectionEntranceObserver"), { ssr: false })

const isProduction = process.env.NODE_ENV === "production"

export default function ClientEnhancements() {
  return (
    <>
      <RouteProgress />
      {isProduction ? <CookieConsent /> : null}
      {isProduction ? <Analytics /> : null}
      {isProduction ? <ServiceWorkerRegister /> : null}
      {isProduction ? <SectionEntranceObserver /> : null}
    </>
  )
}
