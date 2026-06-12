/** Normalize route paths for pixel-nav eligibility checks. */
export function normalizeNavPath(path) {
  if (!path || typeof path !== 'string') return '/'
  const bare = path.split('?')[0].split('#')[0]
  if (bare === '' || bare === '/') return '/'
  return bare.endsWith('/') ? bare.slice(0, -1) : bare
}

/** Pixel wipe when leaving for a non-home route (not for `/` or same-page jumps). */
export function shouldUsePixelNav(fromPath, toPath) {
  const from = normalizeNavPath(fromPath)
  const to = normalizeNavPath(typeof toPath === 'string' ? toPath : toPath?.pathname ?? '')
  if (to === from) return false
  if (to === '/') return false
  return true
}
