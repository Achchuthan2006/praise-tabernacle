import type { Metadata } from "next"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Accessibility",
  description: "Our commitment to accessibility and inclusive access.",
  path: "/accessibility",
})

export default function AccessibilityPage() {
  const updatedAt = "February 4, 2026"

  return (
    <>
      <PageHeader
        titleEn="Accessibility"
        titleTa="அணுகல்"
        descriptionEn="Our commitment to inclusive access for everyone."
        descriptionTa="அனைவருக்கும் சமமான அணுகலுக்கான எங்கள் உறுதி"
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
                      <Lang en="Accessibility help" ta="Accessibility help" />
                    </a>
                  </div>

                  <div className="mt-6 space-y-10 text-churchBlue/75">
                    <section>
                      <h2 className="text-xl font-semibold tracking-tight text-churchBlue">Accessibility statement</h2>
                      <p className="mt-3 text-sm leading-relaxed sm:text-base">
                        We want our website to be accessible and usable for as many people as possible, including those using assistive
                        technologies.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold tracking-tight text-churchBlue">What we're working toward</h3>
                      <p className="mt-3 text-sm leading-relaxed sm:text-base">
                        We aim to follow accessibility best practices and, where reasonably possible, align with WCAG 2.1 AA guidelines.
                      </p>
                      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
                        <li>Clear headings and readable text.</li>
                        <li>Keyboard navigation support.</li>
                        <li>Sufficient color contrast and focus indicators.</li>
                        <li>Accessible labels for interactive controls.</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold tracking-tight text-churchBlue">Feedback & support</h3>
                      <p className="mt-3 text-sm leading-relaxed sm:text-base">
                        If you experience any difficulty accessing content on this site, tell us what page you were on, what you were trying to
                        do, and what device/browser you use. We will do our best to help.
                      </p>
                      <p className="mt-3 text-sm leading-relaxed sm:text-base">
                        Email us at{" "}
                        <a
                          className="font-semibold text-churchBlue underline decoration-churchGold/60 underline-offset-4"
                          href={`mailto:${siteConfig.email}`}
                        >
                          {siteConfig.email}
                        </a>
                        .
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold tracking-tight text-churchBlue">Ongoing improvements</h3>
                      <p className="mt-3 text-sm leading-relaxed sm:text-base">
                        Accessibility is an ongoing effort. We regularly review pages for readability, keyboard navigation, contrast, and
                        semantic structure.
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
