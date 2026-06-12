import * as THREE from 'three'
import { buildHelixParticleData } from './homeDnaHelix'
import { createHomeDnaIntroMaterial, HOME_DNA_PARTICLE_COLORS } from './dnaParticleCore'
import { easeHomeDnaIntro, getHomeDnaIntroProgress } from './homeDnaIntro'

function lerp(a, b, t) {
  return a + (b - a) * t
}

function seeded01(index, salt = 0) {
  const x = Math.sin((index + 1) * 127.1 + salt * 311.7) * 43758.5453
  return x - Math.floor(x)
}

/** Pre-intro cloud — same side as target helix, spread across viewport height. */
function buildScatterPositions(positions, w, h) {
  const count = positions.length / 3
  const scatter = new Float32Array(positions.length)

  for (let i = 0; i < count; i += 1) {
    const hx = positions[i * 3]
    const hy = positions[i * 3 + 1]
    const isLeft = hx < w * 0.5
    const spreadX = w * (0.06 + seeded01(i, 21) * 0.32)
    scatter[i * 3] = isLeft ? spreadX : w - spreadX
    scatter[i * 3 + 1] = hy + (seeded01(i, 22) - 0.5) * h * 0.62
    scatter[i * 3 + 2] = (seeded01(i, 23) - 0.5) * 2.2
  }

  return scatter
}

function applyHelixDataToGeometry(geometry, data, scatter) {
  geometry.setAttribute('position', new THREE.BufferAttribute(data.positions, 3))
  geometry.setAttribute('uv', new THREE.BufferAttribute(data.uvs, 2))
  geometry.setAttribute('randoms', new THREE.BufferAttribute(data.randoms, 1))
  geometry.setAttribute('colorRandoms', new THREE.BufferAttribute(data.colorRandoms, 1))
  geometry.setAttribute('edgeHighlights', new THREE.BufferAttribute(data.edgeHighlights, 1))
  geometry.setAttribute('scatter', new THREE.BufferAttribute(scatter, 3))
}

function updateHelixPositions(geometry, data) {
  const attr = geometry.attributes.position
  if (attr.count * 3 !== data.positions.length) {
    return false
  }
  attr.array.set(data.positions)
  attr.needsUpdate = true
  return true
}

function updateCamera(camera, w, h) {
  camera.left = 0
  camera.right = w
  camera.top = 0
  camera.bottom = -h
  camera.near = -20
  camera.far = 20
  camera.position.set(0, 0, 5)
  camera.updateProjectionMatrix()
}

/**
 * Curvy helix path + DNA-style particles with scatter → chain intro.
 */
export function createHomeDnaWebgl(width, height, docHeight) {
  const scene = new THREE.Scene()

  const camera = new THREE.OrthographicCamera(0, width, 0, -height, -20, 20)
  updateCamera(camera, width, height)

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
    premultipliedAlpha: true,
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)
  renderer.autoClear = false

  const palette = {
    ...HOME_DNA_PARTICLE_COLORS,
    opacity: 0.94,
    sizeScale: 1.05,
  }

  const material = createHomeDnaIntroMaterial(THREE, palette)
  const helixData = buildHelixParticleData(width, docHeight, height, 0)
  const scatter = buildScatterPositions(helixData.positions, width, height)
  const geometry = new THREE.BufferGeometry()
  applyHelixDataToGeometry(geometry, helixData, scatter)

  const points = new THREE.Points(geometry, material)
  scene.add(points)

  return {
    scene,
    camera,
    renderer,
    points,
    material,
    geometry,
    layoutKey: `${width}x${height}x${docHeight}`,
    viewW: width,
    viewH: height,
    disposables: [geometry, material],
  }
}

export function renderHomeDnaWebgl(ctx, {
  time = 0,
  deltaMs = 16.67,
  sectionTop = 0,
  docHeight,
  viewHeight,
  viewWidth,
}) {
  if (!ctx) return

  const { scene, material, geometry, camera, renderer } = ctx
  const w = Math.max(viewWidth ?? window.innerWidth, 1)
  const h = Math.max(viewHeight, 1)
  const doc = Math.max(docHeight, h)
  const deltaSeconds = Math.min(deltaMs / 1000, 0.05)

  const layoutKey = `${w}x${h}x${doc}`
  if (ctx.layoutKey !== layoutKey) {
    const data = buildHelixParticleData(w, doc, h, time)
    const scatter = buildScatterPositions(data.positions, w, h)
    applyHelixDataToGeometry(geometry, data, scatter)
    ctx.layoutKey = layoutKey
    ctx.viewW = w
    ctx.viewH = h
  } else {
    const data = buildHelixParticleData(w, doc, h, time)
    if (!updateHelixPositions(geometry, data)) {
      const scatter = buildScatterPositions(data.positions, w, h)
      applyHelixDataToGeometry(geometry, data, scatter)
    }
  }

  if (!ctx.pose) ctx.pose = { sectionTop }
  const blend = 1 - Math.exp(-deltaSeconds * 8)
  ctx.pose.sectionTop = lerp(ctx.pose.sectionTop, sectionTop, blend)

  const introEase = easeHomeDnaIntro(getHomeDnaIntroProgress())
  const baseOpacity = w < 768 ? 0.9 : 0.94

  material.uniforms.u_sectionTop.value = ctx.pose.sectionTop
  material.uniforms.u_intro.value = introEase
  material.uniforms.u_morph.value = 1 - introEase
  material.uniforms.u_opacity.value = baseOpacity * introEase

  renderer.clear(true, true, true)
  renderer.render(scene, camera)
}

export function resizeHomeDnaWebgl(ctx, width, height, docHeight) {
  if (!ctx) return
  updateCamera(ctx.camera, width, height)
  ctx.renderer.setSize(width, height)
  const data = buildHelixParticleData(width, docHeight, height, 0)
  const scatter = buildScatterPositions(data.positions, width, height)
  applyHelixDataToGeometry(ctx.geometry, data, scatter)
  ctx.layoutKey = `${width}x${height}x${docHeight}`
  ctx.viewW = width
  ctx.viewH = height
}

export function disposeHomeDnaWebgl(ctx) {
  if (!ctx) return
  ctx.disposables.forEach((d) => d.dispose?.())
  ctx.renderer?.dispose?.()
}
