import type { MetadataRoute } from "next"

import { siteConfig } from "@/lib/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.nameEn,
    short_name: siteConfig.nameEn,
    description:
      "Watch services, request prayer, browse events, and stay connected with Praise Tabernacle.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1a2744",
    icons: [
      {
        src: siteConfig.branding.logoEnSrc,
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: siteConfig.branding.logoEnSrc,
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  }
}
