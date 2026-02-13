import Container from "@/components/ui/Container"

export default function LoadingEventDetail() {
  return (
    <>
      <section className="relative border-b border-churchBlue/10 bg-white">
        <Container className="py-12">
          <div className="skeleton h-4 w-40 rounded-lg" />
          <div className="mt-4 skeleton h-10 w-full max-w-3xl rounded-2xl" />
          <div className="mt-5 space-y-2">
            <div className="skeleton h-4 w-80 rounded-lg" />
            <div className="skeleton h-4 w-64 rounded-lg" />
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="pb-16 sm:pb-20">
          <div className="mx-auto max-w-5xl">
            <div className="card">
              <div className="card-content p-6 sm:p-8">
                <div className="grid gap-6 lg:grid-cols-12">
                  <div className="lg:col-span-7 space-y-6">
                    <div className="aspect-video overflow-hidden rounded-3xl border border-churchBlue/10 bg-churchBlueSoft">
                      <div className="skeleton h-full w-full" />
                    </div>

                    <div className="rounded-3xl border border-churchBlue/10 bg-white p-5 shadow-glow">
                      <div className="skeleton h-4 w-40 rounded-lg" />
                      <div className="mt-3 space-y-2">
                        <div className="skeleton h-4 w-full rounded-lg" />
                        <div className="skeleton h-4 w-11/12 rounded-lg" />
                        <div className="skeleton h-4 w-9/12 rounded-lg" />
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-6">
                    <div className="rounded-3xl border border-churchBlue/10 bg-white p-5 shadow-glow">
                      <div className="skeleton h-4 w-28 rounded-lg" />
                      <div className="mt-4 space-y-3">
                        <div className="skeleton h-10 w-full rounded-2xl" />
                        <div className="skeleton h-10 w-full rounded-2xl" />
                        <div className="skeleton h-10 w-full rounded-2xl" />
                      </div>
                    </div>

                    <div className="rounded-3xl border border-churchBlue/10 bg-white p-5 shadow-glow">
                      <div className="skeleton h-4 w-24 rounded-lg" />
                      <div className="mt-3 space-y-2">
                        <div className="skeleton h-4 w-5/6 rounded-lg" />
                        <div className="skeleton h-4 w-2/3 rounded-lg" />
                      </div>
                      <div className="mt-5 skeleton h-10 w-32 rounded-full" />
                      <div className="mt-5 overflow-hidden rounded-2xl border border-churchBlue/10 bg-churchBlueSoft">
                        <div className="skeleton h-64 w-full" />
                      </div>
                    </div>
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

