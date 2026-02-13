import type { Metadata } from "next"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Praise Tabernacle collects, uses, and protects personal information.",
  path: "/privacy",
})

export default function PrivacyPage() {
  const updatedAt = "February 4, 2026"

  return (
    <>
      <PageHeader
        titleEn="Privacy Policy"
        titleTa="தனியுரிமை"
        descriptionEn="How we handle personal information."
        descriptionTa="தனிப்பட்ட தகவல்களை நாங்கள் எப்படி கையாள்கிறோம்"
      />

      <section className="bg-white">
        <Container className="section-padding">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div className="card">
                <div className="card-content p-8 sm:p-10">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-xs font-semibold tracking-wide text-churchBlue/60">
                      <Lang en="Last updated" ta="Last updated" />: {updatedAt}
                    </div>
                    <a href={`mailto:${siteConfig.email}`} className="btn btn-sm btn-secondary w-fit">
                      <Lang en="Contact" ta="Contact" />
                    </a>
                  </div>

                  <div className="mt-6 space-y-10 text-churchBlue/75">
                    <section>
                      <h2 className="text-xl font-semibold tracking-tight text-churchBlue">Overview</h2>
                      <p className="mt-3 text-sm leading-relaxed sm:text-base">
                        This Privacy Policy explains how {siteConfig.nameEn} ("we", "us") collects, uses, and protects personal information when
                        you visit our website or contact our ministry.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold tracking-tight text-churchBlue">What we collect</h3>
                      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
                        <li>
                          <span className="font-semibold text-churchBlue">Information you provide</span> (for example: name, email address, and
                          the content of messages or prayer requests submitted through forms).
                        </li>
                        <li>
                          <span className="font-semibold text-churchBlue">Event RSVPs</span> (for example: name, email address, and number of
                          seats) when you reserve a spot for an event.
                        </li>
                        <li>
                          <span className="font-semibold text-churchBlue">Basic technical data</span> (for example: IP address, user-agent, and
                          timestamps) to help secure the website and troubleshoot issues.
                        </li>
                        <li>
                          <span className="font-semibold text-churchBlue">Analytics data</span> (only if enabled and you consent), to understand
                          general website usage and improve content.
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold tracking-tight text-churchBlue">How we use information</h3>
                      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
                        <li>To respond to contact messages, prayer requests, and care requests.</li>
                        <li>To send updates you request (newsletter) and event reminders you opt into.</li>
                        <li>To operate and secure our website (spam prevention, abuse detection, and troubleshooting).</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold tracking-tight text-churchBlue">Cookies & consent</h3>
                      <p className="mt-3 text-sm leading-relaxed sm:text-base">
                        Our site may store a small preference in your browser to remember your cookie/analytics choice. If analytics is enabled,
                        you can accept or decline when prompted. You can also clear your browser storage to reset your choice.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold tracking-tight text-churchBlue">Sharing of information</h3>
                      <p className="mt-3 text-sm leading-relaxed sm:text-base">
                        We do not sell personal information. We may share information only as needed to operate the website or comply with law,
                        such as:
                      </p>
                      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
                        <li>Service providers that help us host or maintain the site.</li>
                        <li>
                          Third-party platforms you choose to use via links (e.g., YouTube, Spotify). Their policies apply on those platforms.
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold tracking-tight text-churchBlue">Online giving / payments</h3>
                      <p className="mt-3 text-sm leading-relaxed sm:text-base">
                        If we offer online giving, payments are processed by a third-party payment provider. We do not store full payment card
                        numbers on this website. Payment providers have their own privacy and security practices.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold tracking-tight text-churchBlue">Security</h3>
                      <p className="mt-3 text-sm leading-relaxed sm:text-base">
                        We use reasonable safeguards to protect submitted information (for example: HTTPS in production, basic spam protections,
                        and security controls on forms). No method of transmission or storage is 100% secure, but we work to reduce risk.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold tracking-tight text-churchBlue">Data retention</h3>
                      <p className="mt-3 text-sm leading-relaxed sm:text-base">
                        We keep form submissions and RSVP data only as long as necessary for ministry purposes (for example: responding to
                        requests or managing events), then delete or anonymize it when no longer needed.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold tracking-tight text-churchBlue">International visitors & GDPR</h3>
                      <p className="mt-3 text-sm leading-relaxed sm:text-base">
                        If you are located in the European Economic Area (EEA) or United Kingdom, you may have rights such as access, correction,
                        and deletion of your personal data. To make a request, contact us.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold tracking-tight text-churchBlue">Children's privacy</h3>
                      <p className="mt-3 text-sm leading-relaxed sm:text-base">
                        This website is intended for general audiences. If you believe a child has provided personal information through our
                        forms, please contact us and we will work to remove it.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold tracking-tight text-churchBlue">Contact</h3>
                      <p className="mt-3 text-sm leading-relaxed sm:text-base">
                        Questions about privacy can be sent to{" "}
                        <a
                          className="font-semibold text-churchBlue underline decoration-churchGold/60 underline-offset-4"
                          href={`mailto:${siteConfig.email}`}
                        >
                          {siteConfig.email}
                        </a>
                        .
                      </p>
                    </section>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  )
}
