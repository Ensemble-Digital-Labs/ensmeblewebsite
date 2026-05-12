import { Link } from 'react-router-dom'
import {
  growthPrimaryStandard,
  growthSecondaryStandard,
} from '../lib/growthCtaClasses'

const variants = {
  /** Warm gradient pill (same as former “tech” — unified system). */
  primary: growthPrimaryStandard,
  tech: growthPrimaryStandard,
  outline: growthSecondaryStandard,
}

/**
 * Routed CTA links — gradient primary / glass secondary; single label (no duplicate hover lines).
 */
function StandardCTA({ to, children, variant = 'primary', showRipple = false, className = '', id }) {
  const variantClasses = variants[variant] ?? variants.primary

  return (
    <Link
      to={to}
      id={id}
      className={`inline-flex cursor-pointer items-center justify-center no-underline ${variantClasses} ${className}`}
      data-discover="true"
    >
      {typeof children === 'string' ? <span>{children}</span> : children}
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
