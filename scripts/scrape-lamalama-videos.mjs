import { writeFileSync } from 'node:fs'

const html = await (await fetch('https://lamalama.com/')).text()

const videos = [...html.matchAll(/<video[^>]*>[\s\S]*?<\/video>/gi)]
const sources = [...html.matchAll(/<source[^>]+src=["']([^"']+)["']/gi)].map((m) => m[1])
const poster = [...html.matchAll(/poster=["']([^"']+)["']/gi)].map((m) => m[1])
const dataSrc = [...html.matchAll(/data-(?:src|video|poster)=["']([^"']+)["']/gi)].map((m) => m[1])
const m3u8 = [...html.matchAll(/https:\/\/[^"'\s]+\.m3u8/gi)].map((m) => m[0])

console.log('sources', sources.slice(0, 10))
console.log('poster', poster.slice(0, 10))
console.log('m3u8 count', m3u8.length, m3u8[0])

// Parse main JS for m3u8 + living
const jsUrl = html.match(/src=["']([^"']+main-[^"']+\.js)["']/)?.[1]
if (jsUrl) {
  const full = jsUrl.startsWith('http') ? jsUrl : `https://lamalama.com${jsUrl.startsWith('/') ? '' : '/'}${jsUrl}`
  const js = await (await fetch(full)).text()
  const jsM3u8 = [...js.matchAll(/https:\\\/\\\/[^"\\]+\.m3u8/g)].map((m) => m[0].replace(/\\\//g, '/'))
  const livingIdx = js.indexOf('living')
  console.log('js m3u8', jsM3u8.length, jsM3u8.slice(0, 3))
  console.log('living context', js.slice(Math.max(0, livingIdx - 200), livingIdx + 400))
  writeFileSync('documents/2026-06-13/lamalama-m3u8.json', JSON.stringify(jsM3u8, null, 2))
}
