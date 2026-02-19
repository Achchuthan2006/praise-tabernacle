import type { Metadata } from "next"
import Link from "next/link"

import ContactMessageForm from "@/components/ContactMessageForm"
import Lang from "@/components/language/Lang"
import GoogleMapEmbed from "@/components/GoogleMapEmbed"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Contact Praise Tabernacle â€” service times, location, and a simple message form.",
  path: "/contact",
})

export default function ContactPage() {
  const mapQuery = encodeURIComponent(siteConfig.addressLines.join(", "))
  const mapEmbedUrl = `https://www.google.com/maps?q=${mapQuery}&output=embed`
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`

  return (
    <>
      <PageHeader
        titleEn="Contact"
        titleTa="à®¤à¯Šà®Ÿà®°à¯à®ªà¯"
        descriptionEn="Weâ€™d love to hear from you. Ask a question, request prayer, or plan your visit."
        descriptionTa="à®‰à®™à¯à®•à®³à®¿à®Ÿà®®à®¿à®°à¯à®¨à¯à®¤à¯ à®•à¯‡à®Ÿà¯à®• à®µà®¿à®°à¯à®®à¯à®ªà¯à®•à®¿à®±à¯‹à®®à¯. à®•à¯‡à®³à¯à®µà®¿à®•à®³à¯ à®•à¯‡à®³à¯à®™à¯à®•à®³à¯, à®œà¯†à®ªà®®à¯ à®µà¯‡à®£à¯à®Ÿà¯à®™à¯à®•à®³à¯, à®…à®²à¯à®²à®¤à¯ à®µà®°à¯à®•à¯ˆà®¯à¯ˆ à®¤à®¿à®Ÿà¯à®Ÿà®®à®¿à®Ÿà¯à®™à¯à®•à®³à¯."
      />

      <Container className="section-padding">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <div className="mx-auto max-w-xl lg:mx-0">
              <Reveal>
                <section className="border-y border-churchBlue/10 py-8">
                  <h2 className="text-xl font-semibold tracking-tight text-churchBlue">
                    <Lang en="Location" ta="à®‡à®Ÿà®®à¯" taClassName="font-tamil" />
                  </h2>
                  <div className="mt-5 space-y-1 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                    {siteConfig.addressLines.map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <a
                      className="btn btn-md btn-primary w-full sm:w-auto"
                      href={directionsUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Lang en="Get directions" ta="à®µà®´à®¿à®®à¯à®±à¯ˆà®•à®³à¯ à®ªà¯†à®±à¯à®™à¯à®•à®³à¯" taClassName="font-tamil" />
                    </a>
                    <Link
                      href="/visit"
                      className="btn btn-md btn-secondary w-full sm:w-auto"
                    >
                      <Lang en="Plan your visit" ta="à®µà®°à¯à®•à¯ˆà®¯à¯ˆ à®¤à®¿à®Ÿà¯à®Ÿà®®à®¿à®Ÿà¯à®™à¯à®•à®³à¯" taClassName="font-tamil" />
                    </Link>
                  </div>

                  <div className="mt-8 overflow-hidden rounded-3xl border border-churchBlue/10 bg-white shadow-glow">
                    <GoogleMapEmbed
                      title="Google Map - Praise Tabernacle"
                      src={mapEmbedUrl}
                      className="h-[200px] w-full bg-churchBlueSoft sm:h-[240px] md:h-[280px]"
                      ctaLabel="Tap to move the map"
                    />
                  </div>
                </section>
              </Reveal>

              <Reveal delay={1}>
                <section className="border-b border-churchBlue/10 py-8">
                  <h3 className="text-sm font-semibold tracking-tight text-churchBlue">
                    <Lang en="Service Times" ta="à®†à®°à®¾à®¤à®©à¯ˆ à®¨à¯‡à®°à®™à¯à®•à®³à¯" taClassName="font-tamil" />
                  </h3>
                  <ul className="mt-5 space-y-3 text-sm text-churchBlue/75 sm:text-base">
                    {siteConfig.serviceTimes.map((s) => (
                      <li key={s.time} className="flex items-start justify-between gap-6">
                        <div className="min-w-0">
                          <div className="text-churchBlue">
                            <Lang en={s.labelEn} ta={s.labelTa} taClassName="font-tamil" />
                          </div>
                        </div>
                        <div className="whitespace-nowrap text-churchBlue/75">{s.time}</div>
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>

              <Reveal delay={2}>
                <section className="py-8">
                  <h3 className="text-sm font-semibold tracking-tight text-churchBlue">
                    <Lang en="Contact" ta="à®¤à¯Šà®Ÿà®°à¯à®ªà¯" taClassName="font-tamil" />
                  </h3>
                  <div className="mt-5 space-y-2 text-sm sm:text-base">
                    <a
                      className="focus-ring text-churchBlue/75 transition-colors hover:text-churchBlue"
                      href={`mailto:${siteConfig.email}`}
                    >
                      {siteConfig.email}
                    </a>
                    <div className="text-churchBlue/75">{siteConfig.phone}</div>
                  </div>
                </section>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <Reveal>
                <ContactMessageForm />
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

