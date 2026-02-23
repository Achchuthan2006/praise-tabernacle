import type { Metadata } from "next"
import Link from "next/link"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { serveOpportunities, volunteerTrainingEvents } from "@/lib/serve"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Serve",
  description: "Volunteer opportunities at Praise Tabernacle.",
  path: "/serve",
})

export default function ServePage() {
  return (
    <>
      <PageHeader
        titleEn="Serve"
        titleTa="சேவை செய்யுங்கள்"
        descriptionEn="Choose a team, get trained, and serve with joy."
        descriptionTa="ஒரு குழுவைத் தேர்ந்தெடுத்து, பயிற்சி பெற்று, மகிழ்ச்சியுடன் சேவை செய்யுங்கள்."
      />

      <section className="bg-white">
        <Container className="section-padding">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-8 shadow-glow md:p-10">
                <div className="section-kicker">
                  <Lang en="Get Started" ta="தொடங்குங்கள்" taClassName="font-tamil" />
                </div>
                <h2 className="section-heading mt-2">
                  <Lang en="How serving works" ta="சேவை எப்படி" taClassName="font-tamil" />
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                  <Lang
                    en="Apply online, attend a short training, and join a team. We’ll help you find a good fit for your season of life."
                    ta="ஆன்லைனில் விண்ணப்பித்து, சிறு பயிற்சியில் கலந்து கொண்டு, ஒரு குழுவில் இணைந்துகொள்ளுங்கள். உங்களுக்கு பொருந்தும் இடத்தை கண்டுபிடிக்க நாங்கள் உதவுகிறோம்."
                    taClassName="font-tamil"
                  />
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    href="/serve/apply"
                    className="btn btn-md btn-primary w-full sm:w-auto shadow-[0_14px_30px_rgba(245,166,35,0.30)]"
                  >
                    <Lang en="Apply to serve" ta="சேவைக்கு விண்ணப்பிக்கவும்" taClassName="font-tamil" />
                  </Link>
                  <Link href="/learn/community-safety" className="btn btn-md btn-secondary w-full sm:w-auto">
                    <Lang en="Safety policies" ta="பாதுகாப்பு கொள்கைகள்" taClassName="font-tamil" />
                  </Link>
                  <Link href="/contact" className="btn btn-md btn-secondary w-full sm:w-auto">
                    <Lang en="Ask a question" ta="கேள்வி கேளுங்கள்" taClassName="font-tamil" />
                  </Link>
                </div>
              </div>
            </Reveal>

            <Reveal className="mt-10">
              <div className="rounded-3xl border border-churchBlue/10 bg-white p-7 shadow-glow md:p-8">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <div className="section-kicker">
                      <Lang en="Training" ta="பயிற்சி" taClassName="font-tamil" />
                    </div>
                    <h2 className="section-heading mt-2">
                      <Lang en="Upcoming volunteer trainings" ta="வரவிருக்கும் தன்னார்வ பயிற்சிகள்" taClassName="font-tamil" />
                    </h2>
                    <p className="mt-2 text-sm text-churchBlue/70 sm:text-base">
                      <Lang
                        en="New to serving? Start with orientation and choose a team."
                        ta="புதியவரா? அறிமுகப் பயிற்சியுடன் தொடங்கி ஒரு குழுவைத் தேர்ந்தெடுக்கவும்."
                        taClassName="font-tamil"
                      />
                    </p>
                  </div>
                  <Link href="/serve/apply" className="btn btn-sm btn-secondary">
                    <Lang en="Open application" ta="விண்ணப்பம்" taClassName="font-tamil" />
                  </Link>
                </div>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  {volunteerTrainingEvents.map((t) => (
                    <div key={t.id} className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-6">
                      <div className="text-sm font-semibold text-churchBlue">
                        <Lang en={t.titleEn} ta={t.titleTa} taClassName="font-tamil" />
                      </div>
                      <div className="mt-2 text-sm text-churchBlue/70">
                        <div>
                          <span className="font-semibold text-churchBlue">
                            <Lang en="When:" ta="எப்போது:" taClassName="font-tamil" />
                          </span>{" "}
                          <Lang en={t.whenEn} ta={t.whenTa} taClassName="font-tamil" />
                        </div>
                        <div className="mt-1">
                          <span className="font-semibold text-churchBlue">
                            <Lang en="Where:" ta="எங்கே:" taClassName="font-tamil" />
                          </span>{" "}
                          <Lang en={t.locationEn} ta={t.locationTa} taClassName="font-tamil" />
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                        <Lang en={t.descriptionEn} ta={t.descriptionTa} taClassName="font-tamil" />
                      </p>
                      <div className="mt-5">
                        <Link href={`/serve/apply?training=${encodeURIComponent(t.id)}`} className="btn btn-sm btn-primary">
                          <Lang en="Register" ta="பதிவு" taClassName="font-tamil" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {serveOpportunities.map((s, idx) => (
                <Reveal key={s.id} delay={idx === 0 ? 0 : idx === 1 ? 1 : 2}>
                  <div className="rounded-3xl border border-churchBlue/10 bg-white p-7 shadow-glow">
                    <div className="flex flex-wrap items-center gap-2">
                      {s.tags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-churchBlue/10 bg-churchBlueSoft px-3 py-1 text-xs font-semibold text-churchBlue/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <h2 className="mt-4 text-lg font-semibold tracking-tight text-churchBlue">
                      <Lang en={s.titleEn} ta={s.titleTa} taClassName="font-tamil" />
                    </h2>

                    <p className="mt-4 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                      <Lang en={s.descriptionEn} ta={s.descriptionTa} taClassName="font-tamil" />
                    </p>

                    <div className="mt-5 text-sm text-churchBlue/70">
                      <span className="font-semibold text-churchBlue">
                        <Lang en="Commitment:" ta="பங்கேற்பு:" taClassName="font-tamil" />
                      </span>{" "}
                      <Lang en={s.commitmentEn} ta={s.commitmentTa} taClassName="font-tamil" />
                    </div>

                    {s.skillsEn?.length ? (
                      <div className="mt-5">
                        <div className="text-sm font-semibold text-churchBlue">
                          <Lang en="Helpful skills" ta="உதவும் திறன்கள்" taClassName="font-tamil" />
                        </div>
                        <ul className="mt-2 list-disc pl-5 text-sm text-churchBlue/75">
                          {s.skillsEn.slice(0, 4).map((_, i) => (
                            <li key={`${s.id}-skill-${i}`}>
                              <Lang en={s.skillsEn?.[i] ?? ""} ta={s.skillsTa?.[i] ?? ""} taClassName="font-tamil" />
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {s.requirementsEn?.length ? (
                      <div className="mt-5">
                        <div className="text-sm font-semibold text-churchBlue">
                          <Lang en="Requirements" ta="தேவைகள்" taClassName="font-tamil" />
                        </div>
                        <ul className="mt-2 list-disc pl-5 text-sm text-churchBlue/75">
                          {s.requirementsEn.slice(0, 4).map((_, i) => (
                            <li key={`${s.id}-req-${i}`}>
                              <Lang
                                en={s.requirementsEn?.[i] ?? ""}
                                ta={s.requirementsTa?.[i] ?? ""}
                                taClassName="font-tamil"
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    <div className="mt-7 grid gap-2">
                      <Link href={`/serve/apply?opportunity=${encodeURIComponent(s.id)}`} className="btn btn-md btn-primary w-full">
                        <Lang en="Apply online" ta="ஆன்லைனில் விண்ணப்பிக்கவும்" taClassName="font-tamil" />
                      </Link>
                      <a
                        href={`mailto:${s.contactEmail}?subject=${encodeURIComponent(`Serve: ${s.titleEn}`)}`}
                        className="btn btn-md btn-secondary w-full"
                      >
                        <Lang en="Email to serve" ta="மின்னஞ்சல்" taClassName="font-tamil" />
                      </a>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
