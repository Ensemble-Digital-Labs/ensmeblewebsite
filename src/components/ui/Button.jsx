import {
  growthButtonPrimary,
  growthSecondaryBase,
} from '../../lib/growthCtaClasses'

function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-full transition-[opacity,transform] duration-200 ease-out focus:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none'

  const sizes = {
    sm: 'min-h-[40px] px-5 py-2 text-sm',
    md: 'min-h-[48px] px-8 py-3 text-base',
    lg: 'min-h-[52px] px-10 py-4 text-lg',
  }

  const variants = {
    primary: `${growthButtonPrimary} text-white hover:opacity-[0.94] active:scale-[0.99] focus-visible:ring-white/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]`,
    secondary:
      'bg-white text-brand-primary shadow-none border-0 hover:bg-white/95 focus-visible:ring-brand-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
    outline: `${growthSecondaryBase} shadow-none focus-visible:ring-[color:var(--color-growth-to)]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]`,
    ghost:
      'border border-transparent text-brand-primary hover:bg-brand-primary/10 focus-visible:ring-brand-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary',
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      data-variant={variant}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
