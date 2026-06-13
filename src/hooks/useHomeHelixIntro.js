import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import {
  resetHomeRibbonIntroProgress,
  setHomeRibbonIntroProgress,
} from '../lib/homeRibbonIntro'
import {
  HOME_PAGE_DNA_HELIX_ENABLED,
  HOME_PAGE_HELIX_VARIANT,
} from '../lib/homeDnaFeature'
import {
  hasHomeHelixIntroCompleted,
  markHomeHelixIntroCompleted,
} from '../lib/homeHelixSession'
import { prefersReducedMotion } from '../lib/utils'

/** Ribbon helix intro after home loader — instant on return visits so WebGL is visible. */
export function useHomeHelixIntro(introReady) {
  const tlRef = useRef(null)

  useLayoutEffect(() => {
    const useRibbon =
      HOME_PAGE_DNA_HELIX_ENABLED && HOME_PAGE_HELIX_VARIANT === 'ribbon'
    if (!useRibbon) return undefined

    if (prefersReducedMotion()) {
      setHomeRibbonIntroProgress(1)
      markHomeHelixIntroCompleted()
      return undefined
    }

    if (!introReady) {
      resetHomeRibbonIntroProgress()
      return undefined
    }

    tlRef.current?.kill()
    tlRef.current = null

    if (hasHomeHelixIntroCompleted()) {
      setHomeRibbonIntroProgress(1)
      return undefined
    }

    resetHomeRibbonIntroProgress()
    const state = { value: 0 }
    tlRef.current = gsap.timeline({
      onUpdate: () => setHomeRibbonIntroProgress(state.value),
      onComplete: () => markHomeHelixIntroCompleted(),
    })
    tlRef.current.to(state, {
      value: 1,
      duration: 1.75,
      ease: 'power2.out',
      delay: 0.18,
    })

    return () => {
      tlRef.current?.kill()
      tlRef.current = null
    }
  }, [introReady])
}
