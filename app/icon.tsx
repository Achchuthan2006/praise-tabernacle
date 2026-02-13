import { ImageResponse } from "next/og"

export const size = {
  width: 512,
  height: 512,
}

export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, rgba(26,39,68,1) 0%, rgba(91,33,182,1) 50%, rgba(14,116,144,1) 100%)",
        }}
      >
        <div
          style={{
            width: 420,
            height: 420,
            borderRadius: 120,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.10)",
            border: "2px solid rgba(255,255,255,0.22)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.25)",
          }}
        >
          <div
            style={{
              fontSize: 170,
              fontWeight: 800,
              letterSpacing: -6,
              color: "white",
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            PT
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}

