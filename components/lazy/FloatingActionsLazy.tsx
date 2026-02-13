"use client"

import dynamic from "next/dynamic"

import IdleMount from "@/components/IdleMount"

const FloatingActions = dynamic(() => import("@/components/FloatingActions"), { ssr: false })

export default function FloatingActionsLazy() {
  return (
    <IdleMount>
      <FloatingActions />
    </IdleMount>
  )
}

