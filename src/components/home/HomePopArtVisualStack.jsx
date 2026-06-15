import { cn } from '../../lib/utils'
import { HomePhoto } from './influx/HomePhoto'
import { ContextualIconThemeLayers } from '../ui/ContextualIcon'

/** Layered image collage — PopArt web-design section visual column. */
export default function HomePopArtVisualStack({
  main,
  overlayTop,
  overlayBottom,
  alt = '',
  className,
}) {
  if (!main?.src) return null

  return (
    <div className={cn('home-popart-visual-stack relative mx-auto w-full max-w-md lg:max-w-none', className)}>
      <div
        data-home-popart-layer="main"
        className={cn(
          'home-popart-visual-stack__main relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/[0.12] shadow-[0_32px_80px_-40px_rgba(0,0,0,0.65)] sm:rounded-3xl lg:aspect-[5/6] lg:min-h-[420px]',
          main.knockoutWhite && 'home-popart-visual-stack__main--knockout bg-[#0a1228]',
        )}
      >
        <HomePhoto
          src={main.src}
          alt={alt || main.alt || ''}
          objectPosition={main.position ?? '50% 22%'}
          sizes="(max-width: 1024px) 90vw, 42vw"
          priority={false}
          className={cn(
            'transition-transform duration-700 hover:scale-[1.04] motion-reduce:hover:scale-100',
            main.fit === 'contain'
              ? 'object-contain p-8 sm:p-10 lg:p-12'
              : 'object-cover',
            main.knockoutWhite && 'home-popart-visual-stack__knockout-img mix-blend-multiply',
          )}
        />
        {!main.knockoutWhite ? (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050816]/35 via-transparent to-[#050816]/10" aria-hidden />
        ) : null}
      </div>

      {overlayTop?.src ? (
        <div
          data-home-popart-layer="top"
          className={cn(
            'home-popart-visual-stack__card home-popart-visual-stack__card--top aspect-square overflow-hidden rounded-xl',
            overlayTop.fit === 'cover'
              ? overlayTop.variant === 'blend'
                ? 'home-popart-visual-stack__card--blend'
                : 'home-popart-visual-stack__card--contextual'
              : 'border border-white/[0.12] bg-white/[0.04] shadow-[0_20px_50px_-24px_rgba(0,0,0,0.75)]',
            overlayTop.fit === 'cover' && overlayTop.knockoutWhite && 'home-popart-visual-stack__card--graphic',
          )}
        >
          {overlayTop.variant === 'blend' ? null : <ContextualIconThemeLayers />}
          <HomePhoto
            src={overlayTop.src}
            alt={overlayTop.alt ?? ''}
            objectPosition={overlayTop.position ?? '50% 50%'}
            sizes="180px"
            className={cn(
              'ensemble-contextual-icon ensemble-contextual-icon--fill h-full w-full',
              overlayTop.variant === 'blend'
                ? 'ensemble-contextual-icon--native'
                : 'ensemble-contextual-icon--blend',
              overlayTop.fit !== 'cover' && 'object-contain p-2 sm:p-3',
            )}
          />
        </div>
      ) : null}

      {overlayBottom?.src ? (
        <div
          data-home-popart-layer="bottom"
          className={cn(
            'home-popart-visual-stack__card home-popart-visual-stack__card--bottom aspect-square overflow-hidden rounded-xl',
            overlayBottom.fit === 'cover'
              ? overlayBottom.variant === 'blend'
                ? 'home-popart-visual-stack__card--blend'
                : 'home-popart-visual-stack__card--contextual'
              : 'border border-white/[0.12] bg-white/[0.04] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.8)]',
            overlayBottom.fit === 'cover' && overlayBottom.knockoutWhite && 'home-popart-visual-stack__card--graphic',
          )}
        >
          {overlayBottom.variant === 'blend' ? null : <ContextualIconThemeLayers />}
          <HomePhoto
            src={overlayBottom.src}
            alt={overlayBottom.alt ?? ''}
            objectPosition={overlayBottom.position ?? '50% 50%'}
            sizes="220px"
            className={cn(
              'ensemble-contextual-icon ensemble-contextual-icon--fill h-full w-full',
              overlayBottom.variant === 'blend'
                ? 'ensemble-contextual-icon--native'
                : 'ensemble-contextual-icon--blend',
              overlayBottom.fit !== 'cover' && 'object-contain p-2.5 sm:p-3.5',
            )}
          />
        </div>
      ) : null}
    </div>
  )
}
