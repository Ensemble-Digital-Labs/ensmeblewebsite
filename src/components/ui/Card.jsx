function Card({ children, className = '', hover = false }) {
  const baseStyles = 'bg-bg-card rounded-xl shadow-sm border border-gray-800 p-6 transition-all duration-300 ease-out focus-within:ring-2 focus-within:ring-brand-primary focus-within:ring-offset-2 focus-within:ring-offset-bg-primary focus-within:border-brand-primary'
  const hoverStyles = hover ? 'hover:shadow-lg hover:shadow-brand-primary/10 hover:-translate-y-1 hover:border-brand-primary/50' : ''
  
  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`} tabIndex={hover ? 0 : -1}>
      {children}
    </div>
  )
}

export default Card
