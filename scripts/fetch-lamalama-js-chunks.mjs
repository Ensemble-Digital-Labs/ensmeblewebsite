import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ASSETS_DIR = join(__dirname, '../public/lamalama-mirror/wp-content/themes/lamalama2025/dist/assets')
const BASE = 'https://lamalama.com/wp-content/themes/lamalama2025/dist/assets/'

/** Download Vite code-split chunks starting from scripts-DkOjkHF0.js */
export async function fetchLamaLamaJsChunks() {
  const queue = ['scripts-DkOjkHF0.js']
  const seen = new Set()

  while (queue.length) {
    const file = queue.shift()
    if (seen.has(file)) continue
    seen.add(file)
    const url = `${BASE}${file}`
    const dest = join(ASSETS_DIR, file)
    const res = await fetch(url)
    if (!res.ok) {
      console.warn(`  chunk skip ${res.status}: ${file}`)
      continue
    }
    const text = await res.text()
    mkdirSync(dirname(dest), { recursive: true })
    writeFileSync(dest, text)
    for (const m of text.matchAll(/(?:import|from)\s*["'](\.[^"']+\.js)["']/g)) {
      const rel = m[1].replace('./', '')
      if (!seen.has(rel)) queue.push(rel)
    }
  }

  return seen.size
}

if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, '/')}`) {
  const count = await fetchLamaLamaJsChunks()
  console.log(`done ${count} chunks`)
}
