import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

/** Walk all of `public/` for PNG/JPEG sources (WebP written alongside each original). */
const SCAN_ROOT = 'public'

/** Non-marketing caches / tooling — skip subtree walks (no site rasters expected). */
const SKIP_DIR_NAMES = new Set(['draco', 'lamalama-mirror'])

const RASTER_EXT = new Set(['.png', '.jpg', '.jpeg'])

/**
 * @param {string} dir
 * @returns {Promise<string[]>}
 */
async function walkRasterFiles(dir) {
  let entries
  try {
    entries = await fs.readdir(dir, { withFileTypes: true })
  } catch {
    return []
  }

  const files = []
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (SKIP_DIR_NAMES.has(entry.name)) continue
      files.push(...(await walkRasterFiles(full)))
      continue
    }
    if (RASTER_EXT.has(path.extname(entry.name).toLowerCase())) {
      files.push(full)
    }
  }
  return files
}

/**
 * @param {string} src
 * @param {string} dest
 */
async function isUpToDate(src, dest) {
  try {
    const [srcStat, destStat] = await Promise.all([fs.stat(src), fs.stat(dest)])
    return destStat.mtimeMs >= srcStat.mtimeMs
  } catch {
    return false
  }
}

/**
 * @param {string} file
 * @param {{ force?: boolean }} [options]
 */
async function convertToWebp(file, options = {}) {
  const dest = file.replace(/\.(png|jpe?g)$/i, '.webp')
  if (!options.force && (await isUpToDate(file, dest))) {
    return { file, dest, status: 'skip' }
  }

  await sharp(file)
    .webp({ quality: 82, effort: 4 })
    .toFile(dest)

  return { file, dest, status: 'ok' }
}

/**
 * Generate `.webp` siblings for PNG/JPEG files under `public/`.
 * @param {{ force?: boolean, quiet?: boolean }} [options]
 */
export async function generateWebp(options = {}) {
  const files = await walkRasterFiles(path.join(ROOT, SCAN_ROOT))

  if (!files.length) {
    if (!options.quiet) {
      console.log('[generate-webp] No PNG/JPEG files found under public/.')
    }
    return { converted: 0, skipped: 0, total: 0 }
  }

  const results = await Promise.all(files.map((file) => convertToWebp(file, options)))
  const converted = results.filter((r) => r.status === 'ok').length
  const skipped = results.filter((r) => r.status === 'skip').length

  if (!options.quiet) {
    console.log(
      `[generate-webp] ${converted} created/updated, ${skipped} up-to-date (${results.length} sources).`,
    )
  }

  return { converted, skipped, total: results.length }
}

const isCli =
  process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url

if (isCli) {
  const force = process.argv.includes('--force')
  generateWebp({ force }).catch((error) => {
    console.error('[generate-webp] Failed:', error)
    process.exit(1)
  })
}
