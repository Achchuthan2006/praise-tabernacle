"use client"

import dynamic from "next/dynamic"

import type { EventRsvpFormProps } from "@/components/EventRsvpForm"

const EventRsvpFormLazy = dynamic<EventRsvpFormProps>(() => import("@/components/EventRsvpForm"), {
  ssr: false,
  loading: () => (
    <div className="rounded-3xl border border-churchBlue/10 bg-white p-5 shadow-glow">
      <div className="skeleton h-4 w-40 rounded-lg" />
      <div className="mt-4 space-y-3">
        <div className="skeleton h-10 w-full rounded-2xl" />
        <div className="skeleton h-10 w-full rounded-2xl" />
        <div className="skeleton h-10 w-full rounded-2xl" />
      </div>
      <div className="mt-5 skeleton h-11 w-full rounded-full" />
    </div>
  ),
})

export default EventRsvpFormLazy

