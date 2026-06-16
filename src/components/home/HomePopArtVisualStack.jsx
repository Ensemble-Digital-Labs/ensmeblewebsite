import { cn } from '../../lib/utils'
import { HomePhoto } from './influx/HomePhoto'
import { ContextualIconThemeLayers } from '../ui/ContextualIcon'

/** @param {{ overlay: object, slot: string, sizes?: string }} props */
function PopArtOverlayCard({ overlay, slot, sizes = '180px' }) {
  if (!overlay?.src) return null

  const isBlend = overlay.variant === 'blend'

  return (
    <div
      data-home-popart-layer={slot}
      className={cn(
        'home-popart-visual-stack__card',
        `home-popart-visual-stack__card--${slot}`,
        'aspect-square overflow-hidden rounded-xl',
        isBlend
          ? 'home-popart-visual-stack__card--blend'
          : 'border border-white/[0.12] bg-white/[0.04] shadow-[0_20px_50px_-24px_rgba(0,0,0,0.75)]',
        !isBlend && overlay.fit === 'cover' && overlay.knockoutWhite && 'home-popart-visual-stack__card--graphic',
      )}
    >
      <HomePhoto
        src={overlay.src}
        alt={overlay.alt ?? ''}
        objectPosition={overlay.position ?? '50% 50%'}
        sizes={sizes}
        className={cn(
          'ensemble-contextual-icon ensemble-contextual-icon--native h-full w-full object-contain',
          !isBlend && 'p-2 sm:p-3',
        )}
      />
    </div>
  )
}

/** Layered image collage — PopArt web-design section visual column. */
export default function HomePopArtVisualStack({
  main,
  overlayTop,
  overlayBottom,
  overlayLeft,
  overlayRight,
  alt = '',
  className,
}) {
  if (!main?.src) return null

  const isBlendMain = main.variant === 'blend'
  const isContextualMain = main.variant === 'contextual'
  const isIconMain = isBlendMain || isContextualMain

  return (
    <div
      className={cn(
        'home-popart-visual-stack relative mx-auto w-full max-w-[min(16rem,78vw)] sm:max-w-[min(17rem,70vw)] md:max-w-[min(18.5rem,52vw)] lg:max-w-none',
        className,
      )}
    >
      <div
        data-home-popart-layer="main"
        className={cn(
          'home-popart-visual-stack__main relative overflow-hidden rounded-2xl sm:rounded-3xl',
          isIconMain
            ? 'home-popart-visual-stack__main--icon aspect-square lg:aspect-square lg:min-h-0'
            : 'aspect-[4/5] border border-white/[0.12] shadow-[0_32px_80px_-40px_rgba(0,0,0,0.65)] lg:aspect-[5/6] lg:min-h-[420px]',
          isBlendMain && 'home-popart-visual-stack__main--blend-icon',
          isContextualMain && 'home-popart-visual-stack__main--contextual-icon',
          main.knockoutWhite && 'home-popart-visual-stack__main--knockout bg-[#0a1228]',
        )}
      >
        {isContextualMain ? <ContextualIconThemeLayers /> : null}
        <HomePhoto
          src={main.src}
          alt={alt || main.alt || ''}
          objectPosition={main.position ?? '50% 22%'}
          sizes={isIconMain ? '(max-width: 1024px) 72vw, 22rem' : '(max-width: 1024px) 90vw, 42vw'}
          priority={false}
          className={cn(
            'transition-transform duration-700 hover:scale-[1.02] motion-reduce:hover:scale-100',
            isBlendMain &&
              'ensemble-contextual-icon ensemble-contextual-icon--native h-full w-full object-contain p-6 sm:p-8 lg:p-10',
            isContextualMain &&
              'ensemble-contextual-icon ensemble-contextual-icon--fill ensemble-contextual-icon--blend h-full w-full object-cover',
            !isIconMain &&
              (main.fit === 'contain'
                ? 'absolute inset-0 object-contain p-4 sm:p-5 lg:p-6'
                : 'absolute inset-0 object-cover'),
            main.knockoutWhite && 'home-popart-visual-stack__knockout-img mix-blend-multiply',
          )}
        />
        {!main.knockoutWhite && !isIconMain ? (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050816]/35 via-transparent to-[#050816]/10" aria-hidden />
        ) : null}
      </div>

      <PopArtOverlayCard overlay={overlayTop} slot="top" sizes="180px" />
      <PopArtOverlayCard overlay={overlayBottom} slot="bottom" sizes="200px" />
      <PopArtOverlayCard overlay={overlayLeft} slot="left" sizes="150px" />
      <PopArtOverlayCard overlay={overlayRight} slot="right" sizes="150px" />
    </div>
  )
}
