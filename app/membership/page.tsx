import type { Metadata } from "next"
import Link from "next/link"

import Container from "@/components/ui/Container"
import Lang from "@/components/language/Lang"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Membership",
  description: "How to become a member and take your next step at Praise Tabernacle.",
  path: "/membership",
})

export default function MembershipPage() {
  return (
    <>
      <PageHeader
        titleEn="Membership"
        titleTa="உறுப்பினர்"
        descriptionEn="Learn about membership and the membership class schedule."
        descriptionTa="உறுப்பினர் பற்றியும் வகுப்பு பற்றியும் அறியுங்கள்"
      />

      <section className="bg-white">
        <Container className="section-padding">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div className="rounded-3xl border border-churchBlue/10 bg-white p-8 shadow-glow">
                <div className="section-kicker">
                  <Lang en="Next Steps" ta="அடுத்த படிகள்" taClassName="font-tamil" />
                </div>
                <h2 className="section-heading mt-2">
                  <Lang en="Membership" ta="உறுப்பினர்" taClassName="font-tamil" />
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                  <Lang
                    en="Membership is a simple step for those who want to belong to the life of our church family with clarity, care, and accountability."
                    ta="தெளிவு, அக்கறை, மற்றும் பொறுப்புணர்வுடன் எங்கள் சபை குடும்ப வாழ்க்கையில் சேர விரும்புபவர்களுக்கு உறுப்பினர் என்பது ஒரு எளிய அடுத்த படி."
                    taClassName="font-tamil"
                  />
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {[
                    {
                      titleEn: "1) Attend",
                      titleTa: "1) கலந்து கொள்ளுங்கள்",
                      bodyEn: "Join a membership class and hear our story.",
                      bodyTa: "உறுப்பினர் வகுப்பில் கலந்து கொண்டு எங்கள் கதையை கேளுங்கள்.",
                    },
                    {
                      titleEn: "2) Connect",
                      titleTa: "2) இணைக",
                      bodyEn: "Ask questions and meet leaders and members.",
                      bodyTa: "கேள்விகள் கேட்டு தலைவர்கள்/உறுப்பினர்களை சந்திக்கவும்.",
                    },
                    {
                      titleEn: "3) Commit",
                      titleTa: "3) அர்ப்பணியுங்கள்",
                      bodyEn: "Take your next step with prayer and guidance.",
                      bodyTa: "ஜெபமும் வழிகாட்டலுடனும் அடுத்த படியை எடுக்கவும்.",
                    },
                  ].map((step) => (
                    <div key={step.titleEn} className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-5">
                      <div className="text-sm font-semibold text-churchBlue">
                        <Lang en={step.titleEn} ta={step.titleTa} taClassName="font-tamil" />
                      </div>
                      <div className="mt-2 text-sm text-churchBlue/75">
                        <Lang en={step.bodyEn} ta={step.bodyTa} taClassName="font-tamil" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 border-t border-churchBlue/10 pt-8">
                  <h3 className="text-lg font-semibold tracking-tight text-churchBlue">
                    <Lang en="What the class covers" ta="வகுப்பு என்ன கற்பிக்கும்" taClassName="font-tamil" />
                  </h3>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-churchBlue/75 sm:text-base">
                    {[
                      { en: "Our story and mission", ta: "எங்கள் கதை மற்றும் பணி" },
                      { en: "Beliefs and values", ta: "நம்பிக்கைகள் மற்றும் மதிப்புகள்" },
                      { en: "How to get connected (groups, serving, care)", ta: "இணைவது எப்படி (குழுக்கள், சேவை, அக்கறை)" },
                      { en: "Practical next steps", ta: "நடைமுறை அடுத்த படிகள்" },
                    ].map((item) => (
                      <li key={item.en}>
                        <Lang en={item.en} ta={item.ta} taClassName="font-tamil" />
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10 border-t border-churchBlue/10 pt-8">
                  <h3 className="text-lg font-semibold tracking-tight text-churchBlue">
                    <Lang en="Membership expectations" ta="Membership expectations" taClassName="font-tamil" />
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                    <Lang
                      en="Membership is not about perfection — it’s about participation. These are simple expectations that help our church stay healthy and connected."
                      ta="Membership is not about perfection — it’s about participation. These are simple expectations that help our church stay healthy and connected."
                      taClassName="font-tamil"
                    />
                  </p>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-churchBlue/75 sm:text-base">
                    {[
                      "Gather regularly for worship and remain connected to the church family",
                      "Pursue spiritual growth through Scripture, prayer, and discipleship",
                      "Serve with a team according to your gifts and season of life",
                      "Give generously as God enables (with integrity and joy)",
                      "Protect unity — practice forgiveness, honor, and healthy communication",
                    ].map((item) => (
                      <li key={item}>
                        <Lang en={item} ta={item} taClassName="font-tamil" />
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/ministries/membership" className="btn btn-md btn-primary">
                    <Lang en="View membership class" ta="உறுப்பினர் வகுப்பு" taClassName="font-tamil" />
                  </Link>
                  <Link href="/contact" className="btn btn-md btn-secondary">
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
