import type { Metadata } from "next"
import Link from "next/link"

import Lang from "@/components/language/Lang"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import Reveal from "@/components/ui/Reveal"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Policies",
  description: "Privacy, accessibility, and related policies for Praise Tabernacle.",
  path: "/policies",
})

type PolicyLink = {
  href: string
  title: string
  description: string
}

const policies: PolicyLink[] = [
  {
    href: "/privacy",
    title: "Privacy Policy",
    description: "How we collect, use, and protect personal information.",
  },
  {
    href: "/accessibility",
    title: "Accessibility",
    description: "Our commitment to inclusive access for everyone.",
  },
]

export default function PoliciesPage() {
  return (
    <>
      <PageHeader
        titleEn="Policies"
        titleTa="Policies"
        descriptionEn="Important information about privacy and accessibility."
        descriptionTa=""
      />

      <section className="bg-white">
        <Container className="section-padding">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-5 sm:grid-cols-2">
              {policies.map((p, idx) => (
                <Reveal key={p.href} delay={(idx % 4) as 0 | 1 | 2 | 3}>
                  <Link href={p.href} className="card focus-ring" aria-label={`Open policy: ${p.title}`}>
                    <div className="card-content">
                      <div className="section-kicker">
                        <Lang en="Policies" ta="Policies" />
                      </div>
                      <h2 className="mt-2 text-xl font-semibold tracking-tight text-churchBlue sm:text-2xl">
                        {p.title}
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-churchBlue/75 sm:text-base">
                        {p.description}
                      </p>
                      <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-churchBlue/80">
                        Read more <span aria-hidden="true">{"\u203A"}</span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

