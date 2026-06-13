/**
 * Site-wide primary CTA look — horizontal pink → coral gradient, flat pill, white label (+ optional thin →).
 * Inspired by high-conversion marketing CTAs (vibrant but controlled).
 */

/** Editorial Fraunces label on pills (pairs with `ensemble-editorial-type.css`). */
export const ensembleCtaType = 'ensemble-cta font-display font-medium'

/** Stable hook for CTA typography rules (survives Tailwind class order). */
export const ensembleCtaAttr = { 'data-ensemble-cta': '' }

/** Core gradient fill — no heavy shadow (flat); stops from CSS vars site-wide. */
export const growthGradientFill =
  'bg-gradient-to-r from-[color:var(--color-growth-from)] to-[color:var(--color-growth-to)] shadow-none border-0'

/** Primary clickable base (Link / button). */
export const growthPrimaryBase =
  `inline-flex items-center justify-center rounded-full ${ensembleCtaType} text-white ${growthGradientFill} ` +
  'transition-[opacity,transform] duration-200 ease-out ' +
  'hover:opacity-[0.94] active:scale-[0.99] ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/45 focus-visible:ring-offset-2 focus-visible:ring-offset-white'

/** Hero primary: text + thin arrow on one flat pill. */
export const growthPrimaryHero =
  `${growthPrimaryBase} group min-h-[48px] w-full justify-between gap-4 px-6 py-3 pl-7 pr-5 text-base xs:w-auto sm:min-h-[52px] sm:px-8 sm:py-3.5 sm:pl-9 sm:pr-6 sm:text-lg`

/** Trailing arrow slot — pair with `growthPrimaryHero` (matches `HeroScrollExpand` mobile CTAs). */
export const growthHeroCtaArrow =
  'shrink-0 pl-1 text-xl font-light leading-none opacity-95'

/** Sticky nav primary — same editorial CTA type as hero pills. */
export const growthPrimaryNav =
  `inline-flex items-center justify-center rounded-full ${ensembleCtaType} text-white ${growthGradientFill} ` +
  'transition-[opacity,transform] duration-200 ease-out ' +
  'hover:opacity-[0.94] active:scale-[0.99] ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/45 focus-visible:ring-offset-2 focus-visible:ring-offset-white ' +
  'min-h-[48px] px-6 py-2.5 text-sm sm:min-h-[52px] sm:px-8 sm:py-3 sm:text-base'

/** Section `StandardCTA` primary / tech — same gradient, comfortable padding. */
export const growthPrimaryStandard =
  `${growthPrimaryBase} min-h-[48px] px-8 py-3 text-base text-center normal-case`

/** Secondary / ghost on dark: glass ring (not gradient). */
export const growthSecondaryBase =
  'inline-flex items-center justify-center rounded-full ensemble-cta font-display font-medium ' +
  'border border-white/28 bg-white/[0.06] text-white/95 backdrop-blur-sm ' +
  'transition-[background-color,border-color,opacity] duration-200 ' +
  'hover:border-white/40 hover:bg-white/[0.12] ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-growth-to)]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-white'

export const growthSecondaryHero =
  `${growthSecondaryBase} min-h-[48px] w-full px-6 py-3 text-base xs:w-auto sm:min-h-[52px] sm:px-8 sm:text-lg`

export const growthSecondaryStandard =
  `${growthSecondaryBase} min-h-[48px] px-8 py-3 text-base text-center normal-case`

/** UI `<Button>` primary — matches gradient system. */
export const growthButtonPrimary = growthPrimaryBase
