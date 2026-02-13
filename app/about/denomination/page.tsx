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
        descriptionTa="எங்கள் இணைப்பு, பொறுப்புணர்வு, தலைமை அமைப்பு"
      />

      <section className="bg-white">
        <Container className="section-padding">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div className="rounded-3xl border border-churchBlue/10 bg-white p-8 shadow-glow">
                <div className="section-kicker">
                  <Lang en="Affiliation" ta="இணைப்பு" />
                </div>
                <h2 className="section-heading mt-2">
                  <Lang en="Denomination & oversight" ta="மத இணைப்பு & கண்காணிப்பு" />
                </h2>
                <p className="mt-3 text-sm text-churchBlue/70 sm:text-base">
                  <Lang
                    en="A transparent overview of our affiliation, leadership, and accountability."
                    ta="எங்கள் இணைப்பு, தலைமையிடம், மற்றும் பொறுப்புணர்வை தெளிவாக அறிமுகப்படுத்தல்."
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

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/about/beliefs" className="btn btn-md btn-primary">
                    <Lang en="Read our beliefs" ta="நம்பிக்கைகள்" taClassName="font-tamil" />
                  </Link>
                  <Link href="/learn/community-safety" className="btn btn-md btn-secondary">
                    <Lang en="Community safety" ta="பாதுகாப்பு" taClassName="font-tamil" />
                  </Link>
                  <Link href="/contact" className="btn btn-md btn-secondary">
                    <Lang en="Contact leadership" ta="தொடர்பு கொள்ளுங்கள்" taClassName="font-tamil" />
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
