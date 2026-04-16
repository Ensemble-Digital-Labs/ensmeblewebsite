import { useCallback, useEffect, useId, useMemo, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { motion } from 'framer-motion'
import { cn, prefersReducedMotion } from '../../lib/utils'

/**
 * Soft drifting particles + fade-in (tsparticles slim + framer-motion).
 * Omit or hide when `prefers-reduced-motion` is set.
 */
export function SparklesCore({
  id,
  className,
  background = 'transparent',
  minSize = 0.5,
  maxSize = 2,
  speed = 2,
  particleColor = '#ffffff',
  particleDensity = 90,
}) {
  const generatedId = useId()
  const [engineReady, setEngineReady] = useState(false)
  const [containerReady, setContainerReady] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) return
    let cancelled = false
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      if (!cancelled) setEngineReady(true)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const particlesLoaded = useCallback(async () => {
    setContainerReady(true)
  }, [])

  const visible = engineReady && containerReady

  const options = useMemo(
    () => ({
    background: {
      color: {
        value: background,
      },
    },
    fullScreen: {
      enable: false,
      zIndex: 0,
    },
    fpsLimit: 90,
    interactivity: {
      events: {
        onClick: {
          enable: false,
        },
        onHover: {
          enable: false,
        },
        resize: {
          enable: true,
        },
      },
    },
    particles: {
      color: {
        value: particleColor,
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: {
          default: 'out',
        },
        random: false,
        speed: {
          min: 0.08,
          max: 0.45,
        },
        straight: false,
      },
      number: {
        density: {
          enable: true,
          width: 900,
          height: 900,
        },
        value: particleDensity,
      },
      opacity: {
        value: {
          min: 0.12,
          max: 0.85,
        },
        animation: {
          enable: true,
          speed,
          sync: false,
          destroy: 'none',
          startValue: 'random',
        },
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: {
          min: minSize,
          max: maxSize,
        },
      },
    },
    detectRetina: true,
    }),
    [background, maxSize, minSize, particleColor, particleDensity, speed]
  )

  if (prefersReducedMotion()) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={cn('pointer-events-none h-full w-full', className)}
      aria-hidden
    >
      {engineReady && (
        <Particles
          id={id || generatedId}
          className="h-full w-full"
          particlesLoaded={particlesLoaded}
          options={options}
        />
      )}
    </motion.div>
  )
}

export default SparklesCore
