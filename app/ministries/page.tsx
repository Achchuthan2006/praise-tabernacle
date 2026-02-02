import type { Metadata } from "next"

import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"

export const metadata: Metadata = {
  title: "Ministries",
  description: "Ways to connect and serve at Praise Tabernacle.",
}

const ministries = [
  {
    titleEn: "Worship & Tech",
    titleTa: "ஆராதனை & தொழில்நுட்பம்",
    bodyEn: "Serve with music and sound to support a calm, focused worship service.",
    bodyTa: "அமைதியான, கவனமான ஆராதனை நடைபெற இசை மற்றும் ஒலியில் சேவை செய்யலாம்.",
  },
  {
    titleEn: "Youth & Young Adults",
    titleTa: "இளைஞர்கள்",
    bodyEn: "A welcoming space to connect, ask questions, and grow together.",
    bodyTa: "இணைந்திருக்கவும், கேள்விகள் கேட்கவும், ஒன்றாக வளரவும் ஒரு வரவேற்கும் இடம்.",
  },
  {
    titleEn: "Prayer & Care",
    titleTa: "ஜெபம் & பராமரிப்பு",
    bodyEn: "A place to be prayed for, encouraged, and supported in a safe way.",
    bodyTa: "பாதுகாப்பான முறையில் ஜெபம் பெறவும், ஊக்கம் மற்றும் ஆதரவு பெறவும் ஒரு இடம்.",
  },
]

export default function MinistriesPage() {
  return (
    <>
      <PageHeader
        titleEn="Ministries"
        titleTa="சேவைகள்"
        descriptionEn="Find a place to belong, serve, and grow — at your own pace."
        descriptionTa="சேர்ந்து, சேவை செய்து, உங்கள் வேகத்தில் வளர ஒரு இடத்தை கண்டுபிடிக்கவும்."
      />

      <Container className="py-16 sm:py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ministries.map((m) => (
            <section
              key={m.titleEn}
              className="rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow"
            >
              <h2 className="text-lg font-semibold text-churchBlue">{m.titleEn}</h2>
              <p className="mt-1 text-sm text-churchBlue/70 font-tamil">{m.titleTa}</p>
              <p className="mt-4 text-sm text-churchBlue/75 sm:text-base">{m.bodyEn}</p>
              <p className="mt-3 text-sm text-churchBlue/70 sm:text-base font-tamil">{m.bodyTa}</p>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-churchBlue/10 bg-white p-8 shadow-glow">
          <h3 className="text-xl font-semibold tracking-tight text-churchBlue">
            Want to get involved?
          </h3>
          <p className="mt-2 text-sm text-churchBlue/70 font-tamil">சேவையில் சேர விரும்புகிறீர்களா?</p>
          <p className="mt-4 text-sm text-churchBlue/75 sm:text-base">
            Send us a message and we’ll help you find a good fit. There’s no pressure —
            we’ll guide you gently.
          </p>
          <p className="mt-2 text-sm text-churchBlue/70 sm:text-base font-tamil">
            எங்களுக்கு ஒரு செய்தி அனுப்புங்கள். உங்களுக்கு பொருத்தமான சேவையை கண்டுபிடிக்க
            உதவுகிறோம். எந்த அழுத்தமும் இல்லை — மெதுவாக வழிகாட்டுவோம்.
          </p>
        </div>
      </Container>
    </>
  )
}
