import Link from "next/link"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import Reveal from "@/components/ui/Reveal"
import { siteConfig } from "@/lib/site"

export default function HomeContactSection() {
  return (
    <section className="section-soft-stage">
      <Container className="section-padding">
        <Reveal>
          <div className="content-shell premium-surface p-6 md:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
              <div className="max-w-2xl">
                <div className="section-kicker">
                  <Lang en="Contact & visit" ta="à®¤à¯Šà®Ÿà®°à¯à®ªà¯ à®®à®±à¯à®±à¯à®®à¯ à®µà®°à¯à®•à¯ˆ" taClassName="font-tamil" />
                </div>
                <h2 className="section-heading">
                  <Lang en="We would love to welcome you" ta="à®‰à®™à¯à®•à®³à¯ˆ à®…à®©à¯à®ªà¯à®Ÿà®©à¯ à®µà®°à®µà¯‡à®±à¯à®• à®µà®¿à®°à¯à®®à¯à®ªà¯à®•à®¿à®±à¯‹à®®à¯" taClassName="font-tamil" />
                </h2>
                <p className="section-lead mt-4">
                  <Lang
                    en="Whether you want to visit in person, ask for prayer, or speak with someone from the church, we are here to help."
                    ta="à®¨à¯€à®™à¯à®•à®³à¯ à®¨à¯‡à®°à®¿à®²à¯ à®µà®°à®µà®¿à®°à¯à®®à¯à®ªà®¿à®©à®¾à®²à¯à®®à¯, à®œà¯†à®ªà®®à¯ à®•à¯‡à®Ÿà¯à®• à®µà®¿à®°à¯à®®à¯à®ªà®¿à®©à®¾à®²à¯à®®à¯, à®…à®²à¯à®²à®¤à¯ à®šà®ªà¯ˆà®¯à®¿à®²à¯à®³à¯à®³ à®’à®°à¯à®µà®°à¯‹à®Ÿà¯ à®ªà¯‡à®š à®µà®¿à®°à¯à®®à¯à®ªà®¿à®©à®¾à®²à¯à®®à¯, à®‰à®™à¯à®•à®³à¯à®•à¯ à®‰à®¤à®µ à®¨à®¾à®™à¯à®•à®³à¯ à®‡à®°à¯à®•à¯à®•à®¿à®±à¯‹à®®à¯."
                    taClassName="font-tamil"
                  />
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/contact" className="btn btn-md btn-primary">
                    <Lang en="Contact Church" ta="à®šà®ªà¯ˆà®¯à¯ˆ à®¤à¯Šà®Ÿà®°à¯à®ªà¯à®•à¯Šà®³à¯à®³" taClassName="font-tamil" />
                  </Link>
                  <Link href="/prayer" className="btn btn-md btn-secondary-soft">
                    <Lang en="Request Prayer" ta="à®œà¯†à®ªà®®à¯ à®•à¯‹à®°à¯à®™à¯à®•à®³à¯" taClassName="font-tamil" />
                  </Link>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[28px] border border-churchBlue/10 bg-white/85 p-6 shadow-[0_18px_40px_rgb(18_27_62_/_0.08)]">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c4941a]">
                    <Lang en="Visit us" ta="à®Žà®™à¯à®•à®³à¯ˆ à®šà®¨à¯à®¤à®¿à®¯à¯à®™à¯à®•à®³à¯" taClassName="font-tamil" />
                  </div>
                  <div className="mt-4 space-y-2 text-sm leading-7 text-churchBlue/76">
                    <p>{siteConfig.addressLines[0]}</p>
                    <p>{siteConfig.addressLines[1]}</p>
                    {siteConfig.serviceTimes.map((service) => (
                      <p key={service.id}>{service.time}</p>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <a
                    href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`}
                    className="info-pill justify-center text-center"
                  >
                    {siteConfig.phone}
                  </a>
                  <a href={`mailto:${siteConfig.email}`} className="info-pill justify-center text-center">
                    {siteConfig.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
