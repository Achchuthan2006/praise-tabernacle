import type { Metadata } from "next"

import Link from "next/link"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Building Rental",
  description: "Request information about building rental.",
  path: "/learn/building-rental",
})

export default function BuildingRentalPage() {
  const sections: Array<{ titleEn: string; titleTa: string; bodyEn: string; bodyTa: string }> = [
    {
      titleEn: "What can be requested",
      titleTa: "எதை கோரலாம்",
      bodyEn: "Room and hall rentals for community gatherings, weddings, and ministry events (subject to availability and guidelines).",
      bodyTa: "சமூக கூடங்கள், திருமணங்கள், மற்றும் சேவை நிகழ்வுகளுக்கான அறைகள்/மண்டபம் வாடகை (காலியிடம் மற்றும் வழிகாட்டல்களுக்கு உட்பட்டு).",
    },
    {
      titleEn: "How booking works",
      titleTa: "முன்பதிவு எப்படி",
      bodyEn: "Submit a request, confirm availability, review guidelines, and finalize details (time, setup, cleanup, and any equipment needs).",
      bodyTa: "கோரிக்கை சமர்ப்பிக்கவும், காலியிடத்தை உறுதி செய்யவும், வழிகாட்டல்களை பரிசீலிக்கவும், பின்னர் விவரங்களை முடிக்கவும் (நேரம், அமைப்பு, சுத்தம், உபகரண தேவைகள்).",
    },
    {
      titleEn: "Guidelines",
      titleTa: "வழிகாட்டல்கள்",
      bodyEn: "We aim to keep the building respectful, safe, and clean. Some events may require supervision, a deposit, or additional approvals.",
      bodyTa: "கட்டிடம் மரியாதையுடனும் பாதுகாப்பாகவும் சுத்தமாகவும் இருக்க வேண்டும் என்பதே நாங்கள் விரும்புவது. சில நிகழ்வுகளுக்கு மேற்பார்வை/டெபாசிட்/கூடுதல் அனுமதி தேவைப்படலாம்.",
    },
    {
      titleEn: "Pricing & deposits",
      titleTa: "Pricing & deposits",
      bodyEn: "Pricing depends on the room, time, and staffing needs. Some events may require a deposit or facility fee. Contact us and we will share details for your request.",
      bodyTa: "Pricing depends on the room, time, and staffing needs. Some events may require a deposit or facility fee. Contact us and we will share details for your request.",
    },
    {
      titleEn: "What is not permitted",
      titleTa: "What is not permitted",
      bodyEn: "To keep our facility safe and respectful, some activities may not be allowed. We will review your request and confirm what’s approved before booking.",
      bodyTa: "To keep our facility safe and respectful, some activities may not be allowed. We will review your request and confirm what’s approved before booking.",
    },
  ]

  return (
    <>
      <PageHeader
        titleEn="Building Rental"
        titleTa="கட்டிடம் வாடகை"
        descriptionEn="Request availability, guidelines, and pricing details."
        descriptionTa="காலியிடம், வழிகாட்டல்கள், கட்டணம் பற்றிய விவரங்கள்"
      />

      <section className="bg-white">
        <Container className="section-padding">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div className="rounded-3xl border border-churchBlue/10 bg-white p-8 shadow-glow">
                <div className="section-kicker">
                  <Lang en="Requests" ta="கோரிக்கைகள்" taClassName="font-tamil" />
                </div>
                <h2 className="section-heading mt-2">
                  <Lang en="Request a booking" ta="முன்பதிவு கோருங்கள்" taClassName="font-tamil" />
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-churchBlue/70 sm:text-base">
                  <Lang
                    en="Use this page to learn the basics, then contact us to confirm availability and details."
                    ta="அடிப்படைகளை இங்கே அறிந்து கொண்டு, காலியிடத்தையும் விவரங்களையும் உறுதி செய்ய எங்களை தொடர்பு கொள்ளுங்கள்."
                    taClassName="font-tamil"
                  />
                </p>

                <div className="mt-8 space-y-4">
                  {sections.map((s) => (
                    <div key={s.titleEn} className="rounded-2xl border border-churchBlue/10 bg-white p-6">
                      <div className="text-base font-semibold tracking-tight text-churchBlue">
                        <Lang en={s.titleEn} ta={s.titleTa} taClassName="font-tamil" />
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                        <Lang en={s.bodyEn} ta={s.bodyTa} taClassName="font-tamil" />
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-6">
                  <h3 className="text-lg font-semibold tracking-tight text-churchBlue">
                    <Lang en="What to include in your request" ta="கோரிக்கையில் சேர்க்க வேண்டியது" taClassName="font-tamil" />
                  </h3>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-churchBlue/75 sm:text-base">
                    {[
                      { en: "Event type and expected attendance", ta: "நிகழ்வு வகை மற்றும் எதிர்பார்க்கப்படும் வருகையாளர் எண்ணிக்கை" },
                      { en: "Preferred date/time and any setup time needed", ta: "விருப்ப தேதி/நேரம் மற்றும் அமைப்பு நேரம்" },
                      { en: "Language (Tamil / English / bilingual)", ta: "மொழி (தமிழ் / ஆங்கிலம் / இருமொழி)" },
                      { en: "Equipment needs (sound, projector, seating)", ta: "உபகரண தேவை (ஒலி, புரொஜெக்டர், இருக்கைகள்)" },
                    ].map((item) => (
                      <li key={item.en}>
                        <Lang en={item.en} ta={item.ta} taClassName="font-tamil" />
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/bookings?type=building" className="btn btn-md btn-primary">
                    <Lang en="Request a booking" ta="முன்பதிவு கோருங்கள்" taClassName="font-tamil" />
                  </Link>
                  <Link href="/learn/community-safety" className="btn btn-md btn-secondary">
                    <Lang en="Safety policies" ta="பாதுகாப்பு கொள்கைகள்" taClassName="font-tamil" />
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
