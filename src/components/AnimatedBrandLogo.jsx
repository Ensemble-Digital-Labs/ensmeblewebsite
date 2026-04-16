import { brandLogo } from '../lib/branding'

/**
 * Ensemble Digital Labs lockup with optional ambient motion (CSS only; respects reduced motion).
 * `variant` picks asset + size: nav (dark UI), footer (light PNG), loader/transition (large).
 */
function AnimatedBrandLogo({
  variant = 'nav',
  className = '',
  imgClassName = '',
  priority = false,
  /** Use `""` when a parent link already has `aria-label` (avoids duplicate announcements). */
  imgAlt,
}) {
  const isLight = variant === 'footer'
  const src = isLight ? brandLogo.fullOnLight : brandLogo.fullOnDark

  const sizeClasses =
    variant === 'footer'
      ? 'h-9 sm:h-10 w-auto max-w-[200px]'
      : variant === 'loader' || variant === 'transition'
        ? 'h-14 sm:h-16 md:h-20 w-auto max-w-[min(85vw,320px)]'
        : 'h-8 sm:h-9 md:h-10 w-auto max-w-[min(42vw,240px)]'

  const motionClass =
    variant === 'footer' ? 'brand-logo--footer' : 'brand-logo--motion'

  return (
    <span
      className={`brand-logo-wrap inline-flex items-center justify-center ${motionClass} ${className}`.trim()}
    >
      <img
        src={src}
        alt={imgAlt !== undefined ? imgAlt : brandLogo.alt}
        width={320}
        height={120}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        className={`brand-logo-img block w-auto object-contain object-left ${sizeClasses} ${imgClassName}`.trim()}
      />
    </span>
  )
}

export default AnimatedBrandLogo
