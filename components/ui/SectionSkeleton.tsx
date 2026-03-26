import Container from "@/components/ui/Container"

export default function SectionSkeleton({
  bandClassName = "bg-white",
  contentClassName = "",
  lines = 3,
  cards = 2,
  gridClassName = "md:grid-cols-2",
}: {
  bandClassName?: string
  contentClassName?: string
  lines?: number
  cards?: number
  gridClassName?: string
}) {
  return (
    <section className={bandClassName}>
      <Container className="section-padding">
        <div className={["content-shell-wide", contentClassName].filter(Boolean).join(" ")}>
          <div className="mb-8 max-w-2xl">
            <div className="skeleton h-3 w-24 rounded-full" />
            <div className="mt-4 skeleton h-10 w-72 max-w-full rounded-2xl" />
            <div className="mt-4 space-y-3">
              {Array.from({ length: lines }, (_, idx) => (
                <div
                  key={`line-${idx}`}
                  className={[
                    "skeleton h-4 rounded-full",
                    idx === lines - 1 ? "w-3/4" : "w-full",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>

          <div className={["grid gap-6", gridClassName].join(" ")}>
            {Array.from({ length: cards }, (_, idx) => (
              <div key={`card-${idx}`} className="rounded-3xl border border-churchBlue/10 bg-white p-6 shadow-glow">
                <div className="skeleton h-44 w-full rounded-2xl" />
                <div className="mt-5 skeleton h-4 w-24 rounded-full" />
                <div className="mt-4 skeleton h-7 w-2/3 rounded-xl" />
                <div className="mt-4 space-y-3">
                  <div className="skeleton h-4 w-full rounded-full" />
                  <div className="skeleton h-4 w-5/6 rounded-full" />
                  <div className="skeleton h-4 w-2/3 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
