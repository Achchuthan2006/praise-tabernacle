import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import PrintButton from "@/components/PrintButton"
import Container from "@/components/ui/Container"
import PageHeader from "@/components/ui/PageHeader"
import { pageMetadata } from "@/lib/seo"
import { getAllPublicSermonSlugs, getPublicSermonBySlug } from "@/lib/sermons"

export function generateStaticParams() {
  return getAllPublicSermonSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const sermon = getPublicSermonBySlug(resolvedParams.slug)
  if (!sermon) return { title: "Discussion Guide" }
  return pageMetadata({
    title: `Discussion Guide: ${sermon.title}`,
    description: `Discussion questions for ${sermon.title}.`,
    path: `/sermons/${sermon.slug}/discussion-guide`,
  })
}

export default async function SermonDiscussionGuidePage({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>
}) {
  const resolvedParams = await params
  const sermon = getPublicSermonBySlug(resolvedParams.slug)
  if (!sermon) notFound()

  const questions =
    sermon.discussionQuestions?.length
      ? sermon.discussionQuestions
      : [
          "What stood out to you from this message?",
          "What is one step you can take this week to apply it?",
          "How can we pray for you?",
        ]

  return (
    <>
      <PageHeader
        titleEn="Discussion Guide"
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

                <div className="mt-8">
                  <div className="text-sm font-semibold text-churchBlue">Questions</div>
                  <ol className="mt-4 list-decimal space-y-4 pl-5 text-sm text-churchBlue/80 sm:text-base">
                    {questions.map((q) => (
                      <li key={q}>
                        <div className="font-medium text-churchBlue">{q}</div>
                        <div className="mt-3 space-y-2">
                          <div className="h-4 border-b border-dashed border-churchBlue/30" />
                          <div className="h-4 border-b border-dashed border-churchBlue/30" />
                          <div className="h-4 border-b border-dashed border-churchBlue/30" />
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="mt-10 rounded-2xl border border-churchBlue/10 bg-churchBlueSoft p-5 print:border-churchBlue/20">
                  <div className="text-sm font-semibold text-churchBlue">Prayer</div>
                  <p className="mt-2 text-sm text-churchBlue/75">
                    Write down one or two prayer requests, and pray together as a group or family.
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="h-4 border-b border-dashed border-churchBlue/30" />
                    <div className="h-4 border-b border-dashed border-churchBlue/30" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
