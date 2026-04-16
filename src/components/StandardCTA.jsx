import { Link } from 'react-router-dom'

const baseClasses =
  'menu nav-cta mt2-btn font-bold relative overflow-hidden no-underline cursor-pointer inline-flex items-center justify-center rounded-[5vw] px-[2vw] py-[1vw] leading-none text-center'

const variants = {
  primary:
    'bg-[#FFD074] border-none text-text-primary',
  outline:
    'bg-transparent border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/5',
  /** Dark pill + cyan edge glow — size via className where used */
  tech:
    'bg-[#0c1218]/95 border border-cyan-400/45 text-white uppercase tracking-[0.14em] sm:tracking-[0.16em] shadow-[inset_0_0_0_1px_rgba(34,211,238,0.1),0_0_24px_rgba(34,211,238,0.14)] hover:border-cyan-300/65 hover:shadow-[0_0_32px_rgba(34,211,238,0.22)] transition-[border-color,box-shadow] duration-300',
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
