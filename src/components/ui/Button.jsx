function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none'
  
  const variants = {
    primary: 'bg-brand-primary text-white hover:bg-interactive-hover hover:shadow-lg hover:shadow-brand-primary/20 hover:-translate-y-0.5 focus:ring-brand-primary active:translate-y-0',
    secondary: 'bg-text-secondary text-text-primary hover:bg-text-muted hover:shadow-lg hover:-translate-y-0.5 focus:ring-text-secondary active:translate-y-0',
    outline: 'border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:bg-opacity-10 hover:shadow-lg hover:shadow-brand-primary/10 hover:-translate-y-0.5 focus:ring-brand-primary active:translate-y-0',
    ghost: 'text-brand-primary hover:bg-brand-primary hover:bg-opacity-10 hover:-translate-y-0.5 focus:ring-brand-primary active:translate-y-0',
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }
  
  return (
    <button
      className={`btn-rainbow ${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      data-variant={variant}
      {...props}
    >
      <span className="btn-rainbow-inner">{children}</span>
    </button>
  )
}

export default Button
