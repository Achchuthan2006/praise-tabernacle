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
    <section className="relative border-b border-churchBlue/10 bg-white">
      <Container className="pt-12 pb-8">
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
      </Container>
    </section>
  )
}
