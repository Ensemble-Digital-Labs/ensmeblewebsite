import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  applyAtmosphereToElement,
  atmosphereLayerStyle,
  getBlendedHomeAtmosphere,
  HOME_ATMOSPHERE_NAV_EVENT,
  HOME_ATMOSPHERE_SCENES,
  homeAtmosphereBackdropIsDark,
} from '../../lib/homeAtmosphereScenes'
import { prefersReducedMotion } from '../../lib/utils'

const HOME_ATMOSPHERE_INITIAL_STYLE = atmosphereLayerStyle(
  getBlendedHomeAtmosphere(0, HOME_ATMOSPHERE_SCENES),
)

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

function emitNavTone(progress) {
  const backdropIsDark = homeAtmosphereBackdropIsDark(progress)
  window.dispatchEvent(new CustomEvent(HOME_ATMOSPHERE_NAV_EVENT, { detail: { backdropIsDark } }))
}

/**
 * Full-height atmospheric gradient behind home content.
 * Scrubs smoothly with scroll through `#home-scroll-root` (luxury lighting, not tech HUD).
 */
export default function HomeAtmosphereCanvas() {
  const layerRef = useRef(null)
  const lastNavToneRef = useRef(null)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    if (!isHome) return undefined

    const layer = layerRef.current
    if (!layer) return undefined

    let cancelled = false
    let waitRaf = 0
    let refreshRaf = 0
    let refreshTmo = 0
    let scrollTrigger = null

    const teardown = () => {
      cancelAnimationFrame(waitRaf)
      cancelAnimationFrame(refreshRaf)
      window.clearTimeout(refreshTmo)
      scrollTrigger?.kill()
      scrollTrigger = null
      lastNavToneRef.current = null
      window.dispatchEvent(
        new CustomEvent(HOME_ATMOSPHERE_NAV_EVENT, { detail: { backdropIsDark: false } }),
      )
    }

    const bindScroll = () => {
      if (cancelled) return

      const main = document.querySelector('#main')
      const root = document.querySelector('#home-scroll-root')
      if (!main || !root) {
        waitRaf = requestAnimationFrame(bindScroll)
        return
      }

      const reduced = prefersReducedMotion()
      applyAtmosphereToElement(layer, 0, HOME_ATMOSPHERE_SCENES)
      lastNavToneRef.current = homeAtmosphereBackdropIsDark(0)
      emitNavTone(0)

      if (reduced) return

      scrollTrigger = ScrollTrigger.create({
        trigger: root,
        scroller: main,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.35,
        onUpdate: (self) => {
          applyAtmosphereToElement(layer, self.progress, HOME_ATMOSPHERE_SCENES)
          const dark = homeAtmosphereBackdropIsDark(self.progress)
          if (dark !== lastNavToneRef.current) {
            lastNavToneRef.current = dark
            emitNavTone(self.progress)
          }
        },
      })

      const refresh = () => ScrollTrigger.refresh()
      refreshRaf = requestAnimationFrame(refresh)
      refreshTmo = window.setTimeout(refresh, 450)
    }

    bindScroll()

    return () => {
      cancelled = true
      teardown()
    }
  }, [isHome, location.pathname])

  if (!isHome) return null

  return (
    <div
      ref={layerRef}
      id="home-atmosphere-canvas"
      className="pointer-events-none fixed inset-0 z-0 min-h-0 h-[100dvh] w-full overflow-hidden"
      style={HOME_ATMOSPHERE_INITIAL_STYLE}
      aria-hidden
    />
  )
}

