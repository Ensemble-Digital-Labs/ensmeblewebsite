import { readFileSync } from 'node:fs'

const h = readFileSync('public/lamalama-mirror/index.html', 'utf8')
const links = [...h.matchAll(/href=["']([^"']+)["']/gi)].map((m) => m[1]).slice(0, 20)
const scripts = [...h.matchAll(/src=["']([^"']+)["']/gi)].map((m) => m[1])
console.log('scripts', scripts)
console.log('internal links sample', links.filter((l) => l.startsWith('/') || l.includes('lamalama')).slice(0, 15))
