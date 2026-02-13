import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import PrintButton from "@/components/PrintButton"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import { pageMetadata } from "@/lib/seo"
import { getAllSermonSlugs, getSermonBySlug } from "@/lib/sermons"

export function generateStaticParams() {
  return getAllSermonSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const sermon = getSermonBySlug(resolvedParams.slug)
  if (!sermon) return { title: "Sermon Notes" }
  return pageMetadata({
    title: `Sermon Notes: ${sermon.title}`,
    description: `Printable sermon notes for ${sermon.title}.`,
    path: `/sermons/${sermon.slug}/notes`,
  })
}

export default async function SermonNotesPage({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>
}) {
  const resolvedParams = await params
  const sermon = getSermonBySlug(resolvedParams.slug)
  if (!sermon) notFound()

  return (
    <>
      <PageHeader
        titleEn="Sermon Notes"
        titleTa=""
        descriptionEn={[sermon.title, sermon.dateIso, sermon.speaker ? `• ${sermon.speaker}` : ""].filter(Boolean).join(" ")}
        descriptionTa=""
      />

      <section className="bg-white print:bg-white">
        <Container className="pb-16 sm:pb-20">
          <div className="mx-auto max-w-3xl">
            <div className="card print:shadow-none print:border-none">
              <div className="card-content p-6 sm:p-8 print:p-0">
                <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
                  <Link href={`/sermons/${sermon.slug}`} className="btn btn-sm btn-secondary">
                    Back to sermon
                  </Link>
                  <PrintButton />
                </div>

                <h2 className="mt-6 text-2xl font-semibold tracking-tight text-churchBlue print:mt-0">
                  {sermon.title}
                </h2>
                <p className="mt-2 text-sm text-churchBlue/70">
                  {sermon.dateIso}
                  {sermon.speaker ? ` • ${sermon.speaker}` : ""}
                </p>

                {sermon.scriptures?.length ? (
                  <p className="mt-6 text-sm text-churchBlue/75">
                    <span className="font-semibold text-churchBlue">Scripture:</span>{" "}
                    {sermon.scriptures.join(", ")}
                  </p>
                ) : null}

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <NoteBlock title="Key points" lines={10} />
                  <NoteBlock title="Applications / next steps" lines={10} />
                </div>

                <div className="mt-6 rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-5 print:border-churchBlue/20">
                  <div className="text-sm font-semibold text-churchBlue">Prayer</div>
                  <p className="mt-2 text-sm text-churchBlue/75">
                    Write a prayer response for what you learned today.
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="h-4 border-b border-dashed border-churchBlue/30" />
                    <div className="h-4 border-b border-dashed border-churchBlue/30" />
                    <div className="h-4 border-b border-dashed border-churchBlue/30" />
                  </div>
                </div>

                <p className="mt-6 text-xs text-churchBlue/60 print:mt-3">
                  Tip: Use your browser print dialog to save as PDF.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

function NoteBlock({ title, lines }: { title: string; lines: number }) {
  return (
    <div className="rounded-2xl border border-churchBlue/10 bg-white p-5 shadow-glow print:shadow-none">
      <div className="text-sm font-semibold text-churchBlue">{title}</div>
      <div className="mt-4 space-y-2">
        {Array.from({ length: lines }).map((_, idx) => (
          <div key={idx} className="h-4 border-b border-dashed border-churchBlue/30" />
        ))}
      </div>
    </div>
  )
}

