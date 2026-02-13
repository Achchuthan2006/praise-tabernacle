import type { Metadata } from "next"
import Link from "next/link"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Our Beliefs",
  description: "A clear overview of what we believe at Praise Tabernacle.",
  path: "/about/beliefs",
})

type Bullet = { en: string; ta: string }
type Article = { titleEn: string; titleTa: string; bullets: Bullet[]; references?: string }

export default function BeliefsPage() {
  const articles: Article[] = [
    {
      titleEn: "1. God - Father, Son, and Holy Spirit",
      titleTa: "1. தேவன் - பிதா, குமாரன், பரிசுத்த ஆவியானவர்",
      bullets: [
        { en: "One God in three Persons", ta: "மூன்று நபர்களில் ஒரே தேவன்" },
        { en: "God is holy, loving, and faithful", ta: "தேவன் பரிசுத்தரும் அன்பும் விசுவாசமும் உள்ளவர்" },
      ],
      references: "Matthew 28:19; 2 Corinthians 13:14",
    },
    {
      titleEn: "2. The Bible",
      titleTa: "2. வேதாகமம்",
      bullets: [
        { en: "The Bible is God's Word and our authority for faith and life", ta: "வேதாகமம் தேவனுடைய வார்த்தை; விசுவாசமும் வாழ்க்கையும் சார்ந்த அதிகாரம்" },
        { en: "We seek to understand and obey Scripture with humility", ta: "தாழ்மையுடன் வேதத்தை புரிந்து கீழ்ப்படிந்து நடக்க விரும்புகிறோம்" },
      ],
      references: "2 Timothy 3:16-17",
    },
    {
      titleEn: "3. Jesus Christ",
      titleTa: "3. இயேசு கிறிஸ்து",
      bullets: [
        { en: "Fully God and fully man", ta: "முழுமையாக தேவனும் முழுமையாக மனிதனும்" },
        { en: "His death and resurrection bring salvation and hope", ta: "அவரின் மரணமும் உயிர்த்தெழுதலும் இரட்சிப்பையும் நம்பிக்கையையும் தருகிறது" },
      ],
      references: "John 1:1-14; 1 Corinthians 15:3-4",
    },
    {
      titleEn: "4. Salvation",
      titleTa: "4. இரட்சிப்பு",
      bullets: [
        { en: "Salvation is by grace through faith in Jesus Christ", ta: "இயேசு கிறிஸ்துவில் விசுவாசம் மூலம் கிருபையால் இரட்சிப்பு" },
        { en: "We respond with repentance, trust, and a new life", ta: "மனந்திரும்புதல், நம்பிக்கை, புதிய வாழ்க்கை ஆகியவற்றால் பதிலளிக்கிறோம்" },
      ],
      references: "Ephesians 2:8-9; Romans 10:9-10",
    },
    {
      titleEn: "5. The Holy Spirit",
      titleTa: "5. பரிசுத்த ஆவியானவர்",
      bullets: [
        { en: "The Holy Spirit helps us follow Jesus and grow in holiness", ta: "இயேசுவை பின்பற்றவும் பரிசுத்தத்தில் வளரவும் பரிசுத்த ஆவியானவர் உதவுகிறார்" },
        { en: "The Spirit produces fruit and equips believers to serve", ta: "ஆவியானவர் கனியை உண்டாக்கி விசுவாசிகளை சேவைக்காக ஆயத்தப்படுத்துகிறார்" },
      ],
      references: "Galatians 5:22-23; 1 Corinthians 12",
    },
    {
      titleEn: "6. The Church",
      titleTa: "6. சபை",
      bullets: [
        { en: "The church is a family of believers centred on Jesus", ta: "இயேசுவை மையமாகக் கொண்ட விசுவாசிகளின் குடும்பம் தான் சபை" },
        { en: "We gather for worship, the Word, prayer, and community", ta: "ஆராதனை, வார்த்தை, ஜெபம், சமூக உறவு ஆகியவற்றிற்காக கூடுகிறோம்" },
      ],
      references: "Acts 2:42-47",
    },
    {
      titleEn: "7. The Return of Christ",
      titleTa: "7. கிறிஸ்துவின் திரும்ப வருதல்",
      bullets: [
        { en: "Jesus will return and make all things new", ta: "இயேசு திரும்ப வந்து அனைத்தையும் புதிதாக்குவார்" },
        { en: "We live with hope, readiness, and faithfulness", ta: "நம்பிக்கை, தயார் நிலை, விசுவாசம் ஆகியவற்றுடன் வாழ்கிறோம்" },
      ],
      references: "1 Thessalonians 4:16-18; Revelation 21:1-5",
    },
  ]

  const practices: Bullet[] = [
    { en: "Baptism for believers", ta: "விசுவாசிகளுக்கான ஞானஸ்நானம்" },
    { en: "Communion (Lord's Table)", ta: "திருவிருந்து (கர்த்தரின் பந்தி)" },
    { en: "Prayer gatherings and intercession", ta: "ஜெப கூடுகைகள் மற்றும் விண்ணப்ப ஜெபம்" },
    { en: "Generous giving and caring for people", ta: "தாராள கொடை மற்றும் அக்கறையுடன் சேவை" },
  ]

  return (
    <>
      <PageHeader
        titleEn="Our Beliefs"
        titleTa="நம்பிக்கைகள்"
        descriptionEn="Articles of faith and practice - a clear summary of what we believe."
        descriptionTa="நம்பிக்கை மற்றும் நடைமுறை - எங்கள் விசுவாசத்தின் தெளிவான சுருக்கம்."
      />

      <section className="bg-white">
        <Container className="section-padding">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <div className="rounded-3xl border border-churchBlue/10 bg-white p-8 shadow-glow">
                <div className="section-kicker">
                  <Lang en="Faith" ta="விசுவாசம்" taClassName="font-tamil" />
                </div>
                <h2 className="section-heading mt-2">
                  <Lang en="A simple statement" ta="ஒரு எளிய அறிக்கை" taClassName="font-tamil" />
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                  <Lang
                    en="These statements are intended to be clear and helpful. If you have a question, contact us and we will gladly talk with you."
                    ta="இவை தெளிவாகவும் பயனுள்ளதாகவும் இருக்கவே எழுதப்பட்டவை. உங்களுக்கு கேள்வி இருந்தால் தொடர்பு கொள்ளுங்கள்; நாங்கள் மகிழ்ச்சியுடன் பேசுவோம்."
                    taClassName="font-tamil"
                  />
                </p>

                <div className="mt-8 space-y-6">
                  {articles.map((article) => (
                    <div key={article.titleEn} className="rounded-2xl border border-churchBlue/10 bg-white p-6">
                      <h3 className="text-lg font-semibold tracking-tight text-churchBlue sm:text-xl">
                        <Lang en={article.titleEn} ta={article.titleTa} taClassName="font-tamil" />
                      </h3>
                      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-churchBlue/75 sm:text-base">
                        {article.bullets.map((b) => (
                          <li key={b.en}>
                            <Lang en={b.en} ta={b.ta} taClassName="font-tamil" />
                          </li>
                        ))}
                      </ul>
                      {article.references ? (
                        <div className="mt-4 text-xs font-semibold tracking-wide text-churchBlue/60">
                          <Lang en="References:" ta="வேத இடங்கள்:" taClassName="font-tamil" /> {article.references}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>

                <div className="mt-10 border-t border-churchBlue/10 pt-8">
                  <h3 className="text-lg font-semibold tracking-tight text-churchBlue sm:text-xl">
                    <Lang en="Expressions of faith in practice" ta="நடைமுறையில் விசுவாசம்" taClassName="font-tamil" />
                  </h3>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-churchBlue/75 sm:text-base">
                    {practices.map((p) => (
                      <li key={p.en}>
                        <Lang en={p.en} ta={p.ta} taClassName="font-tamil" />
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/about/denomination" className="btn btn-md btn-secondary">
                    <Lang en="Denomination & oversight" ta="மத இணைப்பு & கண்காணிப்பு" taClassName="font-tamil" />
                  </Link>
                  <Link href="/contact" className="btn btn-md btn-primary">
                    <Lang en="Ask a question" ta="கேள்வி கேளுங்கள்" taClassName="font-tamil" />
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

