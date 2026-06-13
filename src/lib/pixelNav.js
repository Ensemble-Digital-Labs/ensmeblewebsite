/** Normalize route paths for pixel-nav eligibility checks. */
import { isMobileAnimationVariant } from './animationProfile'

export function normalizeNavPath(path) {
  if (!path || typeof path !== 'string') return '/'
  const bare = path.split('?')[0].split('#')[0]
  if (bare === '' || bare === '/') return '/'
  return bare.endsWith('/') ? bare.slice(0, -1) : bare
}

/** Pixel wipe for cross-route navigation (including return to home). Same-route clicks skip the wipe. */
export function shouldUsePixelNav(fromPath, toPath) {
  if (isMobileAnimationVariant()) return false
  const from = normalizeNavPath(fromPath)
  const to = normalizeNavPath(typeof toPath === 'string' ? toPath : toPath?.pathname ?? '')
  if (to === from) return false
  return true
}
