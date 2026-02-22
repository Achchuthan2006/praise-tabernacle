import type { Metadata } from "next"
import Link from "next/link"

import Lang from "@/components/language/Lang"
import SermonArchive from "@/components/SermonArchive"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import { pageMetadata } from "@/lib/seo"
import { publicSermons, sermonSeries } from "@/lib/sermons"

export const metadata: Metadata = pageMetadata({
  title: "Communion Service",
  description: "Communion service messages and replays.",
  path: "/communion",
})

export default function CommunionPage() {
  const communionSermons = publicSermons
    .filter((s) => (s.topics ?? []).some((t) => t.toLowerCase().includes("communion")) || s.title.toLowerCase().includes("communion"))
    .slice()
    .sort((a, b) => b.dateIso.localeCompare(a.dateIso))

  return (
    <>
      <PageHeader
        titleEn="Communion Service"
        titleTa="திருவிருந்து ஆராதனை"
        descriptionEn="Messages and replays focused on Communion."
        descriptionTa="திருவிருந்து ஆராதனை தொடர்பான செய்திகள் மற்றும் பதிவுகள்."
      />

      <section className="bg-white">
        <Container className="pb-16 sm:pb-20">
          {communionSermons.length ? (
            <SermonArchive sermons={communionSermons} series={sermonSeries} />
          ) : (
            <div className="mx-auto max-w-3xl rounded-3xl border border-churchBlue/10 bg-churchBlueSoft p-8 text-sm text-churchBlue/75 shadow-glow">
              <p>
                <Lang
                  en="No communion service videos are tagged yet. Add the topic “Communion” to the right sermons in lib/sermons.ts."
                  ta="இப்போது திருவிருந்து ஆராதனை வீடியோக்கள் இல்லை. lib/sermons.ts-இல் தொடர்புடைய பிரசங்கங்களுக்கு “Communion” என்ற தலைப்பை சேர்க்கவும்."
                  taClassName="font-tamil"
                />
              </p>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <Link href="/sermons" className="btn btn-sm btn-primary">
                  <Lang en="Go to sermons" ta="பிரசங்கங்கள்" taClassName="font-tamil" />
                </Link>
                <Link href="/contact" className="btn btn-sm btn-secondary">
                  <Lang en="Contact" ta="தொடர்பு" taClassName="font-tamil" />
                </Link>
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
