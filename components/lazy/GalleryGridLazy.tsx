"use client"

import dynamic from "next/dynamic"

import type { GalleryGridProps } from "@/components/GalleryGrid"

const GalleryGridLazy = dynamic<GalleryGridProps>(() => import("@/components/GalleryGrid"), {
  ssr: false,
  loading: () => (
    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div key={idx} className="skeleton aspect-video w-full rounded-2xl" />
      ))}
    </div>
  ),
})

export default GalleryGridLazy

