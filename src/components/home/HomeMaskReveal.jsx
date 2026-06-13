import { cn } from '../../lib/utils'

/**
 * PopArt-style masked line reveal — inner text slides up inside overflow clip.
 * @param {{ load?: boolean, delay?: number, as?: keyof JSX.IntrinsicElements }} props
 */
export default function HomeMaskReveal({
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
      className={cn('home-mask-reveal block', load && 'home-mask-reveal--load', className)}
      style={delay ? { '--home-mask-delay': `${delay}s` } : undefined}
      {...(load ? { 'data-home-mask-load': true } : { 'data-home-mask-reveal': true })}
      {...rest}
    >
      <span className={cn('home-mask-reveal__inner block', innerClassName)}>{children}</span>
    </Tag>
  )
}
