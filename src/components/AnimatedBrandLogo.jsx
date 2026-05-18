import { brandLogo } from '../lib/branding'

/**
 * Ensemble Digital Labs lockup with optional ambient motion (CSS only; respects reduced motion).
 * `variant` picks asset + size: nav (wordmark flips for light vs dark backdrop; menu overlay), footer (PNG), loader (dark UI).
 */
function AnimatedBrandLogo({
  variant = 'nav',
  className = '',
  imgClassName = '',
  priority = false,
  /** When true with `variant="nav"`, use light wordmark for dark fullscreen menu overlay. */
  useDarkUiLockup = false,
  /** When true with `variant="nav"` (menu closed): light wordmark SVG for dark hero / home atmosphere. */
  navBackdropIsDark = false,
  /** Use `""` when a parent link already has `aria-label` (avoids duplicate announcements). */
  imgAlt,
}) {
  const isFooter = variant === 'footer'
  const src = isFooter
    ? brandLogo.fullOnLight
    : variant === 'nav'
      ? useDarkUiLockup || navBackdropIsDark
        ? brandLogo.fullOnDark
        : brandLogo.fullOnLightCanvas
      : brandLogo.fullOnDark

  const sizeClasses =
    variant === 'footer'
      ? 'h-9 sm:h-10 w-auto max-w-[200px]'
      : variant === 'loader'
        ? 'h-[4.5rem] sm:h-24 md:h-28 lg:h-32 w-auto max-w-[min(94vw,440px)]'
        : variant === 'transition'
          ? 'h-14 sm:h-16 md:h-20 w-auto max-w-[min(85vw,320px)]'
          : 'h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 w-auto max-w-[min(78vw,560px)]'

  const motionClass =
    variant === 'footer'
      ? 'brand-logo--footer'
      : variant === 'nav' && !useDarkUiLockup && !navBackdropIsDark
        ? 'brand-logo--nav-light'
        : 'brand-logo--motion'

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
