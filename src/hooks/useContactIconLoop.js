import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '../lib/utils'

const ICON_COUNT = 3

/** Cycles 0 → 1 → 2 for hand / pen / mail while `active`. */
export function useContactIconLoop(active, intervalSec = 2.4) {
  const [iconIndex, setIconIndex] = useState(0)
  const tweenRef = useRef(null)

  const stop = useCallback(() => {
    tweenRef.current?.kill()
    tweenRef.current = null
  }, [])

  useEffect(() => {
    stop()

    if (!active || prefersReducedMotion()) {
      setIconIndex(2)
      return stop
    }

    let index = 0
    const step = () => {
      setIconIndex(index)
      index = (index + 1) % ICON_COUNT
    }

    step()
    tweenRef.current = gsap.delayedCall(intervalSec, function loop() {
      step()
      tweenRef.current = gsap.delayedCall(intervalSec, loop)
    })

    return stop
  }, [active, intervalSec, stop])

  return iconIndex
}
