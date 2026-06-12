/**
 * Shared DNA double-helix sampling + canvas drawing for the home page.
 * Modular vertical stacking keeps smooth, curvy strands through the full scroll.
 */

export const HOME_DNA_HELICES = [
  {
    cx: 0.06,
    cxDrift: 0.068,
    cxWave: 0.046,
    cxWave2: 0.022,
    y0: -0.06,
    y1: 1.06,
    amp: 0.082,
    turns: 2.35,
    phase: 0.35,
    axisTilt: 0.32,
    planeRoll: 0.18,
    axisSway: 0.92,
    weight: 0.78,
    rungEvery: 2,
    nodeEvery: 4,
  },
  {
    cx: 0.94,
    cxDrift: -0.068,
    cxWave: 0.048,
    cxWave2: 0.024,
    y0: -0.06,
    y1: 1.06,
    amp: 0.086,
    turns: 2.28,
    phase: 2.05,
    axisTilt: -0.32,
    planeRoll: -0.16,
    axisSway: 0.88,
    weight: 0.95,
    rungEvery: 2,
    nodeEvery: 3,
  },
]

const AMBIENT_BUBBLES = Array.from({ length: 16 }, (_, i) => ({
  x: 0.07 + ((i * 0.173) % 0.86),
  y: (i * 0.143) % 1,
  r: 0.014 + (i % 4) * 0.005,
  phase: i * 1.45,
  tone: i % 3,
}))

export function helixSegmentCount(docHeight) {
  return Math.min(360, Math.max(144, Math.round(docHeight / 10)))
}

function moduleSpan(viewHeight) {
  return 1.16 * Math.max(viewHeight, 640)
}

function sampleDoubleHelix(config, w, docHeight, viewHeight, time, segments) {
  const {
    cx,
    y0,
    y1,
    amp,
    turns,
    phase,
    rungEvery = 2,
    cxDrift = 0,
    cxWave = 0,
    cxWave2 = 0,
    axisTilt = 0,
    planeRoll = 0,
    axisSway = 0,
    modules = 1,
  } = config
  const strandA = []
  const strandB = []
  const rungs = []
  const ampPx = amp * Math.min(w, viewHeight)
  const yStart = y0 * docHeight
  const yEnd = y1 * docHeight
  const axisLen = yEnd - yStart
  const spin = time * 0.00004
  const swayScale = Math.min(w, viewHeight) * 0.048
  /* Weave amplitude — curvy like before, but oscillates so strands never run off-screen */
  const leanBase = Math.min(w * 0.2, viewHeight * 0.26)

  const ax = Math.sin(axisTilt)
  const ay = Math.cos(axisTilt)
  const px = -ay
  const py = ax
  const moduleTurns = Math.max(1, modules)

  for (let i = 0; i <= segments; i += 1) {
    const t = i / segments
    const wavePhase = t * Math.PI * 2.35 + phase + time * 0.00022
    const driftX =
      (cxDrift * Math.sin(t * Math.PI * moduleTurns * 0.9 + phase * 0.6) +
        cxWave * Math.sin(wavePhase + t * Math.PI * moduleTurns * 0.55) +
        cxWave2 * Math.sin(t * Math.PI * 4.8 * moduleTurns + phase * 1.3 + time * 0.00016)) *
      w
    const weavePrimary = Math.sin(t * Math.PI * 2 * moduleTurns * 0.82 + phase)
    const weaveSecondary =
      Math.sin(t * Math.PI * 2 * moduleTurns * 1.55 + phase * 1.35 + time * 0.0001) * 0.42
    const weaveEnvelope = Math.sin(t * Math.PI * moduleTurns * 0.62 + phase * 0.45) * 0.34
    const curveLean = ax * leanBase * (weavePrimary * 0.68 + weaveSecondary + weaveEnvelope)
    const axisX = cx * w + curveLean + driftX
    const axisSwayY =
      Math.sin(t * Math.PI * 1.55 * moduleTurns + phase * 0.85 + time * 0.00018) * axisSway * swayScale +
      Math.sin(t * Math.PI * 3.1 * moduleTurns + phase * 1.6) * axisSway * 0.38 * swayScale
    const axisY = yStart + ay * axisLen * t + axisSwayY
    const theta = t * turns * Math.PI * 2 + phase + spin

    const placeStrand = (angle) => {
      const localU = Math.cos(angle + planeRoll) * ampPx
      const localV = Math.sin(angle + planeRoll) * ampPx
      const x = axisX + px * localU + ax * localV * 0.58
      const y = axisY + py * localU + ay * localV * 0.58
      const z = Math.sin(angle)
      return { x, y, z, t }
    }

    const a = placeStrand(theta)
    const b = placeStrand(theta + Math.PI)
    strandA.push(a)
    strandB.push(b)

    if (i % rungEvery === 0) {
      rungs.push({ a, b, t, z: (a.z + b.z) * 0.5 })
    }
  }

  return { strandA, strandB, rungs }
}

/** Portrait/narrow viewports: drop axis lean so edge helices stay vertical (no V shape). */
export function resolveHelixConfig(config, viewportWidth, docHeight, viewHeight) {
  let axisTilt = config.axisTilt
  let planeRoll = config.planeRoll
  let cxDrift = config.cxDrift
  let cxWave = config.cxWave
  let cxWave2 = config.cxWave2 ?? 0
  let cx = config.cx

  if (viewportWidth < 1024) {
    const t =
      viewportWidth <= 480 ? 0 : Math.min(1, (viewportWidth - 480) / (1024 - 480))
    axisTilt = config.axisTilt * t
    planeRoll = config.planeRoll * t
    cxDrift = config.cxDrift * (0.4 + 0.6 * t)
    cxWave = config.cxWave * (0.45 + 0.55 * t)
    cxWave2 = cxWave2 * (0.45 + 0.55 * t)
  } else {
    /* Laptop+ — nudge both strands slightly inward (clear scroll rail, less edge-clipped) */
    const inset = viewportWidth >= 1280 ? 0.065 : 0.05
    cx = cx < 0.5 ? config.cx + inset : config.cx - inset
  }

  const modules = Math.max(1, docHeight / moduleSpan(viewHeight))

  return {
    ...config,
    cx,
    axisTilt,
    planeRoll,
    cxDrift,
    cxWave,
    cxWave2,
    modules,
    turns: config.turns * modules,
  }
}

function lerp3(a, b, t) {
  return a + (b - a) * t
}

function seeded01(index, salt = 0) {
  const x = Math.sin((index + 1) * 127.1 + salt * 311.7) * 43758.5453
  return x - Math.floor(x)
}

/** Document-space helix points for WebGL particle rendering (continuous strands + rungs). */
export function buildHelixParticleData(w, docHeight, viewHeight, time = 0) {
  const positions = []
  const uvs = []
  const randoms = []
  const colorRandoms = []
  const edgeHighlights = []
  let seed = 0

  const pushPoint = (x, y, z, u, colorBias, edge) => {
    positions.push(x, y, z)
    uvs.push(u, 0.5)
    randoms.push(0.82 + seeded01(seed, 1) * 0.18)
    colorRandoms.push(colorBias)
    edgeHighlights.push(edge)
    seed += 1
  }

  const pushStrand = (strand, colorBase) => {
    for (let i = 0; i < strand.length; i += 1) {
      const p = strand[i]
      pushPoint(p.x, p.y, p.z, p.t, colorBase, Math.max(0.45, p.z * 0.45 + 0.55))
      if (i < strand.length - 1) {
        const n = strand[i + 1]
        for (let s = 1; s <= 3; s += 1) {
          const mix = s / 4
          pushPoint(
            lerp3(p.x, n.x, mix),
            lerp3(p.y, n.y, mix),
            lerp3(p.z, n.z, mix),
            lerp3(p.t, n.t, mix),
            colorBase,
            Math.max(0.45, lerp3(p.z, n.z, mix) * 0.45 + 0.55),
          )
        }
      }
    }
  }

  HOME_DNA_HELICES.forEach((config) => {
    const resolved = resolveHelixConfig(config, w, docHeight, viewHeight)
    if (resolved.weight < 0.4) return

    const segments = helixSegmentCount(docHeight)
    const { strandA, strandB, rungs } = sampleDoubleHelix(
      resolved,
      w,
      docHeight,
      viewHeight,
      time,
      segments,
    )

    pushStrand(strandA, 0.42 + seeded01(seed, 2) * 0.18)
    pushStrand(strandB, 0.42 + seeded01(seed, 3) * 0.18)

    rungs.forEach((rung) => {
      const steps = 16
      for (let m = 0; m <= steps; m += 1) {
        const mix = m / steps
        pushPoint(
          lerp3(rung.a.x, rung.b.x, mix),
          lerp3(rung.a.y, rung.b.y, mix),
          rung.z,
          rung.t,
          0.78 + seeded01(seed, 4) * 0.2,
          0.72,
        )
      }
    })
  })

  return {
    count: positions.length / 3,
    positions: new Float32Array(positions),
    uvs: new Float32Array(uvs),
    randoms: new Float32Array(randoms),
    colorRandoms: new Float32Array(colorRandoms),
    edgeHighlights: new Float32Array(edgeHighlights),
  }
}

function centerFade(x, w) {
  const edge = Math.max(x / w, 1 - x / w)
  if (edge > 0.38) return 1
  if (edge > 0.22) return 0.55 + ((edge - 0.22) / 0.16) * 0.45
  return 0.42 + (edge / 0.22) * 0.13
}

function depthAlpha(z, weight = 1, x = 0, w = 1) {
  const front = 0.48 + (z + 1) * 0.32
  return Math.max(0.16, Math.min(1, front * weight * centerFade(x, w)))
}

function inViewport(docY, sectionTop, viewH, margin = 220) {
  const screenY = sectionTop + docY
  return screenY >= -margin && screenY <= viewH + margin
}

function toScreenPoint(p, sectionTop) {
  return { x: p.x, y: sectionTop + p.y, z: p.z }
}

function drawAmbientBubbles(ctx, w, h, docHeight, sectionTop, time) {
  const scale = Math.min(w, h)

  AMBIENT_BUBBLES.forEach((bubble) => {
    const docY =
      bubble.y * docHeight +
      Math.sin(time * 0.00014 + bubble.phase) * scale * 0.018 +
      Math.cos(time * 0.00009 + bubble.phase * 1.4) * scale * 0.012
    if (!inViewport(docY, sectionTop, h, 180)) return

    const x =
      bubble.x * w +
      Math.sin(time * 0.00011 + bubble.phase * 0.8) * w * 0.012
    const y = sectionTop + docY
    const r = bubble.r * scale * (1 + Math.sin(time * 0.00016 + bubble.phase) * 0.08)

    const inner =
      bubble.tone === 0
        ? 'rgba(120, 240, 255,'
        : bubble.tone === 1
          ? 'rgba(255, 160, 120,'
          : 'rgba(180, 150, 255,'
    const alpha = bubble.tone === 0 ? 0.09 : 0.07

    const glow = ctx.createRadialGradient(x, y, 0, x, y, r * 2.8)
    glow.addColorStop(0, `${inner} ${alpha})`)
    glow.addColorStop(0.55, `${inner} ${alpha * 0.35})`)
    glow.addColorStop(1, 'rgba(5, 8, 22, 0)')

    ctx.fillStyle = glow
    ctx.beginPath()
    ctx.arc(x, y, r * 2.8, 0, Math.PI * 2)
    ctx.fill()
  })
}

/** @returns {(opts: { w: number, h: number, docHeight: number, sectionTop: number, time: number }) => void} */
export function createHomeDnaRenderer(ctx) {
  ctx.lineJoin = 'round'

  const drawBackboneStrand = (strand, sectionTop, h, litAt, weight, w) => {
    let batch = []

    const strokeBatch = () => {
      if (batch.length < 2) {
        batch = []
        return
      }

      ctx.beginPath()
      ctx.moveTo(batch[0].x, batch[0].y)

      if (batch.length === 2) {
        ctx.lineTo(batch[1].x, batch[1].y)
      } else {
        for (let i = 1; i < batch.length - 1; i += 1) {
          const xc = (batch[i].x + batch[i + 1].x) * 0.5
          const yc = (batch[i].y + batch[i + 1].y) * 0.5
          ctx.quadraticCurveTo(batch[i].x, batch[i].y, xc, yc)
        }
        const last = batch[batch.length - 1]
        ctx.lineTo(last.x, last.y)
      }

      const mid = batch[Math.floor(batch.length / 2)]
      const lit = litAt(mid.x) * mid.alpha
      ctx.strokeStyle = `rgba(56, 225, 245, ${0.34 * lit + 0.1})`
      ctx.lineWidth = 1.35 + mid.alpha * 2.1
      ctx.lineCap = 'round'
      ctx.stroke()
      batch = []
    }

    for (let i = 0; i < strand.length; i += 1) {
      const p = strand[i]
      if (!inViewport(p.y, sectionTop, h)) {
        strokeBatch()
        continue
      }
      const screen = toScreenPoint(p, sectionTop)
      const alpha = depthAlpha(p.z, weight, screen.x, w)
      batch.push({ x: screen.x, y: screen.y, alpha })
    }

    strokeBatch()
  }

  const drawRung = (a, b, light, weight, w) => {
    const z = (a.z + b.z) * 0.5
    const midX = (a.x + b.x) * 0.5
    const alpha = depthAlpha(z, weight, midX, w) * light

    const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y)
    grad.addColorStop(0, `rgba(255, 140, 100, ${0.11 * alpha})`)
    grad.addColorStop(0.5, `rgba(56, 225, 245, ${0.42 * alpha})`)
    grad.addColorStop(1, `rgba(255, 140, 100, ${0.11 * alpha})`)

    ctx.strokeStyle = grad
    ctx.lineWidth = 1.05 + alpha * 0.9
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(a.x, a.y)
    ctx.lineTo(b.x, b.y)
    ctx.stroke()
  }

  const drawNode = (p, light, weight, scale, w) => {
    const alpha = depthAlpha(p.z, weight, p.x, w) * light
    if (alpha < 0.12) return

    const r = (0.008 + alpha * 0.011) * scale

    const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3.2)
    glow.addColorStop(0, `rgba(120, 240, 255, ${0.48 * alpha})`)
    glow.addColorStop(0.45, `rgba(34, 211, 238, ${0.28 * alpha})`)
    glow.addColorStop(1, 'rgba(5, 8, 22, 0)')

    ctx.fillStyle = glow
    ctx.beginPath()
    ctx.arc(p.x, p.y, r * 3.2, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = `rgba(220, 248, 255, ${0.72 * alpha})`
    ctx.beginPath()
    ctx.arc(p.x, p.y, r * 0.55, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = `rgba(18, 28, 58, ${0.72 * alpha})`
    ctx.beginPath()
    ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
    ctx.fill()
  }

  const drawHelix = (config, time, lightX, w, h, docHeight, sectionTop) => {
    const resolved = resolveHelixConfig(config, w, docHeight, h)
    const segments = helixSegmentCount(docHeight)
    const { strandA, strandB, rungs } = sampleDoubleHelix(resolved, w, docHeight, h, time, segments)
    const weight = resolved.weight ?? 1
    const nodeEvery = resolved.nodeEvery ?? 5
    const litAt = (x) => Math.max(0.32, 0.42 + ((lightX - x) / w) * 0.5)

    rungs
      .slice()
      .sort((r1, r2) => r1.z - r2.z)
      .forEach((rung) => {
        if (!inViewport(rung.a.y, sectionTop, h) && !inViewport(rung.b.y, sectionTop, h)) return
        const a = toScreenPoint(rung.a, sectionTop)
        const b = toScreenPoint(rung.b, sectionTop)
        const light = litAt((a.x + b.x) * 0.5)
        drawRung(a, b, light, weight, w)
      })

    drawBackboneStrand(strandA, sectionTop, h, litAt, weight, w)
    drawBackboneStrand(strandB, sectionTop, h, litAt, weight, w)

    if (weight < 0.4) return

    const nodes = []
    strandA.forEach((p, i) => {
      if (i % nodeEvery === 0) nodes.push(p)
    })
    strandB.forEach((p, i) => {
      if (i % nodeEvery === 0) nodes.push(p)
    })

    nodes
      .slice()
      .sort((a, b) => a.z - b.z)
      .forEach((p) => {
        if (!inViewport(p.y, sectionTop, h)) return
        const screen = toScreenPoint(p, sectionTop)
        drawNode(screen, litAt(screen.x), weight, Math.min(w, h), w)
      })
  }

  return ({ w, h, docHeight, sectionTop, time }) => {
    ctx.clearRect(0, 0, w, h)
    drawAmbientBubbles(ctx, w, h, docHeight, sectionTop, time)
    const lightX = w * 0.58

    HOME_DNA_HELICES.slice()
      .sort((a, b) => a.weight - b.weight)
      .forEach((helix) => drawHelix(helix, time, lightX, w, h, docHeight, sectionTop))
  }
}
