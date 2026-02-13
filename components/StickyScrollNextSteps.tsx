"use client"

import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"

import Lang from "@/components/language/Lang"
import { useLanguage } from "@/components/language/LanguageProvider"
import Container from "@/components/ui/Container"
import Reveal from "@/components/ui/Reveal"

type Step = {
  id: string
  titleEn: string
  titleTa: string
  bodyEn: string
  bodyTa: string
  ctaHref: string
  ctaEn: string
  ctaTa: string
}

export default function StickyScrollNextSteps() {
  const { language } = useLanguage()

  const steps: Step[] = useMemo(
    () => [
      {
        id: "visit",
        titleEn: "Plan your first visit",
        titleTa: "முதல் வருகையை திட்டமிடுங்கள்",
        bodyEn: "Service times, parking, kids check-in, and what to expect—everything in one place.",
        bodyTa: "ஆராதனை நேரம், பார்க்கிங், குழந்தைகள் check-in, என்ன எதிர்பார்க்கலாம்—அனைத்தும் ஒரே இடத்தில்.",
        ctaHref: "/im-new",
        ctaEn: "I’m new",
        ctaTa: "நான் புதியவர்",
      },
      {
        id: "watch",
        titleEn: "Watch online this week",
        titleTa: "இந்த வாரம் ஆன்லைனில் பாருங்கள்",
        bodyEn: "Catch up on the latest sermons and highlights, then join us in person.",
        bodyTa: "சமீபத்திய பிரசங்கங்கள் மற்றும் highlights-ஐ பார்த்து, பிறகு நேரில் சேருங்கள்.",
        ctaHref: "/watch",
        ctaEn: "Watch",
        ctaTa: "பாருங்கள்",
      },
      {
        id: "connect",
        titleEn: "Get connected",
        titleTa: "இணைந்து கொள்ளுங்கள்",
        bodyEn: "Find a group, serve on a team, or explore ministries for every age.",
        bodyTa: "குழு, சேவை குழு, அல்லது அனைத்து வயதுக்கும் ministries-ஐ அறிந்து கொள்ளுங்கள்.",
        ctaHref: "/groups",
        ctaEn: "Groups",
        ctaTa: "குழுக்கள்",
      },
    ],
    [],
  )

  const [activeId, setActiveId] = useState<string>(steps[0]?.id ?? "")
  const stepRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    const prefersReducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
    if (prefersReducedMotion) return

    const els = steps
      .map((s) => stepRefs.current[s.id])
      .filter((el): el is HTMLDivElement => Boolean(el))

    if (!els.length) return

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0]
        if (!visible?.target) return
        const id = (visible.target as HTMLElement).dataset.stepid ?? ""
        if (!id) return
        setActiveId(id)
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0.1, 0.25, 0.5, 0.75] },
    )

    for (const el of els) io.observe(el)
    return () => io.disconnect()
  }, [steps])

  const active = steps.find((s) => s.id === activeId) ?? steps[0]

  return (
    <section className="border-t border-churchBlue/10 bg-white">
      <Container className="section-padding">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="section-kicker">
              <Lang en="Next steps" ta="அடுத்த படிகள்" taClassName="font-tamil" />
            </div>
            <h2 className="section-heading mt-2">
              <Lang en="A simple journey" ta="எளிய பயணம்" taClassName="font-tamil" />
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-churchBlue/70 sm:text-base">
              <Lang
                en="Scroll to explore what to do next—visit, watch, and get connected."
                ta="ஸ்க்ரோல் செய்து அடுத்ததாக என்ன செய்யலாம் என்பதைப் பாருங்கள்—வருகை, பார்வை, இணைவு."
                taClassName="font-tamil"
              />
            </p>
          </Reveal>

          <div className="sticky-scroll-container mt-10">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <div className="sticky-content">
                  <div className="card w-full overflow-hidden rounded-3xl">
                    <div className="card-content p-8">
                      <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                        {language === "ta" ? "இப்போது" : "Now"}
                      </div>
                      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-churchBlue">
                        <Lang en={active.titleEn} ta={active.titleTa} taClassName="font-tamil" />
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                        <Lang en={active.bodyEn} ta={active.bodyTa} taClassName="font-tamil" />
                      </p>
                      <div className="mt-6">
                        <Link href={active.ctaHref} className="btn btn-md btn-primary">
                          <Lang en={active.ctaEn} ta={active.ctaTa} taClassName="font-tamil" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 lg:pt-[30vh]">
                <div className="space-y-8">
                  {steps.map((step) => (
                    <div
                      key={step.id}
                      ref={(el) => {
                        stepRefs.current[step.id] = el
                      }}
                      data-stepid={step.id}
                      className={[
                        "scroll-progress-section rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-7 shadow-glow",
                        active?.id === step.id ? "" : "inactive",
                      ].join(" ")}
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-churchBlue">
                            <Lang en={step.titleEn} ta={step.titleTa} taClassName="font-tamil" />
                          </div>
                          <div className="mt-2 text-sm text-churchBlue/70">
                            <Lang en={step.bodyEn} ta={step.bodyTa} taClassName="font-tamil" />
                          </div>
                        </div>
                        <Link href={step.ctaHref} className="btn btn-sm btn-secondary whitespace-nowrap">
                          <Lang en={step.ctaEn} ta={step.ctaTa} taClassName="font-tamil" />
                        </Link>
                      </div>
                      <div className="mt-6 h-2 w-full rounded-full bg-white">
                        <div
                          className="h-2 rounded-full bg-churchBlue transition-[width] duration-300"
                          style={{ width: step.id === active?.id ? "100%" : "35%" }}
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

