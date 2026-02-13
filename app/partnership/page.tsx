import type { Metadata } from "next"
import Link from "next/link"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { partnershipTiers } from "@/lib/partnership"
import { pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Partnership Programs",
  description: "Join a partnership tier and connect your giving to real ministry outcomes.",
  path: "/partnership",
})

export default function PartnershipPage() {
  const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Partnership Program")}`

  return (
    <>
      <PageHeader
        titleEn="Partnership Programs"
        titleTa="கூட்டாண்மை திட்டங்கள்"
        descriptionEn="Structured tiers that connect giving to clear ministry outcomes."
        descriptionTa="கொடையை தெளிவான சேவை விளைவுகளுடன் இணைக்கும் கட்டமைக்கப்பட்ட திட்டங்கள்."
      />

      <section className="bg-white">
        <Container className="section-padding">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="rounded-3xl border border-churchBlue/10 bg-churchBlueSoft/40 p-7 shadow-glow md:p-10">
                <div className="section-kicker">
                  <Lang en="Why partner?" ta="ஏன் கூட்டாளர்?" taClassName="font-tamil" />
                </div>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-churchBlue sm:text-3xl">
                  <Lang
                    en="Feel connected to the mission — all year"
                    ta="மிஷனுடன் இணைந்திருங்கள் — ஆண்டு முழுவதும்"
                    taClassName="font-tamil"
                  />
                </h2>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                  <Lang
                    en="Partnership giving is voluntary. Choose a tier that fits your season, and see what it helps make possible in our church and community."
                    ta="கூட்டாண்மை கொடை விருப்பப்படி. உங்கள் வாழ்க்கை நிலைக்கு ஏற்ற கட்டத்தைத் தேர்வு செய்து, அது எங்கள் சபையும் சமூகமும் மூலம் எதை சாத்தியப்படுத்துகிறது என்பதைப் பாருங்கள்."
                    taClassName="font-tamil"
                  />
                </p>
                <div className="mt-7 flex flex-col gap-2 sm:flex-row">
                  <Link href="/give" className="btn btn-md btn-primary">
                    <Lang en="Giving options" ta="கொடையின் வழிகள்" taClassName="font-tamil" />
                  </Link>
                  <a href={mailto} className="btn btn-md btn-secondary">
                    <Lang en="Ask about partnership" ta="கூட்டாண்மை பற்றி கேளுங்கள்" taClassName="font-tamil" />
                  </a>
                </div>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {partnershipTiers.map((tier, idx) => (
                <Reveal key={tier.id} delay={(idx % 4) as 0 | 1 | 2 | 3}>
                  <article className="card overflow-hidden">
                    <div className="card-content p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="section-kicker">
                            <Lang en="Tier" ta="கட்டம்" taClassName="font-tamil" />
                          </div>
                          <h3 className="mt-2 text-xl font-semibold tracking-tight text-churchBlue">
                            <Lang en={tier.titleEn} ta={tier.titleTa} taClassName="font-tamil" />
                          </h3>
                          <p className="mt-3 text-sm leading-relaxed text-churchBlue/70">
                            <Lang en={tier.subtitleEn} ta={tier.subtitleTa} taClassName="font-tamil" />
                          </p>
                        </div>
                        <span className="rounded-full border border-churchBlue/10 bg-churchBlueSoft px-3 py-1 text-xs font-semibold text-churchBlue/80">
                          {tier.suggestedMonthly[0]?.labelEn ?? "Monthly"}
                        </span>
                      </div>

                      <div className="mt-6">
                        <div className="text-sm font-semibold text-churchBlue">
                          <Lang en="Suggested monthly" ta="பரிந்துரைக்கப்படும் மாதம்" taClassName="font-tamil" />
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {tier.suggestedMonthly.map((s) => (
                            <span
                              key={`${tier.id}-${s.amount}`}
                              className="rounded-full border border-churchBlue/10 bg-white px-4 py-2 text-xs font-semibold text-churchBlue/80"
                            >
                              <Lang en={s.labelEn} ta={s.labelTa} taClassName="font-tamil" />
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6">
                        <div className="text-sm font-semibold text-churchBlue">
                          <Lang en="What it supports" ta="இதன் மூலம்" taClassName="font-tamil" />
                        </div>
                        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-churchBlue/75">
                          {tier.outcomesEn.map((line, i) => (
                            <li key={`${tier.id}-en-${i}`}>
                              <Lang en={line} ta={tier.outcomesTa[i] ?? line} taClassName="font-tamil" />
                            </li>
                          ))}
                        </ul>
                      </div>

                      {tier.noteEn ? (
                        <div className="mt-6 rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-4 text-sm text-churchBlue/75">
                          <Lang en={tier.noteEn} ta={tier.noteTa ?? tier.noteEn} taClassName="font-tamil" />
                        </div>
                      ) : null}

                      <div className="mt-6 flex flex-col gap-2">
                        <Link href="/give" className="btn btn-sm btn-primary w-full">
                          <Lang en="Start giving" ta="கொடையை தொடங்குங்கள்" taClassName="font-tamil" />
                        </Link>
                        <a href={mailto} className="btn btn-sm btn-secondary w-full">
                          <Lang en="Contact us" ta="தொடர்பு" taClassName="font-tamil" />
                        </a>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-12">
              <div className="rounded-3xl border border-churchBlue/10 bg-white p-7 shadow-glow md:p-10">
                <h3 className="text-xl font-semibold tracking-tight text-churchBlue">
                  <Lang en="Prefer a specific outcome?" ta="குறிப்பிட்ட நோக்கம் வேண்டுமா?" taClassName="font-tamil" />
                </h3>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-churchBlue/70 sm:text-base">
                  <Lang
                    en="You can sponsor a ministry goal (kids, youth, outreach, media, missions). Tell us what you’d like to support, and we’ll share current needs."
                    ta="ஒரு சேவை இலக்கை ஆதரிக்கலாம் (குழந்தைகள், இளைஞர், சமூக சேவை, மீடியா, மிஷன்). நீங்கள் எதை ஆதரிக்க விரும்புகிறீர்கள் என்பதை கூறுங்கள்; தற்போதைய தேவைகளை பகிர்வோம்."
                    taClassName="font-tamil"
                  />
                </p>
                <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                  <a href={mailto} className="btn btn-md btn-primary">
                    <Lang en="Email us" ta="மின்னஞ்சல்" taClassName="font-tamil" />
                  </a>
                  <Link href="/contact" className="btn btn-md btn-secondary">
                    <Lang en="Contact page" ta="தொடர்பு பக்கம்" taClassName="font-tamil" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  )
}

