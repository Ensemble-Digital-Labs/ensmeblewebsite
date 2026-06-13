import { cn } from '../../lib/utils'

/**
 * Mono overline / bracket label with mask slide-up reveal (Lama Lama–inspired).
 * @param {{ load?: boolean, delay?: number, as?: keyof JSX.IntrinsicElements }} props
 */
export default function HomeMonoReveal({
  children,
  className,
  innerClassName,
  load = false,
  delay = 0,
  as: Tag = 'span',
  ...rest
}) {
  return (
    <Tag
      className={cn('home-mono-reveal home-mask-reveal block', load && 'home-mask-reveal--load', className)}
      style={delay ? { '--home-mask-delay': `${delay}s` } : undefined}
      {...(load ? { 'data-home-mask-load': true } : { 'data-home-mono-reveal': true })}
      {...rest}
    >
      <span
        className={cn(
          'home-mask-reveal__inner block font-mono text-[10px] font-medium uppercase tracking-[0.12em] sm:text-xs',
          innerClassName,
        )}
      >
        {children}
      </span>
    </Tag>
  )
}
