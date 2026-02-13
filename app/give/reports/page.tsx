import type { Metadata } from "next"
import Link from "next/link"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { financialReports } from "@/lib/giving"
import { pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Financial Reports",
  description: "Transparency and reporting notes for giving at Praise Tabernacle.",
  path: "/give/reports",
})

export default function GivingReportsPage() {
  return (
    <>
      <PageHeader
        titleEn="Financial reports"
        titleTa="நிதி அறிக்கைகள்"
        descriptionEn="Transparency, reporting, and how to request information."
        descriptionTa="வெளிப்படை, அறிக்கை, மற்றும் தகவல் கோருதல்."
      />

      <section className="bg-white">
        <Container className="section-padding">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div className="rounded-3xl border border-churchBlue/10 bg-white p-7 shadow-glow">
                <div className="section-kicker">
                  <Lang en="Transparency" ta="வெளிப்படை" taClassName="font-tamil" />
                </div>
                <h2 className="section-heading mt-2">
                  <Lang en="How we report" ta="எங்கள் அறிக்கை முறை" taClassName="font-tamil" />
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-churchBlue/70 sm:text-base">
                  <Lang
                    en="We aim to handle donations carefully and transparently. When annual reports or summaries are available, we’ll link them here."
                    ta="கொடைகளை கவனமாகவும் வெளிப்படையாகவும் நிர்வகிக்க முயல்கிறோம். ஆண்டறிக்கைகள்/சுருக்கங்கள் கிடைக்கும் போது இங்கே இணைப்புகளை இடுவோம்."
                    taClassName="font-tamil"
                  />
                </p>

                {financialReports.length ? (
                  <div className="mt-6 grid gap-2">
                    {financialReports.map((r) =>
                      r.href ? (
                        <a key={r.id} href={r.href} className="btn btn-sm btn-secondary">
                          <Lang en={r.labelEn} ta={r.labelTa} taClassName="font-tamil" />
                        </a>
                      ) : (
                        <div
                          key={r.id}
                          className="btn btn-sm btn-secondary opacity-60 cursor-not-allowed"
                          aria-disabled="true"
                        >
                          <Lang en={r.labelEn} ta={r.labelTa} taClassName="font-tamil" />
                          {r.status === "coming_soon" ? (
                            <span className="ml-2 text-xs font-semibold text-churchBlue/60">Coming soon</span>
                          ) : null}
                        </div>
                      ),
                    )}
                  </div>
                ) : null}

                <div className="mt-8 grid gap-2 sm:grid-cols-2">
                  <Link href="/give" className="btn btn-sm btn-secondary">
                    <Lang en="Back to giving" ta="மீண்டும் கொடை" taClassName="font-tamil" />
                  </Link>
                  <a href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Financial report request")}`} className="btn btn-sm btn-primary">
                    <Lang en="Request info" ta="தகவல் கேளுங்கள்" taClassName="font-tamil" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  )
}

