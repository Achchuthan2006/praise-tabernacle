import type { Metadata } from "next"

import Link from "next/link"

import LeadershipSection from "@/components/LeadershipSection"
import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { historyTimeline } from "@/lib/history"
import { pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Learn about Praise Tabernacle (துதியின் கூடாரம்) — who we are, why we exist, who we serve, and what you can expect.",
  path: "/about",
})

export default function AboutPage() {
  return (
    <>
      <PageHeader
        titleEn="About"
        titleTa="எங்களைப் பற்றி"
        descriptionEn="A welcoming church family in Mississauga — serving Tamil & English families."
        descriptionTa="மிசிசாகாவில் உள்ள வரவேற்கும் சபைக் குடும்பம் — தமிழ் & ஆங்கில குடும்பங்களுக்கு சேவை."
      />

      <section className="bg-white">
        <Container className="section-padding">
          <div className="mx-auto max-w-3xl">
            <div className="divide-y divide-churchBlue/10 border-y border-churchBlue/10">
              <Reveal>
                <section className="py-10">
                  <h2 className="text-2xl font-semibold tracking-tight text-churchBlue sm:text-3xl">
                    <Lang en="Who we are" ta="நாம் யார்" />
                  </h2>
                  <p className="mt-5 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                    <Lang
                      en={
                        <>
                          Praise Tabernacle is a welcoming church in Mississauga. We are a bilingual
                          Tamil &amp; English community that values family, respect, and genuine care.
                        </>
                      }
                      ta={
                        <>
                          துதியின் கூடாரம் மிசிசாகாவில் உள்ள ஒரு வரவேற்கும் சபை. நாங்கள் குடும்பம்,
                          மரியாதை, அன்பான அக்கறை ஆகியவற்றை மதிக்கும் தமிழ் &amp; ஆங்கில சமூகமாக
                          இருக்கிறோம்.
                        </>
                      }
                      taClassName="font-tamil"
                    />
                  </p>
                  <p className="mt-5 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                    <Lang
                      en={
                        <>
                          We are centred on Jesus Christ, committed to the Bible, and passionate about
                          prayer. Our heart is to help you take a next step - whether you're new to
                          church, returning after a long time, or looking for a church family to call
                          home.
                        </>
                      }
                      ta={
                        <>
                          நாங்கள் இயேசு கிரிஸ்துவை மையமாகக் கொண்டு, வேதத்தைப் பிடித்துக் கொண்டு, ஜெபத்தில்
                          ஆர்வமாய் வாழ விரும்புகிறோம். நீங்கள் சபைக்கு புதிதாக இருந்தாலும், நீண்ட நாட்களுக்கு
                          பிறகு மீண்டும் வந்தாலும், அல்லது ஒரு சபைக்குடும்பத்தைத் தேடினாலும் — அடுத்த
                          படி எடுக்க நாங்கள் உதவ விரும்புகிறோம்.
                        </>
                      }
                      taClassName="font-tamil"
                    />
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {[
                      {
                        en: "Bible-centred teaching",
                        ta: "வேதத்தை மையமாகக் கொண்ட போதனை",
                        icon: "B",
                      },
                      { en: "Heartfelt worship", ta: "மனத்தார்ந்த ஆராதனை", icon: "W" },
                      { en: "Prayer & care", ta: "ஜெபம் & பராமரிப்பு", icon: "P" },
                      { en: "Family & community", ta: "குடும்பம் & சமூகமாம்", icon: "F" },
                    ].map((item) => (
                      <div
                        key={item.en}
                        className="rounded-2xl border border-churchBlue/10 border-l-4 border-l-[#7B2FBE] bg-churchBlueSoft px-4 py-4 text-sm font-semibold text-churchBlue"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#7B2FBE]/15 text-xs font-bold text-[#7B2FBE]"
                            aria-hidden="true"
                          >
                            {item.icon}
                          </span>
                          <Lang en={item.en} ta={item.ta} taClassName="font-tamil" />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </Reveal>

              <Reveal delay={1}>
                <section className="py-10">
                  <h2 className="text-2xl font-semibold tracking-tight text-churchBlue sm:text-3xl">
                    <Lang en="Why we exist" ta="நாம் ஏன் இருக்கிறோம்" />
                  </h2>
                  <p className="mt-5 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                    <Lang
                      en={
                        <>
                          Our desire is to create an atmosphere where individuals and families can grow
                          in faith, love, and purpose - and build a meaningful relationship with Jesus
                          Christ.
                        </>
                      }
                      ta={
                        <>
                          தனிநபர்களும் குடும்பங்களும் விசுவாசம், அன்பு, நோக்கம் ஆகியவற்றில் வளரவும்,
                          இயேசு கிறிஸ்துவுடன் அர்த்தமுள்ள உறவை உருவாக்கவும் உதவும் சூழலை உருவாக்குவது
                          எங்கள் விருப்பம்.
                        </>
                      }
                      taClassName="font-tamil"
                    />
                  </p>
                  <div className="mt-7 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow">
                      <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                        <Lang en="Mission" ta="பணி நோக்கம்" />
                      </div>
                      <div className="mt-2 text-lg font-semibold tracking-tight text-churchBlue">
                        <Lang en="Our mission in one sentence" ta="ஒரு வாக்கியத்தில் பணி நோக்கம்" taClassName="font-tamil" />
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                        <Lang en={siteConfig.taglineEn} ta={siteConfig.taglineTa} taClassName="font-tamil" />
                      </p>
                    </div>
                    <div className="rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow">
                      <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                        <Lang en="Vision" ta="தூர நோக்கம்" />
                      </div>
                      <div className="mt-2 text-lg font-semibold tracking-tight text-churchBlue">
                        <Lang en="Where we're headed" ta="நாம் நோக்கி செல்லும் திசை" taClassName="font-tamil" />
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                        <Lang en={siteConfig.visionEn} ta={siteConfig.visionTa} taClassName="font-tamil" />
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-6">
                    <div className="text-sm font-semibold text-churchBlue">
                      <Lang en="Want more detail?" ta="மேலும் விவரம் வேண்டுமா?" taClassName="font-tamil" />
                    </div>
                    <p className="mt-2 text-sm text-churchBlue/70 sm:text-base">
                      <Lang
                        en="Read our beliefs, denominational affiliation, and church history."
                        ta="எங்கள் நம்பிக்கைகள், மத இணைப்பு, மற்றும் சபை வரலாறு பக்கங்களைப் பார்க்கலாம்."
                        taClassName="font-tamil"
                      />
                    </p>
                    <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                      <Link href="/about/beliefs" className="btn btn-md btn-primary">
                        <Lang en="Beliefs" ta="நம்பிக்கைகள்" taClassName="font-tamil" />
                      </Link>
                      <Link href="/about/denomination" className="btn btn-md btn-secondary">
                        <Lang en="Denomination" ta="மத இணைப்பு" taClassName="font-tamil" />
                      </Link>
                      <Link href="/about/history" className="btn btn-md btn-secondary">
                        <Lang en="History" ta="வரலாறு" taClassName="font-tamil" />
                      </Link>
                    </div>
                  </div>
                </section>
              </Reveal>

              <Reveal delay={2}>
                <section className="py-10">
                  <h2 className="text-2xl font-semibold tracking-tight text-churchBlue sm:text-3xl">
                    <Lang en="Who we serve" ta="நாம் யாரைச் சேவிக்கிறோம்" />
                  </h2>
                  <p className="mt-5 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                    <Lang
                      en={
                        <>
                          We serve Tamil and English families, newcomers, youth, and anyone looking for
                          hope, comfort, and a place to belong.
                        </>
                      }
                      ta={
                        <>
                          தமிழ் &amp; ஆங்கில குடும்பங்கள், புதியவர்கள், இளைஞர்கள், நம்பிக்கை மற்றும்
                          ஆறுதல் தேடும் அனைவருக்கும் நாங்கள் சேவை செய்கிறோம்.
                        </>
                      }
                      taClassName="font-tamil"
                    />
                  </p>
                </section>
              </Reveal>

              <Reveal delay={3}>
                <section className="py-10">
                  <h2 className="text-2xl font-semibold tracking-tight text-churchBlue sm:text-3xl">
                    <Lang en="What guides us" ta="எங்களை வழிநடத்துவது" />
                  </h2>
                  <p className="mt-5 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                    <Lang
                      en={
                        <>
                          We follow Jesus Christ and look to the Bible for guidance. Our goal is simple:
                          love God, love people, and grow together.
                        </>
                      }
                      ta={
                        <>
                          நாங்கள் இயேசு கிறிஸ்துவை பின்பற்றி, வழிகாட்டலுக்காக வேதாகமத்தைப் பார்க்கிறோம்.
                          எங்கள் நோக்கம் எளியது: தேவனை நேசித்து, மனிதர்களை நேசித்து, ஒன்றாக வளருவது.
                        </>
                      }
                      taClassName="font-tamil"
                    />
                  </p>
                </section>
              </Reveal>
            </div>

            <Reveal className="mt-14">
              <section aria-labelledby="expect">
                <h2
                  id="expect"
                  className="text-2xl font-semibold tracking-tight text-churchBlue sm:text-3xl"
                >
                  <Lang en="What you can expect" ta="நீங்கள் என்ன எதிர்பார்க்கலாம்" />
                </h2>

                <div className="mt-8 divide-y divide-churchBlue/10 border-y border-churchBlue/10">
                  <ExpectRow
                    titleEn="A warm welcome (no pressure)"
                    titleTa="அன்பான வரவேற்பு (அழுத்தமில்லை)"
                    bodyEn="If it’s your first time, you’re welcome. We’ll help you feel comfortable and answer any questions."
                    bodyTa="இது உங்கள் முதல் வருகை என்றாலும், வரவேற்கிறோம். உங்களுக்கு வசதியாக இருக்க உதவுவோம்; கேள்விகள் இருந்தால் பதிலளிப்போம்."
                  />
                  <ExpectRow
                    titleEn="A simple, calm service"
                    titleTa="எளிய, அமைதியான ஆராதனை"
                    bodyEn="A service focused on Jesus, with clear teaching and encouragement for everyday life."
                    bodyTa="இயேசுவை மையமாகக் கொண்ட ஆராதனை; தெளிவான போதனையும் தினசரி வாழ்க்கைக்கான ஊக்கமும்."
                  />
                  <ExpectRow
                    titleEn="Tamil & English"
                    titleTa="தமிழ் & ஆங்கிலம்"
                    bodyEn="We love being bilingual. You’ll find space for both languages and cultures."
                    bodyTa="இருமொழி சபையாக இருப்பதில் மகிழ்ச்சி. இரு மொழிகளுக்கும் பண்பாடுகளுக்கும் இடம் உள்ளது."
                  />
                  <ExpectRow
                    titleEn="Families and youth are welcome"
                    titleTa="குடும்பங்களும் இளைஞர்களும் வரவேற்கப்படுகிறார்கள்"
                    bodyEn="Kids, youth, and newcomers are always welcome. Come as you are."
                    bodyTa="குழந்தைகள், இளைஞர்கள், புதியவர்கள் அனைவரும் அன்புடன் வரவேற்கப்படுகிறார்கள். நீங்கள் இருப்பதுபோலவே வாருங்கள்."
                  />
                </div>
              </section>
            </Reveal>
          </div>
        </Container>
      </section>

      <LeadershipSection />

      <section className="bg-churchBlueSoft">
        <Container className="section-padding">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="section-kicker">
                    <Lang en="Our Story" ta="எங்கள் கதை" taClassName="font-tamil" />
                  </div>
                  <h2 className="section-heading">
                    <Lang en="Church history & affiliation" ta="சபை வரலாறு & இணைப்பு" taClassName="font-tamil" />
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm text-churchBlue/70 sm:text-base">
                    <Lang
                      en="A quick timeline and where we fit within the wider Christian family."
                      ta="ஒரு சுருக்கமான காலவரிசை மற்றும் கிறிஸ்தவக் குடும்பத்தில் எங்கள் இடம்."
                      taClassName="font-tamil"
                    />
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <Link href="/about/history" className="btn btn-sm btn-secondary">
                    <Lang en="Full history" ta="முழு வரலாறு" taClassName="font-tamil" />
                  </Link>
                  <Link href="/about/denomination" className="btn btn-sm btn-secondary">
                    <Lang en="Affiliation" ta="இணைப்பு" taClassName="font-tamil" />
                  </Link>
                </div>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-12">
              <Reveal delay={1} className="lg:col-span-7">
                <div className="rounded-3xl border border-churchBlue/10 bg-white p-8 shadow-glow">
                  <div className="text-sm font-semibold text-churchBlue">
                    <Lang en="Timeline" ta="காலவரிசை" taClassName="font-tamil" />
                  </div>
                  <div className="mt-6 space-y-4">
                    {historyTimeline.slice(0, 3).map((event, idx) => (
                      <div key={`${event.year}-${idx}`} className="rounded-2xl border border-churchBlue/10 bg-white p-5">
                        <div className="text-xs font-semibold tracking-wide text-churchBlue/60">{event.year}</div>
                        <div className="mt-1 text-base font-semibold tracking-tight text-churchBlue">
                          <Lang en={event.titleEn} ta={event.titleTa} taClassName="font-tamil" />
                        </div>
                        <p className="mt-2 text-sm text-churchBlue/70">
                          <Lang en={event.descriptionEn} ta={event.descriptionTa} taClassName="font-tamil" />
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={2} className="lg:col-span-5">
                <div className="rounded-3xl border border-churchBlue/10 bg-white p-8 shadow-glow">
                  <div className="text-sm font-semibold text-churchBlue">
                    <Lang en="Affiliation" ta="இணைப்பு" taClassName="font-tamil" />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                    <Lang
                      en="We are an evangelical Christian church committed to Scripture, Christ-centred worship, and accountable leadership."
                      ta="நாங்கள் வேதத்தை அடிப்படையாகக் கொண்ட, இயேசுவை மையமாக வைத்த, பொறுப்புணர்வோடு சேவை செய்யும் எவாஞ்சலிக்கல் கிறிஸ்தவச் சபை."
                      taClassName="font-tamil"
                    />
                  </p>
                  <div className="mt-6 space-y-3 text-sm text-churchBlue/75">
                    {[
                      { en: "Beliefs rooted in the Bible", ta: "வேதத்தை அடிப்படையாகக் கொண்ட நம்பிக்கைகள்" },
                      { en: "Transparent leadership & care", ta: "தெளிவான தலைமையும் பராமரிப்பும்" },
                      { en: "Serving families across generations", ta: "பல தலைமுறைக் குடும்பங்களுக்கு சேவை" },
                    ].map((item) => (
                      <div key={item.en} className="flex items-start gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-churchBlue/40" aria-hidden="true" />
                        <span>
                          <Lang en={item.en} ta={item.ta} taClassName="font-tamil" />
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-7 flex flex-col gap-2 sm:flex-row">
                    <Link href="/about/denomination" className="btn btn-md btn-primary w-full sm:w-auto">
                      <Lang en="Learn more" ta="மேலும் அறிய" taClassName="font-tamil" />
                    </Link>
                    <Link href="/contact" className="btn btn-md btn-secondary w-full sm:w-auto">
                      <Lang en="Ask a question" ta="கேள்வி கேளுங்கள்" taClassName="font-tamil" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

function ExpectRow({
  titleEn,
  titleTa,
  bodyEn,
  bodyTa,
}: {
  titleEn: string
  titleTa: string
  bodyEn: string
  bodyTa: string
}) {
  return (
    <div className="py-8">
      <h3 className="text-base font-medium tracking-tight text-churchBlue sm:text-lg">
        <Lang en={titleEn} ta={titleTa} taClassName="font-tamil" />
      </h3>
      <p className="mt-4 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
        <Lang en={bodyEn} ta={bodyTa} taClassName="font-tamil" />
      </p>
    </div>
  )
}

