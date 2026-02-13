"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import Container from "@/components/ui/Container"
import Reveal from "@/components/ui/Reveal"
import { mediaPhotos } from "@/lib/media"

function bentoClassForIndex(idx: number) {
  if (idx === 0) return "bento-item-1"
  if (idx === 1) return "bento-item-2"
  if (idx === 2) return "bento-item-3"
  if (idx === 3) return "bento-item-4"
  if (idx === 4) return "bento-item-5"
  return ""
}

export default function PhotosMediaSection() {
  const [failed, setFailed] = useState<Record<string, boolean>>({})

  return (
    <section className="border-t border-churchBlue/10 bg-white">
      <Container className="section-padding">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="section-kicker">Photos & Media</div>
                <h2 className="section-heading">A glimpse of church life</h2>
                <p className="mt-2 max-w-2xl text-sm text-churchBlue/70 sm:text-base">
                  Worship, ministries, and community moments from Praise Tabernacle.
                </p>
                <p className="mt-2 max-w-2xl text-xs text-churchBlue/55">
                  Tip: replace these with authentic church photos in `public/photos/` for the best connection with visitors.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 bento-grid">
            {mediaPhotos.slice(0, 6).map((photo, idx) => (
              <Reveal key={`${photo.label}-${idx}`} delay={idx === 0 ? 0 : idx === 1 ? 1 : 2}>
                {photo.href ? (
                  <Link
                    href={photo.href}
                    className={["card group focus-ring rounded-3xl h-full", bentoClassForIndex(idx)].filter(Boolean).join(" ")}
                    aria-label={photo.label}
                  >
                    <div className="image-reveal relative h-full">
                      <Image
                        src={failed[photo.src] && photo.fallbackSrc ? photo.fallbackSrc : photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        quality={85}
                        className="object-cover"
                        onError={() => {
                          if (photo.fallbackSrc) setFailed((m) => ({ ...m, [photo.src]: true }))
                        }}
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.72),rgba(0,0,0,0.08),transparent)]"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-6">
                        <div className="flex items-center justify-between gap-3">
                          <div className="text-sm font-semibold text-white">{photo.label}</div>
                          <span
                            className="text-sm text-white/85 transition-transform group-hover:translate-x-0.5"
                            aria-hidden="true"
                          >
                            {"\u203A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className={["card rounded-3xl h-full", bentoClassForIndex(idx)].filter(Boolean).join(" ")}>
                    <div className="image-reveal relative h-full">
                      <Image
                        src={failed[photo.src] && photo.fallbackSrc ? photo.fallbackSrc : photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        quality={85}
                        className="object-cover"
                        onError={() => {
                          if (photo.fallbackSrc) setFailed((m) => ({ ...m, [photo.src]: true }))
                        }}
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.72),rgba(0,0,0,0.08),transparent)]"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-6">
                        <div className="text-sm font-semibold text-white">{photo.label}</div>
                      </div>
                    </div>
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
