import "server-only"

import { siteConfig } from "@/lib/site"

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

export function buildNewsletterConfirmationEmail(input: { email: string; token: string }) {
  const confirmUrl = `${siteConfig.siteUrl}/newsletter/confirm?token=${encodeURIComponent(input.token)}`
  const subject = `Confirm your newsletter signup - ${siteConfig.nameEn}`

  const text =
    `Hi,\n\n` +
    `Please confirm your newsletter signup by clicking the link below:\n\n` +
    `${confirmUrl}\n\n` +
    `If you did not request this, you can ignore this email.\n\n` +
    `- ${siteConfig.nameEn}\n`

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5;color:#0b1f3a">
      <h2 style="margin:0 0 12px 0">Confirm your newsletter signup</h2>
      <p style="margin:0 0 16px 0">Hi ${escapeHtml(input.email)},</p>
      <p style="margin:0 0 16px 0">Please confirm your newsletter signup by clicking the button below.</p>
      <p style="margin:16px 0">
        <a href="${confirmUrl}" style="display:inline-block;background:#1557ff;color:#ffffff;text-decoration:none;padding:10px 14px;border-radius:12px;font-weight:600">
          Confirm signup
        </a>
      </p>
      <p style="margin:0;color:rgba(11,31,58,0.75)">If you did not request this, you can ignore this email.</p>
      <p style="margin:16px 0 0 0;color:rgba(11,31,58,0.6)">- ${escapeHtml(siteConfig.nameEn)}</p>
    </div>
  `.trim()

  return { subject, text, html }
}
