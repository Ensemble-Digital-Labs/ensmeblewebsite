import { navAppTiles } from '../data/navMenuIcons'

/**
 * URLs actually used by the fullscreen nav (SVG `<image href>` + tiles).
 * Warm **only these** on menu touch — not WebP siblings (nav does not use `<picture>`).
 */
export function getNavMenuImageUrls() {
  const seen = new Set()
  const urls = []
  for (const tile of navAppTiles) {
    const src = tile.icon?.src?.trim()
    if (!src || seen.has(src)) continue
    seen.add(src)
    urls.push(src)
  }
  return urls
}
