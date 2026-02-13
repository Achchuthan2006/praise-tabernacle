import { promises as fs } from "node:fs"
import path from "node:path"

const root = process.cwd()
const dataDir = path.join(root, "data")
const backupsDir = path.join(root, "backups")

function stamp(d = new Date()) {
  const pad = (n) => String(n).padStart(2, "0")
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`
}

async function exists(p) {
  try {
    await fs.access(p)
    return true
  } catch {
    return false
  }
}

async function main() {
  if (!(await exists(dataDir))) {
    console.log("No data/ directory found. Nothing to back up.")
    return
  }

  const files = (await fs.readdir(dataDir)).filter((f) => f.endsWith(".json"))
  if (files.length === 0) {
    console.log("No JSON files in data/. Nothing to back up.")
    return
  }

  const outDir = path.join(backupsDir, stamp())
  await fs.mkdir(outDir, { recursive: true })

  for (const file of files) {
    await fs.copyFile(path.join(dataDir, file), path.join(outDir, file))
  }

  console.log(`Backed up ${files.length} file(s) to ${path.relative(root, outDir)}`)
}

await main()

