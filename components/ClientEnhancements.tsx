"use client"

import dynamic from "next/dynamic"

const RouteProgress = dynamic(() => import("@/components/RouteProgress"), { ssr: false })
const ScrollProgress = dynamic(() => import("@/components/ScrollProgress"), { ssr: false })
const CookieConsent = dynamic(() => import("@/components/CookieConsent"), { ssr: false })
const Analytics = dynamic(() => import("@/components/Analytics"), { ssr: false })
const ServiceWorkerRegister = dynamic(() => import("@/components/ServiceWorkerRegister"), { ssr: false })

export default function ClientEnhancements() {
  return (
    <>
      <RouteProgress />
      <ScrollProgress />
      <CookieConsent />
      <Analytics />
      <ServiceWorkerRegister />
    </>
  )
}
