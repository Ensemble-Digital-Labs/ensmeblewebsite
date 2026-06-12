import { useEffect, useRef, useState } from 'react'
import {
  createDnaCapitalShaderHelix,
  disposeDnaCapitalShaderHelix,
  renderDnaCapitalShaderHelix,
  resizeDnaCapitalShaderHelix,
} from '../../lib/dnaCapitalShaderHelix'
import { computeDnaCapitalScrollState, invalidateDnaCapitalScrollLayout } from '../../lib/dnaCapitalScrollPhases'
import { DNA_CAPITAL_TOKENS } from '../../lib/dnaCapitalTokens'
import { prefersReducedMotion } from '../../lib/utils'

/** Full-screen WebGL DNA particles — matches dnacapital.com shader stack. */
export default function DnaCapitalHelixCanvas({ scrollRootId = 'main' }) {
  const mountRef = useRef(null)
  const scrollRef = useRef(0)
  const ctxRef = useRef(null)
  const [webglFailed, setWebglFailed] = useState(false)

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

    ;(async () => {
      try {
        ctx = await createDnaCapitalShaderHelix(w, h)
        if (cancelled) {
          disposeDnaCapitalShaderHelix(ctx)
          return
        }
        ctxRef.current = ctx
        mount.appendChild(ctx.renderer.domElement)
        ctx.renderer.domElement.className = 'dna-clone-webgl'
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

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('resize', invalidateDnaCapitalScrollLayout)
      disposeDnaCapitalShaderHelix(ctx)
      if (ctx?.renderer?.domElement?.parentNode === mount) {
        mount.removeChild(ctx.renderer.domElement)
      }
      ctxRef.current = null
    }
  }, [])

  if (prefersReducedMotion() || webglFailed) {
    return (
      <div
        className="dna-clone-helix dna-clone-helix--static pointer-events-none fixed inset-0 z-[1]"
        style={{ background: DNA_CAPITAL_TOKENS.colors.canvas }}
        aria-hidden
      />
    )
  }

  return (
    <div
      ref={mountRef}
      className="dna-clone-helix pointer-events-none fixed inset-0 z-[1]"
      style={{ background: DNA_CAPITAL_TOKENS.colors.canvas }}
      aria-hidden
    />
  )
}
