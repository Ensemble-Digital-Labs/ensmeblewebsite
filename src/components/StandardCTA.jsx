import { Link } from 'react-router-dom'

const baseClasses =
  'menu nav-cta mt2-btn font-bold relative overflow-hidden no-underline cursor-pointer inline-flex items-center justify-center rounded-[5vw] px-[2vw] py-[1vw] leading-none text-center'

const variants = {
  primary:
    'bg-[#FFD074] border-none text-text-primary',
  outline:
    'bg-transparent border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/5',
}

/**
 * Standardized CTA button: pill shape + text slide-up animation (initial text moves up, second line moves into place on hover).
 * Use across the site for consistent clickable CTAs.
 */
function StandardCTA({ to, children, variant = 'primary', showRipple = false, className = '', id }) {
  const label = typeof children === 'string' ? children : (children?.props?.children ?? 'Button')
  const variantClasses = variants[variant] ?? variants.primary

  return (
    <Link
      to={to}
      id={id}
      className={`${baseClasses} ${variantClasses} ${className}`}
      data-discover="true"
    >
      <span className="button-inner">
        <span className="button-inner-static initial">
          <p>{label}</p>
        </span>
        <span className="button-inner-hover hovered">
          <p>{label}</p>
        </span>
      </span>
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
