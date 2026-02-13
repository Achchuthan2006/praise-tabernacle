import Container from "@/components/ui/Container"

export default function LoadingEventsIndex() {
  return (
    <>
      <section className="relative border-b border-churchBlue/10 bg-white">
        <Container className="py-12">
          <div className="skeleton h-4 w-40 rounded-lg" />
          <div className="mt-4 skeleton h-10 w-64 rounded-2xl" />
          <div className="mt-5 space-y-2">
            <div className="skeleton h-4 w-96 max-w-full rounded-lg" />
            <div className="skeleton h-4 w-80 max-w-full rounded-lg" />
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="section-padding">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <div className="skeleton h-10 w-44 rounded-full" />
            <div className="skeleton h-10 w-56 rounded-full" />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="card">
                <div className="card-content p-6">
                  <div className="skeleton h-40 w-full rounded-2xl" />
                  <div className="mt-4 space-y-2">
                    <div className="skeleton h-4 w-2/3 rounded-lg" />
                    <div className="skeleton h-4 w-5/6 rounded-lg" />
                    <div className="skeleton h-4 w-1/2 rounded-lg" />
                  </div>
                  <div className="mt-5 skeleton h-10 w-28 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}

