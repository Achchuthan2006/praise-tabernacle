"use client"

import dynamic from "next/dynamic"

import type { YouTubeLiteEmbedProps } from "@/components/YouTubeLiteEmbed"

const YouTubeLiteEmbedLazy = dynamic<YouTubeLiteEmbedProps>(() => import("@/components/YouTubeLiteEmbed"), {
  ssr: false,
  loading: () => <div className="h-full w-full skeleton" />,
})

export default YouTubeLiteEmbedLazy

