import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import {
  applyAtmosphereToElement,
  atmosphereLayerStyle,
  getBlendedHomeAtmosphere,
  HOME_ATMOSPHERE_NAV_EVENT,
  HOME_ATMOSPHERE_SCENES,
  homeAtmosphereBackdropIsDark,
} from '../../lib/homeAtmosphereScenes'
import { isStaticAtmosphereRoute } from '../../lib/atmosphericRoutes'

const HOME_ATMOSPHERE_INITIAL_STYLE = atmosphereLayerStyle(
  getBlendedHomeAtmosphere(0, HOME_ATMOSPHERE_SCENES),
)

function emitNavTone(progress) {
  const backdropIsDark = homeAtmosphereBackdropIsDark(progress)
  window.dispatchEvent(new CustomEvent(HOME_ATMOSPHERE_NAV_EVENT, { detail: { backdropIsDark } }))
}

/**
 * Full-height atmospheric gradient behind home + marketing pages.
 * Home uses one static tone so sections read as a single blank canvas.
 */
export default function HomeAtmosphereCanvas() {
  const layerRef = useRef(null)
  const lastNavToneRef = useRef(null)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isStaticAtmosphere = isStaticAtmosphereRoute(location.pathname)
  const showAtmosphere = isHome || isStaticAtmosphere

  useEffect(() => {
    if (!showAtmosphere) return undefined

    const layer = layerRef.current
    if (!layer) return undefined

    applyAtmosphereToElement(layer, 0, HOME_ATMOSPHERE_SCENES)
    lastNavToneRef.current = homeAtmosphereBackdropIsDark(0)
    emitNavTone(0)

    return () => {
      lastNavToneRef.current = null
      window.dispatchEvent(
        new CustomEvent(HOME_ATMOSPHERE_NAV_EVENT, { detail: { backdropIsDark: false } }),
      )
    }
  }, [showAtmosphere, location.pathname])

  if (!showAtmosphere) return null

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
