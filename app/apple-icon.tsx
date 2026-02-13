import { ImageResponse } from "next/og"

export const size = {
  width: 180,
  height: 180,
}

export const contentType = "image/png"

export default function AppleIcon() {
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
            width: 154,
            height: 154,
            borderRadius: 42,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.10)",
            border: "2px solid rgba(255,255,255,0.22)",
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              letterSpacing: -2,
              color: "white",
              lineHeight: 1,
            }}
          >
            PT
          </div>
        </div>
      </div>
    ),
    size,
  )
}

