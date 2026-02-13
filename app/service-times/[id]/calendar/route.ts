import { buildIcsEvent } from "@/lib/ics"
import { siteConfig } from "@/lib/site"
import { nextWeeklyOccurrence, parseWeeklyTimeText } from "@/lib/serviceTimes"

export const dynamic = "force-dynamic"

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> | { id: string } }) {
  const resolvedParams = await params
  const entry = siteConfig.serviceTimes.find((s) => s.id === resolvedParams.id) ?? null
  if (!entry) return new Response("Not found", { status: 404 })

  const parsed = parseWeeklyTimeText(entry.time)
  if (!parsed) return new Response("Invalid service time", { status: 400 })

  const startLocal = nextWeeklyOccurrence(parsed)
  const endLocal = new Date(startLocal.getTime() + 90 * 60 * 1000)
  const timeZone = siteConfig.officeHours.timeZone
  const location = siteConfig.addressLines.join(", ")

  const ics = buildIcsEvent({
    uid: `service-${entry.id}@${new URL(siteConfig.siteUrl).hostname}`,
    title: `${entry.labelEn} — ${siteConfig.nameEn}`,
    description: "Service time reminder.",
    location,
    startLocal,
    endLocal,
    timeZone,
    url: `${siteConfig.siteUrl}/visit`,
  })

  return new Response(ics, {
    headers: {
      "content-type": "text/calendar; charset=utf-8",
      "content-disposition": `attachment; filename="${entry.id}.ics"`,
      "cache-control": "public, max-age=3600",
    },
  })
}
