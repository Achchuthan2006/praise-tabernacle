import type { Metadata } from "next"
import { Inter, Noto_Sans_Tamil } from "next/font/google"
import type { ReactNode } from "react"

import "@/styles/globals.css"

import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { LanguageProvider } from "@/components/language/LanguageProvider"
import { siteConfig } from "@/lib/site"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
})

const notoTamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  display: "swap",
  variable: "--font-tamil",
})

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.nameEn} | ${siteConfig.locationShort}`,
    template: `%s | ${siteConfig.nameEn}`,
  },
  description:
    "Praise Tabernacle (துதியின் கூடாரம்) is a welcoming Tamil & English church family in Mississauga, Ontario.",
  metadataBase: new URL(siteConfig.siteUrl),
  openGraph: {
    type: "website",
    title: `${siteConfig.nameEn} | ${siteConfig.nameTa}`,
    description:
      "A welcoming Tamil & English church family in Mississauga. Watch sermons, plan your visit, and connect with us.",
    siteName: siteConfig.nameEn,
    locale: "en_CA",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body
        className={`${inter.variable} ${notoTamil.variable} min-h-full bg-churchBlueSoft text-churchBlue antialiased`}
      >
        <LanguageProvider>
          <div className="relative flex min-h-dvh flex-col">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_40rem_at_50%_-20%,rgb(10_29_92_/0.12),transparent_60%),radial-gradient(40rem_30rem_at_90%_20%,rgb(30_58_138_/0.10),transparent_55%)]"
            />
            <Navbar />
            <main className="relative flex-1">{children}</main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  )
}

