import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

/** Premium ease — smooth deceleration */
const EASE_OUT = [0.22, 1, 0.36, 1]

function Loader({ onComplete }) {
  const reduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(true)
  const hasClosedRef = useRef(false)

  const soft = Boolean(reduceMotion)
  /** Reduced-motion path keeps the short fallback hold. */
  const holdMs = 400
  const exitDuration = soft ? 0.28 : 0.55

  const closeLoader = () => {
    if (hasClosedRef.current) return
    hasClosedRef.current = true
    setVisible(false)
  }

  useEffect(() => {
    if (!soft) return undefined
    const t = window.setTimeout(() => closeLoader(), holdMs)
    return () => window.clearTimeout(t)
  }, [soft, holdMs])

  useEffect(() => {
    if (soft) return undefined
    // Failsafe only: if autoplay/video fails, never trap user on loader.
    const t = window.setTimeout(() => closeLoader(), 12000)
    return () => window.clearTimeout(t)
  }, [soft])

  return (
    <AnimatePresence onExitComplete={() => onComplete?.()}>
      {visible && (
        <motion.div
          id="loader"
          role="status"
          aria-live="polite"
          aria-busy="true"
          aria-label="Loading site"
          className="pointer-events-none fixed inset-0 z-[1000000] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: exitDuration, ease: EASE_OUT }}
        >
          {/* Reduced-motion fallback (no video) */}
          {soft && (
            <div
              className="absolute inset-0 bg-[#010408]"
              aria-hidden
            />
          )}

          {/* Background video (disabled when reduced motion is preferred) */}
          {!soft && (
            <video
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
              style={{ transform: 'scale(1.1)', objectPosition: '50% 48%' }}
              src="/assets/videos/ensemble-website.mp4"
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={closeLoader}
              onError={closeLoader}
              aria-hidden
            />
          )}

          {/* Video-only loader: no foreground lockup */}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Loader
