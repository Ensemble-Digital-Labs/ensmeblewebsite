import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  easeIntroReveal,
  useCaseStudiesGalleryIntro,
} from '../../hooks/useCaseStudiesGalleryIntro'
import { cn, prefersReducedMotion } from '../../lib/utils'
import CaseStudyGalleryCard from './CaseStudyGalleryCard'

function getSlideSpacing() {
  const w = window.innerWidth
  const edgeInset = Math.max(20, Math.min(w * 0.075, 96))
  const sideHalfWidth = (w < 640 ? 96 : w < 1024 ? 118 : 124) * 0.62
  const maxNeighbors = w < 640 ? 1 : 2
  const fitSpacing = (w / 2 - edgeInset - sideHalfWidth) / maxNeighbors

  if (w < 640) return Math.min(260, Math.max(180, fitSpacing))
  if (w < 1024) return Math.min(290, Math.max(210, fitSpacing))
  return Math.min(310, Math.max(230, fitSpacing))
}

function getMaxVisibleDistance() {
  const w = window.innerWidth
  if (w < 640) return 1.05
  if (w < 1280) return 1.85
  return 2.05
}

function mod(n, m) {
  return ((n % m) + m) % m
}

/** Shortest signed distance on a ring (progress and item index). */
function circularDistance(itemIndex, progress, count) {
  const raw = itemIndex - progress
  return raw - count * Math.round(raw / count)
}

/** Smooth 0→1 focus from ring distance — sharp falloff so side cards stay small. */
function getFocusEase(absDist) {
  const t = Math.min(1, absDist / 0.82)
  const focus = Math.max(0, 1 - t)
  return focus * focus * (3 - 2 * focus)
}

/** Steeper curve for physical card size (DNA center card dominates). */
function getSizeFocus(focus) {
  return focus <= 0 ? 0 : focus ** 1.55
}

function getStaggerAmplitude() {
  const w = window.innerWidth
  if (w < 640) return 30
  if (w < 1024) return 54
  return 72
}

/** DNA wave: center level, ±1 opposite, ±2 flip back (continuous while dragging). */
function waveYAtInteger(signedDist, amplitude) {
  if (signedDist === 0) return 0
  const tier = Math.abs(signedDist)
  const signN = signedDist > 0 ? 1 : -1
  const tierOdd = tier % 2 === 1
  const ySign = tierOdd ? -signN : signN
  const tierScale = 0.88 + (tier - 1) * 0.1
  return ySign * amplitude * tierScale
}

function getWaveYOffset(dist, amplitude) {
  const absDist = Math.abs(dist)
  if (absDist < 0.001) return 0

  const sign = dist >= 0 ? 1 : -1
  const lo = Math.floor(absDist)
  const hi = Math.ceil(absDist)
  const t = absDist - lo

  const yLo = waveYAtInteger(sign * lo, amplitude)
  const yHi = waveYAtInteger(sign * hi, amplitude)

  if (lo === hi) return yLo
  return yLo + (yHi - yLo) * t
}

function getCardDimensions() {
  const w = window.innerWidth
  if (w < 640) {
    return { sideW: 158, centerW: 268, sideH: 248, centerH: 392 }
  }
  if (w < 1024) {
    return { sideW: 188, centerW: 328, sideH: 268, centerH: 432 }
  }
  return { sideW: 200, centerW: 376, sideH: 288, centerH: 496 }
}

/** Per-card intro progress — all cards wipe together from fixed left edges (no center burst). */
function getStaggeredIntroExpand(intro) {
  if (intro >= 1) return 1
  return easeIntroReveal(intro)
}

/** Clip-path % hidden on the right; leaves a thin left sliver at t=0. */
function getIntroClipRight(localExpand) {
  if (localExpand >= 0.999) return 0
  const revealEase = easeIntroReveal(localExpand)
  const revealPct = revealEase <= 0 ? 0.45 : revealEase * 100
  return Math.max(0, 100 - revealPct)
}
/** DNA Capital–style inertia + snap (progress units). */
const DRAG_FRICTION = 5.8
const SNAP_STRENGTH = 18
const VELOCITY_CUTOFF = 0.035
const WHEEL_IMPULSE = 0.022
const DRAG_START_THRESHOLD = 8

export default function CaseStudyPortfolioGallery({ studies, className }) {
  const location = useLocation()
  const pageReplayKey = location.pathname === '/case-studies' ? location.key : 'off-route'
  const stageRef = useRef(null)
  const galleryRef = useRef(null)
  const slideRefs = useRef([])
  const introRef = useRef(0)
  const wheelSnapTimerRef = useRef(0)
  const rafRef = useRef(0)
  const lastFrameRef = useRef(0)
  const movedRef = useRef(false)
  const pointerDownTargetRef = useRef(null)
  const [logicalIndex, setLogicalIndex] = useState(0)

  const studiesKey = useMemo(() => studies.map((s) => s.slug).join('|'), [studies])

  const motionRef = useRef({
    progress: 0,
    velocity: 0,
    snapTarget: null,
    dragging: false,
    pendingPointerId: null,
    dragStartX: 0,
    dragStartY: 0,
    dragStartProgress: 0,
    lastPointerX: 0,
    lastPointerTime: 0,
    sampleVelocity: 0,
  })

  const count = studies.length
  const reducedMotion = prefersReducedMotion()

  const applyLayout = useCallback(() => {
    if (!count) return

    const spacing = getSlideSpacing()
    const maxVisibleDist = getMaxVisibleDistance()
    const { sideW, centerW, sideH, centerH } = getCardDimensions()
    const slides = slideRefs.current.filter(Boolean)
    const progress = motionRef.current.progress

    const intro = introRef.current
    const staggerAmp = getStaggerAmplitude()

    slides.forEach((slide, index) => {
      const dist = circularDistance(index, progress, count)
      const absDist = Math.abs(dist)
      const focusBase = getFocusEase(absDist)
      const localExpand = getStaggeredIntroExpand(intro)
      const revealEase = easeIntroReveal(localExpand)
      const focus = focusBase
      const x = dist * spacing
      const opacity =
        intro >= 0.999 ? 0.35 + focusBase * 0.65 : (0.35 + focusBase * 0.65) * (0.55 + 0.45 * revealEase)
      const waveY = getWaveYOffset(dist, staggerAmp)
      const yOffset = waveY * (1 - focus * 0.92)
      const sizeFocus = getSizeFocus(focus)
      const isCenter = sizeFocus > 0.58
      const cardW = sideW + (centerW - sideW) * sizeFocus
      const cardH = sideH + (centerH - sideH) * sizeFocus
      const clipRight = getIntroClipRight(localExpand)

      slide.style.setProperty('--csp-focus', focusBase.toFixed(4))
      slide.style.setProperty('--csp-size-focus', sizeFocus.toFixed(4))
      slide.style.setProperty('--csp-card-height', `${cardH}px`)
      slide.style.width = `${cardW}px`
      slide.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${yOffset}px, 0)`
      slide.style.opacity = opacity.toFixed(3)
      slide.style.clipPath = clipRight <= 0.01 ? 'none' : `inset(0 ${clipRight.toFixed(2)}% 0 0)`
      slide.classList.toggle('is-intro-revealing', intro < 0.999)
      slide.style.zIndex = String(isCenter ? 6 : Math.max(1, Math.round(4 - absDist)))
      slide.style.pointerEvents = absDist <= maxVisibleDist ? 'auto' : 'none'
      slide.style.visibility = absDist > maxVisibleDist ? 'hidden' : 'visible'
      slide.classList.toggle('is-center', isCenter)
    })

    const nextLogical = mod(Math.round(progress), count)
    setLogicalIndex((prev) => (prev === nextLogical ? prev : nextLogical))

    const stage = stageRef.current
    const gallery = galleryRef.current
    if (stage) {
      stage.classList.toggle('is-intro-active', introRef.current < 0.999)
    }
    if (gallery) {
      gallery.classList.add('is-layout-ready')
    }
  }, [count])

  useLayoutEffect(() => {
    applyLayout()
  }, [applyLayout, count, studiesKey, pageReplayKey])

  useCaseStudiesGalleryIntro(introRef, applyLayout, {
    replayKey: pageReplayKey,
    studiesKey,
    enabled: count > 0,
  })

  useEffect(() => {
    motionRef.current.progress = 0
    motionRef.current.velocity = 0
    motionRef.current.snapTarget = null
    applyLayout()
  }, [pageReplayKey, applyLayout])

  const settleToNearest = useCallback(() => {
    const m = motionRef.current
    m.snapTarget = Math.round(m.progress)
    m.velocity = 0
  }, [])

  const stepMotion = useCallback(
    (deltaSec) => {
      const m = motionRef.current
      if (!count || m.dragging) return

      if (Math.abs(m.velocity) > VELOCITY_CUTOFF) {
        m.progress += m.velocity * deltaSec
        m.velocity *= Math.exp(-DRAG_FRICTION * deltaSec)
        if (Math.abs(m.velocity) <= VELOCITY_CUTOFF) {
          m.velocity = 0
          m.snapTarget = Math.round(m.progress)
        }
        return
      }

      if (m.snapTarget !== null) {
        const diff = m.snapTarget - m.progress
        m.progress += diff * (1 - Math.exp(-SNAP_STRENGTH * deltaSec))
        if (Math.abs(diff) < 0.0008) {
          m.progress = m.snapTarget
          m.snapTarget = null
        }
      }
    },
    [count],
  )

  const tick = useCallback(
    (now) => {
      const deltaSec = Math.min(0.05, (now - lastFrameRef.current) / 1000)
      lastFrameRef.current = now
      stepMotion(deltaSec)
      applyLayout()

      const m = motionRef.current
      const animating =
        m.dragging || Math.abs(m.velocity) > VELOCITY_CUTOFF || m.snapTarget !== null

      if (animating) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        rafRef.current = 0
      }
    },
    [applyLayout, stepMotion],
  )

  const startLoop = useCallback(() => {
    if (rafRef.current) return
    lastFrameRef.current = performance.now()
    rafRef.current = requestAnimationFrame(tick)
  }, [tick])

  const stopLoop = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
    }
  }, [])

  const snapToIndex = useCallback(
    (targetProgress, immediate = false) => {
      const m = motionRef.current
      if (immediate || reducedMotion) {
        m.progress = targetProgress
        m.velocity = 0
        m.snapTarget = null
        applyLayout()
        return
      }
      m.velocity = 0
      m.snapTarget = targetProgress
      startLoop()
    },
    [applyLayout, reducedMotion, startLoop],
  )

  const step = useCallback(
    (direction) => {
      snapToIndex(Math.round(motionRef.current.progress) + direction)
    },
    [snapToIndex],
  )

  useEffect(() => {
    slideRefs.current = slideRefs.current.slice(0, count)
    motionRef.current.progress = 0
    motionRef.current.velocity = 0
    motionRef.current.snapTarget = null
    if (introRef.current >= 1) {
      applyLayout()
    }
  }, [studies, count, applyLayout])

  useEffect(() => {
    applyLayout()
    const onResize = () => applyLayout()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [applyLayout])

  useEffect(() => {
    return () => stopLoop()
  }, [stopLoop])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage || reducedMotion) return undefined

    const onWheel = (event) => {
      if (!count) return
      event.preventDefault()
      const delta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX
      const m = motionRef.current
      m.velocity += delta * WHEEL_IMPULSE
      m.snapTarget = null
      startLoop()

      clearTimeout(wheelSnapTimerRef.current)
      wheelSnapTimerRef.current = window.setTimeout(() => {
        if (!m.dragging) settleToNearest()
        startLoop()
      }, 160)
    }

    stage.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      stage.removeEventListener('wheel', onWheel)
      clearTimeout(wheelSnapTimerRef.current)
    }
  }, [count, reducedMotion, settleToNearest, startLoop])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return undefined

    const onPointerDown = (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return

      const m = motionRef.current
      m.dragging = false
      m.pendingPointerId = event.pointerId
      m.velocity = 0
      m.snapTarget = null
      m.dragStartX = event.clientX
      m.dragStartY = event.clientY
      m.dragStartProgress = m.progress
      m.lastPointerX = event.clientX
      m.lastPointerTime = performance.now()
      m.sampleVelocity = 0
      movedRef.current = false
      pointerDownTargetRef.current = event.target
    }

    const onPointerMove = (event) => {
      const m = motionRef.current
      if (m.pendingPointerId === null && !m.dragging) return
      if (!count) return

      if (!m.dragging) {
        const dx = event.clientX - m.dragStartX
        const dy = event.clientY - m.dragStartY
        if (Math.hypot(dx, dy) < DRAG_START_THRESHOLD) return

        movedRef.current = true
        m.dragging = true
        stage.setPointerCapture(m.pendingPointerId)
        stage.classList.add('is-dragging')
        startLoop()
      }

      const now = performance.now()
      const spacing = getSlideSpacing()
      const deltaX = event.clientX - m.dragStartX

      if (Math.abs(deltaX) > 4) movedRef.current = true

      m.progress = m.dragStartProgress - deltaX / spacing

      const dt = (now - m.lastPointerTime) / 1000
      if (dt > 0 && dt < 0.08) {
        const instantV = (m.lastPointerX - event.clientX) / spacing / dt
        m.sampleVelocity = m.sampleVelocity * 0.55 + instantV * 0.45
      }

      m.lastPointerX = event.clientX
      m.lastPointerTime = now
    }

    const endDrag = (event) => {
      const m = motionRef.current
      if (m.pendingPointerId === null && !m.dragging) return

      const wasDragging = m.dragging
      const downTarget = pointerDownTargetRef.current

      if (!wasDragging) {
        m.pendingPointerId = null
        pointerDownTargetRef.current = null

        const link =
          downTarget instanceof Element ? downTarget.closest('a.case-studies-gallery-card__link') : null
        if (link instanceof HTMLAnchorElement && event.pointerType !== 'mouse') {
          link.click()
        }
        return
      }

      m.dragging = false
      m.pendingPointerId = null
      pointerDownTargetRef.current = null
      stage.classList.remove('is-dragging')

      try {
        stage.releasePointerCapture(event.pointerId)
      } catch {
        /* noop */
      }

      if (reducedMotion) {
        settleToNearest()
        applyLayout()
      } else if (movedRef.current) {
        m.velocity = m.sampleVelocity * 0.92
        if (Math.abs(m.velocity) <= VELOCITY_CUTOFF) {
          settleToNearest()
        }
        startLoop()
      } else {
        stopLoop()
      }

      if (movedRef.current) {
        const blockClick = (clickEvent) => {
          clickEvent.preventDefault()
          clickEvent.stopPropagation()
          stage.removeEventListener('click', blockClick, true)
        }
        stage.addEventListener('click', blockClick, true)
      }
    }

    stage.addEventListener('pointerdown', onPointerDown)
    stage.addEventListener('pointermove', onPointerMove)
    stage.addEventListener('pointerup', endDrag)
    stage.addEventListener('pointercancel', endDrag)

    return () => {
      stage.removeEventListener('pointerdown', onPointerDown)
      stage.removeEventListener('pointermove', onPointerMove)
      stage.removeEventListener('pointerup', endDrag)
      stage.removeEventListener('pointercancel', endDrag)
      stopLoop()
    }
  }, [
    applyLayout,
    count,
    reducedMotion,
    settleToNearest,
    startLoop,
    stopLoop,
  ])

  if (!count) {
    return (
      <p className="case-studies-portfolio__empty case-studies-portfolio__empty--gallery">
        No case studies match these filters.
      </p>
    )
  }

  return (
    <div ref={galleryRef} className={cn('case-studies-portfolio-gallery', className)}>
      <ul
        ref={stageRef}
        className="case-studies-portfolio-gallery__carousel"
        data-cursor-intent="drag"
        aria-label="Case study gallery"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') {
            event.preventDefault()
            step(1)
          }
          if (event.key === 'ArrowLeft') {
            event.preventDefault()
            step(-1)
          }
        }}
      >
        {studies.map((study, index) => (
          <li
            key={study.slug}
            ref={(el) => {
              slideRefs.current[index] = el
            }}
            className="case-studies-portfolio-gallery__slide"
            aria-hidden={index !== logicalIndex ? true : undefined}
          >
            <CaseStudyGalleryCard study={study} />
          </li>
        ))}
      </ul>
    </div>
  )
}
