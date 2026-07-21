import { growthButtonPrimary, ensembleCtaAttr } from '../../lib/growthCtaClasses'

function FormButton({
  children,
  type = 'submit',
  variant = 'primary',
  size = 'lg',
  isLoading = false,
  className = '',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center w-full transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none'

  const variants = {
    primary: `${growthButtonPrimary} text-white hover:opacity-[0.94] active:scale-[0.99] focus:ring-white/45 focus:ring-offset-2 focus:ring-offset-[#050816] rounded-full`,
    secondary:
      'ensemble-cta rounded-lg bg-text-secondary text-text-primary hover:bg-text-muted focus:ring-text-secondary',
    outline:
      'ensemble-cta rounded-lg border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:bg-opacity-10 focus:ring-brand-primary',
  }

  const sizes = {
    sm: 'min-h-[40px] px-5 py-2 text-sm',
    md: 'min-h-[48px] px-6 py-3 text-base',
    lg: 'min-h-[52px] px-8 py-4 text-lg',
  }

  return (
    <button
      type={type}
      {...(variant === 'primary' ? ensembleCtaAttr : {})}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Sending...
        </>
      ) : (
        children
      )}
    </button>
  )
}

export default FormButton
