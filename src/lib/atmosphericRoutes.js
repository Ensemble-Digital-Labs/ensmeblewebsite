/** Marketing pages that share the home hero atmosphere (static plum gradient). */
const STATIC_ATMOSPHERE_BASES = [
  '/case-studies',
  '/blog',
  '/about',
  '/services',
  '/contact',
  '/ai',
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
