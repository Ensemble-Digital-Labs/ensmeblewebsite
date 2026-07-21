import { cn } from '../../lib/utils'
import { openContactOrb } from '../../lib/contactOrbOpen'
import {
  ensembleCtaAttr,
  growthHeroCtaArrow,
  growthPrimaryHero,
  growthPrimaryStandard,
  growthSecondaryStandard,
} from '../../lib/growthCtaClasses'

const VARIANT_CLASS = {
  primary: growthPrimaryStandard,
  tech: growthPrimaryStandard,
  hero: growthPrimaryHero,
  outline: growthSecondaryStandard,
}

/**
 * Button styled like a routed CTA — opens the contact orb (and optional form panel).
 */
export default function ContactOrbCtaButton({
  form = 'audit',
  variant = 'standard',
  className,
  children,
  showHeroArrow = false,
  ...rest
}) {
  const variantClass = VARIANT_CLASS[variant] ?? VARIANT_CLASS.primary

  return (
    <button
      type="button"
      {...ensembleCtaAttr}
      className={cn('inline-flex cursor-pointer items-center justify-center', variantClass, className)}
      onClick={() => openContactOrb(form)}
      {...rest}
    >
      {showHeroArrow && children != null ? (
        <>
          <span className="flex-1 text-center xs:text-left sm:text-center">{children}</span>
          <span className={growthHeroCtaArrow} aria-hidden>
            →
          </span>
        </>
      ) : (
        children
      )}
    </button>
  )
}
