import { cn } from '../../lib/utils'

export default function HomeDeckSectionShell({
  id,
  ariaLabel,
  className,
  bleed,
  children,
  viewportBand,
  bandAlign = 'center',
  deckFrame,
  deckInnerOverflowVisible,
  fullBleedBackdrop,
  stacked = false,
}) {
  const pinnedChapter = deckFrame && !stacked

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      data-home-chapter={id}
      className={cn(
        'relative w-full scroll-mt-[5rem]',
        viewportBand && !pinnedChapter && 'flex min-h-[100svh] min-h-[100dvh] flex-col',
        pinnedChapter && 'flex min-h-0 flex-1 flex-shrink-0 flex-col overflow-hidden',
        stacked && 'border-b border-white/[0.06] py-10 last:border-b-0 md:py-14',
        bleed ? 'overflow-visible px-4 sm:px-6' : 'overflow-x-clip px-5 sm:px-8',
        fullBleedBackdrop && 'overflow-x-clip overflow-y-visible',
        className,
      )}
    >
      {fullBleedBackdrop}
      <div
        className={cn(
          'home-deck-section-inner relative z-10 mx-auto w-full max-w-6xl',
          bleed && 'max-w-[min(100%,76rem)]',
          viewportBand && !pinnedChapter && bandAlign === 'center' && 'my-auto w-full',
          viewportBand &&
            !pinnedChapter &&
            bandAlign === 'start' &&
            'w-full pt-[clamp(1.25rem,4vh,3rem)] sm:pt-[clamp(1.5rem,5vh,3.5rem)] md:pt-[clamp(2rem,6vh,4rem)]',
          pinnedChapter &&
            cn(
              'my-0 flex min-h-0 w-full flex-1 flex-col overflow-x-hidden',
              deckInnerOverflowVisible ? 'overflow-y-visible' : 'overflow-y-auto',
            ),
          stacked && 'w-full',
        )}
      >
        {children}
      </div>
    </section>
  )
}
