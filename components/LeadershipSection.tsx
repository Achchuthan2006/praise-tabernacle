import Image from "next/image"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import Reveal from "@/components/ui/Reveal"
import { leadershipTeam } from "@/lib/leadership"

export default function LeadershipSection() {
  return (
    <section className="border-t border-churchBlue/10 bg-white">
      <Container className="section-padding">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div>
              <div className="section-kicker">
                <Lang en="Leadership" ta="தலைமை" />
              </div>
              <h2 className="section-heading">
                <Lang en="Meet our team" ta="எங்கள் அணியை சந்தியுங்கள்" />
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-churchBlue/70 sm:text-base">
                <Lang
                  en="Pastors and leaders serving our church family with prayer, care, and clarity."
                  ta="ஜெபம், பராமரிப்பு, மற்றும் தெளிவான வழிகாட்டுதலோடு சபைக்குடும்பத்தை சேவை செய்யும் தலைவர்கள்."
                  taClassName="font-tamil"
                />
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {leadershipTeam.map((leader, idx) => (
              <Reveal key={`${leader.name}-${leader.roleEn}-${idx}`} delay={idx === 0 ? 0 : idx === 1 ? 1 : 2}>
                <div className="card">
                  <div className="card-image card-image-fixed">
                    <Image
                      src={leader.photoSrc}
                      alt={`${leader.name} - ${leader.roleEn}`}
                      width={1200}
                      height={900}
                      className="h-full w-full"
                    />
                  </div>
                  <div className="card-content">
                    <div className="text-sm font-semibold text-white">{leader.name}</div>
                    <div className="mt-1 text-xs text-white/75">
                      <Lang en={leader.roleEn} ta={leader.roleTa} taClassName="font-tamil" />
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-white/85">
                      <Lang en={leader.bioEn} ta={leader.bioTa} taClassName="font-tamil" />
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

