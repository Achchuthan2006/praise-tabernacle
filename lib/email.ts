import "server-only"

type SendEmailInput = {
  to: string
  subject: string
  text: string
  html?: string
}

export async function sendEmail(input: SendEmailInput) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RSVP_FROM_EMAIL
  if (!apiKey || !from) {
    return { ok: false as const, message: "Email provider not configured." }
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: input.to,
      subject: input.subject,
      text: input.text,
      html: input.html,
    }),
  })

  if (!res.ok) {
    const msg = await res.text().catch(() => "")
    return { ok: false as const, message: msg || `Email send failed (${res.status}).` }
  }

  return { ok: true as const }
}

