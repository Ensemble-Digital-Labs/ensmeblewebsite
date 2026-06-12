import { cn } from '../../lib/utils'
import { HomePhoto } from './influx/HomePhoto'

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
        className="home-popart-visual-stack__main relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/[0.12] shadow-[0_32px_80px_-40px_rgba(0,0,0,0.65)] sm:rounded-3xl lg:aspect-[5/6] lg:min-h-[420px]"
      >
        <HomePhoto
          src={main.src}
          alt={alt || main.alt || ''}
          objectPosition={main.position ?? '50% 22%'}
          sizes="(max-width: 1024px) 90vw, 42vw"
          priority={false}
          className="transition-transform duration-700 hover:scale-[1.04] motion-reduce:hover:scale-100"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050816]/35 via-transparent to-[#050816]/10" aria-hidden />
      </div>

      {overlayTop?.src ? (
        <div
          data-home-popart-layer="top"
          className="home-popart-visual-stack__card home-popart-visual-stack__card--top overflow-hidden rounded-xl border border-white/[0.14] bg-white/[0.04] shadow-[0_20px_50px_-24px_rgba(0,0,0,0.75)]"
        >
          <HomePhoto
            src={overlayTop.src}
            alt=""
            objectPosition={overlayTop.position ?? '50% 30%'}
            sizes="180px"
            className="aspect-[16/10] h-full w-full object-cover"
          />
        </div>
      ) : null}

      {overlayBottom?.src ? (
        <div
          data-home-popart-layer="bottom"
          className="home-popart-visual-stack__card home-popart-visual-stack__card--bottom overflow-hidden rounded-xl border border-white/[0.14] bg-white/[0.04] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.8)]"
        >
          <HomePhoto
            src={overlayBottom.src}
            alt=""
            objectPosition={overlayBottom.position ?? '50% 20%'}
            sizes="220px"
            className="aspect-[3/4] h-full w-full object-cover"
          />
        </div>
      ) : null}
    </div>
  )
}
