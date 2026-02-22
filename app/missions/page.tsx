import type { Metadata } from "next"
import Link from "next/link"

import Container from "@/components/ui/Container"
import Lang from "@/components/language/Lang"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import {
  missionPartners,
  missionProjects,
  outreachInitiatives,
  partnerMissionaries,
} from "@/lib/missions"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Missions",
  description: "Local and global missions partnerships.",
  path: "/missions",
})

export default function MissionsPage() {
  const local = missionPartners.filter((p) => p.type === "Local")
  const global = missionPartners.filter((p) => p.type === "Global")

  return (
    <>
      <PageHeader
        titleEn="Missions"
        titleTa="மிஷன்"
        descriptionEn="Local and global mission partnerships — prayer, giving, and service."
        descriptionTa="உள்ளூர் & உலக மிஷன் — ஜெபம், கொடை, சேவை"
      />

      <section className="bg-white">
        <Container className="section-padding">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <div className="rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-8 shadow-glow md:p-10">
                <div className="section-kicker">
                  <Lang en="Heart" ta="இதயம்" taClassName="font-tamil" />
                </div>
                <h2 className="section-heading mt-2">
                  <Lang en="Why missions matter" ta="மிஷன் ஏன் முக்கியம்" taClassName="font-tamil" />
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                  <Lang
                    en="We believe the gospel is good news for every person. We partner in missions by praying, giving, and serving — locally and globally."
                    ta="சுவிசேஷம் ஒவ்வொரு நபருக்கும் நல்ல செய்தி என்று நாங்கள் நம்புகிறோம். உள்ளூரிலும் உலகளாவியிலும் ஜெபம், கொடை, சேவை மூலம் இணைகிறோம்."
                    taClassName="font-tamil"
                  />
                </p>
              </div>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="section-kicker">
                    <Lang en="Local" ta="உள்ளூர்" taClassName="font-tamil" />
                  </div>
                  <h2 className="section-heading">
                    <Lang en="Local missions" ta="உள்ளூர் மிஷன்" taClassName="font-tamil" />
                  </h2>
                  {local.length === 0 ? (
                    <p className="mt-5 text-sm text-churchBlue/70">
                      <Lang
                        en="We’ll share our local mission partners here soon. Contact us if you’d like to learn more."
                        ta="உள்ளூர் மிஷன் கூட்டாளிகள் விவரங்களை விரைவில் பகிர்கிறோம்."
                        taClassName="font-tamil"
                      />
                    </p>
                  ) : null}
                  <ul className="mt-8 space-y-4">
                    {local.map((p) => (
                      <li key={p.id} className="rounded-2xl border border-churchBlue/10 bg-white p-5">
                        <div className="text-sm font-semibold text-churchBlue">{p.name}</div>
                        <div className="mt-2 text-sm text-churchBlue/75">{p.description}</div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="section-kicker">
                    <Lang en="Global" ta="உலக" taClassName="font-tamil" />
                  </div>
                  <h2 className="section-heading">
                    <Lang en="Global missions" ta="உலக மிஷன்" taClassName="font-tamil" />
                  </h2>
                  {global.length === 0 ? (
                    <p className="mt-5 text-sm text-churchBlue/70">
                      <Lang
                        en="We’ll share our global mission partners here soon. Contact us if you’d like to learn more."
                        ta="உலக மிஷன் கூட்டாளிகள் விவரங்களை விரைவில் பகிர்கிறோம்."
                        taClassName="font-tamil"
                      />
                    </p>
                  ) : null}
                  <ul className="mt-8 space-y-4">
                    {global.map((p) => (
                      <li key={p.id} className="rounded-2xl border border-churchBlue/10 bg-white p-5">
                        <div className="text-sm font-semibold text-churchBlue">{p.name}</div>
                        <div className="mt-2 text-sm text-churchBlue/75">{p.description}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal className="mt-12">
              <div className="rounded-3xl border border-churchBlue/10 bg-white p-7 shadow-glow">
                <div className="section-kicker">
                  <Lang en="Projects" ta="திட்டங்கள்" taClassName="font-tamil" />
                </div>
                <h3 className="section-heading mt-2">
                  <Lang en="Current mission projects" ta="தற்போதைய மிஷன் திட்டங்கள்" taClassName="font-tamil" />
                </h3>
                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  {missionProjects.map((project) => (
                    <div key={project.id} className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-5">
                      <div className="text-sm font-semibold text-churchBlue">
                        <Lang en={project.titleEn} ta={project.titleTa} taClassName="font-tamil" />
                      </div>
                      <div className="mt-2 text-sm text-churchBlue/70">
                        <Lang en={project.descriptionEn} ta={project.descriptionTa} taClassName="font-tamil" />
                      </div>
                      <div className="mt-4">
                        <div className="h-2 w-full rounded-full bg-white">
                          <div
                            className="h-2 rounded-full bg-churchBlue"
                            style={{ width: `${Math.min(100, Math.max(0, project.progressPercent))}%` }}
                          />
                        </div>
                        <div className="mt-2 flex items-center justify-between text-xs text-churchBlue/60">
                          <span>{project.progressPercent}%</span>
                          <span>
                            <Lang en={project.goalLabelEn} ta={project.goalLabelTa} taClassName="font-tamil" />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal className="mt-12">
              <div className="rounded-3xl border border-churchBlue/10 bg-white p-7 shadow-glow">
                <div className="section-kicker">
                  <Lang en="Partners" ta="கூட்டாளிகள்" taClassName="font-tamil" />
                </div>
                <h3 className="section-heading mt-2">
                  <Lang en="Partner missionaries" ta="மிஷனரி கூட்டாளிகள்" taClassName="font-tamil" />
                </h3>
                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  {partnerMissionaries.map((m) => (
                    <div key={m.id} className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-5">
                      <div className="text-sm font-semibold text-churchBlue">{m.name}</div>
                      <div className="mt-1 text-xs text-churchBlue/60">
                        {m.region} • {m.focus}
                      </div>
                      <div className="mt-2 text-sm text-churchBlue/70">{m.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal className="mt-12">
              <div className="rounded-3xl border border-churchBlue/10 bg-white p-7 shadow-glow">
                <div className="section-kicker">
                  <Lang en="Local outreach" ta="உள்ளூர் சேவை" taClassName="font-tamil" />
                </div>
                <h3 className="section-heading mt-2">
                  <Lang en="Community initiatives" ta="சமூக முயற்சிகள்" taClassName="font-tamil" />
                </h3>
                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  {outreachInitiatives.map((initiative) => (
                    <div key={initiative.id} className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-5">
                      <div className="text-sm font-semibold text-churchBlue">
                        <Lang en={initiative.titleEn} ta={initiative.titleTa} taClassName="font-tamil" />
                      </div>
                      <div className="mt-2 text-sm text-churchBlue/70">
                        <Lang en={initiative.descriptionEn} ta={initiative.descriptionTa} taClassName="font-tamil" />
                      </div>
                      <div className="mt-2 text-xs text-churchBlue/60">
                        <Lang en={initiative.scheduleEn} ta={initiative.scheduleTa} taClassName="font-tamil" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={1} className="mt-14">
              <div className="rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-8 shadow-glow md:p-10">
                <h3 className="text-xl font-semibold tracking-tight text-churchBlue">
                  <Lang
                    en="Ways to get involved"
                    ta="எப்படி இணைவது"
                    taClassName="font-tamil"
                  />
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                  <Lang
                    en="Pray with us, give toward a project, or join an outreach team."
                    ta="ஜெபத்தில் இணைக, ஒரு திட்டத்திற்கு கொடையளிக்க, அல்லது வெளிய்சேவை குழுவில் சேர."
                    taClassName="font-tamil"
                  />
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link href="/give" className="btn btn-md btn-primary">
                    <Lang en="Give" ta="கொடு" taClassName="font-tamil" />
                  </Link>
                  <Link href="/serve" className="btn btn-md btn-secondary">
                    <Lang en="Serve" ta="சேவை" taClassName="font-tamil" />
                  </Link>
                  <Link href="/contact" className="btn btn-md btn-secondary">
                    <Lang en="Contact" ta="தொடர்பு" taClassName="font-tamil" />
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
