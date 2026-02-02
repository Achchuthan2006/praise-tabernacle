import type { Metadata } from "next"

import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Praise Tabernacle (துதியின் கூடாரம்) — who we are, why we exist, who we serve, and what you can expect.",
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        titleEn="About"
        titleTa="எங்களைப் பற்றி"
        descriptionEn="A welcoming church family in Mississauga — serving Tamil & English families."
        descriptionTa="மிசிசாகாவில் உள்ள வரவேற்கும் சபைக் குடும்பம் — தமிழ் & ஆங்கில குடும்பங்களுக்கு சேவை."
      />

      <Container className="py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-2">
          <InfoCard
            titleEn="Who we are"
            titleTa="நாம் யார்"
            bodyEn="Praise Tabernacle is a welcoming church in Mississauga. We are a bilingual Tamil & English community that values family, respect, and genuine care."
            bodyTa="துதியின் கூடாரம் மிசிசாகாவில் உள்ள ஒரு வரவேற்கும் சபை. நாங்கள் குடும்பம், மரியாதை, அன்பான அக்கறை ஆகியவற்றை மதிக்கும் தமிழ் & ஆங்கில சமூகமாக இருக்கிறோம்."
          />
          <InfoCard
            titleEn="Why we exist"
            titleTa="நாம் ஏன் இருக்கிறோம்"
            bodyEn="Our desire is to create an atmosphere where individuals and families can grow in faith, love, and purpose — and build a meaningful relationship with Jesus Christ."
            bodyTa="தனிநபர்களும் குடும்பங்களும் விசுவாசம், அன்பு, நோக்கம் ஆகியவற்றில் வளரவும், இயேசு கிறிஸ்துவுடன் அர்த்தமுள்ள உறவை உருவாக்கவும் உதவும் சூழலை உருவாக்குவது எங்கள் விருப்பம்."
          />
          <InfoCard
            titleEn="Who we serve"
            titleTa="நாம் யாரைச் சேவிக்கிறோம்"
            bodyEn="We serve Tamil and English families, newcomers, youth, and anyone looking for hope, comfort, and a place to belong."
            bodyTa="தமிழ் & ஆங்கில குடும்பங்கள், புதியவர்கள், இளைஞர்கள், நம்பிக்கை மற்றும் ஆறுதல் தேடும் அனைவருக்கும் நாங்கள் சேவை செய்கிறோம்."
          />
          <InfoCard
            titleEn="What guides us"
            titleTa="எங்களை வழிநடத்துவது"
            bodyEn="We follow Jesus Christ and look to the Bible for guidance. Our goal is simple: love God, love people, and grow together."
            bodyTa="நாங்கள் இயேசு கிறிஸ்துவை பின்பற்றி, வழிகாட்டலுக்காக வேதாகமத்தைப் பார்க்கிறோம். எங்கள் நோக்கம் எளியது: தேவனை நேசித்து, மனிதர்களை நேசித்து, ஒன்றாக வளருவது."
          />
        </div>

        <div className="mt-12 rounded-3xl border border-churchBlue/10 bg-white p-8 shadow-glow">
          <h2 className="text-xl font-semibold tracking-tight text-churchBlue sm:text-2xl">
            What you can expect
          </h2>
          <p className="mt-2 text-sm text-churchBlue/70 font-tamil">
            நீங்கள் என்ன எதிர்பார்க்கலாம்
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <ExpectCard
              titleEn="A warm welcome (no pressure)"
              titleTa="அன்பான வரவேற்பு (அழுத்தமில்லை)"
              bodyEn="If it’s your first time, you’re welcome. We’ll help you feel comfortable and answer any questions."
              bodyTa="இது உங்கள் முதல் வருகை என்றாலும், வரவேற்கிறோம். உங்களுக்கு வசதியாக இருக்க உதவுவோம்; கேள்விகள் இருந்தால் பதிலளிப்போம்."
            />
            <ExpectCard
              titleEn="A simple, calm service"
              titleTa="எளிய, அமைதியான ஆராதனை"
              bodyEn="A service focused on Jesus, with clear teaching and encouragement for everyday life."
              bodyTa="இயேசுவை மையமாகக் கொண்ட ஆராதனை; தெளிவான போதனையும் தினசரி வாழ்க்கைக்கான ஊக்கமும்."
            />
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <ExpectCard
              titleEn="Tamil & English"
              titleTa="தமிழ் & ஆங்கிலம்"
              bodyEn="We love being bilingual. You’ll find space for both languages and cultures."
              bodyTa="இருமொழி சபையாக இருப்பதில் மகிழ்ச்சி. இரு மொழிகளுக்கும் பண்பாடுகளுக்கும் இடம் உள்ளது."
            />
            <ExpectCard
              titleEn="Families and youth are welcome"
              titleTa="குடும்பங்களும் இளைஞர்களும் வரவேற்கப்படுகிறார்கள்"
              bodyEn="Kids, youth, and newcomers are always welcome. Come as you are."
              bodyTa="குழந்தைகள், இளைஞர்கள், புதியவர்கள் அனைவரும் அன்புடன் வரவேற்கப்படுகிறார்கள். நீங்கள் இருப்பதுபோலவே வாருங்கள்."
            />
          </div>
        </div>
      </Container>
    </>
  )
}

function InfoCard({
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

function ExpectCard({
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
    <section className="rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-6">
      <h3 className="text-base font-semibold text-churchBlue">{titleEn}</h3>
      <p className="mt-1 text-sm text-churchBlue/70 font-tamil">{titleTa}</p>
      <p className="mt-3 text-sm text-churchBlue/75">{bodyEn}</p>
      <p className="mt-2 text-sm text-churchBlue/70 font-tamil">{bodyTa}</p>
    </section>
  )
}
