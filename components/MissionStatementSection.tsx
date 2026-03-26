import type { ReactNode } from "react"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import Reveal from "@/components/ui/Reveal"
import { siteConfig } from "@/lib/site"

function HeadingWithIcon({
  children,
}: {
  kind: "mission" | "vision" | "identity"
  children: ReactNode
}) {
  return <>{children}</>
}

export default function MissionStatementSection() {
  return (
    <section className="section-soft-stage">
      <Container className="section-padding">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="premium-surface overflow-hidden p-8 md:p-12">
              <div className="grid gap-10 lg:grid-cols-[1.25fr,0.75fr] lg:items-start">
                <div>
                  <div className="section-kicker">
                    <Lang en="Mission & vision" ta="பணி & தரிசனம்" taClassName="font-tamil" />
                  </div>

                  <HeadingWithIcon kind="mission">
                    <p className="mt-6 text-2xl font-semibold tracking-tight text-churchBlue sm:text-4xl">
                      <Lang en={siteConfig.taglineEn} ta={siteConfig.taglineTa} taClassName="font-tamil" />
                    </p>
                  </HeadingWithIcon>

                  <div className="mt-7 max-w-3xl space-y-4 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                    <p>
                      <Lang en={siteConfig.welcomeMessageEn} ta={siteConfig.welcomeMessageTa} taClassName="font-tamil" />
                    </p>
                  </div>

                  <div className="mt-8">
                    <div className="section-divider" aria-hidden="true" />
                  </div>

                  <div className="mt-6 max-w-3xl space-y-4 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                    <HeadingWithIcon kind="vision">
                      <p className="text-base font-semibold text-churchBlue sm:text-lg">
                        <Lang en="Our vision" ta="எங்கள் தரிசனம்" taClassName="font-tamil" />
                      </p>
                    </HeadingWithIcon>
                    <p>
                      <Lang en={siteConfig.visionEn} ta={siteConfig.visionTa} taClassName="font-tamil" />
                    </p>
                    <HeadingWithIcon kind="identity">
                      <p className="cross-accent text-sm text-churchBlue/70 sm:text-base">
                        <Lang en={siteConfig.identityEn} ta={siteConfig.identityTa} taClassName="font-tamil" />
                      </p>
                    </HeadingWithIcon>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-[28px] border border-churchBlue/10 bg-white/90 p-6 shadow-[0_20px_45px_rgb(18_27_62_/_0.08)]">
                    <div className="section-kicker">
                      <Lang en="Our heartbeat" ta="எங்கள் இதய துடிப்பு" taClassName="font-tamil" />
                    </div>
                    <p className="mt-4 text-lg font-semibold tracking-tight text-churchBlue sm:text-xl">
                      <Lang
                        en="A church home shaped by worship, prayer, truth, and loving community."
                        ta="ஆராதனை, ஜெபம், சத்தியம், அன்பான சமூகமால் உருவாக்கப்பட்ட சபை குடும்பம்."
                        taClassName="font-tamil"
                      />
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                    <div className="info-pill">
                      <span className="h-2.5 w-2.5 rounded-full bg-churchGold" aria-hidden="true" />
                      <Lang en="Christ-centred teaching" ta="கிறிஸ்துவை மையமான போதனை" taClassName="font-tamil" />
                    </div>
                    <div className="info-pill">
                      <span className="h-2.5 w-2.5 rounded-full bg-churchBlue" aria-hidden="true" />
                      <Lang en="Tamil & English worship" ta="தமிழ் & ஆங்கில ஆராதனை" taClassName="font-tamil" />
                    </div>
                    <div className="info-pill">
                      <span className="h-2.5 w-2.5 rounded-full bg-churchBlueLight" aria-hidden="true" />
                      <Lang en="Warm, prayerful community" ta="அன்பான ஜெப சமூகம" taClassName="font-tamil" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
