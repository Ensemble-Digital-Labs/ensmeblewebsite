import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '../public/lamalama-mirror')
const SOURCE = 'https://lamalama.com/'

const html = await (await fetch(SOURCE)).text()

// Keep absolute asset URLs so theme JS/CSS/fonts load from lamalama.com CDN.
const normalized = html
  .replace(/href='\/wp-content/g, "href='https://lamalama.com/wp-content")
  .replace(/href="\/wp-content/g, 'href="https://lamalama.com/wp-content')
  .replace(/src='\/wp-content/g, "src='https://lamalama.com/wp-content")
  .replace(/src="\/wp-content/g, 'src="https://lamalama.com/wp-content')
  .replace(/<base[^>]*>/gi, '')

mkdirSync(OUT_DIR, { recursive: true })
writeFileSync(join(OUT_DIR, 'index.html'), normalized, 'utf8')

console.log(`Mirrored ${SOURCE} → public/lamalama-mirror/index.html (${normalized.length} bytes)`)
