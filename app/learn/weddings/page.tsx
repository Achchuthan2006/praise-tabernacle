import type { Metadata } from "next"

import Link from "next/link"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Weddings",
  description: "Wedding requests and guidelines.",
  path: "/learn/weddings",
})

export default function WeddingsPage() {
  const requirements: Array<{ en: string; ta: string }> = [
    { en: "Complete a wedding request and meet with a pastor/leader", ta: "திருமண கோரிக்கை செய்துகொண்டு போதகர்/தலைவரை சந்திக்கவும்" },
    { en: "Confirm availability (date, time, and space)", ta: "காலியிடத்தை உறுதி செய்யுங்கள் (தேதி, நேரம், இடம்)" },
    { en: "Review ceremony guidelines and music expectations", ta: "விழா வழிகாட்டல்கள் மற்றும் இசை எதிர்பார்ப்புகளை பரிசீலிக்கவும்" },
    { en: "Finalize details (rehearsal, officiant, and logistics)", ta: "விவரங்களை முடிக்கவும் (பயிற்சி, நடத்துபவர், ஏற்பாடுகள்)" },
    { en: "Premarital counseling is recommended (or required for some requests)", ta: "Premarital counseling is recommended (or required for some requests)" },
    { en: "We may request a planning call to align on expectations and schedule", ta: "We may request a planning call to align on expectations and schedule" },
  ]

  return (
    <>
      <PageHeader
        titleEn="Weddings"
        titleTa="திருமணம்"
        descriptionEn="Request information and learn about our process."
        descriptionTa="விவரங்களும் நடைமுறையும்"
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
                  <Lang en="Wedding ceremonies" ta="திருமண விழாக்கள்" taClassName="font-tamil" />
                </h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                  <p>
                    <Lang
                      en="We are honored when couples ask to celebrate their wedding with our church family. To serve you well, we follow a simple request and preparation process."
                      ta="எங்கள் சபை குடும்பத்துடன் திருமணத்தை கொண்டாட ஜோடிகள் கேட்கும்போது நாங்கள் மகிழ்கிறோம். உங்களை நன்றாக சேவிக்க, ஒரு எளிய கோரிக்கை மற்றும் தயாரிப்பு நடைமுறையை பின்பற்றுகிறோம்."
                      taClassName="font-tamil"
                    />
                  </p>
                  <p>
                    <Lang
                      en="Please contact us early so we can confirm the date, talk through expectations, and share the next steps."
                      ta="தேதி உறுதி செய்யவும், எதிர்பார்ப்புகளை பேசவும், அடுத்த படிகளை பகிரவும் தயவுசெய்து முன்கூட்டியே தொடர்புகொள்ளுங்கள்."
                      taClassName="font-tamil"
                    />
                  </p>
                </div>

                <div className="mt-8 rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-6">
                  <h3 className="text-lg font-semibold tracking-tight text-churchBlue">
                    <Lang en="How the process works" ta="நடைமுறை எப்படி நடைபெறும்" taClassName="font-tamil" />
                  </h3>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-churchBlue/75 sm:text-base">
                    {requirements.map((item) => (
                      <li key={item.en}>
                        <Lang en={item.en} ta={item.ta} taClassName="font-tamil" />
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      titleEn: "What we can help with",
                      titleTa: "எதில் உதவ முடியும்",
                      bodyEn: "Officiant coordination, ceremony planning guidance, and day-of logistics (as available).",
                      bodyTa: "நடத்துபவர் ஒருங்கிணைப்பு, விழா திட்டமிடல் வழிகாட்டல், மற்றும் நிகழ்வு நாளின் ஏற்பாடுகள் (சாத்தியமானவரை).",
                    },
                    {
                      titleEn: "What we need from you",
                      titleTa: "நாங்கள் வேண்டுவது",
                      bodyEn: "Your requested date/time, preferred language, and any special needs for guests.",
                      bodyTa: "நீங்கள் வேண்டிய தேதி/நேரம், விருப்ப மொழி, விருந்தினர்களுக்கான சிறப்பு தேவைகள்.",
                    },
                  ].map((card) => (
                    <div key={card.titleEn} className="rounded-2xl border border-churchBlue/10 bg-white p-6">
                      <div className="text-base font-semibold text-churchBlue">
                        <Lang en={card.titleEn} ta={card.titleTa} taClassName="font-tamil" />
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                        <Lang en={card.bodyEn} ta={card.bodyTa} taClassName="font-tamil" />
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/contact" className="btn btn-md btn-primary">
                    <Lang en="Request wedding info" ta="திருமண விவரம் கேளுங்கள்" taClassName="font-tamil" />
                  </Link>
                  <Link href="/learn/building-rental" className="btn btn-md btn-secondary">
                    <Lang en="Building availability" ta="கட்டிடம் காலியிடம்" taClassName="font-tamil" />
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
