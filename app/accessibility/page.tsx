import type { Metadata } from "next"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Accessibility",
  description: "Our commitment to accessibility and inclusive access.",
  path: "/accessibility",
})

export default function AccessibilityPage() {
  const updatedAt = "February 4, 2026"

  return (
    <>
      <PageHeader
        titleEn="Accessibility"
        titleTa="அணுகல்"
        descriptionEn="Our commitment to inclusive access for everyone."
        descriptionTa="அனைவருக்கும் சமமான அணுகலுக்கான எங்கள் உறுதி"
      />

      <section className="bg-white">
        <Container className="section-padding">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div className="card">
                <div className="card-content p-8 sm:p-10">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                      <Lang en="Last updated" ta="கடைசியாக புதுப்பிக்கப்பட்டது" />: {updatedAt}
                    </div>
                    <a href={`mailto:${siteConfig.email}`} className="btn btn-sm btn-secondary w-fit">
                      <Lang en="Accessibility help" ta="அணுகல் உதவி" />
                    </a>
                  </div>

                  <div className="mt-6 space-y-10 text-churchBlue/75">
                    <section>
                      <h2 className="text-xl font-semibold tracking-tight text-churchBlue">
                        <Lang en="Accessibility statement" ta="அணுகல் அறிக்கை" />
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed sm:text-base">
                        <Lang
                          en="We want our website to be accessible and usable for as many people as possible, including those using assistive technologies."
                          ta="உதவி தொழில்நுட்பங்களை பயன்படுத்துகிறவர்களையும் உட்பட அதிகமானோர் எங்கள் இணையதளத்தை அணுகவும் பயன்படுத்தவும் முடியும் வகையில் இருக்க வேண்டும் என்பதே எங்கள் விருப்பம்."
                        />
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold tracking-tight text-churchBlue">
                        <Lang en="What we're working toward" ta="நாங்கள் நோக்கி செயல்படுவது" />
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed sm:text-base">
                        <Lang
                          en="We aim to follow accessibility best practices and, where reasonably possible, align with WCAG 2.1 AA guidelines."
                          ta="அணுகல் தொடர்பான சிறந்த நடைமுறைகளை பின்பற்றவும், இயன்றவரை WCAG 2.1 AA வழிகாட்டுதல்களுடன் ஒத்திசைக்கவும் நாங்கள் முயற்சிக்கிறோம்."
                        />
                      </p>
                      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
                        <li>
                          <Lang en="Clear headings and readable text." ta="தெளிவான தலைப்புகள் மற்றும் வாசிக்க எளிதான உரை." />
                        </li>
                        <li>
                          <Lang en="Keyboard navigation support." ta="விசைப்பலகை வழிசெலுத்தல் ஆதரவு." />
                        </li>
                        <li>
                          <Lang en="Sufficient color contrast and focus indicators." ta="போதுமான நிற வேறுபாடு மற்றும் focus குறியீடுகள்." />
                        </li>
                        <li>
                          <Lang en="Accessible labels for interactive controls." ta="பயன்பாட்டு கட்டுப்பாடுகளுக்கு அணுகக்கூடிய labels." />
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold tracking-tight text-churchBlue">
                        <Lang en="Feedback & support" ta="கருத்துகள் மற்றும் உதவி" />
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed sm:text-base">
                        <Lang
                          en="If you experience any difficulty accessing content on this site, tell us what page you were on, what you were trying to do, and what device/browser you use. We will do our best to help."
                          ta="இந்த தளத்தில் உள்ள உள்ளடக்கத்தை அணுகுவதில் ஏதேனும் சிரமம் இருந்தால், நீங்கள் எந்தப் பக்கத்தில் இருந்தீர்கள், என்ன செய்ய முயன்றீர்கள், எந்த சாதனம் அல்லது browser பயன்படுத்தினீர்கள் என்பதை எங்களிடம் தெரிவியுங்கள். உதவ எங்கள் சிறந்த முயற்சியை செய்வோம்."
                        />
                      </p>
                      <p className="mt-3 text-sm leading-relaxed sm:text-base">
                        <Lang en="Email us at" ta="எங்களுக்கு மின்னஞ்சல் செய்ய" />{" "}
                        <a
                          className="font-semibold text-churchBlue underline decoration-churchGold/60 underline-offset-4"
                          href={`mailto:${siteConfig.email}`}
                        >
                          {siteConfig.email}
                        </a>
                        .
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold tracking-tight text-churchBlue">
                        <Lang en="Ongoing improvements" ta="தொடர்ச்சியான மேம்பாடுகள்" />
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed sm:text-base">
                        <Lang
                          en="Accessibility is an ongoing effort. We regularly review pages for readability, keyboard navigation, contrast, and semantic structure."
                          ta="அணுகல் என்பது தொடர்ச்சியான பணியாகும். வாசிப்புத் தெளிவு, விசைப்பலகை வழிசெலுத்தல், நிற வேறுபாடு, மற்றும் semantic அமைப்பு ஆகியவற்றுக்காக பக்கங்களை நாங்கள் அடிக்கடி பரிசோதிக்கிறோம்."
                        />
                      </p>
                    </section>
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
