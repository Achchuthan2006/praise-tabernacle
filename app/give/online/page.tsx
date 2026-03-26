import type { Metadata } from "next"
import Link from "next/link"

import OnlineDonationForm from "@/components/OnlineDonationForm"
import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { givingCategories } from "@/lib/giving"
import { getGivingProviderLabel } from "@/lib/givingProvider"
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
  const textToGiveNumber = siteConfig.giving?.textToGiveNumber ?? ""
  const textToGiveKeyword = siteConfig.giving?.textToGiveKeyword ?? "GIVE"
  const processorName = siteConfig.giving?.processorName?.trim() ?? ""
  const providerLabel = getGivingProviderLabel(processorName, onlineGivingUrl)
  const hasOnlineGiving = Boolean(onlineGivingUrl)

  return (
    <>
      <PageHeader
        titleEn="Online donation"
        titleTa="ஆன்லைன் கொடை"
        descriptionEn="A simple, secure way to give when online giving is enabled."
        descriptionTa="ஆன்லைன் கொடை செயல்படுத்தப்பட்டிருக்கும்போது, எளிய மற்றும் பாதுகாப்பான கொடை வழி."
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

                  {hasOnlineGiving ? (
                    <>
                      <p className="mt-3 text-sm leading-relaxed text-churchBlue/70 sm:text-base">
                        <Lang
                          en={
                            processorName
                              ? `Choose a category, amount, and frequency, then continue to ${providerLabel} to complete your donation securely.`
                              : "Choose a category, amount, and frequency, then continue to the secure giving page to complete your donation."
                          }
                          ta={
                            processorName
                              ? `வகை, தொகை, மற்றும் அடிக்கடி என்பவற்றைத் தேர்வு செய்து, பாதுகாப்பாக கொடையை முடிக்க ${processorName} பக்கத்திற்குச் செல்லுங்கள்.`
                              : "வகை, தொகை, மற்றும் அடிக்கடி என்பவற்றைத் தேர்வு செய்து, பாதுகாப்பான கொடைப் பக்கத்திற்குச் சென்று உங்கள் கொடையை முடிக்கவும்."
                          }
                          taClassName="font-tamil"
                        />
                      </p>

                      <div className="mt-7">
                        <OnlineDonationForm
                          onlineGivingUrl={onlineGivingUrl}
                          recurringGivingUrl={recurringGivingUrl}
                          categories={givingCategories}
                          processorName={processorName}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="mt-6 rounded-3xl border border-amber-300 bg-amber-50 p-6">
                      <h3 className="text-lg font-semibold tracking-tight text-churchBlue">
                        <Lang
                          en="Online giving is almost ready"
                          ta="ஆன்லைன் கொடை இன்னும் இணைக்கப்படவில்லை"
                          taClassName="font-tamil"
                        />
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                        <Lang
                          en="This page already supports a real secure giving provider, but the church's live processor URL has not been added yet. Once that link is configured, online donations will open directly from here."
                          ta="இந்த பக்கம் உண்மையான கொடை வழங்குநருக்குத் தயாராக இருக்கிறது, ஆனால் நேரடி கட்டண செயலி இணைப்பு இன்னும் அமைக்கப்படவில்லை. அது இணைக்கப்படும் வரை, கீழே உள்ள மற்ற கொடை வழிகளை பயன்படுத்துங்கள்."
                          taClassName="font-tamil"
                        />
                      </p>
                      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <Link href="/give" className="btn btn-md btn-primary">
                          <Lang en="Back to giving options" ta="கொடை வழிகளுக்கு திரும்ப" taClassName="font-tamil" />
                        </Link>
                        <a
                          href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Giving setup")}`}
                          className="btn btn-md btn-secondary"
                        >
                          <Lang en="Contact the church" ta="சபையை தொடர்புகொள்ளுங்கள்" taClassName="font-tamil" />
                        </a>
                      </div>
                    </div>
                  )}
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
                      ta="கொடை எப்போதும் விருப்பமானது. ஆராதனை, சீஷத்துவம், மிஷன், மற்றும் உள்ளூர் உதவிக்கான ஆதரவுக்கு நன்றி."
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
                      <Lang en="Quick option" ta="விரைவு வழி" taClassName="font-tamil" />
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
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
