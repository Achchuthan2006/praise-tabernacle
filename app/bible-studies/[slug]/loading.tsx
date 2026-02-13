import Container from "@/components/ui/Container"

export default function LoadingBibleStudyDetail() {
  return (
    <>
      <section className="relative border-b border-churchBlue/10 bg-white">
        <Container className="py-12">
          <div className="skeleton h-4 w-40 rounded-lg" />
          <div className="mt-4 skeleton h-10 w-full max-w-3xl rounded-2xl" />
          <div className="mt-5 space-y-2">
            <div className="skeleton h-4 w-72 rounded-lg" />
            <div className="skeleton h-4 w-56 rounded-lg" />
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="pb-16 sm:pb-20">
          <div className="mx-auto max-w-5xl">
            <div className="card">
              <div className="card-content p-6 sm:p-8">
                <div className="aspect-video w-full overflow-hidden rounded-3xl border border-churchBlue/10 bg-churchBlueSoft">
                  <div className="skeleton h-full w-full" />
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  <div className="skeleton h-7 w-24 rounded-full" />
                  <div className="skeleton h-7 w-28 rounded-full" />
                  <div className="skeleton h-7 w-20 rounded-full" />
                </div>

                <div className="mt-8 grid gap-2 sm:grid-cols-3">
                  <div className="skeleton h-11 w-full rounded-2xl" />
                  <div className="skeleton h-11 w-full rounded-2xl" />
                  <div className="skeleton h-11 w-full rounded-2xl" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

