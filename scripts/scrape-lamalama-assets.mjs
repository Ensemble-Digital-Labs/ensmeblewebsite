import { writeFileSync } from 'node:fs'

const res = await fetch('https://lamalama.com/')
const html = await res.text()

const patterns = [
  /https?:\/\/[^"'\\s>]+\.(?:mp4|webm|jpg|jpeg|png|webp|svg|woff2?)/gi,
  /["'](\/[^"']+\.(?:mp4|webm|jpg|jpeg|png|webp|svg))["']/gi,
  /["'](https:\/\/[^"']*(?:cdn|media|assets|uploads)[^"']*)["']/gi,
]

const found = new Set()
for (const p of patterns) {
  for (const m of html.matchAll(p)) {
    found.add(m[1] ?? m[0])
  }
}

// Also fetch main JS chunks linked from page
const scripts = [...html.matchAll(/src=["']([^"']+\.js)["']/gi)].map((m) => m[1])
const scriptUrls = scripts.map((s) => (s.startsWith('http') ? s : `https://lamalama.com${s.startsWith('/') ? '' : '/'}${s}`))

for (const url of scriptUrls.slice(0, 8)) {
  try {
    const js = await (await fetch(url)).text()
    for (const m of js.matchAll(/https?:\/\/[^"'\\s>]+\.(?:mp4|webm|jpg|jpeg|png|webp)/gi)) {
      found.add(m[0])
    }
    for (const m of js.matchAll(/["'](\/media\/[^"']+)["']/gi)) {
      found.add(`https://lamalama.com${m[1]}`)
    }
  } catch {
    /* skip */
  }
}

const list = [...found].sort()
console.log(list.join('\n'))
writeFileSync('documents/2026-06-13/lamalama-asset-urls.txt', list.join('\n'))
