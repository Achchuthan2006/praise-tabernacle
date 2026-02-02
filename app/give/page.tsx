import type { Metadata } from "next"

import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"

export const metadata: Metadata = {
  title: "Give",
  description: "Support the ministry of Praise Tabernacle through giving.",
}

export default function GivePage() {
  return (
    <>
      <PageHeader
        titleEn="Give"
        titleTa="கொடுங்கள்"
        descriptionEn="Thank you for supporting the church. Giving options can be connected later."
        descriptionTa="சபையை ஆதரிப்பதற்கு நன்றி. கொடுப்பனவு முறைகளை பின்னர் இணைக்கலாம்."
      />

      <Container className="py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-3">
          <Card
            titleEn="Online giving (coming soon)"
            titleTa="ஆன்லைன் கொடை (விரைவில்)"
            bodyEn="Online giving will be available soon (e-Transfer / Stripe, etc.)."
            bodyTa="ஆன்லைன் கொடை விரைவில் கிடைக்கும் (e-Transfer / Stripe போன்றவை)."
          />
          <Card
            titleEn="In person"
            titleTa="நேரில்"
            bodyEn="You can give during service using the offering box."
            bodyTa="ஆராதனை நேரத்தில் காணிக்கை பெட்டியின் மூலம் கொடுக்கலாம்."
          />
          <Card
            titleEn="Need help?"
            titleTa="உதவி வேண்டுமா?"
            bodyEn="If you need a receipt or have questions, please contact us."
            bodyTa="ரசீது அல்லது கேள்விகள் இருந்தால், தயவு செய்து தொடர்பு கொள்ளுங்கள்."
          />
        </div>

        <div className="mt-12 rounded-3xl border border-churchBlue/10 bg-white p-8 shadow-glow">
          <h2 className="text-xl font-semibold tracking-tight text-churchBlue sm:text-2xl">
            Giving with trust
          </h2>
          <p className="mt-2 text-sm text-churchBlue/70 font-tamil">நம்பிக்கையுடன் கொடுப்பது</p>
          <p className="mt-4 text-sm text-churchBlue/75 sm:text-base">
            Giving is always voluntary. If you choose to give, thank you — it helps us
            serve people, support families, and share the love of Jesus.
          </p>
          <p className="mt-2 text-sm text-churchBlue/70 sm:text-base font-tamil">
            கொடுப்பது முழுமையாக உங்கள் விருப்பம். நீங்கள் கொடுக்க விரும்பினால், நன்றி —
            அது மக்களுக்கு சேவை செய்யவும், குடும்பங்களை ஆதரிக்கவும், இயேசுவின் அன்பை பகிரவும் உதவும்.
          </p>
          <p className="mt-4 text-sm text-churchBlue/75 sm:text-base">
            We aim to handle donations carefully and transparently.
          </p>
          <p className="mt-2 text-sm text-churchBlue/70 sm:text-base font-tamil">
            காணிக்கைகளை கவனமாகவும் வெளிப்படையாகவும் கையாள முயற்சிக்கிறோம்.
          </p>
        </div>
      </Container>
    </>
  )
}

function Card({
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
    <section className="rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow">
      <h2 className="text-lg font-semibold text-churchBlue">{titleEn}</h2>
      <p className="mt-1 text-sm text-churchBlue/70 font-tamil">{titleTa}</p>
      <p className="mt-4 text-sm text-churchBlue/75 sm:text-base">{bodyEn}</p>
      <p className="mt-3 text-sm text-churchBlue/70 sm:text-base font-tamil">{bodyTa}</p>
    </section>
  )
}
