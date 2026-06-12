import { useEffect, useRef, useState } from 'react'
import {
  createDnaCapitalShaderHelix,
  disposeDnaCapitalShaderHelix,
  renderDnaCapitalShaderHelix,
  resizeDnaCapitalShaderHelix,
} from '../../lib/dnaCapitalShaderHelix'
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

    try {
      ctx = createDnaCapitalShaderHelix(w, h)
      ctxRef.current = ctx
      mount.appendChild(ctx.renderer.domElement)
      ctx.renderer.domElement.className = 'dna-clone-webgl'
    } catch (error) {
      console.warn('[DnaCapitalHelixCanvas] WebGL init failed', error)
      setWebglFailed(true)
      return undefined
    }

    const resize = () => {
      w = Math.max(1, mount.clientWidth)
      h = Math.max(1, mount.clientHeight)
      resizeDnaCapitalShaderHelix(ctx, w, h)
    }
    window.addEventListener('resize', resize)

    const animate = (time) => {
      const doc = document.getElementById('dna-clone-scroll')
      const docH = Math.max(doc?.scrollHeight ?? 1, 1)
      const progress = scrollRef.current / Math.max(docH - window.innerHeight, 1)
      try {
        renderDnaCapitalShaderHelix(ctx, { progress, time, reducedMotion: false })
      } catch (error) {
        console.warn('[DnaCapitalHelixCanvas] render failed', error)
        setWebglFailed(true)
        cancelAnimationFrame(raf)
        return
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
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
