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
    <section className="relative overflow-hidden border-b border-churchBlue/10 bg-[linear-gradient(180deg,#ffffff_0%,#fbfbff_100%)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(28rem_10rem_at_20%_0%,rgba(245,196,66,0.14),transparent_60%),radial-gradient(36rem_12rem_at_75%_0%,rgba(104,63,244,0.12),transparent_62%)]"
      />
      <Container className="pt-10 pb-7 md:pt-12 md:pb-9">
        <div className="section-kicker">Praise Tabernacle</div>
        <h1 className="section-heading">
          <span data-lang="en" lang="en">
            {titleEn}
          </span>
          <span data-lang="ta" lang="ta" className="font-tamil">
            {titleTa}
          </span>
        </h1>

        {descriptionEn || descriptionTa ? (
          <div className="mt-4 max-w-3xl space-y-2 text-sm text-churchBlue/75 sm:text-base">
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
      </Container>
    </section>
  )
}
