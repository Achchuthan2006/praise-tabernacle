"use client"

import dynamic from "next/dynamic"

import IdleMount from "@/components/IdleMount"

const ChatWidget = dynamic(() => import("@/components/ChatWidget"), { ssr: false })

export default function ChatWidgetLazy() {
  return (
    <IdleMount>
      <ChatWidget />
    </IdleMount>
  )
}

