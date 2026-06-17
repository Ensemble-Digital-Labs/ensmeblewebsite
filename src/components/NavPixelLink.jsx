import { Link, useLocation } from 'react-router-dom'
import { usePixelTransition } from './PixelTransition'
import { normalizeNavPath, shouldUsePixelNav } from '../lib/pixelNav'
import { prefetchRouteChunk } from '../lib/routePrefetch'
import { forceScrollMainToTop, prefersReducedMotion } from '../lib/utils'

function scrollHomeToTop() {
  const reduce = prefersReducedMotion()
  const lenis =
    window.__ensembleLenis ||
    window.locomotiveScroll?.lenisInstance ||
    window.locomotiveScroll?.LenisInstance

  if (lenis?.scrollTo) {
    try {
      lenis.scrollTo(0, { duration: reduce ? 0 : 1.05, immediate: reduce })
      return
    } catch {
      /* fall through */
    }
  }

  const main = document.querySelector('#main')
  if (main) {
    try {
      main.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
    } catch {
      forceScrollMainToTop(main)
    }
    return
  }

  forceScrollMainToTop()
}

/**
 * Nav `Link` that plays the pixel wipe on cross-route navigation (including return to home).
 * Same-route `/` clicks scroll back to the top of the homepage.
 */
export default function NavPixelLink({ to, onClick, replace = false, ...rest }) {
  const location = useLocation()
  const pixel = usePixelTransition()

  const targetPath = typeof to === 'string' ? to : to?.pathname ?? ''

  const handleTouchStart = () => {
    prefetchRouteChunk(targetPath)
  }

  const handleClick = (e) => {
    onClick?.(e)
    if (e.defaultPrevented) return

    const from = normalizeNavPath(location.pathname)
    const toNorm = normalizeNavPath(targetPath)

    if (from === toNorm && toNorm === '/') {
      e.preventDefault()
      scrollHomeToTop()
      return
    }

    if (!shouldUsePixelNav(location.pathname, targetPath)) return
    if (!pixel?.navigateWithPixel) return

    e.preventDefault()
    void pixel.navigateWithPixel(to, { replace, fromPath: location.pathname })
  }

  return <Link to={to} replace={replace} onTouchStart={handleTouchStart} onClick={handleClick} {...rest} />
}
