import type { Metadata } from "next"

import Link from "next/link"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Community Safety",
  description: "Our commitment to safety, care, and a respectful environment.",
  path: "/learn/community-safety",
})

export default function CommunitySafetyPage() {
  const policies: Array<{ titleEn: string; titleTa: string; bodyEn: string; bodyTa: string }> = [
    {
      titleEn: "Children & youth safety",
      titleTa: "குழந்தைகள் & இளைஞர் பாதுகாப்பு",
      bodyEn: "We aim to provide a safe, supervised environment. Volunteers may be asked to complete screening and follow clear check-in/check-out procedures.",
      bodyTa: "பாதுகாப்பான மற்றும் மேற்பார்வையுள்ள சூழலை வழங்க விரும்புகிறோம். தன்னார்வலர்களுக்கு சரிபார்ப்பு மற்றும் தெளிவான check-in/check-out நடைமுறை தேவைப்படலாம்.",
    },
    {
      titleEn: "Volunteer screening & training",
      titleTa: "தன்னார்வலர் சரிபார்ப்பு & பயிற்சி",
      bodyEn: "Some roles require additional training and guidelines. We prioritize respect, confidentiality, and a healthy environment.",
      bodyTa: "சில பொறுப்புகளுக்கு கூடுதல் பயிற்சி மற்றும் வழிகாட்டல்கள் தேவை. மரியாதை, ரகசியம், மற்றும் ஆரோக்கியமான சூழலை முன்னிலை செய்கிறோம்.",
    },
    {
      titleEn: "Reporting concerns",
      titleTa: "கவலைகளை தெரிவிப்பது",
      bodyEn: "If you have a concern about safety or conduct, please contact a leader immediately. We take concerns seriously and will respond promptly.",
      bodyTa: "பாதுகாப்பு அல்லது நடத்தை பற்றிய கவலை இருந்தால் உடனே ஒரு தலைவரை தொடர்புகொள்ளுங்கள். நாங்கள் இதை முக்கியமாக எடுத்துக்கொண்டு விரைவாக பதிலளிப்போம்.",
    },
    {
      titleEn: "Respectful environment",
      titleTa: "மரியாதையுள்ள சூழல்",
      bodyEn: "We welcome people from many backgrounds. Harassment, intimidation, or abuse is not tolerated in our gatherings or communication.",
      bodyTa: "பல பின்னணியிலிருந்தும் மக்களை வரவேற்கிறோம். தொந்தரவு, அச்சுறுத்தல், அல்லது துஷ்பிரயோகம் எங்களுடைய கூடுகைகளிலும் தொடர்பிலும் அனுமதிக்கப்படாது.",
    },
    {
      titleEn: "Two-adult guideline",
      titleTa: "Two-adult guideline",
      bodyEn: "Whenever possible, we use a two-adult guideline for kids/youth spaces to promote safety, transparency, and healthy boundaries.",
      bodyTa: "Whenever possible, we use a two-adult guideline for kids/youth spaces to promote safety, transparency, and healthy boundaries.",
    },
    {
      titleEn: "Medical & emergency procedures",
      titleTa: "Medical & emergency procedures",
      bodyEn: "If there is an emergency, our team will follow a clear plan for contacting guardians and/or emergency services as needed.",
      bodyTa: "If there is an emergency, our team will follow a clear plan for contacting guardians and/or emergency services as needed.",
    },
  ]

  return (
    <>
      <PageHeader
        titleEn="Community Safety"
        titleTa="பாதுகாப்பு"
        descriptionEn="Policies and practices to create a safe and welcoming environment."
        descriptionTa="பாதுகாப்பான மற்றும் வரவேற்கும் சூழலுக்கான நடைமுறைகள்"
      />

      <section className="bg-white">
        <Container className="section-padding">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div className="rounded-3xl border border-churchBlue/10 bg-white p-8 shadow-glow">
                <div className="section-kicker">
                  <Lang en="Care" ta="அக்கறை" taClassName="font-tamil" />
                </div>
                <h2 className="section-heading mt-2">
                  <Lang en="Safe and welcoming" ta="பாதுகாப்பான மற்றும் வரவேற்கும்" taClassName="font-tamil" />
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-churchBlue/70 sm:text-base">
                  <Lang
                    en="We want every person to feel safe, respected, and cared for. These guidelines explain how we approach safety, volunteers, and concerns."
                    ta="ஒவ்வொருவரும் பாதுகாப்பாகவும் மரியாதையுடனும் அக்கறையுடனும் இருக்க வேண்டும் என்பது எங்கள் விருப்பம். இந்த வழிகாட்டல்கள் பாதுகாப்பு, தன்னார்வம், மற்றும் கவலைகளை எப்படி பார்க்கிறோம் என்பதைக் கூறுகின்றன."
                    taClassName="font-tamil"
                  />
                </p>

                <div className="mt-8 space-y-4">
                  {policies.map((p) => (
                    <div key={p.titleEn} className="rounded-2xl border border-churchBlue/10 bg-white p-6">
                      <div className="text-base font-semibold tracking-tight text-churchBlue">
                        <Lang en={p.titleEn} ta={p.titleTa} taClassName="font-tamil" />
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                        <Lang en={p.bodyEn} ta={p.bodyTa} taClassName="font-tamil" />
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-6">
                  <h3 className="text-lg font-semibold tracking-tight text-churchBlue">
                    <Lang en="Need help right now?" ta="உடனே உதவி வேண்டுமா?" taClassName="font-tamil" />
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                    <Lang
                      en="If you need pastoral care, prayer, or support, please reach out. We will respond as soon as we can."
                      ta="மேய்ப்பர் அக்கறை, ஜெபம், அல்லது உதவி தேவைப்பட்டால் தயவுசெய்து தொடர்பு கொள்ளுங்கள். எங்களால் முடிந்தவுடன் பதிலளிப்போம்."
                      taClassName="font-tamil"
                    />
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link href="/contact" className="btn btn-md btn-primary">
                      <Lang en="Contact us" ta="தொடர்பு கொள்ளுங்கள்" taClassName="font-tamil" />
                    </Link>
                    <Link href="/care" className="btn btn-md btn-secondary">
                      <Lang en="Request care" ta="அக்கறை கோருங்கள்" taClassName="font-tamil" />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  )
}
