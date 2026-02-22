import type { Metadata } from "next"
import Link from "next/link"

import Container from "@/components/ui/Container"
import Lang from "@/components/language/Lang"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Request Care",
  description: "Prayer requests, pastoral care, and counseling support.",
  path: "/care",
})

export default function CarePage() {
  const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Request Care")}`

  return (
    <>
      <PageHeader
        titleEn="Request Care"
        titleTa="அக்கறை வேண்டுகோள்"
        descriptionEn="Prayer requests, pastoral care, and gentle support."
        descriptionTa="ஜெப வேண்டுகோள், மேய்ப்பர் அக்கறை, உதவி"
      />

      <section className="bg-white">
        <Container className="section-padding">
          <div className="mx-auto max-w-5xl">
            <div className="care-cards flex flex-col md:flex-row gap-6">
              <Reveal className="care-card w-full md:flex-1">
                <div className="rounded-3xl border border-churchBlue/10 bg-white p-7 shadow-glow">
                  <div className="section-kicker">
                    <Lang en="Prayer" ta="ஜெபம்" taClassName="font-tamil" />
                  </div>
                  <h2 className="mt-3 text-xl font-semibold tracking-tight text-churchBlue">
                    <Lang en="Request prayer" ta="ஜெபம் வேண்டுகோள்" taClassName="font-tamil" />
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                    <Lang
                      en="Share a prayer need. Our team will pray with care and discretion."
                      ta="உங்கள் ஜெப வேண்டுகோளை பகிருங்கள். எங்கள் குழு அக்கறையுடன் மற்றும் எச்சரிக்கையுடன் ஜெபிக்கும்."
                      taClassName="font-tamil"
                    />
                  </p>
                  <div className="mt-7 flex flex-col gap-2">
                    <Link href="/prayer" className="btn btn-md btn-primary">
                      <Lang en="Send a prayer request" ta="ஜெப வேண்டுகோள்" taClassName="font-tamil" />
                    </Link>
                    <a href={mailto} className="btn btn-md btn-secondary">
                      <Lang en="Email us" ta="மின்னஞ்சல் செய்யவும்" taClassName="font-tamil" />
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={1} className="care-card w-full md:flex-1">
                <div className="rounded-3xl border border-churchBlue/10 bg-white p-7 shadow-glow">
                  <div className="section-kicker">
                    <Lang en="Pastoral care" ta="மேய்ப்பர் அக்கறை" taClassName="font-tamil" />
                  </div>
                  <h2 className="mt-3 text-xl font-semibold tracking-tight text-churchBlue">
                    <Lang en="Request a conversation" ta="உரையாடல் வேண்டுகோள்" taClassName="font-tamil" />
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                    <Lang
                      en="Need guidance, support, or a visit? We're here for you."
                      ta="வழிகாட்டல், ஆதரவு அல்லது ஒரு வருகை வேண்டுமா? நாங்கள் உங்களுடன் இருக்கிறோம்."
                      taClassName="font-tamil"
                    />
                  </p>
                  <div className="mt-7 flex flex-col gap-2">
                    <a href={mailto} className="btn btn-md btn-primary">
                      <Lang en="Email to request care" ta="அக்கறைக்காக மின்னஞ்சல் செய்யவும்" taClassName="font-tamil" />
                    </a>
                    <Link href="/visit" className="btn btn-md btn-secondary">
                      <Lang en="Plan a visit" ta="வருகையை திட்டமிடுங்கள்" taClassName="font-tamil" />
                    </Link>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={2} className="care-card w-full md:flex-1">
                <div className="rounded-3xl border border-churchBlue/10 bg-white p-7 shadow-glow">
                  <div className="section-kicker">
                    <Lang en="Counseling" ta="ஆலோசனை" taClassName="font-tamil" />
                  </div>
                  <h2 className="mt-3 text-xl font-semibold tracking-tight text-churchBlue">
                    <Lang en="Counseling support" ta="ஆலோசனை ஆதரவு" taClassName="font-tamil" />
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                    <Lang
                      en={
                        <>
                          If you need help, we can offer pastoral support and connect you with trusted
                          resources.
                        </>
                      }
                      ta={
                        <>
                          உதவி தேவைப்பட்டால், மேய்ப்பர் ஆதரவை வழங்கி நம்பகமான வளங்களுடன் உங்களை இணைக்க முடியும்.
                        </>
                      }
                      taClassName="font-tamil"
                    />
                  </p>
                  <div className="mt-7 flex flex-col gap-2">
                    <a href={mailto} className="btn btn-md btn-primary">
                      <Lang en="Email for counseling help" ta="ஆலோசனை உதவிக்காக மின்னஞ்சல்" taClassName="font-tamil" />
                    </a>
                    <Link href="/learn/community-safety" className="btn btn-md btn-secondary">
                      <Lang en="Community safety" ta="பாதுகாப்பு" taClassName="font-tamil" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal className="mt-14">
              <div className="rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-8 shadow-glow md:p-10">
                <h3 className="text-xl font-semibold tracking-tight text-churchBlue">
                  <Lang en="Emergency note" ta="அவசர குறிப்பு" taClassName="font-tamil" />
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                  <Lang
                    en={
                      <>
                        If you are in immediate danger or need urgent medical help, please call local
                        emergency services right away.
                      </>
                    }
                    ta={
                      <>
                        உடனடி ஆபத்து இருந்தால் அல்லது அவசர மருத்துவ உதவி தேவைப்பட்டால், உடனடியாக உள்ளூர் அவசர சேவைகளை அழைக்கவும்.
                      </>
                    }
                    taClassName="font-tamil"
                  />
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  )
}
