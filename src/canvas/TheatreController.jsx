import { useEffect, useRef } from 'react'
import { getProject } from '@theatre/core'
import { prefersReducedMotion } from '../lib/utils'

/**
 * Theatre.js controller for animation timelines
 * This is optional and can be toggled on/off
 */
function TheatreController({ enabled = false }) {
  const projectRef = useRef(null)
  const sheetRef = useRef(null)

  useEffect(() => {
    if (!enabled || prefersReducedMotion()) return

    // Initialize Theatre.js project
    const project = getProject('Ensemble Digital Labs Animations')
    projectRef.current = project

    const sheet = project.sheet('Main Timeline')
    sheetRef.current = sheet

    // Example: Create a simple animation sequence
    // You can expand this to control any animations in your app
    const obj = sheet.object('Hero Animation', {
      opacity: 0,
      y: 30,
    })

    // Play animation
    sheet.sequence.play({ iterationCount: 1 })

    // Cleanup
    return () => {
      if (projectRef.current) {
        projectRef.current.ready.then(() => {
          // Cleanup if needed
        })
      }
    }
  }, [enabled])

  // This component doesn't render anything visible
  return null
}

export default TheatreController
