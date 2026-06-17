/** Marketing pages that share the home hero atmosphere (static plum gradient). */
const STATIC_ATMOSPHERE_BASES = [
  '/case-studies',
  '/case-studies-v2',
  '/blog',
  '/about',
  '/services',
  '/contact',
  '/ai',
  '/privacy-policy',
  '/terms',
]

function matchesBase(pathname, base) {
  return pathname === base || pathname.startsWith(`${base}/`)
}

export function isStaticAtmosphereRoute(pathname) {
  return STATIC_ATMOSPHERE_BASES.some((base) => matchesBase(pathname, base))
}

export function isAtmosphericRoute(pathname) {
  return pathname === '/' || isStaticAtmosphereRoute(pathname)
}

export function isServicesRoute(pathname) {
  return matchesBase(pathname, '/services')
}

export function isAiRoute(pathname) {
  return matchesBase(pathname, '/ai')
}

/** Doc hub pages that use `ParallaxDepth` inside `MarketingDocLayout`. */
export function isMarketingDocAtmosphereRoute(pathname) {
  return isServicesRoute(pathname) || isAiRoute(pathname)
}

/**
 * Marketing routes that should share the home ambient starfield (not helix).
 * Case-studies gallery pages mount their own canvas in-page.
 */
export function shouldShowAmbientStarfield(pathname) {
  if (!isStaticAtmosphereRoute(pathname)) return false
  if (pathname === '/case-studies' || pathname === '/case-studies-v2') return false
  return true
}

/** Blog article + category pages (`/blog/*`, not the hub index). */
export function isBlogDocRoute(pathname) {
  return pathname.startsWith('/blog/') && pathname !== '/blog'
}
