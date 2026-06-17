import { cn } from '../../lib/utils'

/**
 * Visible, on-brand backdrop art — navy / rose–coral growth accents.
 * Use `tone="light"` on #FAFAFA sections, `tone="dark"` on charcoal / #050711 bands.
 */
export function ParallaxThemedBackdrop({ tone = 'light' }) {
  if (tone === 'dark') {
    return (
      <>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#050816_0%,#0a1628_42%,#060b14_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_95%_55%_at_50%_-18%,rgba(233,78,119,0.16),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_95%_85%,rgba(234,88,12,0.09),transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_5%_55%,rgba(244,114,182,0.09),transparent_58%)]" />
        <div
          className="absolute inset-0 opacity-[0.32]"
          style={{
            backgroundImage: `linear-gradient(rgba(244,114,182,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(30,58,95,0.05)_1px,transparent_1px)`,
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/28 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-growth-from/18 to-transparent opacity-70" />
      </>
    )
  }

  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-[#f4f9fb] to-bg-secondary/95" />
      <div className="absolute -top-20 left-[8%] h-[min(400px,44vh)] w-[min(440px,58vw)] rounded-full bg-amber-400/[0.16] blur-3xl" />
      <div className="absolute top-[28%] right-0 h-[min(300px,38vh)] w-[min(340px,42vw)] rounded-full bg-orange-400/[0.09] blur-3xl" />
      <div className="absolute bottom-0 left-[20%] h-[min(220px,28vh)] w-[min(520px,72vw)] rounded-full bg-brand-primary/[0.09] blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.6]"
        style={{
          backgroundImage: 'radial-gradient(rgba(15,23,42,0.07) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `linear-gradient(rgba(233,78,119,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(241,114,69,0.03)_1px,transparent_1px)`,
          backgroundSize: '56px 56px',
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
    </>
  )
}

/** Stronger y% = more obvious separation vs background */
const VARIANT_Y = {
  subtle: { '1': '34', '2': '12' },
  default: { '1': '48', '2': '19' },
  strong: { '1': '62', '2': '26' },
}

/**
 * Two-layer scroll parallax (background vs content) with Locomotive `#main` + `mountParallaxLayerStacks`.
 * Set `scrollLayerParallax={false}` for full-viewport bands where global `yPercent` on layer 2 fights
 * other scroll-linked motion or clips against `overflow-hidden`.
 */
export function ParallaxDepth({
  className,
  layer1ClassName,
  layer1,
  variant = 'default',
  tone = 'light',
  scrollLayerParallax = true,
  /** Rely on global `HomeAtmosphereCanvas` + starfield — no local backdrop art. */
  transparentBackdrop = false,
  children,
}) {
  const y = VARIANT_Y[variant] ?? VARIANT_Y.default

  const backdrop = transparentBackdrop ? null : (layer1 ?? <ParallaxThemedBackdrop tone={tone} />)

  if (!scrollLayerParallax) {
    return (
      <div className={cn('relative isolate w-full', className)}>
        <div
          className={cn(
            'pointer-events-none absolute inset-0 z-0 min-h-full overflow-hidden [transform:translateZ(0)]',
            layer1ClassName
          )}
          aria-hidden
        >
          {backdrop}
        </div>
        <div className="relative z-[1] min-h-0 [transform:translateZ(0)]">{children}</div>
      </div>
    )
  }

  return (
    <div data-parallax-layers className={cn('relative isolate w-full', className)}>
      <div
        data-parallax-layer="1"
        data-parallax-y={y['1']}
        className={cn(
          'pointer-events-none absolute inset-0 z-0 min-h-full overflow-hidden [transform:translateZ(0)]',
          layer1ClassName
        )}
        aria-hidden
      >
        {backdrop}
      </div>
      <div
        data-parallax-layer="2"
        data-parallax-y={y['2']}
        className="relative z-[1] min-h-0 [transform:translateZ(0)]"
      >
        {children}
      </div>
    </div>
  )
}
