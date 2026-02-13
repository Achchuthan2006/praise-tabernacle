import { promises as fs } from "node:fs"
import path from "node:path"

import sharp from "sharp"

const rootDir = process.cwd()

const argv = new Set(process.argv.slice(2))
const force = argv.has("--force")
const help = argv.has("--help") || argv.has("-h")

if (help) {
  console.log(
    [
      "Usage: node scripts/optimize-images.mjs [--force]",
      "",
      "Optimizes a curated set of local images by generating smaller .webp versions.",
      "",
      "Options:",
      "  --force   Regenerate outputs even if they look up-to-date",
    ].join("\n"),
  )
  process.exit(0)
}

const versePngTargets = [
  "public/verse-1.png",
  "public/verse-2.png",
  "public/verse-3.png",
  "public/verse-4.png",
]

const homePhotoTargets = [
  "public/photos/home/church-life.jpeg",
  "public/photos/home/adults-fellowship.jpeg",
  "public/photos/home/church-front.jpg",
  "public/photos/home/church-front-2.jpeg",
  "public/photos/home/kids-ministry.jpeg",
]

const logoTargets = [
  "public/logo-en-bg.png",
  "public/logo-ta-bg.png",
]

async function exists(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

function outWebpPath(relInput) {
  return relInput.replace(/\.(png|jpe?g)$/i, ".webp")
}

function formatMb(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(2)}MB`
}

async function optimizeOne({ inputRel, webpOptions }) {
  const abs = path.join(rootDir, inputRel)
  if (!(await exists(abs))) return { input: inputRel, ok: false, reason: "missing" }

  const outputRel = outWebpPath(inputRel)
  const outputAbs = path.join(rootDir, outputRel)

  const inputStat = await fs.stat(abs)
  const outputStat = (await exists(outputAbs)) ? await fs.stat(outputAbs) : null

  if (!force && outputStat && outputStat.mtimeMs >= inputStat.mtimeMs && outputStat.size > 0) {
    return { input: inputRel, output: outputRel, ok: true, skipped: true }
  }

  await sharp(abs).webp(webpOptions).toFile(outputAbs)

  const finalStat = await fs.stat(outputAbs)
  return {
    input: inputRel,
    output: outputRel,
    ok: true,
    beforeBytes: inputStat.size,
    afterBytes: finalStat.size,
  }
}

async function optimizeCuratedImages() {
  const results = []

  for (const rel of versePngTargets) {
    results.push(
      await optimizeOne({
        inputRel: rel,
        // Verse graphics are mostly text/gradients; use high quality lossy WebP for big savings.
        webpOptions: { quality: 90, effort: 6 },
      }),
    )
  }

  for (const rel of homePhotoTargets) {
    results.push(
      await optimizeOne({
        inputRel: rel,
        webpOptions: { quality: 82, effort: 6 },
      }),
    )
  }

  for (const rel of logoTargets) {
    results.push(
      await optimizeOne({
        inputRel: rel,
        // Logos often have sharp edges + transparency; keep them lossless.
        webpOptions: { lossless: true, effort: 6 },
      }),
    )
  }

  return results.filter(Boolean)
}

const results = await optimizeCuratedImages()
const summary = results
  .map((r) => {
    if (!r.ok) return `- ${r.input}: ${r.reason}`
    if (r.skipped) return `- ${r.input} -> ${r.output}: up-to-date`
    const before = r.beforeBytes ? formatMb(r.beforeBytes) : "?"
    const after = r.afterBytes ? formatMb(r.afterBytes) : "?"
    return `- ${r.input} -> ${r.output}: ${before} -> ${after}`
  })
  .join("\n")

console.log("Image optimization results:\n" + summary)
