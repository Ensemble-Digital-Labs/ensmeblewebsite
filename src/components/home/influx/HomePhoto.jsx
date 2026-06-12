import { cn } from '../../../lib/utils'

/**
 * Responsive marketing photo — Influx-style cover with optional gradient legibility.
 */
export function HomePhoto({
  src,
  alt = '',
  className,
  objectPosition = 'center',
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
}) {
  if (!src) return null
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      sizes={sizes}
      className={cn('h-full w-full object-cover', className)}
      style={{ objectPosition }}
    />
  )
}

export function HomePhotoCover({
  src,
  alt = '',
  className,
  objectPosition = 'center',
  overlay = 'bottom',
  priority = false,
  children,
}) {
  const overlayClass =
    overlay === 'full'
      ? 'bg-gradient-to-t from-[#050816]/95 via-[#050816]/35 to-[#050816]/15'
      : overlay === 'left'
        ? 'bg-gradient-to-r from-[#050816]/92 via-[#050816]/45 to-transparent'
        : 'bg-gradient-to-t from-[#050816]/92 via-[#050816]/25 to-transparent'

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <HomePhoto
        src={src}
        alt={alt}
        objectPosition={objectPosition}
        priority={priority}
        className="absolute inset-0 scale-[1.02] transition-transform duration-700 group-hover:scale-105 motion-reduce:group-hover:scale-100"
      />
      <div className={cn('pointer-events-none absolute inset-0', overlayClass)} aria-hidden />
      {children ? <div className="relative z-[1]">{children}</div> : null}
    </div>
  )
}
