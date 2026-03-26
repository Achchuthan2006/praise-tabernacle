import type { Metadata } from "next"

import Link from "next/link"

import BookingRequestForm from "@/components/BookingRequestForm"
import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

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
      bodyTa: "சமூகக் கூடுகைகள், திருமணங்கள், மற்றும் சபை நிகழ்வுகளுக்கான அறைகள் அல்லது மண்டப பயன்பாட்டை கோரலாம். இது கிடைக்கும் நேரமும் வழிகாட்டுதல்களும் சார்ந்தது.",
    },
    {
      titleEn: "How booking works",
      titleTa: "முன்பதிவு எப்படிச் செயல்படும்",
      bodyEn: "Submit a request, confirm availability, review guidelines, and finalize details (time, setup, cleanup, and any equipment needs).",
      bodyTa: "முதலில் உங்கள் கோரிக்கையை அனுப்புங்கள். பின்னர் காலியிடம், வழிகாட்டுதல்கள், நேரம், அமைப்பு, சுத்தம், மற்றும் தேவையான உபகரணங்கள் குறித்து ஒன்றாக உறுதிப்படுத்துவோம்.",
    },
    {
      titleEn: "Guidelines",
      titleTa: "வழிகாட்டுதல்கள்",
      bodyEn: "We aim to keep the building respectful, safe, and clean. Some events may require supervision, a deposit, or additional approvals.",
      bodyTa: "கட்டிடத்தை மரியாதையுடனும் பாதுகாப்பாகவும் சுத்தமாகவும் வைத்திருக்கிறோம். சில நிகழ்வுகளுக்கு மேற்பார்வை, முன்பணம், அல்லது கூடுதல் அனுமதி தேவைப்படலாம்.",
    },
    {
      titleEn: "Pricing & deposits",
      titleTa: "கட்டணம் மற்றும் முன்பணம்",
      bodyEn: "Pricing depends on the room, time, and staffing needs. Some events may require a deposit or facility fee. Contact us and we will share details for your request.",
      bodyTa: "கட்டணம் பயன்படுத்தும் அறை, நேரம், மற்றும் பணியாளர் தேவையைப் பொறுத்தது. சில நிகழ்வுகளுக்கு முன்பணம் அல்லது கட்டிட பயன்பாட்டு கட்டணம் இருக்கலாம். உங்கள் கோரிக்கைக்கான விவரங்களை எங்களை தொடர்புகொண்டால் பகிர்வோம்.",
    },
    {
      titleEn: "What is not permitted",
      titleTa: "அனுமதிக்கப்படாதவை",
      bodyEn: "To keep our facility safe and respectful, some activities may not be allowed. We will review your request and confirm what's approved before booking.",
      bodyTa: "எங்கள் கட்டிடம் பாதுகாப்பாகவும் மரியாதையுடனும் இருக்க சில செயல்பாடுகள் அனுமதிக்கப்படாமல் இருக்கலாம். முன்பதிவுக்கு முன் உங்கள் கோரிக்கையை பரிசீலித்து ஏது அனுமதிக்கப்படும் என்பதை உறுதிப்படுத்துவோம்.",
    },
  ]

  const pricingTiers = [
    {
      nameEn: "Classroom / Small Room",
      nameTa: "வகுப்பறை / சிறிய அறை",
      priceEn: "From $125",
      priceTa: "$125 முதல்",
      detailsEn:
        "Best for prayer meetings, workshops, and small gatherings. Final quote depends on time, setup, and cleaning needs.",
      detailsTa:
        "ஜெபக் கூட்டங்கள், பயிற்சிகள், மற்றும் சிறிய கூடுகைகளுக்கு ஏற்றது. நேரம், அமைப்பு, மற்றும் சுத்தப்படுத்தல் தேவைக்கு ஏற்ப இறுதி கட்டணம் மாறும்.",
    },
    {
      nameEn: "Fellowship Hall",
      nameTa: "கூட்டரங்கு",
      priceEn: "From $350",
      priceTa: "$350 முதல்",
      detailsEn:
        "Suitable for receptions, seminars, family events, and community programs. Staffing and equipment may affect the final price.",
      detailsTa:
        "வரவேற்புகள், கருத்தரங்குகள், குடும்ப நிகழ்வுகள், மற்றும் சமூக நிகழ்ச்சிகளுக்கு ஏற்றது. பணியாளர்கள் மற்றும் உபகரணங்கள் காரணமாக இறுதி விலை மாறலாம்.",
    },
    {
      nameEn: "Wedding / Large Event",
      nameTa: "திருமணம் / பெரிய நிகழ்வு",
      priceEn: "Custom quote",
      priceTa: "தனிப்பயன் கட்டணம்",
      detailsEn:
        "Larger events are quoted individually based on attendance, schedule, equipment, and supervision requirements.",
      detailsTa:
        "பெரிய நிகழ்வுகளுக்கான கட்டணம் வருகையாளர் எண்ணிக்கை, நேர அட்டவணை, உபகரணங்கள், மற்றும் மேற்பார்வை தேவைக்கு ஏற்ப தனியாக கணக்கிடப்படும்.",
    },
  ] as const

  return (
    <>
      <PageHeader
        titleEn="Building Rental"
        titleTa="கட்டிட பயன்பாடு"
        descriptionEn="Request availability, guidelines, and pricing details."
        descriptionTa="காலியிடம், வழிகாட்டுதல்கள், மற்றும் கட்டண விவரங்களை அறிந்து கொள்ளுங்கள்."
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
                    ta="முதலில் இங்கே அடிப்படை தகவல்களை அறிந்து கொள்ளுங்கள். பின்னர் காலியிடமும் தேவையான விவரங்களையும் உறுதிப்படுத்த எங்களை தொடர்புகொள்ளுங்கள்."
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
                    <Lang en="Starting pricing guide" ta="ஆரம்ப கட்டண வழிகாட்டி" taClassName="font-tamil" />
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-churchBlue/70 sm:text-base">
                    <Lang
                      en="These are starting ranges to help with planning. Final pricing depends on the room used, event length, staffing, setup, cleanup, and any sound or projection needs."
                      ta="இவை திட்டமிட உதவும் ஆரம்ப கட்டண வரம்புகள். பயன்படுத்தப்படும் அறை, நிகழ்வு நேரம், பணியாளர் உதவி, அமைப்பு, சுத்தப்படுத்தல், மற்றும் ஒலி அல்லது திரை வசதிகளின் தேவைக்கு ஏற்ப இறுதி கட்டணம் தீர்மானிக்கப்படும்."
                      taClassName="font-tamil"
                    />
                  </p>
                  <div className="mt-5 grid gap-4 md:grid-cols-3">
                    {pricingTiers.map((tier) => (
                      <div key={tier.nameEn} className="rounded-2xl border border-churchBlue/10 bg-white p-5 shadow-glow">
                        <div className="text-sm font-semibold text-churchBlue">
                          <Lang en={tier.nameEn} ta={tier.nameTa} taClassName="font-tamil" />
                        </div>
                        <div className="mt-3 text-2xl font-bold text-churchBlue">
                          <Lang en={tier.priceEn} ta={tier.priceTa} taClassName="font-tamil" />
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-churchBlue/75">
                          <Lang en={tier.detailsEn} ta={tier.detailsTa} taClassName="font-tamil" />
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-churchBlue/60">
                    <Lang
                      en="A refundable deposit, insurance confirmation, or on-site supervision may be required for some bookings."
                      ta="சில முன்பதிவுகளுக்கு திருப்பி வழங்கப்படும் முன்பணம், காப்பீட்டு உறுதி, அல்லது இடத்திலான மேற்பார்வை தேவைப்படலாம்."
                      taClassName="font-tamil"
                    />
                  </p>
                </div>

                <div className="mt-8 rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-6">
                  <h3 className="text-lg font-semibold tracking-tight text-churchBlue">
                    <Lang en="What to include in your request" ta="உங்கள் கோரிக்கையில் சேர்க்க வேண்டியவை" taClassName="font-tamil" />
                  </h3>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-churchBlue/75 sm:text-base">
                    {[
                      { en: "Event type and expected attendance", ta: "நிகழ்வு வகை மற்றும் எதிர்பார்க்கப்படும் வருகையாளர் எண்ணிக்கை" },
                      { en: "Preferred date/time and any setup time needed", ta: "விரும்பும் தேதி, நேரம், மற்றும் அமைப்புக்கான கூடுதல் நேரம்" },
                      { en: "Language (Tamil / English / bilingual)", ta: "மொழி (தமிழ் / ஆங்கிலம் / இருமொழி)" },
                      { en: "Equipment needs (sound, projector, seating)", ta: "உபகரணத் தேவைகள் (ஒலி, ப்ரொஜெக்டர், இருக்கைகள்)" },
                    ].map((item) => (
                      <li key={item.en}>
                        <Lang en={item.en} ta={item.ta} taClassName="font-tamil" />
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow">
                  <h3 className="text-lg font-semibold tracking-tight text-churchBlue">
                    <Lang en="Need a custom quote?" ta="தனிப்பயன் கட்டண விவரம் வேண்டுமா?" taClassName="font-tamil" />
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                    <Lang
                      en={`Tell us your event date, attendance, and room needs. We will confirm availability and send a tailored quote. You can also email ${siteConfig.email} or call ${siteConfig.phone}.`}
                      ta={`உங்கள் நிகழ்வு தேதி, வருகையாளர் எண்ணிக்கை, மற்றும் அறை தேவைகளை பகிருங்கள். காலியிடம் உறுதி செய்யப்பட்ட பிறகு உங்களுக்கு தனிப்பயன் கட்டண விவரம் அனுப்பப்படும். ${siteConfig.email} என்ற மின்னஞ்சலிலும் அல்லது ${siteConfig.phone} என்ற எண்ணிலும் தொடர்புகொள்ளலாம்.`}
                      taClassName="font-tamil"
                    />
                  </p>
                </div>

                <div className="mt-8">
                  <BookingRequestForm
                    bookingType="building"
                    titleEn="Request a building rental quote"
                    titleTa="கட்டிட வாடகை கட்டண விவரத்தை கோருங்கள்"
                    subtitleEn="Share your event details and we will confirm availability, pricing, and next steps."
                    subtitleTa="உங்கள் நிகழ்வு விவரங்களை பகிருங்கள். காலியிடம், கட்டணம், மற்றும் அடுத்த படிகளை உறுதிப்படுத்தி பதிலளிப்போம்."
                  />
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
