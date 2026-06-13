import { useEffect, useRef } from 'react'
import {
  applyAtmosphereToElement,
  HOME_ATMOSPHERE_SCENES,
  HOME_HERO_ATMOSPHERE_STYLE,
} from '../../lib/homeAtmosphereScenes'

/** Homepage scroll-linked atmosphere behind the DNA Capital experiment stack. */
export default function DnaCloneEnsembleAtmosphere({ scrollRootId = 'main' }) {
  const layerRef = useRef(null)

  useEffect(() => {
    const main = document.getElementById(scrollRootId)
    const layer = layerRef.current
    if (!main || !layer) return undefined

    const update = () => {
      const doc = document.getElementById('dna-clone-scroll')
      const max = Math.max((doc?.scrollHeight ?? window.innerHeight) - window.innerHeight, 1)
      const progress = (main.scrollTop ?? 0) / max
      applyAtmosphereToElement(layer, progress, HOME_ATMOSPHERE_SCENES)
    }

    applyAtmosphereToElement(layer, 0, HOME_ATMOSPHERE_SCENES)
    main.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()

    return () => {
      main.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [scrollRootId])

  return (
    <div
      ref={layerRef}
      className="dna-clone-ensemble-atmosphere pointer-events-none fixed inset-0 z-0 min-h-0 h-[100dvh] w-full overflow-hidden"
      style={HOME_HERO_ATMOSPHERE_STYLE}
      aria-hidden
    />
  )
}
