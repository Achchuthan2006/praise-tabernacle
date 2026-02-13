"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"

import Lang from "@/components/language/Lang"
import HolographicText from "@/components/HolographicText"
import Container from "@/components/ui/Container"
import Reveal from "@/components/ui/Reveal"
import Spotlight from "@/components/ui/Spotlight"
import type { FeaturedCta } from "@/lib/featured"
import { getFeaturedSlides } from "@/lib/featured"

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = () => setReduced(Boolean(mql.matches))
    onChange()
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return reduced
}

function CtaButton({ cta }: { cta: FeaturedCta }) {
  const variant = cta.variant ?? "secondary"
  const className =
    variant === "primary"
      ? "btn btn-sm btn-primary"
      : variant === "secondary-soft"
        ? "btn btn-sm btn-secondary-soft"
        : "btn btn-sm btn-secondary"

  const isExternal = /^https?:\/\//i.test(cta.href)
  if (isExternal) {
    return (
      <a href={cta.href} target="_blank" rel="noreferrer" className={className}>
        <Lang en={cta.labelEn} ta={cta.labelTa} taClassName="font-tamil" />
      </a>
    )
  }

  return (
    <Link href={cta.href} className={className}>
      <Lang en={cta.labelEn} ta={cta.labelTa} taClassName="font-tamil" />
    </Link>
  )
}

export default function FeaturedBanner() {
  const slides = useMemo(() => getFeaturedSlides(), [])
  const [index, setIndex] = useState(0)
  const prefersReducedMotion = usePrefersReducedMotion()
  const pausedRef = useRef(false)

  const count = slides.length
  const current = slides[index] ?? null

  useEffect(() => {
    if (prefersReducedMotion) return
    if (count <= 1) return

    const id = window.setInterval(() => {
      if (pausedRef.current) return
      setIndex((i) => (i + 1) % count)
    }, 6500)

    return () => window.clearInterval(id)
  }, [count, prefersReducedMotion])

  useEffect(() => {
    if (index >= count) setIndex(0)
  }, [count, index])

  if (!current) return null

  const prev = () => setIndex((i) => (i - 1 + count) % count)
  const next = () => setIndex((i) => (i + 1) % count)

  return (
    <section className="bg-white">
      <Container className="pb-10 sm:pb-14">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Spotlight
              className="rounded-3xl border border-churchBlue/10 bg-white shadow-glow overflow-hidden"
              role="region"
              aria-roledescription="carousel"
              aria-label="Featured"
              onMouseEnter={() => {
                pausedRef.current = true
              }}
              onMouseLeave={() => {
                pausedRef.current = false
              }}
              onFocusCapture={() => {
                pausedRef.current = true
              }}
              onBlurCapture={() => {
                pausedRef.current = false
              }}
            >
              <div className="grid gap-0 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <div className="relative aspect-[16/10] w-full bg-churchBlueSoft">
                    {current.imageSrc ? (
                      <Image
                        src={current.imageSrc}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover"
                        priority={false}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[radial-gradient(30rem_18rem_at_10%_0%,rgba(255,255,255,0.35),transparent_60%),radial-gradient(24rem_16rem_at_90%_90%,rgba(var(--accent-gold),0.18),transparent_60%)]" />
                    )}
                    <div
                      className="absolute inset-0 bg-[linear-gradient(90deg,rgba(26,39,68,0.0),rgba(26,39,68,0.12))]"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className="p-7 sm:p-10">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="section-kicker">
                          <Lang en={current.kickerEn} ta={current.kickerTa} taClassName="font-tamil" />
                        </div>
                        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-churchBlue sm:text-3xl">
                          <Lang
                            en={<HolographicText text={current.titleEn} />}
                            ta={<HolographicText text={current.titleTa} className="font-tamil" />}
                            taClassName="font-tamil"
                          />
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                          <Lang
                            en={current.descriptionEn}
                            ta={current.descriptionTa}
                            taClassName="font-tamil"
                          />
                        </p>
                      </div>

                      {count > 1 ? (
                        <div className="hidden sm:flex items-center gap-2">
                          <button
                            type="button"
                            className="btn btn-sm btn-secondary"
                            onClick={prev}
                            aria-label="Previous"
                          >
                            ‹
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-secondary"
                            onClick={next}
                            aria-label="Next"
                          >
                            ›
                          </button>
                        </div>
                      ) : null}
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-2">
                      {current.ctas.map((cta) => (
                        <CtaButton key={`${current.id}:${cta.href}:${cta.labelEn}`} cta={cta} />
                      ))}
                    </div>

                    {count > 1 ? (
                      <div className="mt-6 flex items-center justify-between gap-3">
                        <div className="flex flex-wrap gap-2" aria-label="Slides">
                          {slides.map((s, i) => (
                            <button
                              key={s.id}
                              type="button"
                              className={[
                                "h-2.5 w-2.5 rounded-full transition",
                                i === index ? "bg-churchBlue" : "bg-churchBlue/25 hover:bg-churchBlue/40",
                              ].join(" ")}
                              onClick={() => setIndex(i)}
                              aria-label={`Go to slide ${i + 1}`}
                              aria-current={i === index ? "true" : undefined}
                            />
                          ))}
                        </div>
                        <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                          {index + 1}/{count}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </Spotlight>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
