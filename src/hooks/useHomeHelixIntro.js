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
import { waitForHomeHelixReady } from '../lib/helixReady'
import { prefersReducedMotion } from '../lib/utils'

/** Ribbon helix intro — waits for WebGL particles before fading in. */
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

    let cancelled = false

    const killTimeline = () => {
      tlRef.current?.kill()
      tlRef.current = null
    }

    const startFadeIn = () => {
      if (cancelled) return
      killTimeline()
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
        delay: 0.08,
      })
    }

    killTimeline()

    if (hasHomeHelixIntroCompleted()) {
      setHomeRibbonIntroProgress(1)
      return () => {
        cancelled = true
        killTimeline()
      }
    }

    resetHomeRibbonIntroProgress()

    waitForHomeHelixReady().then((result) => {
      if (cancelled) return
      if (result === 'failed' || result === 'timeout') {
        setHomeRibbonIntroProgress(1)
        markHomeHelixIntroCompleted()
        return
      }
      startFadeIn()
    })

    return () => {
      cancelled = true
      killTimeline()
    }
  }, [introReady])
}
