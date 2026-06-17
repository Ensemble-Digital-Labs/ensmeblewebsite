/** @type {Set<string>} */
const warmedUrls = new Set()

/** @type {string[]} */
let queue = []
/** @type {ReturnType<typeof setTimeout> | null} */
let drainTimer = null

const BATCH_SIZE = 2
const BATCH_GAP_MS = 120

function drainQueue() {
  drainTimer = null
  if (!queue.length) return

  const batch = queue.splice(0, BATCH_SIZE)
  for (const url of batch) {
    if (warmedUrls.has(url)) continue
    warmedUrls.add(url)
    const img = new Image()
    img.decoding = 'async'
    img.src = url
  }

  if (queue.length) {
    drainTimer = window.setTimeout(drainQueue, BATCH_GAP_MS)
  }
}

/**
 * Prime the browser image cache in small batches so we do not saturate mobile bandwidth.
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
    if (queue.includes(url)) continue
    queue.push(url)
  }

  if (!drainTimer) {
    drainTimer = window.setTimeout(drainQueue, 0)
  }
}
