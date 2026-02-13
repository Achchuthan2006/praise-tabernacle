"use client"

import dynamic from "next/dynamic"

import LazyMount from "@/components/LazyMount"

const PhotosMediaSection = dynamic(() => import("@/components/PhotosMediaSection"), {
  ssr: false,
  loading: () => (
    <div className="border-t border-churchBlue/10 bg-white">
      <div className="section-padding" />
    </div>
  ),
})

export default function PhotosMediaLazy() {
  return (
    <LazyMount
      fallback={
        <div className="border-t border-churchBlue/10 bg-white">
          <div className="section-padding" />
        </div>
      }
    >
      <PhotosMediaSection />
    </LazyMount>
  )
}

