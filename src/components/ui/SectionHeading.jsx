function SectionHeading({
  title,
  subtitle,
  align = 'center',
  className = '',
  invert = false,
}) {
  const alignStyles = {
    center: 'text-center',
    left: 'text-left',
    right: 'text-right',
  }

  return (
    <div className={`${alignStyles[align]} ${className}`}>
      {subtitle && (
        <p
          className={`font-mono text-xs uppercase tracking-[0.22em] mb-4 font-semibold transition-colors duration-300 ${
            invert ? 'text-white/65' : 'text-text-secondary'
          }`}
        >
          {subtitle}
        </p>
      )}
      <h2
        className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight transition-colors duration-300 ${
          invert ? 'text-white' : 'text-text-primary'
        }`}
      >
        {title}
      </h2>
    </div>
  )
}

export default SectionHeading
