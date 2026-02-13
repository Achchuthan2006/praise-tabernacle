import type { Metadata } from "next"

import Link from "next/link"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Baptism",
  description: "Learn about baptism at Praise Tabernacle.",
  path: "/learn/baptism",
})

export default function BaptismPage() {
  const faqs: Array<{ qEn: string; qTa: string; aEn: string; aTa: string }> = [
    {
      qEn: "Who is baptism for?",
      qTa: "ஞானஸ்நானம் யாருக்காக?",
      aEn: "Baptism is for believers who have put their trust in Jesus Christ and want to publicly follow Him.",
      aTa: "இயேசு கிறிஸ்துவில் விசுவாசம் வைத்த விசுவாசிகளுக்கான பொது அறிவிப்பு படியாக ஞானஸ்நானம் இருக்கிறது.",
    },
    {
      qEn: "Do I need to take a class first?",
      qTa: "முதலில் வகுப்பு எடுக்க வேண்டுமா?",
      aEn: "Yes. We recommend a short baptism class so you can understand the meaning and the next steps.",
      aTa: "ஆம். அதன் அர்த்தத்தையும் அடுத்த படிகளையும் தெளிவாக அறிய ஒரு குறுகிய ஞானஸ்நான வகுப்பை பரிந்துரைக்கிறோம்.",
    },
    {
      qEn: "What should I bring?",
      qTa: "நான் என்ன கொண்டு வர வேண்டும்?",
      aEn: "A change of clothes, a towel, and anything you need to feel comfortable. We will guide you through everything.",
      aTa: "மாற்று உடை, துணி, மேலும் உங்களுக்கு வசதியாக வேண்டிய பொருட்கள். அனைத்தையும் நாங்கள் வழிகாட்டுவோம்.",
    },
    {
      qEn: "When are baptisms scheduled?",
      qTa: "ஞானஸ்நானம் எப்போது?",
      aEn: "Baptisms are scheduled throughout the year based on interest and service calendar. Contact us and we will share the next available date.",
      aTa: "ஞானஸ்நானம் ஆண்டுபூர்வமாக திட்டமிடப்படும். எங்களை தொடர்பு கொள்ளுங்கள் — அடுத்த தேதியை பகிர்வோம்.",
    },
    {
      qEn: "What if I was baptized before?",
      qTa: "முன்பே ஞானஸ்நானம் பெற்றிருந்தால்?",
      aEn: "If you have questions about a previous baptism, we would love to talk and help you understand your next step.",
      aTa: "முன்பே ஞானஸ்நானம் பெற்றிருந்தால், உங்களுக்கு அடுத்த படி என்னவென்பதை புரிந்து கொள்ள நாங்கள் உதவுவோம்.",
    },
  ]

  return (
    <>
      <PageHeader
        titleEn="Baptism"
        titleTa="ஞானஸ்நானம்"
        descriptionEn="What baptism means and how to take the next step."
        descriptionTa="ஞானஸ்நானத்தின் அர்த்தமும் அடுத்த படியும்"
      />

      <section className="bg-white">
        <Container className="section-padding">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div className="rounded-3xl border border-churchBlue/10 bg-white p-8 shadow-glow">
                <div className="section-kicker">
                  <Lang en="Next Step" ta="அடுத்த படி" taClassName="font-tamil" />
                </div>
                <h2 className="section-heading mt-2">
                  <Lang en="Why baptism matters" ta="ஞானஸ்நானம் ஏன் முக்கியம்" taClassName="font-tamil" />
                </h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                  <p>
                    <Lang
                      en="Baptism is a joyful, public step of obedience that follows faith in Jesus Christ. It is a sign of new life and a commitment to walk with Him."
                      ta="இயேசு கிறிஸ்துவில் விசுவாசம் வைத்த பின், கீழ்ப்படிதலாக எடுக்கப்படும் மகிழ்ச்சியான பொது படி தான் ஞானஸ்நானம். இது புதிய வாழ்க்கையின் அடையாளமும், அவரை பின்பற்றும் அர்ப்பணிப்பும் ஆகும்."
                      taClassName="font-tamil"
                    />
                  </p>
                  <p>
                    <Lang
                      en="If you're exploring faith or you're not sure where you stand, you're still welcome. We can talk, pray, and help you take the next step at your pace."
                      ta="நீங்கள் விசுவாசத்தை ஆராய்கிறவராக இருந்தாலும் அல்லது உறுதி இல்லாவிட்டாலும் நீங்கள் வரவேற்கப்படுகிறீர்கள். நாம் பேசலாம், ஜெபிக்கலாம், உங்கள் வேகத்தில் அடுத்த படியை எடுக்க உதவலாம்."
                      taClassName="font-tamil"
                    />
                  </p>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {[
                    {
                      titleEn: "1) Connect",
                      titleTa: "1) தொடர்பு கொள்ளுங்கள்",
                      bodyEn: "Send us a message so we can learn your story.",
                      bodyTa: "உங்கள் கதையை அறிய எங்களுக்கு செய்தி அனுப்புங்கள்.",
                    },
                    {
                      titleEn: "2) Prepare",
                      titleTa: "2) தயாராகுங்கள்",
                      bodyEn: "Join a short baptism class and ask questions.",
                      bodyTa: "ஒரு குறுகிய வகுப்பில் கலந்து கொண்டு கேள்விகள் கேளுங்கள்.",
                    },
                    {
                      titleEn: "3) Be Baptized",
                      titleTa: "3) ஞானஸ்நானம் பெறுங்கள்",
                      bodyEn: "We will schedule a service and celebrate with you.",
                      bodyTa: "ஒரு சேவையில் ஏற்பாடு செய்து உங்களுடன் மகிழ்வோம்.",
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
                    <Lang en="Frequently asked questions" ta="அடிக்கடி கேட்கப்படும் கேள்விகள்" taClassName="font-tamil" />
                  </h3>
                  <div className="mt-5 space-y-4">
                    {faqs.map((item) => (
                      <div key={item.qEn} className="rounded-2xl border border-churchBlue/10 bg-white p-5">
                        <div className="text-sm font-semibold text-churchBlue">
                          <Lang en={item.qEn} ta={item.qTa} taClassName="font-tamil" />
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                          <Lang en={item.aEn} ta={item.aTa} taClassName="font-tamil" />
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/contact" className="btn btn-md btn-primary">
                    <Lang en="Request baptism info" ta="ஞானஸ்நான விவரம் கேளுங்கள்" taClassName="font-tamil" />
                  </Link>
                  <Link href="/visit" className="btn btn-md btn-secondary">
                    <Lang en="Plan your visit" ta="வருகையை திட்டமிடுங்கள்" taClassName="font-tamil" />
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
