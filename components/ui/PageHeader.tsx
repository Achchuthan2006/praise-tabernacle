import Container from "@/components/ui/Container"

export default function PageHeader({
  titleEn,
  titleTa,
  descriptionEn,
  descriptionTa,
}: {
  titleEn: string
  titleTa: string
  descriptionEn?: string
  descriptionTa?: string
}) {
  return (
    <section className="section-soft-stage relative overflow-hidden border-b border-churchBlue/10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(30rem_12rem_at_18%_0%,rgba(245,196,66,0.18),transparent_60%),radial-gradient(40rem_16rem_at_82%_0%,rgba(104,63,244,0.14),transparent_62%)]"
      />
      <Container className="pt-10 pb-8 md:pt-14 md:pb-10">
        <div className="premium-surface max-w-4xl px-6 py-8 sm:px-8 md:px-10 md:py-10">
          <div className="section-kicker">Praise Tabernacle</div>
          <h1 className="section-heading mt-3 text-balance">
            <span data-lang="en" lang="en">
              {titleEn}
            </span>
            <span data-lang="ta" lang="ta" className="font-tamil">
              {titleTa}
            </span>
          </h1>

          {descriptionEn || descriptionTa ? (
            <div className="mt-5 max-w-3xl space-y-2 text-sm text-churchBlue/75 sm:text-base">
              {descriptionEn ? (
                <p data-lang="en" lang="en">
                  {descriptionEn}
                </p>
              ) : null}
              {descriptionTa ? (
                <p data-lang="ta" lang="ta" className="font-tamil text-churchBlue/70">
                  {descriptionTa}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
