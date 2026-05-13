import * as React from 'react'
import { motion } from 'framer-motion'
import { cn, prefersReducedMotion } from '@/lib/utils'

const curtainVariants = {
  visible: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  hidden: {
    clipPath: 'polygon(50% 0, 50% 0, 50% 100%, 50% 100%)',
    transition: {
      duration: 0.55,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

function useHoverCapable() {
  const [hoverCapable, setHoverCapable] = React.useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(hover: hover) and (pointer: fine)').matches
      : false
  )

  React.useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const onChange = () => setHoverCapable(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return hoverCapable
}

const CardCurtainRevealContext = React.createContext(undefined)

function useCardCurtainRevealContext() {
  const context = React.useContext(CardCurtainRevealContext)
  if (!context) {
    throw new Error(
      'useCardCurtainRevealContext must be used within a CardCurtainReveal component'
    )
  }
  return context
}

const CardCurtainReveal = React.forwardRef(
  ({ children, className, ...props }, ref) => {
    const hoverCapable = useHoverCapable()
    const reduceMotion = prefersReducedMotion()
    const forceReveal = reduceMotion || !hoverCapable

    const [pointerIn, setPointerIn] = React.useState(false)
    const [focusWithin, setFocusWithin] = React.useState(false)

    const isRevealed = forceReveal || pointerIn || focusWithin

    const handleBlur = React.useCallback((e) => {
      if (!e.currentTarget.contains(e.relatedTarget)) {
        setFocusWithin(false)
      }
    }, [])

    return (
      <CardCurtainRevealContext.Provider value={{ isRevealed, hoverCapable }}>
        <div
          ref={ref}
          className={cn(
            'relative flex min-h-0 flex-1 flex-col gap-2 overflow-hidden outline-none',
            hoverCapable &&
              'cursor-default transition-[box-shadow,transform] duration-300 ease-out hover:shadow-[0_0_28px_-8px_rgba(34,211,238,0.22)] motion-safe:hover:-translate-y-px',
            hoverCapable && 'focus-visible:ring-2 focus-visible:ring-teal-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]',
            className
          )}
          tabIndex={hoverCapable ? 0 : undefined}
          onMouseEnter={() => hoverCapable && setPointerIn(true)}
          onMouseLeave={() => setPointerIn(false)}
          onMouseDown={(e) => {
            // Hover-only reveal for mouse: avoid click-to-focus opening the curtain; Tab still focuses.
            if (!hoverCapable || e.button !== 0) return
            e.preventDefault()
          }}
          onFocusCapture={() => setFocusWithin(true)}
          onBlurCapture={handleBlur}
          {...props}
        >
          {children}
        </div>
      </CardCurtainRevealContext.Provider>
    )
  }
)
CardCurtainReveal.displayName = 'CardCurtainReveal'

const CardCurtainRevealFooter = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { isRevealed } = useCardCurtainRevealContext()

    return (
      <motion.div
        ref={ref}
        className={className}
        variants={curtainVariants}
        initial={false}
        animate={isRevealed ? 'visible' : 'hidden'}
        {...props}
      />
    )
  }
)
CardCurtainRevealFooter.displayName = 'CardCurtainRevealFooter'

const CardCurtainRevealBody = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('relative z-[1] flex min-h-0 flex-1 flex-col', className)}
        {...props}
      />
    )
  }
)
CardCurtainRevealBody.displayName = 'CardCurtainRevealBody'

const CardCurtainRevealTitle = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { isRevealed } = useCardCurtainRevealContext()

    return (
      <motion.h3
        ref={ref}
        className={className}
        initial={false}
        animate={isRevealed ? { y: 0 } : { y: 170 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        {...props}
      />
    )
  }
)
CardCurtainRevealTitle.displayName = 'CardCurtainRevealTitle'

const CardCurtain = React.forwardRef(({ className, ...props }, ref) => {
  const { isRevealed } = useCardCurtainRevealContext()

  return (
    <motion.div
      ref={ref}
      className={cn(
        'pointer-events-none absolute inset-0 z-0 size-full bg-gradient-to-br from-teal-400/12 via-transparent to-amber-400/5',
        className
      )}
      variants={curtainVariants}
      initial={false}
      animate={isRevealed ? 'visible' : 'hidden'}
      {...props}
    />
  )
})
CardCurtain.displayName = 'CardCurtain'

const CardCurtainRevealDescription = React.forwardRef(
  ({ className, detachUntilRevealed, ...props }, ref) => {
    const { isRevealed } = useCardCurtainRevealContext()

    return (
      <motion.div
        ref={ref}
        className={cn(
          'z-[1]',
          detachUntilRevealed && !isRevealed && 'pointer-events-none absolute inset-0 flex flex-col justify-end',
          detachUntilRevealed && isRevealed && 'relative mt-3 min-h-0 sm:mt-3.5',
          !detachUntilRevealed && 'relative',
          className
        )}
        variants={curtainVariants}
        initial={false}
        animate={isRevealed ? 'visible' : 'hidden'}
        {...props}
      />
    )
  }
)
CardCurtainRevealDescription.displayName = 'CardCurtainRevealDescription'

export {
  CardCurtainReveal,
  CardCurtainRevealBody,
  CardCurtainRevealFooter,
  CardCurtainRevealDescription,
  CardCurtainRevealTitle,
  CardCurtain,
  useCardCurtainRevealContext,
}
