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
      titleTa: "குழந்தைகள் மற்றும் இளைஞர் பாதுகாப்பு",
      bodyEn: "We aim to provide a safe, supervised environment. Volunteers may be asked to complete screening and follow clear check-in/check-out procedures.",
      bodyTa: "பாதுகாப்பான மற்றும் மேற்பார்வையுடனான சூழலை வழங்க நாம் முயல்கிறோம். தன்னார்வலர்கள் முன் சரிபார்ப்பையும் தெளிவான வருகை பதிவு மற்றும் வெளியேற்ற நடைமுறைகளையும் பின்பற்ற வேண்டியிருக்கலாம்.",
    },
    {
      titleEn: "Volunteer screening & training",
      titleTa: "தன்னார்வலர் சரிபார்ப்பு மற்றும் பயிற்சி",
      bodyEn: "Some roles require additional training and guidelines. We prioritize respect, confidentiality, and a healthy environment.",
      bodyTa: "சில பொறுப்புகளுக்கு கூடுதல் பயிற்சியும் வழிகாட்டுதலும் தேவைப்படும். மரியாதை, ரகசியம், மற்றும் ஆரோக்கியமான சூழலை நாங்கள் முன்னிலைப்படுத்துகிறோம்.",
    },
    {
      titleEn: "Reporting concerns",
      titleTa: "கவலைகளை தெரிவிப்பது",
      bodyEn: "If you have a concern about safety or conduct, please contact a leader immediately. We take concerns seriously and will respond promptly.",
      bodyTa: "பாதுகாப்பு அல்லது நடத்தை குறித்து கவலை இருந்தால், உடனே ஒரு தலைவரை தொடர்புகொள்ளுங்கள். ஒவ்வொரு கவலையையும் நாங்கள் முக்கியமாக எடுத்துக்கொண்டு விரைவாக பதிலளிப்போம்.",
    },
    {
      titleEn: "Respectful environment",
      titleTa: "மரியாதையுள்ள சூழல்",
      bodyEn: "We welcome people from many backgrounds. Harassment, intimidation, or abuse is not tolerated in our gatherings or communication.",
      bodyTa: "பல பின்னணிகளிலிருந்து வரும் மக்களை நாங்கள் வரவேற்கிறோம். தொந்தரவு, அச்சுறுத்தல், அல்லது துஷ்பிரயோகம் எங்கள் கூடுகைகளிலும் தொடர்புகளிலும் அனுமதிக்கப்படாது.",
    },
    {
      titleEn: "Two-adult guideline",
      titleTa: "இரு பெரியவர்கள் வழிகாட்டுதல்",
      bodyEn: "Whenever possible, we use a two-adult guideline for kids/youth spaces to promote safety, transparency, and healthy boundaries.",
      bodyTa: "சாத்தியமான எல்லா சூழல்களிலும், குழந்தைகள் மற்றும் இளைஞர் இடங்களில் பாதுகாப்பு, வெளிப்படைத் தன்மை, மற்றும் ஆரோக்கியமான வரம்புகளை உறுதிப்படுத்த இரண்டு பெரியவர்கள் இருப்பதற்கான நடைமுறையை பின்பற்றுகிறோம்.",
    },
    {
      titleEn: "Medical & emergency procedures",
      titleTa: "மருத்துவ மற்றும் அவசரநிலை நடைமுறைகள்",
      bodyEn: "If there is an emergency, our team will follow a clear plan for contacting guardians and/or emergency services as needed.",
      bodyTa: "அவசரநிலை ஏற்பட்டால், பெற்றோர் அல்லது பாதுகாவலர்களையும் தேவையானால் அவசர சேவைகளையும் தொடர்புகொள்வதற்கான தெளிவான திட்டத்தை எங்கள் குழு பின்பற்றும்.",
    },
  ]

  return (
    <>
      <PageHeader
        titleEn="Community Safety"
        titleTa="சமூக பாதுகாப்பு"
        descriptionEn="Policies and practices to create a safe and welcoming environment."
        descriptionTa="பாதுகாப்பான மற்றும் வரவேற்கும் சூழலை உருவாக்கும் கொள்கைகளும் நடைமுறைகளும்."
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
                    ta="ஒவ்வொருவரும் பாதுகாப்பாகவும் மரியாதையுடனும் அக்கறையுடனும் இருக்க வேண்டும் என்பது எங்கள் விருப்பம். இந்த வழிகாட்டுதல்கள் பாதுகாப்பு, தன்னார்வ சேவை, மற்றும் கவலைகளை நாங்கள் எப்படி கையாளுகிறோம் என்பதை விளக்குகின்றன."
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
                    <Lang en="Need help right now?" ta="உடனடி உதவி வேண்டுமா?" taClassName="font-tamil" />
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                    <Lang
                      en="If you need pastoral care, prayer, or support, please reach out. We will respond as soon as we can."
                      ta="மேய்ப்பரின் அக்கறை, ஜெபம், அல்லது ஆதரவு தேவைப்பட்டால் தயவுசெய்து தொடர்புகொள்ளுங்கள். எங்களால் முடிந்தவரை விரைவில் பதிலளிப்போம்."
                      taClassName="font-tamil"
                    />
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link href="/contact" className="btn btn-md btn-primary">
                      <Lang en="Contact us" ta="எங்களை தொடர்புகொள்ளுங்கள்" taClassName="font-tamil" />
                    </Link>
                    <Link href="/care" className="btn btn-md btn-secondary">
                      <Lang en="Request care" ta="அக்கறை உதவி கோருங்கள்" taClassName="font-tamil" />
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
