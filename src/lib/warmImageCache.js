/** @type {Set<string>} */
const warmedUrls = new Set()

/**
 * Prime the browser image cache without changing layout or visible loading behavior.
 * Safe to call repeatedly — URLs are deduped unless `force` is set.
 *
 * @param {Array<string | { src?: string }>} urls
 * @param {{ force?: boolean }} [options]
 */
export function warmImageUrls(urls, { force = false } = {}) {
  if (typeof window === 'undefined' || !urls?.length) return

  for (const entry of urls) {
    const url = typeof entry === 'string' ? entry.trim() : entry?.src?.trim?.()
    if (!url) continue
    if (!force && warmedUrls.has(url)) continue

    warmedUrls.add(url)
    const img = new Image()
    img.decoding = 'async'
    img.src = url
  }
}

/**
 * Warm images after first paint so we do not compete with LCP / initial JS parse.
 *
 * @param {Array<string | { src?: string }>} urls
 * @param {{ timeout?: number, idle?: boolean }} [options]
 */
export function scheduleWarmImageUrls(urls, { timeout = 0, idle = true } = {}) {
  if (typeof window === 'undefined' || !urls?.length) return

  const run = () => warmImageUrls(urls)

  if (timeout > 0) {
    window.setTimeout(run, timeout)
    return
  }

  if (idle && typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(run, { timeout: 2800 })
    return
  }

  window.setTimeout(run, 160)
}
