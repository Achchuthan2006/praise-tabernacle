"use client"

import Link from "next/link"

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#f5f8ff", color: "#12204a" }}>
        <main
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            padding: "32px",
            background:
              "radial-gradient(60rem 30rem at 50% -10%, rgba(212,165,72,0.18), transparent 60%), linear-gradient(180deg, #f7fbff 0%, #eef4ff 100%)",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "760px",
              background: "#fff",
              border: "1px solid rgba(18,32,74,0.08)",
              borderRadius: "28px",
              padding: "32px",
              boxShadow: "0 24px 70px -44px rgba(15,84,118,0.45)",
            }}
          >
            <div style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(18,32,74,0.65)" }}>
              Praise Tabernacle
            </div>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", lineHeight: 1.05, margin: "16px 0 12px" }}>
              We hit an unexpected problem.
            </h1>
            <p style={{ fontSize: "1rem", lineHeight: 1.7, color: "rgba(18,32,74,0.8)", maxWidth: "54ch" }}>
              The site needs a fresh restart on this page. You can try again now or return to the main church website.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "24px" }}>
              <button
                type="button"
                onClick={() => reset()}
                style={{
                  border: 0,
                  borderRadius: "999px",
                  background: "#162a61",
                  color: "#fff",
                  padding: "14px 20px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Try Again
              </button>
              <Link
                href="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "999px",
                  background: "#edf3ff",
                  color: "#162a61",
                  padding: "14px 20px",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Go Home
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}
