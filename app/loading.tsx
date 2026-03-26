import Container from "@/components/ui/Container"

export default function Loading() {
  return (
    <main className="bg-white">
      <Container className="py-10 md:py-14">
        <div className="content-shell">
          <div className="skeleton h-3 w-24 rounded-full" />
          <div className="mt-4 skeleton h-10 w-80 max-w-full rounded-2xl" />
          <div className="mt-6 space-y-3">
            <div className="skeleton h-4 w-full rounded-full" />
            <div className="skeleton h-4 w-5/6 rounded-full" />
            <div className="skeleton h-4 w-2/3 rounded-full" />
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow">
              <div className="skeleton aspect-[16/10] w-full rounded-2xl" />
              <div className="mt-5 skeleton h-6 w-2/3 rounded-xl" />
              <div className="mt-4 space-y-3">
                <div className="skeleton h-4 w-full rounded-full" />
                <div className="skeleton h-4 w-4/5 rounded-full" />
              </div>
            </div>

            <div className="rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow">
              <div className="space-y-4">
                <div className="skeleton h-12 w-full rounded-2xl" />
                <div className="skeleton h-12 w-full rounded-2xl" />
                <div className="skeleton h-12 w-full rounded-2xl" />
                <div className="skeleton h-12 w-44 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}
