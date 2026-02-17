import { useEffect, useRef } from 'react'
import * as PIXI from 'pixi.js'
import { prefersReducedMotion } from '../lib/utils'

function PixiParticlesBackground() {
  const containerRef = useRef(null)
  const appRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const container = containerRef.current
    if (!container) return

    // Create PIXI application
    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x000000,
      backgroundAlpha: 0,
      antialias: true,
      resolution: Math.min(window.devicePixelRatio, 2),
    })

    container.appendChild(app.view)
    appRef.current = app

    // Create particles
    const particleCount = 50
    const particles = []

    for (let i = 0; i < particleCount; i++) {
      const graphics = new PIXI.Graphics()
      graphics.beginFill(0x0ea5e9, 0.4)
      graphics.drawCircle(0, 0, 2)
      graphics.endFill()

      graphics.x = Math.random() * app.screen.width
      graphics.y = Math.random() * app.screen.height
      graphics.vx = (Math.random() - 0.5) * 0.5
      graphics.vy = (Math.random() - 0.5) * 0.5

      app.stage.addChild(graphics)
      particles.push(graphics)
    }

    // Animation loop
    app.ticker.add(() => {
      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > app.screen.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > app.screen.height) particle.vy *= -1
      })
    })

    // Handle resize
    const handleResize = () => {
      app.renderer.resize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (appRef.current) {
        appRef.current.destroy(true, { children: true, texture: true })
        if (container.contains(appRef.current.view)) {
          container.removeChild(appRef.current.view)
        }
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  )
}

export default PixiParticlesBackground
