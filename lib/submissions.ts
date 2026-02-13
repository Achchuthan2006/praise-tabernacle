import { mkdir, appendFile } from "node:fs/promises"
import path from "node:path"

export type SubmissionKind = "newsletter" | "contact" | "prayer" | "booking" | "serve"

export function isValidEmail(email: string) {
  const value = email.trim()
  if (!value) return false
  if (value.length > 254) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function appendSubmission(kind: SubmissionKind, payload: unknown) {
  const dir = path.join(process.cwd(), ".data", "submissions")
  await mkdir(dir, { recursive: true })
  const file = path.join(dir, `${kind}.jsonl`)
  const line = JSON.stringify(payload) + "\n"
  await appendFile(file, line, { encoding: "utf8" })
}
