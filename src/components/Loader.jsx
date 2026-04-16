import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import AnimatedBrandLogo from './AnimatedBrandLogo'

function Loader({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const loader = document.querySelector('#loader')
    if (!loader) {
      // Loader element not found, just call onComplete
      if (onComplete) onComplete()
      return
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false)
        if (onComplete) onComplete()
      }
    })

    // Animate loader out
    tl.to('#loader', {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
    })
    .to('#loader', {
      display: 'none',
      duration: 0,
    }, '-=0.2')
  }, [onComplete])

  if (!isVisible) return null

  return (
    <div
      id="loader"
      className="fixed inset-0 z-[1000000] bg-bg-primary flex items-center justify-center"
    >
      <div className="text-center">
        <div className="mb-8 flex justify-center">
          <AnimatedBrandLogo variant="loader" />
        </div>
        <div className="w-16 h-12 mx-auto">
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-12 h-8 border-2 border-brand-primary rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loader
