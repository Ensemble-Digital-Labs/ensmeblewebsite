import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../lib/utils'

function MovingCircle() {
  const circleRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    if (prefersReducedMotion()) {
      document.body.style.cursor = 'auto'
      return
    }

    let mouseMoveHandler = null

    // Small delay to ensure DOM is ready
    const initTimer = setTimeout(() => {
      const circle = circleRef.current
      if (!circle) {
        console.error('MovingCircle: ref not found - keeping default cursor')
        document.body.style.cursor = 'auto'
        return
      }

      // Initialize position
      const updatePosition = (x, y) => {
        setMousePosition({ x, y })
        if (circle) {
          circle.style.left = `${x}px`
          circle.style.top = `${y}px`
        }
      }

      // Set initial position
      const initialX = window.innerWidth / 2
      const initialY = window.innerHeight / 2
      updatePosition(initialX, initialY)

      // Keep default cursor visible (like poppr)
      // document.body.style.cursor = 'none'
      console.log('MovingCircle: initialized at', initialX, initialY)

      mouseMoveHandler = (e) => {
        updatePosition(e.clientX, e.clientY)
      }

      window.addEventListener('mousemove', mouseMoveHandler)
    }, 200)

    return () => {
      clearTimeout(initTimer)
      if (mouseMoveHandler) {
        window.removeEventListener('mousemove', mouseMoveHandler)
      }
      document.body.style.cursor = 'auto'
    }
  }, [])

  if (prefersReducedMotion() || !mounted) {
    return null
  }

  return (
    <div
      ref={circleRef}
      className="moving-circle fixed pointer-events-none"
      style={{
        left: mousePosition.x || window.innerWidth / 2,
        top: mousePosition.y || window.innerHeight / 2,
        transform: 'translate(-50%, -50%)',
        zIndex: 999999,
        opacity: 1,
        width: '100px',
        height: '100px',
      }}
    >
      <div 
        className="colorOne absolute w-32 h-32 rounded-full" 
        style={{ 
          top: '50%', 
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      ></div>
      <div 
        className="colorTwo absolute w-32 h-32 rounded-full" 
        style={{ 
          top: '50%', 
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      ></div>
      <div 
        className="colorThree absolute w-32 h-32 rounded-full" 
        style={{ 
          top: '50%', 
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      ></div>
    </div>
  )
}

export default MovingCircle
