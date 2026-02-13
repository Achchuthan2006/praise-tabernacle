import Link from "next/link"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import Reveal from "@/components/ui/Reveal"
import { missionProjects, outreachInitiatives, partnerMissionaries } from "@/lib/missions"

function clampPercent(value: number) {
  return Math.min(100, Math.max(0, Number(value) || 0))
}

export default function MissionsShowcaseSection() {
  const projects = missionProjects.slice(0, 2)
  const initiatives = outreachInitiatives.slice(0, 2)
  const partners = partnerMissionaries.slice(0, 2)

  return (
    <section className="relative bg-white border-t border-churchBlue/10">
      <Container className="section-padding">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="section-kicker">
                  <Lang en="Missions" ta="மிஷன்" taClassName="font-tamil" />
                </div>
                <h2 className="section-heading mt-2">
                  <Lang
                    en="Missions & outreach"
                    ta="மிஷன் & உள்ளூர் சேவை"
                    taClassName="font-tamil"
                  />
                </h2>
                <p className="mt-3 max-w-2xl text-sm text-churchBlue/70 sm:text-base">
                  <Lang
                    en="A snapshot of what we’re doing locally and globally — and how you can get involved."
                    ta="உள்ளூர் மற்றும் உலகளாவிய முயற்சிகளின் ஒரு பார்வை — நீங்கள் எப்படி இணைவது என்பதும்."
                    taClassName="font-tamil"
                  />
                </p>
              </div>
              <Link href="/missions" className="btn btn-sm btn-secondary">
                <Lang en="All missions" ta="மிஷன் விவரம்" taClassName="font-tamil" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-start">
            <Reveal className="lg:col-span-6">
              <div className="rounded-3xl border border-churchBlue/10 bg-white p-7 shadow-glow">
                <div className="text-sm font-semibold text-churchBlue/70">
                  <Lang en="Current projects" ta="தற்போதைய திட்டங்கள்" taClassName="font-tamil" />
                </div>
                <div className="mt-5 grid gap-4">
                  {projects.map((project) => {
                    const pct = clampPercent(project.progressPercent)
                    return (
                      <div key={project.id} className="rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-5">
                        <div className="text-sm font-semibold text-churchBlue">
                          <Lang en={project.titleEn} ta={project.titleTa} taClassName="font-tamil" />
                        </div>
                        <div className="mt-2 text-sm text-churchBlue/70">
                          <Lang en={project.descriptionEn} ta={project.descriptionTa} taClassName="font-tamil" />
                        </div>

                        <div className="mt-4" aria-label={`${project.titleEn} progress`}>
                          <div className="h-2 w-full rounded-full bg-white" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
                            <div className="h-2 rounded-full bg-churchBlue" style={{ width: `${pct}%` }} />
                          </div>
                          <div className="mt-2 flex items-center justify-between text-xs text-churchBlue/60">
                            <span>{pct}%</span>
                            <span>
                              <Lang en={project.goalLabelEn} ta={project.goalLabelTa} taClassName="font-tamil" />
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                  <Link href="/give" className="btn btn-sm btn-primary">
                    <Lang en="Give" ta="கொடு" taClassName="font-tamil" />
                  </Link>
                  <Link href="/serve" className="btn btn-sm btn-secondary">
                    <Lang en="Serve" ta="சேவை" taClassName="font-tamil" />
                  </Link>
                </div>
              </div>
            </Reveal>

            <div className="grid gap-6 lg:col-span-6">
              <Reveal delay={1}>
                <div className="rounded-3xl border border-churchBlue/10 bg-white p-7 shadow-glow">
                  <div className="text-sm font-semibold text-churchBlue/70">
                    <Lang en="Partner missionaries" ta="மிஷனரி கூட்டாளிகள்" taClassName="font-tamil" />
                  </div>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {partners.map((m) => (
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

              <Reveal delay={1}>
                <div className="rounded-3xl border border-churchBlue/10 bg-white p-7 shadow-glow">
                  <div className="text-sm font-semibold text-churchBlue/70">
                    <Lang en="Local outreach" ta="உள்ளூர் சேவை" taClassName="font-tamil" />
                  </div>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {initiatives.map((initiative) => (
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
                  <div className="mt-6">
                    <Link href="/contact" className="btn btn-sm btn-secondary">
                      <Lang en="Join an outreach team" ta="சேவை குழுவில் இணைக" taClassName="font-tamil" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

