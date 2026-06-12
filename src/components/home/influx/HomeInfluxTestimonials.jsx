import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn, prefersReducedMotion } from '../../../lib/utils'
import { HomePhoto } from './HomePhoto'

function TestimonialSlide({ item, isActive }) {
  return (
    <article
      className={cn(
        'col-start-1 row-start-1 w-full transition-opacity duration-500 motion-reduce:transition-none',
        isActive ? 'relative z-[1] opacity-100' : 'pointer-events-none opacity-0',
      )}
      aria-hidden={!isActive}
    >
      <div className="mx-auto mb-6 h-20 w-20 overflow-hidden rounded-full bg-white/[0.06] ring-2 ring-cyan-400/40 sm:h-24 sm:w-24">
        <HomePhoto
          src={item.image}
          alt=""
          objectPosition={item.imagePosition ?? '50% 20%'}
          sizes="96px"
        />
      </div>
      <blockquote className="mx-auto max-w-3xl">
        <p className="text-lg font-medium leading-relaxed text-white/92 sm:text-xl md:text-2xl md:leading-snug">
          &ldquo;{item.quote}&rdquo;
        </p>
        <footer className="mt-6">
          <cite className="not-italic">
            <span className="block font-display text-base font-bold text-white">{item.author}</span>
            {item.role ? (
              <span className="mt-1 block text-sm text-white/55">{item.role}</span>
            ) : null}
          </cite>
        </footer>
      </blockquote>
    </article>
  )
}

export default function HomeInfluxTestimonials({ items }) {
  const list = items ?? []
  const [index, setIndex] = useState(0)
  const reduceMotion = prefersReducedMotion()
  const len = list.length
  const active = list[index] ?? list[0]

  const next = useCallback(() => {
    if (len < 1) return
    setIndex((i) => (i + 1) % len)
  }, [len])

  const prev = useCallback(() => {
    if (len < 1) return
    setIndex((i) => (i - 1 + len) % len)
  }, [len])

  useEffect(() => {
    if (reduceMotion || len < 2) return
    const id = window.setInterval(next, 7000)
    return () => window.clearInterval(id)
  }, [reduceMotion, len, next])

  if (!active) return null

  return (
    <div
      data-home-reveal
      className="home-influx-testimonials relative [overflow-anchor:none]"
      role="region"
      aria-label="Client testimonials"
      aria-live="polite"
    >
      <div className="flex items-center justify-center gap-4 sm:gap-6">
        <button
          type="button"
          onClick={prev}
          className="flex h-11 w-11 shrink-0 items-center justify-center self-center rounded-full border border-white/20 bg-white/[0.06] text-white transition-colors hover:border-white/40"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="min-w-0 flex-1">
          {/* All slides share one grid cell — height stays at tallest quote (no page jump). */}
          <div className="grid place-items-center">
            {list.map((item, i) => (
              <TestimonialSlide key={item.id} item={item} isActive={i === index} />
            ))}
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {list.map((t, i) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setIndex(i)}
                className={cn(
                  'h-2 w-2 rounded-full transition-colors',
                  i === index ? 'bg-cyan-400' : 'bg-white/25 hover:bg-white/40',
                )}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === index ? 'true' : undefined}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={next}
          className="flex h-11 w-11 shrink-0 items-center justify-center self-center rounded-full border border-white/20 bg-white/[0.06] text-white transition-colors hover:border-white/40"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
