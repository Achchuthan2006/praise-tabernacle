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
    <section className="relative bg-white">
      <Container className="section-padding">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="card">
              <div className="card-content p-8 md:p-12">
                <div className="section-kicker">
                  <Lang en="Mission & vision" ta="பணி & தரிசனம்" />
                </div>

                <HeadingWithIcon kind="mission">
                <p className="mt-6 text-2xl font-semibold tracking-tight text-churchBlue sm:text-4xl">
                  <Lang en={siteConfig.taglineEn} ta={siteConfig.taglineTa} />
                </p>
                </HeadingWithIcon>

                <div className="mt-7 max-w-3xl space-y-4 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                  <p>
                    <Lang en={siteConfig.welcomeMessageEn} ta={siteConfig.welcomeMessageTa} />
                  </p>
                </div>

                <div className="mt-8">
                  <div className="section-divider" aria-hidden="true" />
                </div>

                <div className="mt-6 max-w-3xl space-y-4 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                  <HeadingWithIcon kind="vision">
                  <p className="text-base font-semibold text-churchBlue sm:text-lg">
                    <Lang en="Our vision" ta="எங்கள் தரிசனம்" />
                  </p>
                  </HeadingWithIcon>
                  <p>
                    <Lang en={siteConfig.visionEn} ta={siteConfig.visionTa} />
                  </p>
                  <HeadingWithIcon kind="identity">
                  <p className="cross-accent text-sm text-churchBlue/70 sm:text-base">
                    <Lang en={siteConfig.identityEn} ta={siteConfig.identityTa} />
                  </p>
                  </HeadingWithIcon>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
