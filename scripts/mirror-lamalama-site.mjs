/**
 * Full local mirror of lamalama.com → public/lamalama-mirror/
 *
 * Downloads HTML pages, wp-content assets (CSS/JS/fonts/images), rewrites URLs
 * for localhost serving under /lamalama-mirror/
 *
 * HLS video streams (b-cdn.net) stay remote — they require CDN + network.
 *
 * Usage: node scripts/mirror-lamalama-site.mjs [--pages-only] [--max-assets=N]
 */

import {
  createWriteStream,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs'
import { dirname, join, extname, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'
import { pipeline } from 'node:stream/promises'
import { Readable } from 'node:stream'
import { fetchLamaLamaJsChunks } from './fetch-lamalama-js-chunks.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_ROOT = join(__dirname, '../public/lamalama-mirror')
const MIRROR_PREFIX = '/lamalama-mirror'
const ORIGIN = 'https://lamalama.com'

const SEED_PAGES = [
  '/',
  '/about-us',
  '/contact',
  '/work',
  '/services/branding',
  '/services/websites',
  '/services/ecommerce',
  '/services/marketing',
  '/nl',
]

const args = process.argv.slice(2)
const pagesOnly = args.includes('--pages-only')
const maxAssetsArg = args.find((a) => a.startsWith('--max-assets='))
const maxAssets = maxAssetsArg ? Number(maxAssetsArg.split('=')[1]) : Infinity

const downloaded = new Map()
const failed = []
/** @type {Set<string>} */
const assetQueue = new Set()
/** @type {Set<string>} */
const seenAssets = new Set()

/** @param {string} pagePath */
function pagePathToFile(pagePath) {
  const clean = pagePath.replace(/\/$/, '') || '/'
  if (clean === '/') return join(OUT_ROOT, 'index.html')
  return join(OUT_ROOT, clean.slice(1), 'index.html')
}

/** @param {string} url */
function isSameOrigin(url) {
  return url.startsWith(ORIGIN) || url.startsWith('/')
}

/** @param {string} url */
function resolveUrl(url, base = ORIGIN) {
  if (!url || url.startsWith('data:') || url.startsWith('mailto:') || url.startsWith('tel:')) {
    return null
  }
  if (url.startsWith('//')) return `https:${url}`
  if (url.startsWith('/')) return `${ORIGIN}${url}`
  try {
    return new URL(url, base).href
  } catch {
    return null
  }
}

/** @param {string} absoluteUrl */
function assetUrlToLocalFile(absoluteUrl) {
  if (!absoluteUrl.startsWith(ORIGIN)) return null
  const pathname = new URL(absoluteUrl).pathname
  const search = new URL(absoluteUrl).search
  // Strip query for file path (ver=7.0) but keep in rewrite map
  const rel = pathname.startsWith('/') ? pathname.slice(1) : pathname
  return join(OUT_ROOT, rel)
}

/** @param {string} absoluteUrl */
function assetUrlToPublicPath(absoluteUrl) {
  if (!absoluteUrl.startsWith(ORIGIN)) return absoluteUrl
  const pathname = new URL(absoluteUrl).pathname
  return `${MIRROR_PREFIX}${pathname}`
}

/** @param {string} pageUrl */
function pageUrlToPublicPath(pageUrl) {
  const u = new URL(pageUrl)
  if (u.origin !== ORIGIN) return pageUrl
  const path = u.pathname.endsWith('/') ? u.pathname : `${u.pathname}/`
  if (path === '/') return `${MIRROR_PREFIX}/`
  return `${MIRROR_PREFIX}${path}`
}

async function fetchBuffer(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'ensemblev2-mirror/1.0', Accept: '*/*' },
    redirect: 'follow',
  })
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  return Buffer.from(await res.arrayBuffer())
}

async function downloadToFile(url, dest) {
  if (downloaded.has(url)) return downloaded.get(url)
  mkdirSync(dirname(dest), { recursive: true })
  const buf = await fetchBuffer(url)
  writeFileSync(dest, buf)
  downloaded.set(url, dest)
  return dest
}

/** @param {string} text @param {string} baseUrl */
function extractAssetUrls(text, baseUrl) {
  const found = new Set()
  const patterns = [
    /https?:\/\/lamalama\.com\/wp-content[^"'\\s>)]+/gi,
    /(?:href|src|data-src|poster|content)=["'](\/wp-content[^"']+)["']/gi,
    /url\(\s*['"]?(\/wp-content[^'")\\s]+)['"]?\s*\)/gi,
    /url\(\s*['"]?(https?:\/\/lamalama\.com\/wp-content[^'")\\s]+)['"]?\s*\)/gi,
  ]

  for (const pattern of patterns) {
    for (const match of text.matchAll(pattern)) {
      const raw = match[1] ?? match[0]
      const resolved = resolveUrl(raw, baseUrl)
      if (resolved?.startsWith(ORIGIN)) found.add(resolved.split('#')[0])
    }
  }
  return found
}

/** @param {string} text @param {string} baseUrl */
function extractJsImports(text, baseUrl) {
  const found = new Set()
  for (const match of text.matchAll(/(?:import|from)\s*["'](\.[^"']+\.js)["']/g)) {
    const resolved = resolveUrl(match[1], baseUrl)
    if (resolved) found.add(resolved.split('#')[0])
  }
  return found
}

/** @param {string} html @param {string} pageUrl */
function rewriteHtml(html, pageUrl) {
  let out = html

  // Remove analytics / third-party trackers for local preview
  out = out.replace(/<script[^>]*googletagmanager[^>]*>[\s\S]*?<\/script>/gi, '')
  out = out.replace(/<script[^>]*usefathom[^>]*>[\s\S]*?<\/script>/gi, '')
  out = out.replace(/<noscript>[\s\S]*?googletagmanager[\s\S]*?<\/noscript>/gi, '')

  // Origin asset URLs → local mirror paths
  out = out.replace(/https?:\/\/lamalama\.com/g, MIRROR_PREFIX)

  // Root-relative wp-content and theme paths
  out = out.replace(/(["'(=])\/wp-content/g, `$1${MIRROR_PREFIX}/wp-content`)

  // Internal page links (href="/work" etc.)
  out = out.replace(
    /href=(["'])\/(?!\/|wp-content|lamalama-mirror)([^"']*)\1/gi,
    (_, q, path) => `href=${q}${MIRROR_PREFIX}/${path}${q}`,
  )

  // Canonical / og:url — keep pointing at mirror path
  out = out.replace(
    /content=(["'])https?:\/\/lamalama\.com([^"']*)\1/gi,
    (_, q, path) => `content=${q}${MIRROR_PREFIX}${path}${q}`,
  )

  // Inject base for any remaining root-relative assets
  if (!out.includes('<base ')) {
    out = out.replace(/<head([^>]*)>/i, `<head$1>\n<base href="${MIRROR_PREFIX}/">`)
  }

  return out
}

/** @param {string} text */
function rewriteCssOrJs(text) {
  let out = text.replace(/https?:\/\/lamalama\.com/g, MIRROR_PREFIX)
  out = out.replace(/url\(\s*\/wp-content/g, `url(${MIRROR_PREFIX}/wp-content`)
  out = out.replace(/(["'])\/wp-content/g, `$1${MIRROR_PREFIX}/wp-content`)
  return out
}

async function processAsset(url) {
  if (!url.startsWith(ORIGIN)) return
  if (seenAssets.has(url)) return
  seenAssets.add(url)

  const dest = assetUrlToLocalFile(url)
  if (!dest) return

  try {
    if (!existsSync(dest)) {
      await downloadToFile(url, dest)
    } else {
      downloaded.set(url, dest)
    }

    const ext = extname(dest).toLowerCase()
    if (['.css', '.js', '.mjs'].includes(ext)) {
      const text = readFileSync(dest, 'utf8')
      const rewritten = rewriteCssOrJs(text)
      if (rewritten !== text) writeFileSync(dest, rewritten, 'utf8')

      for (const nested of extractAssetUrls(rewritten, url)) {
        if (nested.startsWith(ORIGIN) && !seenAssets.has(nested)) assetQueue.add(nested)
      }
      if (ext === '.js' || ext === '.mjs') {
        for (const nested of extractJsImports(rewritten, url)) {
          if (!seenAssets.has(nested)) assetQueue.add(nested)
        }
      }
    }
  } catch (err) {
    failed.push({ url, error: String(err.message || err) })
  }
}

async function mirrorPage(pagePath) {
  const url = pagePath === '/' ? `${ORIGIN}/` : `${ORIGIN}${pagePath}`
  console.log(`Page: ${url}`)
  const html = (await fetchBuffer(url)).toString('utf8')
  const rewritten = rewriteHtml(html, url)
  const outFile = pagePathToFile(pagePath)
  mkdirSync(dirname(outFile), { recursive: true })
  writeFileSync(outFile, rewritten, 'utf8')

  for (const asset of extractAssetUrls(html, url)) {
    if (asset.startsWith(ORIGIN)) assetQueue.add(asset)
  }

  // Discover internal pages from links
  const discovered = new Set()
  for (const match of html.matchAll(/href=["'](https:\/\/lamalama\.com[^"']+|\/[^"']+)["']/gi)) {
    const resolved = resolveUrl(match[1], url)
    if (!resolved?.startsWith(ORIGIN)) continue
    const path = new URL(resolved).pathname
    if (path.includes('/wp-content') || path.includes('.') && !path.endsWith('/')) continue
    discovered.add(path.endsWith('/') ? path.slice(0, -1) || '/' : path)
  }
  return discovered
}

async function drainAssetQueue() {
  let processed = 0
  while (assetQueue.size > 0 && processed < maxAssets) {
    const batch = [...assetQueue].slice(0, 10)
    batch.forEach((u) => assetQueue.delete(u))
    await Promise.all(batch.map((u) => processAsset(u)))
    processed += batch.length
    if (processed % 50 === 0) {
      console.log(`  assets: ${seenAssets.size} processed, ${assetQueue.size} queued`)
    }
  }
}

async function main() {
  console.log(`Mirroring ${ORIGIN} → ${OUT_ROOT}`)
  mkdirSync(OUT_ROOT, { recursive: true })

  const pages = new Set(SEED_PAGES)
  const crawled = new Set()

  while (pages.size > 0) {
    const page = [...pages][0]
    pages.delete(page)
    if (crawled.has(page)) continue
    crawled.add(page)

    try {
      const discovered = await mirrorPage(page)
      for (const p of discovered) {
        if (!crawled.has(p) && !pages.has(p) && p.startsWith('/') && !p.includes('/wp-')) {
          // Limit crawl depth to site sections (no infinite project pages in first pass)
          if (crawled.size + pages.size < 25) pages.add(p)
        }
      }
    } catch (err) {
      failed.push({ url: page, error: String(err.message || err) })
    }
  }

  if (!pagesOnly) {
    console.log(`Downloading assets (queue: ${assetQueue.size})…`)
    await drainAssetQueue()
    console.log('Fetching Vite JS chunks…')
    const chunkCount = await fetchLamaLamaJsChunks()
    console.log(`  ${chunkCount} JS chunks`)
  }

  const manifest = {
    mirroredAt: new Date().toISOString(),
    origin: ORIGIN,
    publicPrefix: MIRROR_PREFIX,
    pages: [...crawled],
    assetsDownloaded: downloaded.size,
    failed,
    note: 'HLS streams (vz-*.b-cdn.net) remain remote and need network for video playback.',
  }
  writeFileSync(join(OUT_ROOT, 'manifest.json'), JSON.stringify(manifest, null, 2))

  console.log('\nDone.')
  console.log(`  Pages: ${crawled.size}`)
  console.log(`  Assets: ${downloaded.size}`)
  console.log(`  Failed: ${failed.length}`)
  console.log(`  Preview: http://localhost:3000/lamalama-clone`)
  if (failed.length) console.log('  See manifest.json for failures.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
