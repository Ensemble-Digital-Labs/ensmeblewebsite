import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  createDnaCapitalShaderHelix,
  disposeDnaCapitalShaderHelix,
  renderDnaCapitalShaderHelix,
  resizeDnaCapitalShaderHelix,
} from '../../lib/dnaCapitalShaderHelix'
import { computeDnaCapitalScrollState, invalidateDnaCapitalScrollLayout } from '../../lib/dnaCapitalScrollPhases'
import { ENSEMBLE_DNA_SHADER_OPTIONS } from '../../lib/ensembleDnaShaderOptions'
import { DNA_CAPITAL_TOKENS } from '../../lib/dnaCapitalTokens'
import { getDnaCloneIntroProgress } from '../../lib/dnaCapitalIntro'
import { getHomeRibbonIntroProgress } from '../../lib/homeRibbonIntro'
import { prefersReducedMotion } from '../../lib/utils'

/** Full-screen WebGL DNA particles — matches dnacapital.com shader stack. */
export default function DnaCapitalHelixCanvas({
  scrollRootId = 'main',
  theme = 'dna-capital',
  introSource = 'clone',
}) {
  const location = useLocation()
  const isEnsemble = theme === 'ensemble'
  const canvasBg = isEnsemble ? 'transparent' : DNA_CAPITAL_TOKENS.colors.canvas
  const getIntroProgress =
    introSource === 'home' ? getHomeRibbonIntroProgress : getDnaCloneIntroProgress
  const webglOptions = isEnsemble
    ? { ...ENSEMBLE_DNA_SHADER_OPTIONS, getIntroProgress }
    : { getIntroProgress }
  const mountRef = useRef(null)
  const scrollRef = useRef(0)
  const ctxRef = useRef(null)
  const [webglFailed, setWebglFailed] = useState(false)
  const [mountGeneration, setMountGeneration] = useState(0)

  useEffect(() => {
    const onPageShow = (event) => {
      if (event.persisted) {
        setMountGeneration((n) => n + 1)
      }
    }
    window.addEventListener('pageshow', onPageShow)
    return () => window.removeEventListener('pageshow', onPageShow)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const main = document.getElementById(scrollRootId)
      if (!main) return
      scrollRef.current = main.scrollTop || 0
    }
    const main = document.getElementById(scrollRootId)
    main?.addEventListener('scroll', onScroll, { passive: true })
    const lenis = window.__ensembleLenis
    if (lenis?.on) lenis.on('scroll', onScroll)
    window.addEventListener('ensemble:scroll-ready', onScroll)
    onScroll()

    return () => {
      main?.removeEventListener('scroll', onScroll)
      if (lenis?.off) lenis.off('scroll', onScroll)
      window.removeEventListener('ensemble:scroll-ready', onScroll)
    }
  }, [scrollRootId])

  useEffect(() => {
    if (prefersReducedMotion()) return undefined

    const mount = mountRef.current
    if (!mount) return undefined

    setWebglFailed(false)
    invalidateDnaCapitalScrollLayout()

    let w = Math.max(1, mount.clientWidth)
    let h = Math.max(1, mount.clientHeight)
    let ctx = null
    let raf = 0
    let cancelled = false
    let lastTime = 0

    const startLoop = () => {
      const animate = (time) => {
        if (cancelled || !ctx) return
        const deltaMs = lastTime ? time - lastTime : 16.67
        lastTime = time
        const main = document.getElementById(scrollRootId)
        const scrollState = main ? computeDnaCapitalScrollState(main) : { globalProgress: 0 }
        try {
          renderDnaCapitalShaderHelix(ctx, {
            scrollState,
            time,
            deltaMs,
            reducedMotion: prefersReducedMotion(),
          })
        } catch (error) {
          console.warn('[DnaCapitalHelixCanvas] render failed', error)
          setWebglFailed(true)
          return
        }
        raf = requestAnimationFrame(animate)
      }
      raf = requestAnimationFrame(animate)
    }

    const onContextLost = (event) => {
      event.preventDefault()
      cancelled = true
      cancelAnimationFrame(raf)
      disposeDnaCapitalShaderHelix(ctx)
      ctx = null
      ctxRef.current = null
      setMountGeneration((n) => n + 1)
    }

    ;(async () => {
      try {
        ctx = await createDnaCapitalShaderHelix(w, h, webglOptions)
        if (cancelled) {
          disposeDnaCapitalShaderHelix(ctx)
          return
        }
        ctxRef.current = ctx
        const canvas = ctx.renderer.domElement
        canvas.className = 'dna-clone-webgl'
        canvas.addEventListener('webglcontextlost', onContextLost)
        mount.appendChild(canvas)
        startLoop()
      } catch (error) {
        console.warn('[DnaCapitalHelixCanvas] WebGL init failed', error)
        if (!cancelled) setWebglFailed(true)
      }
    })()

    const resize = () => {
      w = Math.max(1, mount.clientWidth)
      h = Math.max(1, mount.clientHeight)
      if (ctx) resizeDnaCapitalShaderHelix(ctx, w, h)
    }
    window.addEventListener('resize', resize)
    window.addEventListener('resize', invalidateDnaCapitalScrollLayout)

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            resize()
          })
        : null
    resizeObserver?.observe(mount)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      resizeObserver?.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('resize', invalidateDnaCapitalScrollLayout)
      const canvas = ctx?.renderer?.domElement
      canvas?.removeEventListener('webglcontextlost', onContextLost)
      disposeDnaCapitalShaderHelix(ctx)
      if (canvas?.parentNode === mount) {
        mount.removeChild(canvas)
      }
      ctxRef.current = null
    }
  }, [scrollRootId, introSource, isEnsemble, location.key, mountGeneration])

  const helixClass = `dna-clone-helix pointer-events-none fixed inset-0 z-[1]${isEnsemble ? ' dna-clone-helix--ensemble' : ''}${webglFailed || prefersReducedMotion() ? ' dna-clone-helix--static' : ''}`

  return (
    <div className={helixClass} style={{ background: canvasBg }} aria-hidden>
      {isEnsemble ? (
        <>
          <div className="home-page-dna-canvas__wash absolute inset-0" aria-hidden />
          <div className="dna-clone-ensemble-field-wash absolute inset-0" aria-hidden />
        </>
      ) : null}
      {!prefersReducedMotion() && !webglFailed ? (
        <div ref={mountRef} className="absolute inset-0" />
      ) : null}
    </div>
  )
}
