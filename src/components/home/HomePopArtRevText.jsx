import { cn } from '../../lib/utils'

/**
 * PopArt rev-text pattern — overflow clip + slide-up when `.temp-hide` is removed.
 * @see popwebdesign.net: `.rev-text-wrap` > `.rev-text.temp-hide`
 */
export default function HomePopArtRevText({
  children,
  as: Tag = 'span',
  className,
  delay = 0,
  headline = false,
}) {
  return (
    <Tag className={cn('home-popart-rev-wrap block', className)}>
      <span
        className={cn(
          'home-popart-rev-text home-popart-rev-text--hidden block',
          headline && 'home-popart-rev-text--headline',
        )}
        data-rev-delay={String(delay)}
      >
        {children}
      </span>
    </Tag>
  )
}
