function SectionHeading({ 
  title, 
  subtitle, 
  align = 'center',
  className = '' 
}) {
  const alignStyles = {
    center: 'text-center',
    left: 'text-left',
    right: 'text-right',
  }

  return (
    <div className={`${alignStyles[align]} ${className}`}>
      {subtitle && (
        <p className="text-sm uppercase tracking-wider text-text-secondary mb-4 font-medium transition-colors duration-300">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight transition-colors duration-300">
        {title}
      </h2>
    </div>
  )
}

export default SectionHeading
