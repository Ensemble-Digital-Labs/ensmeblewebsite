import { Link } from 'react-router-dom'
import {
  growthPrimaryStandard,
  growthPrimaryHero,
  growthHeroCtaArrow,
  growthSecondaryStandard,
  ensembleCtaAttr,
} from '../lib/growthCtaClasses'

const variants = {
  /** Warm gradient pill (same as former “tech” — unified system). */
  primary: growthPrimaryStandard,
  tech: growthPrimaryStandard,
  /** Same full-width / arrow treatment as hero mobile primary (`HeroScrollExpand`). */
  hero: growthPrimaryHero,
  outline: growthSecondaryStandard,
}

/**
 * Routed CTA links — gradient primary / glass secondary / hero gradient + arrow.
 */
function StandardCTA({ to, children, variant = 'primary', showRipple = false, className = '', id }) {
  const variantClasses = variants[variant] ?? variants.primary
  const isHero = variant === 'hero'

  const inner =
    isHero && children != null ? (
      <>
        <span className="flex-1 text-center xs:text-left sm:text-center">{children}</span>
        <span className={growthHeroCtaArrow} aria-hidden>
          →
        </span>
      </>
    ) : typeof children === 'string' ? (
      <span>{children}</span>
    ) : (
      children
    )

  return (
    <Link
      to={to}
      id={id}
      {...ensembleCtaAttr}
      className={`inline-flex cursor-pointer items-center justify-center no-underline ${variantClasses} ${className}`}
      data-discover="true"
    >
      {inner}
      {showRipple && (
        <>
          <div id="an-cir1" className="anim-circle" aria-hidden />
          <div id="an-cir2" className="anim-circle" aria-hidden />
        </>
      )}
    </Link>
  )
}

export default StandardCTA
