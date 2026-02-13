import type { Metadata } from "next"
import Link from "next/link"

import Lang from "@/components/language/Lang"
import NewVisitorJourney from "@/components/NewVisitorJourney"
import ServiceSchedule from "@/components/ServiceSchedule"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "I'm New",
  description:
    "A simple guide for your first visit to Praise Tabernacle Mississauga - what to expect, virtual tour, FAQs, and next steps.",
  path: "/im-new",
})

export default function ImNewPage() {
  const mapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.addressLines.join(", "))}`

  return (
    <>
      <PageHeader
        titleEn="I'm New"
        titleTa="நான் புதிது"
        descriptionEn="Everything you need for a comfortable first Sunday - what to expect, a quick tour, FAQs, and next steps."
        descriptionTa="முதலாவது ஞாயிற்றுக்கிழமையில் நிம்மதியாக இருக்க உதவும் அனைத்தும் - என்ன எதிர்பார்க்கலாம், ஒரு சுற்றுப்பார்வை, கேள்விகள் & பதில்கள், அடுத்த படிகள்."
      />

      <ServiceSchedule />

      <section className="border-t border-churchBlue/10 bg-white">
        <Container className="section-padding">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <div>
                <div className="section-kicker">
                  <Lang en="Start here" ta="தொடக்கம்" taClassName="font-tamil" />
                </div>
                <h2 className="section-heading mt-2">
                  <Lang en="Quick links for your first visit" ta="முதலாவது வருகைக்கான விரைவு இணைப்புகள்" taClassName="font-tamil" />
                </h2>
                <p className="mt-3 max-w-2xl text-sm text-churchBlue/70 sm:text-base">
                  <Lang
                    en="Need directions, want to watch online first, or have a question? Use the links below."
                    ta="வழிமுறைகள், முதலில் ஆன்லைனில் பார்க்க, அல்லது கேள்வி கேட்க வேண்டுமா? கீழுள்ள இணைப்புகளை பயன்படுத்துங்கள்."
                    taClassName="font-tamil"
                  />
                </p>
              </div>
            </Reveal>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <a href={mapsUrl} target="_blank" rel="noreferrer" className="btn btn-md btn-primary">
                <Lang en="Get directions" ta="வழிமுறைகள்" taClassName="font-tamil" />
              </a>
              <Link href="/visit" className="btn btn-md btn-secondary">
                <Lang en="Plan your visit" ta="வருகையை திட்டமிடுங்கள்" taClassName="font-tamil" />
              </Link>
              <Link href="/watch" className="btn btn-md btn-secondary">
                <Lang en="Watch online" ta="ஆன்லைனில் பார்க்க" taClassName="font-tamil" />
              </Link>
              <Link href="/contact" className="btn btn-md btn-secondary">
                <Lang en="Ask a question" ta="கேள்வி கேளுங்கள்" taClassName="font-tamil" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <NewVisitorJourney />
    </>
  )
}

