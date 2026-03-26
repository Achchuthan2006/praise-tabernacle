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
    { en: "Complete a wedding request and meet with a pastor/leader", ta: "திருமண கோரிக்கையை சமர்ப்பித்து ஒரு மேய்ப்பர் அல்லது தலைவரை சந்திக்கவும்" },
    { en: "Confirm availability (date, time, and space)", ta: "தேதி, நேரம், மற்றும் இடம் கிடைப்பதை உறுதிப்படுத்தவும்" },
    { en: "Review ceremony guidelines and music expectations", ta: "திருமண விழா வழிகாட்டுதல்களையும் இசை தொடர்பான எதிர்பார்ப்புகளையும் பரிசீலிக்கவும்" },
    { en: "Finalize details (rehearsal, officiant, and logistics)", ta: "பயிற்சி, நடத்துபவர், மற்றும் ஏற்பாடுகள் போன்ற விவரங்களை இறுதிப்படுத்தவும்" },
    { en: "Premarital counseling is recommended (or required for some requests)", ta: "திருமணத்திற்கு முன் ஆலோசனை சிலருக்கு பரிந்துரைக்கப்படலாம் அல்லது தேவையாக இருக்கலாம்" },
    { en: "We may request a planning call to align on expectations and schedule", ta: "எதிர்பார்ப்புகளும் அட்டவணையும் ஒன்றுபட திட்டமிடும் அழைப்பை நாங்கள் கோரலாம்" },
  ]

  return (
    <>
      <PageHeader
        titleEn="Weddings"
        titleTa="திருமணங்கள்"
        descriptionEn="Request information and learn about our process."
        descriptionTa="விவரங்களை அறிந்து எங்கள் நடைமுறையை புரிந்துகொள்ளுங்கள்."
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
                      ta="எங்கள் சபைக் குடும்பத்துடன் தங்கள் திருமணத்தை கொண்டாட ஜோடிகள் விரும்பும் போது அது எங்களுக்கு மகிழ்ச்சி அளிக்கிறது. உங்களை நன்றாக சேவிக்க எளிய கோரிக்கை மற்றும் தயாரிப்பு நடைமுறையை பின்பற்றுகிறோம்."
                      taClassName="font-tamil"
                    />
                  </p>
                  <p>
                    <Lang
                      en="Please contact us early so we can confirm the date, talk through expectations, and share the next steps."
                      ta="தேதியை உறுதிப்படுத்தவும், எதிர்பார்ப்புகளைப் பேசவும், அடுத்த படிகளை பகிரவும் முன்கூட்டியே எங்களை தொடர்புகொள்ளுங்கள்."
                      taClassName="font-tamil"
                    />
                  </p>
                </div>

                <div className="mt-8 rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-6">
                  <h3 className="text-lg font-semibold tracking-tight text-churchBlue">
                    <Lang en="How the process works" ta="நடைமுறை எப்படிச் செயல்படும்" taClassName="font-tamil" />
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
                      titleTa: "நாங்கள் உதவக்கூடியவை",
                      bodyEn: "Officiant coordination, ceremony planning guidance, and day-of logistics (as available).",
                      bodyTa: "திருமண நடத்துபவர் ஒருங்கிணைப்பு, விழா திட்டமிடல் வழிகாட்டுதல், மற்றும் நிகழ்வு நாளின் ஏற்பாடுகள் ஆகியவற்றில் உதவ முடியும்.",
                    },
                    {
                      titleEn: "What we need from you",
                      titleTa: "உங்களிடம் இருந்து தேவையானவை",
                      bodyEn: "Your requested date/time, preferred language, and any special needs for guests.",
                      bodyTa: "உங்கள் விரும்பும் தேதி மற்றும் நேரம், மொழி விருப்பம், மற்றும் விருந்தினர்களுக்கான சிறப்பு தேவைகள்.",
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
                    <Lang en="Request wedding info" ta="திருமண விவரங்களை கேளுங்கள்" taClassName="font-tamil" />
                  </Link>
                  <Link href="/learn/building-rental" className="btn btn-md btn-secondary">
                    <Lang en="Building availability" ta="கட்டிட காலியிடம்" taClassName="font-tamil" />
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
