import type { Metadata } from "next"
import Link from "next/link"

import PrayerRequestForm from "@/components/PrayerRequestForm"
import ServiceSchedule from "@/components/ServiceSchedule"
import Lang from "@/components/language/Lang"
import NewVisitorJourney from "@/components/NewVisitorJourney"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Plan Your Visit",
  description:
    "Plan your visit to Praise Tabernacle Mississauga - what to expect, service times, parking, and directions.",
  path: "/visit",
})

export default function VisitPage() {
  return (
    <>
      <PageHeader
        titleEn="Plan Your Visit"
        titleTa="வருகையை திட்டமிடுங்கள்"
        descriptionEn="A calm guide for your first visit - simple, friendly, and no pressure."
        descriptionTa="முதல் வருகைக்கான அமைதியான வழிகாட்டல் - எளிமை, நட்பு, அழுத்தமில்லை."
      />

      <ServiceSchedule />

      <section className="border-t border-churchBlue/10 bg-white">
        <Container className="section-padding">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-churchBlue sm:text-4xl">
                  <Lang en="What to expect" ta="என்ன எதிர்பார்க்கலாம்" />
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-churchBlue/70 sm:text-base">
                  <Lang
                    en="A simple guide for your first visit - clear, friendly, and no pressure."
                    ta="முதல் வருகைக்கான எளிய வழிகாட்டல் - தெளிவு, நட்பு, அழுத்தமில்லை."
                    taClassName="font-tamil"
                  />
                </p>
              </div>
            </Reveal>

            <div className="mt-10 divide-y divide-churchBlue/10 border-y border-churchBlue/10">
              <Reveal>
                <InfoRow
                  titleEn="Your first visit"
                  titleTa="முதல் வருகை"
                  bodyEn="A warm welcome, calm worship, and clear teaching. You can simply come, sit, and feel at home."
                  bodyTa="அன்பான வரவேற்பு, அமைதியான ஆராதனை, தெளிவான போதனை. நீங்கள் வந்து அமர்ந்து அமைதியாக இருக்கலாம்."
                />
              </Reveal>
              <Reveal delay={1}>
                <InfoRow
                  titleEn="Service duration"
                  titleTa="ஆராதனை நேர அளவு"
                  bodyEn="Most services are about 75–90 minutes."
                  bodyTa="பொதுவாக ஆராதனை 75–90 நிமிடங்கள் இருக்கும்."
                />
              </Reveal>
              <Reveal delay={2}>
                <InfoRow
                  titleEn="What to wear"
                  titleTa="என்ன அணிய வேண்டும்"
                  bodyEn="Whatever is comfortable. Many people dress modestly - there’s no dress code."
                  bodyTa="உங்களுக்கு வசதியாக இருப்பதை அணியுங்கள். பலர் ஒழுங்காக அணிவார்கள் - கட்டாய விதி இல்லை."
                />
              </Reveal>
              <Reveal delay={3}>
                <InfoRow
                  titleEn="Parking"
                  titleTa="வாகன நிறுத்தம்"
                  bodyEn="Parking is available near our unit. If you need help, just ask someone at the door."
                  bodyTa="எங்கள் யூனிட்டிற்கு அருகில் நிறுத்த இடம் உள்ளது. உதவி தேவைப்பட்டால், வாசலில் கேளுங்கள்."
                />
              </Reveal>
            </div>

            <Reveal className="mt-12">
              <div className="border-y border-churchBlue/10 py-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-medium tracking-tight text-churchBlue sm:text-xl">
                      <Lang en="Directions" ta="வழிமுறைகள்" />
                    </h3>
                    <p className="mt-2 text-sm text-churchBlue/70">
                      {siteConfig.addressLines[0]}, {siteConfig.addressLines[1]}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=5155%20Spectrum%20Way%20Unit%207%20Mississauga%20ON%20L4W%205A1"
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-md btn-primary"
                    >
                      <Lang en="Get directions" ta="வழிமுறைகள் பெறுங்கள்" />
                    </a>
                    <Link
                      href="/contact"
                      className="btn btn-md btn-secondary"
                    >
                      <Lang en="Contact us" ta="தொடர்பு கொள்ளுங்கள்" />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <NewVisitorJourney />

      <PrayerRequestForm />
    </>
  )
}

function InfoRow({
  titleEn,
  titleTa,
  bodyEn,
  bodyTa,
}: {
  titleEn: string
  titleTa: string
  bodyEn: string
  bodyTa: string
}) {
  return (
    <div className="py-8">
      <h3 className="text-base font-medium tracking-tight text-churchBlue sm:text-lg">
        <Lang en={titleEn} ta={titleTa} taClassName="font-tamil" />
      </h3>
      <p className="mt-4 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
        <Lang en={bodyEn} ta={bodyTa} taClassName="font-tamil" />
      </p>
    </div>
  )
}
