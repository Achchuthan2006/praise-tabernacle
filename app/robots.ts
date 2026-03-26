import type { MetadataRoute } from "next"

import { siteConfig } from "@/lib/site"

export default function robots(): MetadataRoute.Robots {
  const isProduction =
    process.env.NODE_ENV === "production" &&
    !siteConfig.siteUrl.includes("localhost") &&
    !siteConfig.siteUrl.includes("127.0.0.1")

  if (!isProduction) {
    return {
      rules: [
        {
          userAgent: "*",
          disallow: "/",
        },
      ],
    }
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/drafts/"],
      },
    ],
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  }
}
