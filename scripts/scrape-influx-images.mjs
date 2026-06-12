const pages = [
  'https://www.influxmarketing.com/',
  'https://www.influxmarketing.com/plastic-surgery-marketing',
  'https://www.influxmarketing.com/medspa-marketing',
]

const re = /https:\/\/www\.influxmarketing\.com\/assets\/img\/[a-zA-Z0-9_./-]+\.(?:jpg|jpeg|png|webp|svg)/gi
const found = new Set()

for (const url of pages) {
  const html = await fetch(url).then((r) => r.text())
  for (const m of html.matchAll(re)) found.add(m[0])
  // data-src, background-image relative paths
  for (const m of html.matchAll(/\/assets\/img\/[a-zA-Z0-9_./-]+\.(?:jpg|jpeg|png|webp)/gi)) {
    found.add(`https://www.influxmarketing.com${m[0]}`)
  }
}

console.log([...found].sort().join('\n'))
console.error('count', found.size)
