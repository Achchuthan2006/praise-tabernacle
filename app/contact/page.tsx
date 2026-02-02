import type { Metadata } from "next"
import type { ReactNode } from "react"

import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Praise Tabernacle — service times, location, and a simple message form.",
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        titleEn="Contact"
        titleTa="தொடர்பு"
        descriptionEn="We’d love to hear from you. Ask a question, request prayer, or plan your visit."
        descriptionTa="உங்களிடமிருந்து கேட்க விரும்புகிறோம். கேள்விகள் கேளுங்கள், ஜெபம் வேண்டுங்கள், அல்லது வருகையை திட்டமிடுங்கள்."
      />

      <Container className="py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow">
              <h2 className="text-lg font-semibold text-churchBlue">Location</h2>
              <p className="mt-1 text-sm text-churchBlue/70 font-tamil">இடம்</p>
              <div className="mt-4 space-y-1 text-sm text-churchBlue/75">
                {siteConfig.addressLines.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </div>
              <a
                className="focus-ring mt-5 inline-flex items-center justify-center rounded-xl bg-churchBlue px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-churchBlueLight"
                href="https://www.google.com/maps/search/?api=1&query=5155%20Spectrum%20Way%20Unit%207%20Mississauga%20ON%20L4W%205A1"
                target="_blank"
                rel="noreferrer"
              >
                Get directions
              </a>

              <div className="mt-6 border-t border-churchBlue/10 pt-6">
                <h3 className="text-sm font-semibold text-churchBlue">Service Times</h3>
                <ul className="mt-3 space-y-2 text-sm text-churchBlue/75">
                  {siteConfig.serviceTimes.map((s) => (
                    <li key={s.time} className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-churchBlue">{s.labelEn}</div>
                        <div className="font-tamil">{s.labelTa}</div>
                      </div>
                      <div className="whitespace-nowrap">{s.time}</div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border-t border-churchBlue/10 pt-6">
                <h3 className="text-sm font-semibold text-churchBlue">Contact</h3>
                <div className="mt-3 space-y-2 text-sm">
                  <a
                    className="focus-ring text-churchBlue/75 transition-colors hover:text-churchBlue"
                    href={`mailto:${siteConfig.email}`}
                  >
                    {siteConfig.email}
                  </a>
                  <div className="text-churchBlue/75">{siteConfig.phone}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow">
              <h2 className="text-lg font-semibold text-churchBlue">Send a message</h2>
              <p className="mt-1 text-sm text-churchBlue/70 font-tamil">
                செய்தி அனுப்புங்கள்
              </p>

              <form className="mt-6 grid gap-4" aria-describedby="form-note">
                <Field label="Name" labelTa="பெயர்">
                  <input
                    className="h-11 w-full rounded-xl border border-churchBlue/15 bg-white px-4 text-sm text-churchBlue placeholder:text-churchBlue/45 focus-ring"
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </Field>
                <Field label="Email" labelTa="மின்னஞ்சல்">
                  <input
                    className="h-11 w-full rounded-xl border border-churchBlue/15 bg-white px-4 text-sm text-churchBlue placeholder:text-churchBlue/45 focus-ring"
                    placeholder="you@example.com"
                    autoComplete="email"
                    type="email"
                  />
                </Field>
                <Field label="Message" labelTa="செய்தி">
                  <textarea
                    className="min-h-32 w-full rounded-xl border border-churchBlue/15 bg-white px-4 py-3 text-sm text-churchBlue placeholder:text-churchBlue/45 focus-ring"
                    placeholder="How can we help?"
                  />
                </Field>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-xl bg-churchBlue/40 px-5 py-3 text-sm font-semibold text-white"
                    aria-disabled="true"
                  >
                    Send (Coming soon)
                  </button>
                  <p id="form-note" className="text-xs text-churchBlue/65">
                    We’ll connect this form soon. For now, please email us and we’ll
                    respond as soon as we can.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

function Field({
  label,
  labelTa,
  children,
}: {
  label: string
  labelTa: string
  children: ReactNode
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium text-churchBlue">{label}</span>
        <span className="text-xs text-churchBlue/65 font-tamil">{labelTa}</span>
      </div>
      <div className="mt-2">{children}</div>
    </label>
  )
}
