import { cn } from '../../lib/utils'

const SIZE_CLASS = {
  xs: 'h-8 w-8',
  sm: 'h-10 w-10',
  md: 'h-14 w-14',
  lg: 'h-20 w-20',
  xl: 'h-24 w-24',
  '2xl': 'h-28 w-28 sm:h-32 sm:w-32',
}

const FRAME_SIZE_CLASS = {
  sm: 'h-12 w-12',
  md: 'h-16 w-16',
  lg: 'h-20 w-20',
  xl: 'h-24 w-24',
  '2xl': 'h-28 w-28 sm:h-32 sm:w-32',
}

/** Bold lavender / rose / peach plate + color wash. */
export function ContextualIconThemeLayers() {
  return (
    <>
      <div className="ensemble-icon-theme-plate" aria-hidden />
      <div className="ensemble-icon-theme-overlay" aria-hidden />
    </>
  )
}

/** Neon icon art only — theme layers live on the parent frame or PopArt card. */
export default function ContextualIcon({
  icon,
  size = 'md',
  fill = true,
  decorative = false,
  className,
}) {
  if (!icon?.src) return null

  const isBlend = icon.variant === 'blend'

  return (
    <img
      src={icon.src}
      alt={decorative ? '' : icon.alt ?? ''}
      aria-hidden={decorative || undefined}
      loading="lazy"
      decoding="async"
      className={cn(
        'ensemble-contextual-icon',
        isBlend ? 'ensemble-contextual-icon--native' : 'ensemble-contextual-icon--blend',
        fill
          ? 'ensemble-contextual-icon--fill h-full w-full'
          : [SIZE_CLASS[size] ?? SIZE_CLASS.md, 'shrink-0 object-contain'],
        className,
      )}
    />
  )
}

/** Themed tile — site gradient plate + wash, then icon art on top. */
export function ContextualIconFrame({ size = 'md', className, children, blend = false, ...props }) {
  return (
    <div
      {...props}
      className={cn(
        'ensemble-contextual-icon-frame',
        blend
          ? 'ensemble-contextual-icon-frame--blend overflow-visible rounded-none'
          : 'ensemble-contextual-icon-frame--themed overflow-hidden rounded-2xl',
        FRAME_SIZE_CLASS[size] ?? FRAME_SIZE_CLASS.md,
        className,
      )}
    >
      {!blend ? <ContextualIconThemeLayers /> : null}
      <div className="ensemble-contextual-icon-shell relative h-full w-full">{children}</div>
    </div>
  )
}

/** Icon + frame with variant-aware styling. */
export function ContextualIconTile({ icon, size = 'md', decorative = true, className, ...props }) {
  if (!icon?.src) return null

  const blend = icon.variant === 'blend'

  return (
    <ContextualIconFrame size={size} className={className} blend={blend} {...props}>
      <ContextualIcon icon={icon} decorative={decorative} />
    </ContextualIconFrame>
  )
}
