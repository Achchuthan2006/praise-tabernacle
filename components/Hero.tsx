"use client"

import Link from "next/link"

import Container from "@/components/ui/Container"
import { t, ui } from "@/lib/i18n"
import { siteConfig } from "@/lib/site"

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-churchBlue to-churchBlueLight text-white">
      <Container className="py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-2.5 text-xs text-white/85">
              <span className="h-1.5 w-1.5 rounded-full bg-churchGold" aria-hidden="true" />
              <span>Tamil & English services • Mississauga, Ontario</span>
            </div>

            <h1 className="mt-7 text-4xl font-semibold tracking-tight sm:text-6xl">
              {siteConfig.nameEn}
            </h1>
            <p className="mt-3 text-2xl leading-snug text-white/90 sm:text-3xl font-tamil">
              {siteConfig.nameTa}
            </p>

            <div className="mt-6 max-w-3xl space-y-3">
              <p className="text-base font-semibold leading-snug sm:text-lg">
                A Place to Grow in Faith, Love, and Community
              </p>
              <p className="text-sm leading-relaxed text-white/85 sm:text-base">
                Praise Tabernacle is a welcoming church in Mississauga, committed to helping
                individuals and families build a strong foundation in Christ and experience the
                love of God in a meaningful way.
              </p>
              <p className="text-sm leading-relaxed text-white/85 font-tamil">
                விசுவாசத்தில் வளரவும், அன்பிலும் சமுதாயத்திலும் ஒன்றாக நடக்கவும் ஒரு இடம்
              </p>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/sermons"
                className="focus-ring inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-churchBlue shadow-sm transition-colors hover:bg-white/95"
              >
                {t(ui.cta.watchOnline, "en")}
              </Link>
              <Link
                href="/contact"
                className="focus-ring inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15"
              >
                {t(ui.cta.planVisit, "en")}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-glow">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-white">Service times</div>
                  <div className="mt-1 text-sm text-white/80 font-tamil">ஆராதனை நேரங்கள்</div>
                </div>
                <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/85">
                  {siteConfig.locationShort}
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {siteConfig.serviceTimes.map((s) => (
                  <div
                    key={s.time}
                    className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 px-4 py-3"
                  >
                    <div className="leading-tight">
                      <div className="text-sm text-white">{s.labelEn}</div>
                      <div className="text-xs text-white/80 font-tamil">{s.labelTa}</div>
                    </div>
                    <div className="text-sm text-white/85">{s.time}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-white/15 bg-white/10 p-4">
                <div className="text-sm font-semibold text-white">New here?</div>
                <p className="mt-1 text-sm text-white/85">
                  We’ll help you feel comfortable. You can plan your visit and get directions.
                </p>
                <Link
                  href="/contact"
                  className="mt-3 inline-flex items-center text-sm font-semibold text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white/70"
                >
                  Plan your visit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

