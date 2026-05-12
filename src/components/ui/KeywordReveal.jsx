import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../../lib/utils'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Influx-style keyword reveal: emphasis segments clip-slide up; plain text inline.
 * @param {{ text: string, emphasis?: boolean }[]} segments
 * @param {{ className?: string, triggerImmediately?: boolean, as?: 'p' | 'div' }} props
 */
function KeywordReveal({ segments, className = '', triggerImmediately = false, as: Tag = 'p' }) {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const inners = root.querySelectorAll('[data-keyword-reveal-inner]')
    if (!inners.length) return

    if (prefersReducedMotion()) {
      gsap.set(inners, { yPercent: 0 })
      return undefined
    }

    gsap.set(inners, { yPercent: 110 })

    const run = () => {
      gsap.to(inners, {
        yPercent: 0,
        duration: 0.62,
        stagger: 0.09,
        ease: 'power3.out',
        onComplete: () => {
          try {
            ScrollTrigger.refresh()
          } catch (e) {
            /* noop */
          }
        },
      })
    }

    if (triggerImmediately) {
      const t = window.setTimeout(run, 380)
      return () => window.clearTimeout(t)
    }

    const st = ScrollTrigger.create({
      trigger: root,
      start: 'top 88%',
      once: true,
      onEnter: run,
    })

    return () => {
      st.kill()
    }
  }, [segments, triggerImmediately])

  return (
    <Tag ref={rootRef} className={className}>
      {segments.map((s, i) => {
        if (s.emphasis) {
          return (
            <span
              key={`${i}-${s.text}`}
              className="keyword-reveal-mask mx-0.5 inline-block overflow-hidden align-baseline first:ml-0"
            >
              <span
                data-keyword-reveal-inner
                className="keyword-reveal-emphasis inline-block font-semibold leading-[inherit] tracking-tight"
              >
                {s.text}
              </span>
            </span>
          )
        }
        return (
          <span key={`${i}-${s.text}`} className="keyword-reveal-plain">
            {s.text}
          </span>
        )
      })}
    </Tag>
  )
}

export default KeywordReveal
