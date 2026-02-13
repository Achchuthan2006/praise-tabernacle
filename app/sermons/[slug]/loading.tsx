import Container from "@/components/ui/Container"

export default function LoadingSermonDetail() {
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
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="skeleton h-12 w-20 rounded-xl" />
                    <div className="min-w-0 space-y-2">
                      <div className="skeleton h-3 w-14 rounded-lg" />
                      <div className="skeleton h-4 w-44 rounded-lg" />
                    </div>
                  </div>
                  <div className="skeleton h-8 w-24 rounded-full" />
                </div>

                <div className="mt-6 aspect-video w-full overflow-hidden rounded-3xl border border-churchBlue/10 bg-churchBlueSoft">
                  <div className="skeleton h-full w-full" />
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-churchBlue/10 bg-white p-5 shadow-glow">
                    <div className="skeleton h-4 w-32 rounded-lg" />
                    <div className="mt-3 space-y-2">
                      <div className="skeleton h-4 w-full rounded-lg" />
                      <div className="skeleton h-4 w-5/6 rounded-lg" />
                    </div>
                  </div>
                  <div className="rounded-3xl border border-churchBlue/10 bg-white p-5 shadow-glow">
                    <div className="skeleton h-4 w-28 rounded-lg" />
                    <div className="mt-3 space-y-2">
                      <div className="skeleton h-4 w-full rounded-lg" />
                      <div className="skeleton h-4 w-4/5 rounded-lg" />
                    </div>
                  </div>
                </div>

                <div className="mt-10 border-t border-churchBlue/10 pt-8">
                  <div className="skeleton h-4 w-64 rounded-lg" />
                  <div className="mt-4 space-y-3">
                    <div className="skeleton h-4 w-full rounded-lg" />
                    <div className="skeleton h-4 w-11/12 rounded-lg" />
                    <div className="skeleton h-4 w-10/12 rounded-lg" />
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

