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
      <Container className="py-12">
        <h1 className="text-3xl font-semibold tracking-tight text-churchBlue sm:text-4xl">
          {titleEn}
        </h1>
        <p className="mt-2 text-xl text-churchBlueLight font-tamil">{titleTa}</p>
        {descriptionEn || descriptionTa ? (
          <div className="mt-5 max-w-3xl space-y-2 text-sm text-churchBlue/75 sm:text-base">
            {descriptionEn ? <p>{descriptionEn}</p> : null}
            {descriptionTa ? (
              <p className="font-tamil text-churchBlue/70">{descriptionTa}</p>
            ) : null}
          </div>
        ) : null}
      </Container>
    </section>
  )
}
