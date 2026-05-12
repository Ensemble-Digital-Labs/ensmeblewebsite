import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import AnimatedBrandLogo from './AnimatedBrandLogo'

/** Premium ease — smooth deceleration */
const EASE_OUT = [0.22, 1, 0.36, 1]

function Loader({ onComplete }) {
  const reduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(true)

  const soft = Boolean(reduceMotion)
  /** Short enough to feel responsive; long enough to read logo + bar once */
  const holdMs = soft ? 400 : 1150
  const exitDuration = soft ? 0.28 : 0.55

  useEffect(() => {
    const t = window.setTimeout(() => setVisible(false), holdMs)
    return () => window.clearTimeout(t)
  }, [holdMs])

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
          {/* Deep base */}
          <div
            className="absolute inset-0 bg-[#010408]"
            aria-hidden
          />

          {/* Cool gradient wash */}
          <motion.div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#030a14] via-[#050f1a] to-[#02060d]"
            aria-hidden
            initial={soft ? { opacity: 1 } : { opacity: 0.88 }}
            animate={{ opacity: 1 }}
            transition={{ duration: soft ? 0 : 1.15, ease: 'easeOut' }}
          />

          {/* Rose / coral ambient glows — growth palette */}
          <div
            className="pointer-events-none absolute -left-[20%] top-[-10%] h-[min(70vh,520px)] w-[min(90vw,520px)] rounded-full bg-amber-500/[0.07] blur-[100px]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-[15%] bottom-[-5%] h-[min(55vh,420px)] w-[min(75vw,440px)] rounded-full bg-growth-from/[0.08] blur-[90px]"
            aria-hidden
          />

          {/* Fine grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage: `linear-gradient(rgba(233,78,119,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(241,114,69,0.03)_1px,transparent_1px)`,
              backgroundSize: '56px 56px',
              maskImage:
                'radial-gradient(ellipse 75% 70% at 50% 45%, black 0%, transparent 72%)',
            }}
            aria-hidden
          />

          {/* Vignette */}
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_95%_90%_at_50%_48%,transparent_0%,rgba(1,4,8,0.75)_100%)]"
            aria-hidden
          />

          {/* Top hairline */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/25 to-transparent"
            aria-hidden
          />

          <div className="relative z-10 flex max-w-[min(96vw,480px)] flex-col items-center px-6">
            <motion.div
              className="flex flex-col items-center"
              initial={
                soft
                  ? { opacity: 0 }
                  : { opacity: 0, y: 28, filter: 'blur(12px)' }
              }
              animate={
                soft
                  ? { opacity: 1 }
                  : { opacity: 1, y: 0, filter: 'blur(0px)' }
              }
              transition={{
                duration: soft ? 0.28 : 0.95,
                delay: soft ? 0 : 0.08,
                ease: EASE_OUT,
              }}
            >
              <AnimatedBrandLogo variant="loader" priority className="drop-shadow-[0_0_40px_rgba(201,162,39,0.12)]" />
            </motion.div>

            <motion.span
              className="mt-7 block text-center text-[10px] font-medium uppercase tracking-[0.48em] text-zinc-600"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: soft ? 0.2 : 0.65,
                delay: soft ? 0.05 : 0.32,
                ease: EASE_OUT,
              }}
            >
              Loading
            </motion.span>

            {/* Progress line */}
            <div className="relative mt-10 h-[2px] w-[min(200px,55vw)] overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-transparent via-amber-400/90 to-transparent"
                initial={{ scaleX: 0, transformOrigin: '0% 50%' }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: soft ? 0.22 : 0.92,
                  delay: soft ? 0 : 0.08,
                  ease: soft ? 'linear' : EASE_OUT,
                }}
              />
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Loader
