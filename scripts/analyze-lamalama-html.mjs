import { writeFileSync } from 'node:fs'

const html = await (await fetch('https://lamalama.com/')).text()

const cssHref = html.match(/href="([^"]+main-[^"]+\.css[^"]*)"/)?.[1]
const jsHref = html.match(/src="([^"]+main-[^"]+\.js[^"]*)"/)?.[1]

const blockClasses = [...html.matchAll(/class="([^"]*ll-block[^"]*)"/g)].map((m) => m[1])
const uniqueBlocks = [...new Set(blockClasses)]

const mainMatch = html.match(/<main[^>]*>([\s\S]*)<\/main>/i)
const mainLen = mainMatch?.[1]?.length ?? 0

writeFileSync(
  'documents/2026-06-13/lamalama-html-analysis.json',
  JSON.stringify(
    {
      cssHref,
      jsHref,
      htmlLength: html.length,
      mainLength: mainLen,
      uniqueBlockCount: uniqueBlocks.length,
      uniqueBlocks: uniqueBlocks.slice(0, 80),
      keywords: {
        pitchdeck: (html.match(/pitchdeck/gi) || []).length,
        sticky: (html.match(/sticky-bar/gi) || []).length,
        showreel: (html.match(/showreel/gi) || []).length,
        webgl: (html.match(/webgl/gi) || []).length,
        accordion: (html.match(/accordion/gi) || []).length,
      },
    },
    null,
    2,
  ),
)

console.log('css', cssHref)
console.log('blocks', uniqueBlocks.length)
console.log('main', mainLen)
