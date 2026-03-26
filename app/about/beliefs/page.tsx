import type { Metadata } from "next"
import Link from "next/link"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Our Beliefs",
  description: "A full statement of faith and practice for Praise Tabernacle.",
  path: "/about/beliefs",
})

type Section = {
  titleEn: string
  titleTa: string
  paragraphsEn: string[]
  paragraphsTa?: string[]
}

const beliefSections: Section[] = [
  {
    titleEn: "1. The Triune God - The Trinity",
    titleTa: "1. திரியேக தேவன் - திரித்துவம்",
    paragraphsEn: [
      "We believe that the one and only true God is Spirit. We believe in the deity of the Father: self-existent, infinite, eternal, unchangeable in His being; perfect in holiness, love, justice, goodness, wisdom, and truth; omnipotent, omniscient, and omnipresent; Creator and Sustainer of all things, visible and invisible; both immanent and transcendent to creation; one in substance and co-equal in power and glory with the Son and with the Holy Spirit.",
      "We believe in the deity of the Lord Jesus Christ, the Son of God, and in His eternal generation from the Father; in His incarnation by which He was conceived by the Holy Spirit and born of the Virgin Mary, thus uniting the divine and human natures in their completeness into the unique person of the Lord Jesus Christ; in His sinless life and miraculous works; in His vicarious death to make atonement for the sins of the world; in His bodily resurrection and ascension to the right hand of the Father; in His sovereign power and Lordship; in His present mediatorial ministry as the believer's Advocate; and in His imminent, personal, and visible coming in power and glory.",
      "We believe in the deity of the Holy Spirit, the third person of the Trinity, proceeding from the Father and sent by the Son; that He is of one substance, majesty, and glory with the Father and the Son, very and eternally God; and that His office and work is to reprove the world of sin, of righteousness, and of judgment; to regenerate such as repent of their sins and believe on the Lord Jesus Christ; and to endue them with power.",
    ],
  },
  {
    titleEn: "2. The Bible",
    titleTa: "2. வேதாகமம்",
    paragraphsEn: [
      "We believe the Bible to be the Word of God, in 66 books, 39 in the Old Testament and 27 in the New Testament.",
      "We believe that, as such, it is inerrant in the manuscripts as originally given, and is the unchanging authority in all matters of faith and practice.",
    ],
  },
  {
    titleEn: "3. Man",
    titleTa: "3. மனிதன்",
    paragraphsEn: [
      "His creation: by an act of God Himself, not by evolution. As such, man was created in the image of God.",
      "His fall: deluded by Satan, man voluntarily disobeyed the positive command of God. The entire human race was corrupted, leaving man without the will or the power to turn to God by himself, destined to remain in his sin forever.",
      "His redemption: only as man accepts the voluntary offering that Jesus made of Himself on the cross at Calvary as a perfect sacrifice for sin. Jesus bore sin's curse and tasted death for every person.",
    ],
  },
  {
    titleEn: "4. Salvation",
    titleTa: "4. இரட்சிப்பு",
    paragraphsEn: [
      "All people are guilty before God. We are commanded to repent. This means that we should confess and forsake sin.",
      "Faith must accompany repentance and is the means whereby a person fully believes the promises of God and rests upon the complete atoning work of Jesus Christ.",
      "Justification takes place whereby the sinner's standing before God is changed; whilst regeneration at the same time changes the sinner's nature before God.",
    ],
  },
  {
    titleEn: "5. The Spirit-Filled Life",
    titleTa: "5. ஆவியினால் நிரம்பிய வாழ்க்கை",
    paragraphsEn: [
      "A life that is victorious over the power of sin, the world, the flesh, and the devil is provided for each believer through the death and resurrection of the Lord Jesus Christ.",
      "He promises to baptize, immerse, or fill us with His Holy Spirit. We are commanded in Ephesians 5:18 to be filled with the Spirit and in Romans 12:1 to present our bodies.",
      "Available for the believer's personal life and character is the fruit of the Spirit, and for spiritual warfare, witness, and worship are the gifts of the Spirit.",
    ],
  },
  {
    titleEn: "6. Resurrection and Glorification",
    titleTa: "6. உயிர்த்தெழுதல் மற்றும் மகிமைப்படுதல்",
    paragraphsEn: [
      "We believe in the bodily resurrection of the Lord Jesus Christ, and that because He lives, we too shall live.",
      "The Scriptures teach that at the return of the Lord Jesus, the bodies of the righteous dead will be raised, and the living believers will be caught up with them to meet the Lord in the air.",
      "All will then have literal, spiritual, and immortal bodies like Christ's own glorious body.",
    ],
  },
  {
    titleEn: "7. The Second Coming of the Lord Jesus Christ",
    titleTa: "7. கர்த்தராகிய இயேசு கிறிஸ்துவின் இரண்டாம் வருகை",
    paragraphsEn: [
      "Although actual detailed interpretations differ, the hope of the church is the personal, bodily, and visible return of the Lord Jesus Christ, who will descend from heaven in order to institute His total rule and kingdom on a new earth and new heavens.",
      "Although believers have been judged as sinners and forgiven at the cross of Christ, they will appear before the judgment seat of Christ to be judged for their deeds and to receive rewards for service.",
      "Every unsaved person will appear at the judgment of the great white throne. There is no second chance.",
    ],
  },
]

const practiceSections: Section[] = [
  {
    titleEn: "1. Baptism by Immersion",
    titleTa: "1. முழுகும் ஞானஸ்நானம்",
    paragraphsEn: [
      "Baptism by immersion for believers was introduced by the Lord Jesus Himself as the evidence a believer gives to the church, the world, and the devil that he or she is committed to Jesus.",
      "It is also a wonderful symbol of the believer's past life being buried, and a new life rising in its place.",
    ],
  },
  {
    titleEn: "2. Breaking of Bread",
    titleTa: "2. அப்பம் உடைத்தல்",
    paragraphsEn: [
      "Communion, or the Lord's Table, was introduced by the Lord Jesus to His disciples with the command that they do this as often as they ate the bread and drank the cup to remember His death and sacrifice.",
    ],
  },
  {
    titleEn: "3. Healing and the Laying on of Hands",
    titleTa: "3. சுகமளித்தல் மற்றும் கைகளை வைத்துப் ஜெபித்தல்",
    paragraphsEn: [
      "Healing and the laying on of hands are provided for not only by example when Jesus sent His disciples out, but more specifically for the church in James chapter 5 where anointing with oil is indicated at the same time as the laying on of the elders' hands.",
      "We believe that the atonement provided for physical as well as spiritual healing.",
    ],
  },
  {
    titleEn: "4. The Lord's Day",
    titleTa: "4. கர்த்தருடைய நாள்",
    paragraphsEn: [
      "The first day of the week, Sunday, is to be set aside as a day of worship, praise, and service for the Lord as we remember the first day of resurrection.",
    ],
  },
  {
    titleEn: "5. Giving",
    titleTa: "5. கொடையளித்தல்",
    paragraphsEn: [
      "The Christian ought to lay aside each week as God has prospered him or her, so that the Lord's work may be supported through the tithes and offerings of His people.",
    ],
  },
  {
    titleEn: "6. Dedication of Children and Parents",
    titleTa: "6. குழந்தைகள் மற்றும் பெற்றோர் அர்ப்பணிப்பு",
    paragraphsEn: [
      "Dedication of children and their parents replaces infant baptism for us who practice baptism by immersion.",
    ],
  },
  {
    titleEn: "7. Conduct",
    titleTa: "7. நடத்தை",
    paragraphsEn: [
      "It is inconsistent for a believer to injure the body with drugs, tobacco, or alcohol, or to engage in illicit sexual relationships.",
      "The believer must live a clean and upright life in a careless world.",
    ],
  },
]

function StatementSection({ section, soft = false }: { section: Section; soft?: boolean }) {
  return (
    <div className={["rounded-2xl border border-churchBlue/10 p-6", soft ? "bg-churchBlueSoft" : "bg-white"].join(" ")}>
      <h3 className="text-lg font-semibold tracking-tight text-churchBlue sm:text-xl">
        <Lang en={section.titleEn} ta={section.titleTa} taClassName="font-tamil" />
      </h3>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
        {section.paragraphsEn.map((paragraph, index) => (
          <p key={`${section.titleEn}-${index}`}>
            <Lang
              en={paragraph}
              ta={section.paragraphsTa?.[index] ?? paragraph}
              taClassName="font-tamil"
            />
          </p>
        ))}
      </div>
    </div>
  )
}

export default function BeliefsPage() {
  return (
    <>
      <PageHeader
        titleEn="Our Beliefs"
        titleTa="எங்கள் நம்பிக்கைகள்"
        descriptionEn="Our full statement of faith and expressions of faith in practice."
        descriptionTa="எங்கள் முழுமையான விசுவாச அறிக்கையும் நடைமுறையில் அதன் வெளிப்பாடுகளும்."
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
                  <Lang en="Statement of faith" ta="விசுவாச அறிக்கை" taClassName="font-tamil" />
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                  <Lang
                    en="These are the church beliefs you shared with us, now organized for clear reading on the site."
                    ta="நீங்கள் எங்களுடன் பகிர்ந்த சபை நம்பிக்கைகள் இவை; தளத்தில் தெளிவாகப் படிக்கும்படி ஒழுங்குபடுத்தப்பட்டுள்ளன."
                    taClassName="font-tamil"
                  />
                </p>

                <div className="mt-8 space-y-6">
                  {beliefSections.map((section, index) => (
                    <StatementSection key={section.titleEn} section={section} soft={index % 2 === 1} />
                  ))}
                </div>

                <div className="mt-10 border-t border-churchBlue/10 pt-8">
                  <div className="section-kicker">
                    <Lang en="Practice" ta="நடைமுறை" taClassName="font-tamil" />
                  </div>
                  <h2 className="section-heading mt-2">
                    <Lang en="Expressions of faith in practice" ta="நடைமுறையில் விசுவாசத்தின் வெளிப்பாடுகள்" taClassName="font-tamil" />
                  </h2>
                  <div className="mt-6 space-y-6">
                    {practiceSections.map((section, index) => (
                      <StatementSection key={section.titleEn} section={section} soft={index % 2 === 0} />
                    ))}
                  </div>
                </div>

                <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-churchBlue/80">
                  <Lang
                    en="Note: the English statement above reflects the exact belief content you provided. Tamil translation can be added next if you want us to localize this page fully."
                    ta="குறிப்பு: மேலுள்ள ஆங்கில அறிக்கை நீங்கள் வழங்கிய விசுவாச உள்ளடக்கத்தையே பிரதிபலிக்கிறது. விரும்பினால் அடுத்ததாக இந்தப் பக்கத்திற்கு முழு தமிழ் மொழிபெயர்ப்பையும் சேர்க்கலாம்."
                    taClassName="font-tamil"
                  />
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/about/denomination" className="btn btn-md btn-secondary">
                    <Lang en="Denomination & oversight" ta="மத இணைப்பு மற்றும் கண்காணிப்பு" taClassName="font-tamil" />
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
