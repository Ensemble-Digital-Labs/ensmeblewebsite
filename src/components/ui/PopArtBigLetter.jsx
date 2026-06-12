import { cn } from '../../lib/utils'

/** First meaningful character from a heading — PopArt giant letter pattern. */
export function bigLetterFromTitle(title) {
  const trimmed = String(title ?? '').trim()
  if (!trimmed) return 'E'
  const match = trimmed.match(/[A-Za-z0-9]/)
  return match ? match[0].toUpperCase() : 'E'
}

/**
 * PopArt-style giant background letter — transparent at first, champagne gold fill on `.show`.
 * @see popwebdesign.net `.bigletter.animate-bigletter`
 */
export default function PopArtBigLetter({ letter, className, delay = 0 }) {
  const char = String(letter ?? 'E').charAt(0).toUpperCase()

  return (
    <span
      className={cn('popart-bigletter popart-bigletter--animate', className)}
      data-home-monogram
      data-bigletter-delay={String(delay)}
      style={{ '--popart-bigletter-delay': `${delay}s` }}
      aria-hidden
    >
      {char}
    </span>
  )
}
