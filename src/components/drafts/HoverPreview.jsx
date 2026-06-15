/**
 * DRAFT — not imported by production routes yet.
 * Design note: documents/design-notes/hover-preview-interaction.md
 *
 * Hoverable inline links → floating preview card (image + title + subtitle).
 * Adapt tokens/copy before use on Ensemble (see design note).
 */
import { useState, useCallback, useRef, useEffect } from 'react'

/** @typedef {{ image: string, title: string, subtitle: string }} PreviewItem */

/** @type {Record<string, PreviewItem>} Replace with Ensemble content when integrating */
const previewData = {
  figma: {
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=560&h=320&fit=crop',
    title: 'Figma',
    subtitle: 'Collaborative interface design tool',
  },
  sketch: {
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=560&h=320&fit=crop',
    title: 'Sketch',
    subtitle: 'Vector design toolkit for Mac',
  },
  adobe: {
    image: 'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=560&h=320&fit=crop',
    title: 'Adobe XD',
    subtitle: 'Design, prototype, and share experiences',
  },
}

function HoverLink({ previewKey, children, onHoverStart, onHoverMove, onHoverEnd }) {
  return (
    <span
      className="hover-link"
      onMouseEnter={(e) => onHoverStart(previewKey, e)}
      onMouseMove={onHoverMove}
      onMouseLeave={onHoverEnd}
    >
      {children}
    </span>
  )
}

function PreviewCard({ data, position, isVisible, cardRef }) {
  if (!data) return null

  return (
    <div
      ref={cardRef}
      className={`preview-card ${isVisible ? 'visible' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div className="preview-card-inner">
        <img
          src={data.image}
          alt={data.title}
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          className="preview-card-image"
        />
        <div className="preview-card-title">{data.title}</div>
        <div className="preview-card-subtitle">{data.subtitle}</div>
      </div>
    </div>
  )
}

/** Demo page — mount on a dev route only when testing */
export default function HoverPreview() {
  const [activePreview, setActivePreview] = useState(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    Object.values(previewData).forEach((data) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.src = data.image
    })
  }, [])

  const updatePosition = useCallback((e) => {
    const cardWidth = 300
    const cardHeight = 250
    const offsetY = 20

    let x = e.clientX - cardWidth / 2
    let y = e.clientY - cardHeight - offsetY

    if (x + cardWidth > window.innerWidth - 20) {
      x = window.innerWidth - cardWidth - 20
    }
    if (x < 20) x = 20
    if (y < 20) y = e.clientY + offsetY

    setPosition({ x, y })
  }, [])

  const handleHoverStart = useCallback(
    (key, e) => {
      setActivePreview(previewData[key] ?? null)
      setIsVisible(true)
      updatePosition(e)
    },
    [updatePosition],
  )

  const handleHoverMove = useCallback(
    (e) => {
      if (isVisible) updatePosition(e)
    },
    [isVisible, updatePosition],
  )

  const handleHoverEnd = useCallback(() => {
    setIsVisible(false)
  }, [])

  return (
    <>
      <style>{`
        .hover-preview-container {
          min-height: 100vh;
          background: #0a0a0a;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
          overflow-x: hidden;
          position: relative;
        }
        .grid-background {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background-image:
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .content-container {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 900px;
        }
        .text-block {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          line-height: 1.6;
          color: #71717a;
          font-weight: 400;
          letter-spacing: -0.02em;
        }
        .text-block p { margin-bottom: 1.5em; }
        .hover-link {
          color: #ffffff;
          font-weight: 700;
          cursor: pointer;
          position: relative;
          display: inline-block;
        }
        .hover-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #2dd4bf, #e5c158);
          transition: width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .hover-link:hover::after { width: 100%; }
        .preview-card {
          position: fixed;
          pointer-events: none;
          z-index: 1000;
          opacity: 0;
          transform: translateY(10px) scale(0.95);
          transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .preview-card.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .preview-card-inner {
          background: rgba(26, 26, 26, 0.9);
          border-radius: 16px;
          padding: 8px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1);
          overflow: hidden;
          backdrop-filter: blur(10px);
        }
        .preview-card-image {
          width: 288px;
          height: auto;
          border-radius: 12px;
          display: block;
        }
        .preview-card-title {
          padding: 12px 8px 8px;
          font-size: 0.875rem;
          color: #ffffff;
          font-weight: 600;
        }
        .preview-card-subtitle {
          padding: 0 8px 8px;
          font-size: 0.75rem;
          color: #71717a;
        }
        @media (max-width: 768px) {
          .preview-card-image { width: 240px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .preview-card { transition: none; }
          .hover-link::after { transition: none; }
        }
      `}</style>

      <div className="hover-preview-container">
        <div className="grid-background" aria-hidden />
        <div className="content-container">
          <div className="text-block">
            <p>
              Explore{' '}
              <HoverLink
                previewKey="figma"
                onHoverStart={handleHoverStart}
                onHoverMove={handleHoverMove}
                onHoverEnd={handleHoverEnd}
              >
                Figma
              </HoverLink>{' '}
              for collaborative interface design and real-time prototyping.
            </p>
            <p>
              For Mac-native design try{' '}
              <HoverLink
                previewKey="sketch"
                onHoverStart={handleHoverStart}
                onHoverMove={handleHoverMove}
                onHoverEnd={handleHoverEnd}
              >
                Sketch
              </HoverLink>{' '}
              or create complete experiences with{' '}
              <HoverLink
                previewKey="adobe"
                onHoverStart={handleHoverStart}
                onHoverMove={handleHoverMove}
                onHoverEnd={handleHoverEnd}
              >
                Adobe XD
              </HoverLink>
              .
            </p>
          </div>
        </div>
        <PreviewCard
          data={activePreview}
          position={position}
          isVisible={isVisible}
          cardRef={cardRef}
        />
      </div>
    </>
  )
}
