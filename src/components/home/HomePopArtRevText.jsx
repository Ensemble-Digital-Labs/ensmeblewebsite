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
}) {
  return (
    <Tag className={cn('home-popart-rev-wrap block', className)}>
      <span
        className="home-popart-rev-text home-popart-rev-text--hidden block"
        data-rev-delay={String(delay)}
      >
        {children}
      </span>
    </Tag>
  )
}
