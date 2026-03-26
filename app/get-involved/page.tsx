import type { Metadata } from "next"
import Link from "next/link"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { ministries } from "@/lib/ministries"
import { pageMetadata } from "@/lib/seo"
import { serveOpportunities, volunteerTrainingEvents } from "@/lib/serve"

export const metadata: Metadata = pageMetadata({
  title: "Get Involved",
  description:
    "Find simple next steps to connect at Praise Tabernacle through ministries, serving, groups, prayer, and membership.",
  path: "/get-involved",
})

const pathways = [
  {
    titleEn: "Serve on a team",
    titleTa: "ஒரு குழுவில் சேவையாற்றுங்கள்",
    bodyEn: "Join a Sunday or midweek team and use your gifts with joy.",
    bodyTa: "ஞாயிறு அல்லது வாரநாள் குழுவில் இணைந்து, உங்கள் வரங்களை சந்தோஷமாக பயன்படுத்துங்கள்.",
    href: "/serve",
    ctaEn: "Explore serving",
    ctaTa: "சேவை வாய்ப்புகளை பார்க்க",
  },
  {
    titleEn: "Find a ministry",
    titleTa: "ஒரு சேவையை கண்டுபிடிக்கவும்",
    bodyEn: "Kids, youth, prayer, outreach, and more for every season of life.",
    bodyTa: "குழந்தைகள், இளைஞர்கள், ஜெபம், சமூக சேவை மற்றும் வாழ்க்கையின் பல நிலைகளுக்கான சேவைகள்.",
    href: "/ministries",
    ctaEn: "Browse ministries",
    ctaTa: "சேவைகளை பார்க்க",
  },
  {
    titleEn: "Grow through groups",
    titleTa: "குழுக்களின் மூலம் வளருங்கள்",
    bodyEn: "Build friendships, study Scripture, and pray together in smaller circles.",
    bodyTa: "நட்புகளை வளர்த்து, வேதத்தை கற்று, சிறிய குழுக்களில் ஒன்றாக ஜெபியுங்கள்.",
    href: "/groups",
    ctaEn: "View groups",
    ctaTa: "குழுக்களை பார்க்க",
  },
  {
    titleEn: "Take the membership step",
    titleTa: "உறுப்பினர் படியை எடுத்துக்கொள்ளுங்கள்",
    bodyEn: "Learn our story, ask questions, and take a clear next step into church life.",
    bodyTa: "எங்கள் கதையை அறிந்து, கேள்விகளை கேட்டு, சபை வாழ்க்கையில் அடுத்த படியை தெளிவாக எடுத்துக்கொள்ளுங்கள்.",
    href: "/membership",
    ctaEn: "Learn about membership",
    ctaTa: "உறுப்பினர் பற்றி அறிய",
  },
] as const

const nextSteps = [
  {
    titleEn: "1. Start with one step",
    titleTa: "1. ஒரு படியிலிருந்து தொடங்குங்கள்",
    bodyEn: "You do not need to do everything at once. Choose one place to begin.",
    bodyTa: "எல்லாவற்றையும் ஒரே நேரத்தில் செய்ய வேண்டியதில்லை. தொடங்க ஒரு இடத்தை மட்டும் தேர்ந்தெடுக்கலாம்.",
  },
  {
    titleEn: "2. Meet a leader",
    titleTa: "2. ஒரு தலைவரை சந்திக்கவும்",
    bodyEn: "We will help you find the right team, group, or ministry for your season.",
    bodyTa: "உங்கள் வாழ்க்கை நிலைக்கு பொருந்தும் குழு, சேவை, அல்லது அமைச்சை கண்டுபிடிக்க நாங்கள் உதவுவோம்.",
  },
  {
    titleEn: "3. Take a simple next step",
    titleTa: "3. எளிய அடுத்த படியை எடுத்துக்கொள்ளுங்கள்",
    bodyEn: "Visit, join, serve, or request prayer. We will walk with you.",
    bodyTa: "வருகை தரவும், இணையவும், சேவையாற்றவும், அல்லது ஜெபம் கேட்கவும். நாங்கள் உங்களுடன் நடப்போம்.",
  },
] as const

export default function GetInvolvedPage() {
  const featuredMinistries = ministries.slice(0, 6)
  const featuredServeTeams = serveOpportunities.slice(0, 3)

  return (
    <>
      <PageHeader
        titleEn="Get Involved"
        titleTa="ஈடுபடுங்கள்"
        descriptionEn="Simple next steps to connect, grow, serve, and belong."
        descriptionTa="இணைய, வளர, சேவையாற்ற, மற்றும் சேர்ந்திருப்பதற்கான எளிய அடுத்த படிகள்."
      />

      <section className="bg-white">
        <Container className="section-padding">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-8 shadow-glow md:p-10">
                <div className="section-kicker">
                  <Lang en="Next Steps" ta="அடுத்த படிகள்" taClassName="font-tamil" />
                </div>
                <h2 className="section-heading mt-2">
                  <Lang en="There is a place for you here" ta="இங்கே உங்களுக்கான இடம் உள்ளது" taClassName="font-tamil" />
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                  <Lang
                    en="Whether you are new to church, returning after a while, or ready to serve, we want to help you take a healthy next step."
                    ta="நீங்கள் சபைக்கு புதிதாக இருந்தாலும், சில காலத்திற்குப் பிறகு மீண்டும் வந்தாலும், அல்லது சேவையாற்றத் தயாராக இருந்தாலும், ஆரோக்கியமான அடுத்த படியை எடுக்க நாங்கள் உதவ விரும்புகிறோம்."
                    taClassName="font-tamil"
                  />
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link href="/visit" className="btn btn-md btn-primary">
                    <Lang en="Plan Your Visit" ta="வருகையை திட்டமிடுங்கள்" taClassName="font-tamil" />
                  </Link>
                  <Link href="/contact" className="btn btn-md btn-secondary">
                    <Lang en="Talk with our team" ta="எங்கள் குழுவுடன் பேசுங்கள்" taClassName="font-tamil" />
                  </Link>
                </div>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {pathways.map((item, idx) => (
                <Reveal key={item.href} delay={idx === 0 ? 0 : idx === 1 ? 1 : idx === 2 ? 2 : 3}>
                  <div className="flex h-full flex-col rounded-3xl border border-churchBlue/10 bg-white p-7 shadow-glow">
                    <h2 className="text-xl font-semibold tracking-tight text-churchBlue">
                      <Lang en={item.titleEn} ta={item.titleTa} taClassName="font-tamil" />
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                      <Lang en={item.bodyEn} ta={item.bodyTa} taClassName="font-tamil" />
                    </p>
                    <div className="mt-6">
                      <Link href={item.href} className="btn btn-md btn-secondary w-full">
                        <Lang en={item.ctaEn} ta={item.ctaTa} taClassName="font-tamil" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <Reveal>
                <div className="rounded-3xl border border-churchBlue/10 bg-white p-8 shadow-glow">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <div className="section-kicker">
                        <Lang en="Ministries" ta="சேவைகள்" taClassName="font-tamil" />
                      </div>
                      <h2 className="section-heading mt-2">
                        <Lang en="Ways to connect by season of life" ta="வாழ்க்கை நிலைக்கு ஏற்ப இணைய வழிகள்" taClassName="font-tamil" />
                      </h2>
                    </div>
                    <Link href="/ministries" className="btn btn-sm btn-secondary">
                      <Lang en="All ministries" ta="அனைத்து சேவைகள்" taClassName="font-tamil" />
                    </Link>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {featuredMinistries.map((ministry) => (
                      <Link
                        key={ministry.slug}
                        href={`/ministries/${ministry.slug}`}
                        className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-5 transition hover:-translate-y-0.5 hover:shadow-glow focus-ring"
                      >
                        <div className="text-base font-semibold text-churchBlue">
                          <Lang en={ministry.nameEn} ta={ministry.nameTa} taClassName="font-tamil" />
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-churchBlue/75">
                          <Lang en={ministry.summaryEn} ta={ministry.summaryTa} taClassName="font-tamil" />
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={1}>
                <div className="rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-8 shadow-glow">
                  <div className="section-kicker">
                    <Lang en="How It Works" ta="இது எப்படி செயல்படுகிறது" taClassName="font-tamil" />
                  </div>
                  <h2 className="section-heading mt-2">
                    <Lang en="Keep it simple" ta="எளிமையாக வைத்துக்கொள்ளுங்கள்" taClassName="font-tamil" />
                  </h2>
                  <div className="mt-6 space-y-5">
                    {nextSteps.map((step) => (
                      <div key={step.titleEn} className="rounded-2xl border border-white/40 bg-white/70 p-5">
                        <div className="text-sm font-semibold text-churchBlue">
                          <Lang en={step.titleEn} ta={step.titleTa} taClassName="font-tamil" />
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-churchBlue/75">
                          <Lang en={step.bodyEn} ta={step.bodyTa} taClassName="font-tamil" />
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <Reveal>
                <div className="rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-8 shadow-glow">
                  <div className="section-kicker">
                    <Lang en="Serve" ta="சேவை" taClassName="font-tamil" />
                  </div>
                  <h2 className="section-heading mt-2">
                    <Lang en="Start serving with a team" ta="ஒரு குழுவுடன் சேவையை தொடங்குங்கள்" taClassName="font-tamil" />
                  </h2>
                  <div className="mt-6 space-y-4">
                    {featuredServeTeams.map((team) => (
                      <div key={team.id} className="rounded-2xl border border-white/40 bg-white/75 p-5">
                        <div className="text-base font-semibold text-churchBlue">
                          <Lang en={team.titleEn} ta={team.titleTa} taClassName="font-tamil" />
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-churchBlue/75">
                          <Lang en={team.descriptionEn} ta={team.descriptionTa} taClassName="font-tamil" />
                        </p>
                        <div className="mt-3 text-sm text-churchBlue/70">
                          <span className="font-semibold text-churchBlue">
                            <Lang en="Commitment:" ta="பங்கேற்பு:" taClassName="font-tamil" />
                          </span>{" "}
                          <Lang en={team.commitmentEn} ta={team.commitmentTa} taClassName="font-tamil" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Link href="/serve" className="btn btn-md btn-primary w-full sm:w-auto">
                      <Lang en="See all serving opportunities" ta="அனைத்து சேவை வாய்ப்புகளையும் பார்க்க" taClassName="font-tamil" />
                    </Link>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={1}>
                <div className="rounded-3xl border border-churchBlue/10 bg-white p-8 shadow-glow">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <div className="section-kicker">
                        <Lang en="Upcoming" ta="வரவிருக்கும்" taClassName="font-tamil" />
                      </div>
                      <h2 className="section-heading mt-2">
                        <Lang en="Training and next-step gatherings" ta="பயிற்சி மற்றும் அடுத்த படி கூடுகைகள்" taClassName="font-tamil" />
                      </h2>
                    </div>
                    <Link href="/events" className="btn btn-sm btn-secondary">
                      <Lang en="View events" ta="நிகழ்வுகளை பார்க்க" taClassName="font-tamil" />
                    </Link>
                  </div>
                  <div className="mt-6 grid gap-4">
                    {volunteerTrainingEvents.map((event) => (
                      <div key={event.id} className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-5">
                        <div className="text-base font-semibold text-churchBlue">
                          <Lang en={event.titleEn} ta={event.titleTa} taClassName="font-tamil" />
                        </div>
                        <div className="mt-2 text-sm text-churchBlue/75">
                          <div>
                            <span className="font-semibold text-churchBlue">
                              <Lang en="When:" ta="எப்போது:" taClassName="font-tamil" />
                            </span>{" "}
                            <Lang en={event.whenEn} ta={event.whenTa} taClassName="font-tamil" />
                          </div>
                          <div className="mt-1">
                            <span className="font-semibold text-churchBlue">
                              <Lang en="Where:" ta="எங்கே:" taClassName="font-tamil" />
                            </span>{" "}
                            <Lang en={event.locationEn} ta={event.locationTa} taClassName="font-tamil" />
                          </div>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-churchBlue/75">
                          <Lang en={event.descriptionEn} ta={event.descriptionTa} taClassName="font-tamil" />
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <Link href="/prayer" className="btn btn-md btn-secondary">
                      <Lang en="Request prayer" ta="ஜெபம் கோருங்கள்" taClassName="font-tamil" />
                    </Link>
                    <Link href="/membership" className="btn btn-md btn-secondary">
                      <Lang en="Membership next step" ta="உறுப்பினர் அடுத்த படி" taClassName="font-tamil" />
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
