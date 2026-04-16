import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Primary card surface — shadcn-style API + legacy `hover` prop used across Case Studies / Services.
 * Theme: Ensemble tokens (`bg-bg-card`, `text-text-*`).
 * Lowercase import path: `@/components/ui/card` → aliased in `vite.config.js` to this file.
 */
const Card = React.forwardRef(({ className, hover, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-lg border border-zinc-200/90 bg-bg-card text-text-primary shadow-sm dark:border-zinc-200/90 dark:bg-bg-card dark:text-text-primary',
      hover && 'transition-all duration-300',
      className
    )}
    {...props}
  />
))
Card.displayName = 'Card'

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-text-secondary', className)} {...props} />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
export default Card
