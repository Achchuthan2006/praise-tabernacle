import type { Metadata } from "next"

import Link from "next/link"

import FallbackImage from "@/components/FallbackImage"
import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { pastorProfile } from "@/lib/pastor"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Pastor",
  description: "Meet our pastor and leadership at Praise Tabernacle.",
  path: "/pastor",
})

export default function PastorPage() {
  return (
    <>
      <PageHeader
        titleEn="Pastor"
        titleTa="போதகர்"
        descriptionEn="Pastoral care with a calm, respectful, and family-friendly heart."
        descriptionTa="அமைதி, மரியாதை, குடும்ப அக்கறையுடன் கூடிய மேய்ப்புப் பராமரிப்பு."
      />

      <Container className="section-padding">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="overflow-hidden rounded-3xl border border-churchBlue/10 bg-white shadow-glow">
                <div className="relative aspect-[4/5] w-full bg-churchBlueSoft">
                  <FallbackImage
                    src={pastorProfile.photoSrc}
                    fallbackSrc={pastorProfile.photoFallbackSrc}
                    alt={pastorProfile.nameEn}
                    width={1200}
                    height={1500}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-churchBlue sm:text-3xl">
                <Lang en={pastorProfile.nameEn} ta={pastorProfile.nameTa} taClassName="font-tamil" />
              </h2>
              <div className="mt-2 text-sm font-semibold text-churchBlue/70">
                <Lang en={pastorProfile.roleEn} ta={pastorProfile.roleTa} taClassName="font-tamil" />
              </div>

              <div className="mt-6 space-y-4 text-sm text-churchBlue/75 sm:text-base">
                {pastorProfile.bioEn.map((p, idx) => (
                  <p key={idx}>
                    <Lang en={p} ta={pastorProfile.bioTa[idx] ?? ""} taClassName="font-tamil" />
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={1} className="mt-8">
              <div className="rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-6 shadow-glow">
                <h3 className="text-base font-semibold text-churchBlue">
                  <Lang en="Contact & availability" ta="தொடர்பு & கிடைப்புத் தகவல்" taClassName="font-tamil" />
                </h3>
                <div className="mt-4 grid gap-3 text-sm text-churchBlue/75 sm:grid-cols-2 sm:text-base">
                  {pastorProfile.contactEmail ? (
                    <div className="rounded-2xl border border-churchBlue/10 bg-white p-4">
                      <div className="text-xs font-semibold tracking-wide text-churchBlue/60">Email</div>
                      <a
                        href={`mailto:${pastorProfile.contactEmail}`}
                        className="mt-1 inline-flex text-sm font-semibold text-churchBlue underline underline-offset-2"
                      >
                        {pastorProfile.contactEmail}
                      </a>
                    </div>
                  ) : null}

                  {pastorProfile.officeHoursEn || pastorProfile.officeHoursTa ? (
                    <div className="rounded-2xl border border-churchBlue/10 bg-white p-4">
                      <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                        <Lang en="Office hours" ta="அலுவலக நேரங்கள்" taClassName="font-tamil" />
                      </div>
                      <div className="mt-1 text-sm text-churchBlue/75">
                        <Lang
                          en={pastorProfile.officeHoursEn ?? ""}
                          ta={pastorProfile.officeHoursTa ?? ""}
                          taClassName="font-tamil"
                        />
                      </div>
                    </div>
                  ) : null}

                  {pastorProfile.yearsOfServiceEn || pastorProfile.yearsOfServiceTa ? (
                    <div className="rounded-2xl border border-churchBlue/10 bg-white p-4 sm:col-span-2">
                      <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                        <Lang en="Years of service" ta="சேவை ஆண்டுகள்" taClassName="font-tamil" />
                      </div>
                      <div className="mt-1 text-sm text-churchBlue/75">
                        <Lang
                          en={pastorProfile.yearsOfServiceEn ?? ""}
                          ta={pastorProfile.yearsOfServiceTa ?? ""}
                          taClassName="font-tamil"
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </Reveal>

            <Reveal delay={2} className="mt-8">
              <div className="rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow">
                <h3 className="text-base font-semibold text-churchBlue">
                  <Lang en="Ministry focus" ta="சேவையின் கவனம்" taClassName="font-tamil" />
                </h3>
                <ul className="mt-4 grid gap-3 text-sm text-churchBlue/75 sm:grid-cols-2">
                  {pastorProfile.ministryFocusEn.map((item, idx) => (
                    <li key={item} className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-4">
                      <Lang en={item} ta={pastorProfile.ministryFocusTa[idx] ?? ""} taClassName="font-tamil" />
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={3} className="mt-8">
              <div className="rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-6 shadow-glow">
                <h3 className="text-base font-semibold text-churchBlue">
                  <Lang en="Credentials & background" ta="தகுதிகள் & பின்னணி" taClassName="font-tamil" />
                </h3>
                <div className="mt-4 grid gap-6 sm:grid-cols-2">
                  <div>
                    <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                      <Lang en="Education" ta="கல்வி" taClassName="font-tamil" />
                    </div>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-churchBlue/75 sm:text-base">
                      {pastorProfile.educationEn.map((item, idx) => (
                        <li key={item}>
                          <Lang en={item} ta={pastorProfile.educationTa[idx] ?? ""} taClassName="font-tamil" />
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                      <Lang en="Credentials" ta="தகுதிகள்" taClassName="font-tamil" />
                    </div>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-churchBlue/75 sm:text-base">
                      {pastorProfile.credentialsEn.map((item, idx) => (
                        <li key={item}>
                          <Lang en={item} ta={pastorProfile.credentialsTa[idx] ?? ""} taClassName="font-tamil" />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>

            {pastorProfile.familyEn || pastorProfile.familyTa ? (
              <Reveal delay={3} className="mt-8">
                <div className="rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow">
                  <h3 className="text-base font-semibold text-churchBlue">
                    <Lang en="Family" ta="குடும்பம்" taClassName="font-tamil" />
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                    <Lang en={pastorProfile.familyEn ?? ""} ta={pastorProfile.familyTa ?? ""} taClassName="font-tamil" />
                  </p>
                </div>
              </Reveal>
            ) : null}

            <Reveal delay={3} className="mt-8">
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="btn btn-md btn-primary">
                  <Lang en="Message the pastor" ta="போதகருக்கு செய்தி" taClassName="font-tamil" />
                </Link>
                <a href={`mailto:${pastorProfile.contactEmail}`} className="btn btn-md btn-secondary">
                  <Lang en="Email" ta="மின்னஞ்சல்" taClassName="font-tamil" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </>
  )
}
