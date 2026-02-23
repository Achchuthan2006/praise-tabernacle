import type { Metadata, Viewport } from "next"
import { cookies } from "next/headers"
import Script from "next/script"
import type { ReactNode } from "react"

import "@/styles/globals.css"

import ClientEnhancements from "@/components/ClientEnhancements"
import Footer from "@/components/Footer"
import InkTransition from "@/components/InkTransition"
import PageProgressBar from "@/components/PageProgressBar"
import ScrollProgress from "@/components/ScrollProgress"
import SiteHeader from "@/components/SiteHeader"
import ChatWidgetLazy from "@/components/lazy/ChatWidgetLazy"
import FloatingActionsLazy from "@/components/lazy/FloatingActionsLazy"
import { LanguageProvider } from "@/components/language/LanguageProvider"
import { churchJsonLd, websiteJsonLd } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.nameEn} | ${siteConfig.locationShort}`,
    template: `%s | ${siteConfig.nameEn}`,
  },
  description:
    "Praise Tabernacle (\u0ba4\u0bc1\u0ba4\u0bbf\u0baf\u0bbf\u0ba9\u0bcd \u0b95\u0bc2\u0b9f\u0bbe\u0bb0\u0bae\u0bcd) is a welcoming Tamil & English church family \u2014 a Tamil church in Mississauga, Ontario.",
  metadataBase: new URL(siteConfig.siteUrl),
  icons: {
    icon: siteConfig.branding.logoEnSrc,
    apple: siteConfig.branding.logoEnSrc,
  },
  openGraph: {
    type: "website",
    title: `${siteConfig.nameEn} | ${siteConfig.nameTa}`,
    description:
      "A welcoming Tamil & English church family \u2014 a Tamil church in Mississauga. Watch sermons, plan your visit, and connect with us.",
    images: [
      {
        url: siteConfig.branding.logoEnBgSrc,
        width: 1536,
        height: 864,
        alt: `${siteConfig.nameEn} logo`,
      },
    ],
    siteName: siteConfig.nameEn,
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.nameEn} | ${siteConfig.nameTa}`,
    description:
      "A welcoming Tamil & English church family \u2014 a Tamil church in Mississauga. Watch sermons, plan your visit, and connect with us.",
    images: [siteConfig.branding.logoEnBgSrc],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.webmanifest",
}

export const viewport: Viewport = {
  themeColor: "#121A35",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const churchSchema = churchJsonLd()
  const websiteSchema = websiteJsonLd()
  const cookieLang = (await cookies()).get("pt_lang")?.value
  const initialLang = cookieLang === "ta" ? "ta" : "en"

  return (
    <html
      lang={initialLang === "ta" ? "ta" : "en"}
      className={[
        "h-full scroll-smooth",
        initialLang === "ta" ? "lang-ta" : "lang-en",
      ].join(" ")}
      suppressHydrationWarning
      data-arp=""
    >
      <head>
        <Script
          id="schema-org-church"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(churchSchema) }}
        />
        <Script
          id="schema-org-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full bg-churchBlueSoft text-churchBlue antialiased"
      >
        <LanguageProvider initialLanguage={initialLang}>
          <div className="relative flex min-h-dvh flex-col">
            <PageProgressBar />
            <ScrollProgress />
            <InkTransition />
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-churchBlue focus:shadow-glow focus-ring"
            >
              Skip to content
            </a>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_40rem_at_50%_-20%,rgb(var(--stage-purple)_/_0.14),transparent_60%),radial-gradient(40rem_30rem_at_90%_20%,rgb(var(--stage-blue)_/_0.10),transparent_55%)]"
            />
            <SiteHeader />
            <main id="main-content" className="relative flex-1">
              {children}
            </main>
            <Footer />
            <ChatWidgetLazy />
            <FloatingActionsLazy />
            <ClientEnhancements />
          </div>
        </LanguageProvider>
      </body>
    </html>
  )
}
