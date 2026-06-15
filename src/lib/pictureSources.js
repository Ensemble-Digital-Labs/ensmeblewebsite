const RASTER_PATH = /\.(png|jpe?g|webp)$/i

/**
 * Split a public asset URL into path + query (cache-bust `?v=` preserved on all variants).
 * @param {string} src
 */
function splitAssetUrl(src) {
  const qIndex = src.indexOf('?')
  if (qIndex === -1) {
    return { pathPart: src, query: '' }
  }
  return { pathPart: src.slice(0, qIndex), query: src.slice(qIndex) }
}

/**
 * Derive WebP + fallback sources for `<picture>` from a canonical asset URL.
 * Accepts `.png`, `.jpg`, `.jpeg`, or `.webp` paths under `/public`.
 *
 * @param {string} src
 * @returns {{ webp: string | null, fallback: string, fallbackType: string | null } | null}
 */
export function getPictureSources(src) {
  if (!src || typeof src !== 'string') return null

  const { pathPart, query } = splitAssetUrl(src)
  if (!RASTER_PATH.test(pathPart)) {
    return { webp: null, fallback: src, fallbackType: null }
  }

  const stem = pathPart.replace(/\.(png|jpe?g|webp)$/i, '')
  const ext = pathPart.match(/\.(png|jpe?g|webp)$/i)?.[1]?.toLowerCase() ?? ''

  if (ext === 'webp') {
    return {
      webp: src,
      fallback: `${stem}.png${query}`,
      fallbackType: 'image/png',
    }
  }

  const fallbackType = ext === 'png' ? 'image/png' : 'image/jpeg'
  return {
    webp: `${stem}.webp${query}`,
    fallback: src,
    fallbackType,
  }
}

/** @param {ReturnType<typeof getPictureSources>} sources */
export function hasWebpSource(sources) {
  return Boolean(sources?.webp)
}
