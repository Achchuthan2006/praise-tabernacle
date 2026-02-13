import type { Metadata } from "next"
import Link from "next/link"

import OnlineDonationForm from "@/components/OnlineDonationForm"
import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { givingCategories } from "@/lib/giving"
import { pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Online Donation",
  description: "Give online to support the ministry of Praise Tabernacle.",
  path: "/give/online",
})

export default function OnlineDonationPage() {
  const onlineGivingUrl = siteConfig.giving?.onlineGivingUrl ?? ""
  const recurringGivingUrl = siteConfig.giving?.recurringGivingUrl ?? ""
  const qrCodes = siteConfig.giving?.qrCodes ?? []
  const textToGiveNumber = siteConfig.giving?.textToGiveNumber ?? ""
  const textToGiveKeyword = siteConfig.giving?.textToGiveKeyword ?? "GIVE"

  return (
    <>
      <PageHeader
        titleEn="Online donation"
        titleTa="ஆன்லைன் கொடை"
        descriptionEn="A simple, secure way to give. Choose a category, amount, and frequency."
        descriptionTa="எளிதாகவும் பாதுகாப்பாகவும் கொடுக்கலாம். வகை, தொகை, மற்றும் அடிக்கடி என்பவற்றைத் தேர்வு செய்யுங்கள்."
      />

      <section className="bg-white">
        <Container className="section-padding">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow sm:p-8">
                  <div className="section-kicker">
                    <Lang en="Donation form" ta="கொடை படிவம்" taClassName="font-tamil" />
                  </div>
                  <h2 className="section-heading mt-2">
                    <Lang en="Give online" ta="ஆன்லைனில் கொடுங்கள்" taClassName="font-tamil" />
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-churchBlue/70 sm:text-base">
                    <Lang
                      en="Fill in the details below, then continue to the secure giving page to complete your donation."
                      ta="கீழே உள்ள விவரங்களை நிரப்பி, பின்னர் பாதுகாப்பான கொடைப் பக்கத்திற்கு சென்று உங்கள் கொடையை முடிக்கவும்."
                      taClassName="font-tamil"
                    />
                  </p>

                  <div className="mt-7">
                    <OnlineDonationForm
                      onlineGivingUrl={onlineGivingUrl}
                      recurringGivingUrl={recurringGivingUrl}
                      categories={givingCategories}
                    />
                  </div>

                  {!onlineGivingUrl ? (
                    <div className="mt-6 rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-4 text-sm text-churchBlue/75">
                      <p>
                        <Lang
                          en="Admin note: Set your giving link in lib/site.ts → siteConfig.giving.onlineGivingUrl to enable the final payment step."
                          ta="Admin note: இறுதி கட்டத்தை இயக்கு, lib/site.ts → siteConfig.giving.onlineGivingUrl இல் கொடை இணைப்பை அமைக்கவும்."
                          taClassName="font-tamil"
                        />
                      </p>
                    </div>
                  ) : null}
                </div>
              </Reveal>
            </div>

            <div className="space-y-6 lg:col-span-5">
              <Reveal delay={1}>
                <div className="rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow sm:p-8">
                  <div className="section-kicker">
                    <Lang en="Why give" ta="ஏன் கொடையளிக்க" taClassName="font-tamil" />
                  </div>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-churchBlue sm:text-2xl">
                    <Lang en="Giving with trust" ta="நம்பிக்கையுடன் கொடை" taClassName="font-tamil" />
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-churchBlue/70 sm:text-base">
                    <Lang
                      en="Giving is always voluntary. Thank you for supporting worship, discipleship, missions, and local care."
                      ta="கொடை எப்போதும் விருப்பத்திற்குரியது. ஆராதனை, சீஷத்துவம், மிஷன், மற்றும் உள்ளூர் உதவிக்கு ஆதரவளித்ததற்கு நன்றி."
                      taClassName="font-tamil"
                    />
                  </p>
                  <div className="mt-6 grid gap-2 sm:grid-cols-2">
                    <Link href="/give" className="btn btn-sm btn-secondary w-full">
                      <Lang en="Back to Give" ta="மீண்டும் கொடை" taClassName="font-tamil" />
                    </Link>
                    <Link href="/give/reports" className="btn btn-sm btn-secondary-soft w-full">
                      <Lang en="Financial reports" ta="நிதி அறிக்கைகள்" taClassName="font-tamil" />
                    </Link>
                  </div>
                </div>
              </Reveal>

              {textToGiveNumber ? (
                <Reveal delay={2}>
                  <div className="rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow sm:p-8">
                    <div className="section-kicker">
                      <Lang en="Quick option" ta="விரைவு" taClassName="font-tamil" />
                    </div>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight text-churchBlue sm:text-2xl">
                      <Lang en="Text-to-give" ta="SMS கொடை" taClassName="font-tamil" />
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-churchBlue/70 sm:text-base">
                      <Lang
                        en={`Text ${textToGiveKeyword} to ${textToGiveNumber} to give quickly.`}
                        ta={`${textToGiveNumber} என்ற எண்ணுக்கு ${textToGiveKeyword} என்று SMS அனுப்புங்கள்.`}
                        taClassName="font-tamil"
                      />
                    </p>
                  </div>
                </Reveal>
              ) : null}

              {qrCodes.length ? (
                <Reveal delay={3}>
                  <div className="rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow sm:p-8">
                    <div className="section-kicker">
                      <Lang en="Mobile" ta="மொபைல்" taClassName="font-tamil" />
                    </div>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight text-churchBlue sm:text-2xl">
                      <Lang en="Scan a QR code" ta="QR code ஸ்கேன்" taClassName="font-tamil" />
                    </h3>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      {qrCodes.slice(0, 4).map((code) => (
                        <div key={code.labelEn} className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-4">
                          <div className="text-xs font-semibold tracking-wide text-churchBlue/70">
                            <Lang en={code.labelEn} ta={code.labelTa} taClassName="font-tamil" />
                          </div>
                          <div className="mt-3 overflow-hidden rounded-xl bg-white p-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={code.src} alt="" className="h-auto w-full" loading="lazy" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ) : null}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

