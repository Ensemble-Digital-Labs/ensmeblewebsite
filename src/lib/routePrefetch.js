import { navLinks } from '../data/navigation'

/** Lazy route loaders — keep in sync with primary nav targets in `AnimatedRoutes.jsx`. */
const ROUTE_LOADERS = {
  '/ai': () => import('../pages/AiPage'),
  '/services': () => import('../pages/Services'),
  '/case-studies': () => import('../pages/CaseStudies'),
  '/blog': () => import('../pages/BlogHub'),
  '/about': () => import('../pages/About'),
  '/contact': () => import('../pages/Contact'),
}

const prefetched = new Set()

function normalizePath(path) {
  if (!path || typeof path !== 'string') return ''
  const bare = path.split('?')[0].split('#')[0]
  if (bare === '' || bare === '/') return '/'
  return bare.endsWith('/') ? bare.slice(0, -1) : bare
}

/** Start downloading a lazy route chunk (no-op if unknown or already prefetched). */
export function prefetchRouteChunk(path) {
  const key = normalizePath(path)
  if (key === '/' || !ROUTE_LOADERS[key] || prefetched.has(key)) return
  prefetched.add(key)
  void ROUTE_LOADERS[key]()
}

/** Prefetch all main fullscreen-nav destinations — call on menu touch only. */
export function prefetchNavRouteChunks() {
  for (const link of navLinks) {
    prefetchRouteChunk(link.path)
  }
}
