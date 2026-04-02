import Link from "next/link"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import Reveal from "@/components/ui/Reveal"
import { siteConfig } from "@/lib/site"

export default function HomeAboutSection() {
  return (
    <section className="section-soft-stage">
      <Container className="section-padding">
        <Reveal>
          <div className="content-shell-wide premium-surface p-6 md:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.15fr,0.85fr] lg:items-start">
              <div className="max-w-3xl">
                <div className="section-kicker">
                  <Lang en="About Praise Tabernacle" ta="à®¤à¯à®¤à®¿à®¯à®¿à®©à¯ à®•à¯‚à®Ÿà®¾à®°à®®à¯ à®ªà®±à¯à®±à®¿" taClassName="font-tamil" />
                </div>
                <h2 className="section-heading">
                  <Lang en={siteConfig.taglineEn} ta={siteConfig.taglineTa} taClassName="font-tamil" />
                </h2>
                <p className="section-lead mt-4">
                  <Lang en={siteConfig.welcomeMessageEn} ta={siteConfig.welcomeMessageTa} taClassName="font-tamil" />
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/about" className="btn btn-md btn-primary">
                    <Lang en="Learn More" ta="à®®à¯‡à®²à¯à®®à¯ à®…à®±à®¿à®¯" taClassName="font-tamil" />
                  </Link>
                  <Link href="/visit" className="btn btn-md btn-secondary-soft">
                    <Lang en="Plan a Visit" ta="à®µà®°à¯à®•à¯ˆà®¯à¯ˆ à®¤à®¿à®Ÿà¯à®Ÿà®®à®¿à®Ÿà¯à®™à¯à®•à®³à¯" taClassName="font-tamil" />
                  </Link>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[28px] border border-churchBlue/10 bg-white/85 p-6 shadow-[0_18px_40px_rgb(18_27_62_/_0.08)]">
                  <div className="section-kicker">
                    <Lang en="Our vision" ta="à®Žà®™à¯à®•à®³à¯ à®¤à®°à®¿à®šà®©à®®à¯" taClassName="font-tamil" />
                  </div>
                  <p className="mt-4 text-sm leading-7 text-churchBlue/75">
                    <Lang en={siteConfig.visionEn} ta={siteConfig.visionTa} taClassName="font-tamil" />
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="info-pill">
                    <span className="h-2.5 w-2.5 rounded-full bg-churchGold" aria-hidden="true" />
                    <Lang en="Christ-centred teaching" ta="à®•à®¿à®±à®¿à®¸à¯à®¤à¯à®µ à®®à¯ˆà®¯ à®ªà¯‹à®¤à®©à¯ˆ" taClassName="font-tamil" />
                  </div>
                  <div className="info-pill">
                    <span className="h-2.5 w-2.5 rounded-full bg-churchBlue" aria-hidden="true" />
                    <Lang en="Tamil & English worship" ta="à®¤à®®à®¿à®´à¯ à®®à®±à¯à®±à¯à®®à¯ à®†à®™à¯à®•à®¿à®² à®†à®°à®¾à®¤à®©à¯ˆ" taClassName="font-tamil" />
                  </div>
                  <div className="info-pill">
                    <span className="h-2.5 w-2.5 rounded-full bg-churchBlueLight" aria-hidden="true" />
                    <Lang en="Prayerful community" ta="à®œà¯†à®ªà®®à¯ à®¨à®¿à®±à¯ˆà®¨à¯à®¤ à®šà®®à¯‚à®•à®®à¯" taClassName="font-tamil" />
                  </div>
                  <div className="info-pill">
                    <span className="h-2.5 w-2.5 rounded-full bg-churchGold" aria-hidden="true" />
                    <Lang en={siteConfig.identityEn} ta={siteConfig.identityTa} taClassName="font-tamil" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
