import { useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { HOME_NARRATIVE_SECTIONS } from '../../lib/homeNarrativeSections'
import { cn, scrollMainToTarget } from '../../lib/utils'
import { useHomeStory } from './HomeStoryViewport'

/**
 * Floating chapter rail for home `/`: syncs with `HomeStoryViewport` deck index.
 */
export default function HomeSectionIndex() {
  const story = useHomeStory()
  const location = useLocation()

  const activeSlug =
    story?.narrative?.[story.visualSlideIndex]?.id ?? HOME_NARRATIVE_SECTIONS[0]?.id ?? ''

  const onJump = useCallback(
    (id) => {
      if (story?.goToSlideById) {
        void story.goToSlideById(id)
        return
      }
      const el = document.getElementById(id)
      if (!el) return
      scrollMainToTarget(el)
    },
    [story],
  )

  if (location.pathname !== '/') return null

  return (
    <nav
      aria-label="Homepage story sections"
      className={cn(
        'pointer-events-none fixed z-[24]',
        'right-[max(0.75rem,env(safe-area-inset-right))]',
        'top-1/2 -translate-y-1/2',
      )}
    >
      <div className="pointer-events-auto flex flex-col items-end gap-0.5 pr-0.5">
        <p className="mb-2 hidden text-[9px] font-semibold uppercase tracking-[0.22em] text-white/35 sm:block">
          Scroll
        </p>
        <ol className="flex flex-col items-end gap-0.5 sm:gap-1">
          {HOME_NARRATIVE_SECTIONS.map((section, idx) => {
            const num = String(idx + 1).padStart(2, '0')
            const active = section.id === activeSlug
            return (
              <li key={section.id}>
                <button
                  type="button"
                  title={section.label}
                  aria-label={`Jump to chapter ${idx + 1}: ${section.label}`}
                  aria-current={active ? 'step' : undefined}
                  onClick={() => onJump(section.id)}
                  className={cn(
                    'group flex min-h-[42px] min-w-[42px] items-center justify-end gap-2 rounded-xl py-2 pl-3 pr-3 text-right transition-colors sm:min-h-0 sm:min-w-0 sm:rounded-full sm:py-1 sm:pr-4',
                    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300/80',
                    active
                      ? 'bg-white/[0.08] text-white'
                      : 'text-white/40 hover:bg-white/[0.05] hover:text-white/72',
                  )}
                >
                  <span className="hidden max-w-[6.75rem] pt-px text-[9px] font-semibold uppercase leading-tight tracking-wide text-white/45 lg:inline">
                    {section.label}
                  </span>
                  <span
                    className={cn(
                      'font-display text-[10px] font-bold tabular-nums tracking-[0.14em] sm:text-[11px]',
                      active ? 'text-cyan-200' : 'text-white/40 group-hover:text-cyan-200/90',
                    )}
                  >
                    {num}
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}
