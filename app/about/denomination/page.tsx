import type { Metadata } from "next"
import Link from "next/link"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { denominationDetails } from "@/lib/denomination"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Denomination",
  description: "Information about our church affiliation and leadership.",
  path: "/about/denomination",
})

export default function DenominationPage() {
  return (
    <>
      <PageHeader
        titleEn="Denomination"
        titleTa="மத இணைப்பு"
        descriptionEn="Our affiliation, accountability, and leadership structure."
        descriptionTa="எங்கள் இணைப்பு, பொறுப்புணர்வு, மற்றும் தலைமைக் கட்டமைப்பு."
      />

      <section className="bg-white">
        <Container className="section-padding">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <div className="rounded-3xl border border-churchBlue/10 bg-white p-8 shadow-glow">
                <div className="section-kicker">
                  <Lang en="Affiliation" ta="இணைப்பு" taClassName="font-tamil" />
                </div>
                <h2 className="section-heading mt-2">
                  <Lang en="Denomination & oversight" ta="மத இணைப்பு மற்றும் கண்காணிப்பு" taClassName="font-tamil" />
                </h2>
                <p className="mt-3 text-sm text-churchBlue/70 sm:text-base">
                  <Lang
                    en="A transparent overview of our affiliation, leadership, and accountability."
                    ta="எங்கள் இணைப்பு, தலைமைக் கட்டமைப்பு, மற்றும் பொறுப்புணர்வைத் தெளிவாக அறிமுகப்படுத்தும் தொகுப்பு."
                    taClassName="font-tamil"
                  />
                </p>

                <div className="mt-8 space-y-4">
                  {denominationDetails.map((item, idx) => (
                    <div key={`${item.titleEn}-${idx}`} className="rounded-2xl border border-churchBlue/10 bg-white p-6">
                      <h3 className="text-base font-semibold tracking-tight text-churchBlue">
                        <Lang en={item.titleEn} ta={item.titleTa} taClassName="font-tamil" />
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                        <Lang en={item.bodyEn} ta={item.bodyTa} taClassName="font-tamil" />
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {[
                    {
                      enTitle: "Bible-based",
                      taTitle: "வேதாகம அடிப்படை",
                      enBody: "Scripture shapes our teaching, worship, and direction.",
                      taBody: "எங்கள் போதனை, ஆராதனை, மற்றும் திசை அனைத்திற்கும் வேதாகமமே அடிப்படை.",
                    },
                    {
                      enTitle: "Jesus-centred",
                      taTitle: "இயேசு மையம்",
                      enBody: "We keep the gospel and the person of Christ at the centre.",
                      taBody: "சுவிசேஷமும் கிறிஸ்துவின் நபரும் எங்கள் சபை வாழ்வின் மையமாக இருக்கின்றனர்.",
                    },
                    {
                      enTitle: "Accountable leadership",
                      taTitle: "பொறுப்புள்ள தலைமை",
                      enBody: "Leadership, care, and stewardship are handled with integrity.",
                      taBody: "தலைமை, பராமரிப்பு, மற்றும் நற்பரிபாலனம் அனைத்தும் நேர்மையுடன் நடத்தப்படுகின்றன.",
                    },
                  ].map((item) => (
                    <div key={item.enTitle} className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-5">
                      <div className="text-sm font-semibold text-churchBlue">
                        <Lang en={item.enTitle} ta={item.taTitle} taClassName="font-tamil" />
                      </div>
                      <p className="mt-2 text-sm text-churchBlue/70">
                        <Lang en={item.enBody} ta={item.taBody} taClassName="font-tamil" />
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-6">
                  <div className="text-sm font-semibold text-churchBlue">
                    <Lang en="How this shapes church life" ta="இது சபை வாழ்வை எப்படி வடிவமைக்கிறது" taClassName="font-tamil" />
                  </div>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-churchBlue/75 sm:text-base">
                    <li>
                      <Lang
                        en="We preach from Scripture and seek to apply it clearly to daily life."
                        ta="வேதாகமத்திலிருந்து பிரசங்கித்து, அதை அன்றாட வாழ்க்கைக்கு தெளிவாகப் பயன்படுத்த முயல்கிறோம்."
                        taClassName="font-tamil"
                      />
                    </li>
                    <li>
                      <Lang
                        en="We aim for worship that is Christ-honouring, prayerful, and accessible to families."
                        ta="கிறிஸ்துவை மகிமைப்படுத்தும், ஜெபமிக்க, மற்றும் குடும்பங்களுக்கு ஏற்ற ஆராதனையை நோக்கமாகக் கொள்கிறோம்."
                        taClassName="font-tamil"
                      />
                    </li>
                    <li>
                      <Lang
                        en="We value pastoral care, integrity in leadership, and healthy church community."
                        ta="மேய்ப்புப் பராமரிப்பு, தலைமையின் நேர்மை, மற்றும் ஆரோக்கியமான சபைச் சமூகத்தை மதிக்கிறோம்."
                        taClassName="font-tamil"
                      />
                    </li>
                  </ul>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/about/beliefs" className="btn btn-md btn-primary">
                    <Lang en="Read our beliefs" ta="எங்கள் நம்பிக்கைகள்" taClassName="font-tamil" />
                  </Link>
                  <Link href="/learn/community-safety" className="btn btn-md btn-secondary">
                    <Lang en="Community safety" ta="சமூக பாதுகாப்பு" taClassName="font-tamil" />
                  </Link>
                  <Link href="/contact" className="btn btn-md btn-secondary">
                    <Lang en="Contact leadership" ta="தலைமையுடன் தொடர்புகொள்ளுங்கள்" taClassName="font-tamil" />
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
