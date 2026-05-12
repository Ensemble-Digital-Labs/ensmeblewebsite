import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { prefersReducedMotion } from '../lib/utils'

const EARTH_TEXTURE_PATH = '/assets/images/earth-day-2048.jpg'

/** Gold (#c9a227) toward violet — matches site accent */
function goldToVioletForNx(nx) {
  const t = THREE.MathUtils.clamp(nx * 0.5 + 0.5, 0, 1)
  return {
    r: THREE.MathUtils.lerp(0.79, 0.72, t),
    g: THREE.MathUtils.lerp(0.64, 0.22, t),
    b: THREE.MathUtils.lerp(0.15, 0.96, t),
  }
}

function fibonacciDirections(n) {
  const dirs = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y = n > 1 ? 1 - (i / (n - 1)) * 2 : 0
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = golden * i
    dirs.push(
      new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).normalize()
    )
  }
  return dirs
}

/**
 * UV for a unit direction — matches THREE.SphereGeometry default mapping
 * (see three.js SphereGeometry: x = -cos(phi)sin(theta), z = sin(phi)sin(theta), uvs use 1 - iy/h).
 */
function dirToTextureUV(dir) {
  const u = Math.atan2(dir.z, -dir.x) / (2 * Math.PI) + 0.5
  const v = 1 - Math.acos(THREE.MathUtils.clamp(dir.y, -1, 1)) / Math.PI
  return [u, v]
}

/** Uniform random point on unit sphere (better than cycling fibonacci for rejection sampling). */
function randomUnitDirection() {
  const u = Math.random()
  const v = Math.random()
  const theta = 2 * Math.PI * u
  const phi = Math.acos(2 * v - 1)
  const sinP = Math.sin(phi)
  return new THREE.Vector3(
    sinP * Math.cos(theta),
    Math.cos(phi),
    sinP * Math.sin(theta)
  )
}

function isOceanPixel(r, g, b, lum) {
  const blueLean = b - Math.max(r, g) * 0.92
  if (blueLean > 22 && lum < 118) return true
  if (lum < 48) return true
  if (lum < 62 && blueLean > 8) return true
  return false
}

/**
 * Digital dots hugging the sphere “skin” — sampled from the same Earth texture so
 * points align with geography (land vs ocean contrast).
 */
function buildSurfaceDotsFromTexture(texture, radius, landTarget, oceanSparse) {
  const img = texture.image
  if (!img || !img.width) return null

  const w = Math.min(4096, img.naturalWidth || img.width)
  const h = Math.min(2048, img.naturalHeight || img.height)
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  ctx.drawImage(img, 0, 0, w, h)
  const data = ctx.getImageData(0, 0, w, h).data

  const sample = (u, v) => {
    const x = Math.floor(THREE.MathUtils.clamp(u, 0, 1) * (w - 1))
    const y = Math.floor(THREE.MathUtils.clamp(1 - v, 0, 1) * (h - 1))
    const i = (y * w + x) * 4
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    return { r, g, b, lum: (r + g + b) / 3 }
  }

  const skin = 1.0012
  const positions = []
  const colors = []
  let tries = 0
  const maxTries = 480000

  while (positions.length / 3 < landTarget && tries < maxTries) {
    tries++
    const u = randomUnitDirection()
    const [tu, tv] = dirToTextureUV(u)
    const { lum, r, g, b } = sample(tu, tv)
    if (isOceanPixel(r, g, b, lum)) continue
    if (lum < 58 && Math.random() > 0.25) continue
    const n = u.clone().multiplyScalar(radius * skin)
    positions.push(n.x, n.y, n.z)
    const gcol = goldToVioletForNx(u.x)
    const boost = THREE.MathUtils.clamp((lum - 35) / 110, 0.45, 1.35)
    colors.push(
      (gcol.r * 0.42 + (r / 255) * 0.58) * boost,
      (gcol.g * 0.42 + (g / 255) * 0.58) * boost,
      (gcol.b * 0.42 + (b / 255) * 0.58) * boost
    )
  }

  tries = 0
  while (positions.length / 3 < landTarget + oceanSparse && tries < maxTries) {
    tries++
    const u = randomUnitDirection()
    const [tu, tv] = dirToTextureUV(u)
    const pix = sample(tu, tv)
    if (!isOceanPixel(pix.r, pix.g, pix.b, pix.lum)) continue
    if (Math.random() > 0.14) continue
    const n = u.clone().multiplyScalar(radius * skin)
    positions.push(n.x, n.y, n.z)
    const gcol = goldToVioletForNx(u.x)
    colors.push(gcol.r * 0.28, gcol.g * 0.32, gcol.b * 0.42)
  }

  const geom = new THREE.BufferGeometry()
  geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geom.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
  return geom
}

function buildOuterPlexus(radius) {
  const n = 68
  const nearestK = 2
  const minDirDot = 0.86
  const dirs = fibonacciDirections(n)
  const pts = dirs.map((d) => d.clone().multiplyScalar(radius))
  const edgeSet = new Set()
  for (let i = 0; i < n; i++) {
    const dists = []
    for (let j = 0; j < n; j++) {
      if (i === j) continue
      dists.push({ j, d: pts[i].distanceToSquared(pts[j]) })
    }
    dists.sort((a, b) => a.d - b.d)
    for (let t = 0; t < nearestK && t < dists.length; t++) {
      const j = dists[t].j
      if (dirs[i].dot(dirs[j]) < minDirDot) continue
      const a = Math.min(i, j)
      const b = Math.max(i, j)
      edgeSet.add(`${a},${b}`)
    }
  }

  const keptEdges = []
  edgeSet.forEach((key) => {
    const [ia, ib] = key.split(',').map(Number)
    const p = pts[ia]
    const q = pts[ib]
    const mid = p.clone().add(q).multiplyScalar(0.5).normalize()
    const voidField =
      Math.sin(mid.x * 2.6 + mid.y * 1.4) *
        Math.cos(mid.z * 2.2 + mid.x * 0.9) +
      Math.sin(mid.y * 3.1) * 0.45
    if (voidField < -0.32) return

    const patch = Math.sin(mid.x * 5.3 + mid.y * 4.1 + mid.z * 3.7)
    if (patch < -0.45) return

    const rip = Math.sin(mid.x * 9.2 + mid.y * 7.1) * Math.cos(mid.z * 8.4)
    if (rip < -0.72) return

    const h = (ia * 1103515245 + ib * 6620021 + 12345) >>> 0
    const thin = (h % 1000) / 1000
    if (thin > 0.22) return

    keptEdges.push(ia, ib)
  })

  const linePairs = []
  for (let e = 0; e < keptEdges.length; e += 2) {
    const ia = keptEdges[e]
    const ib = keptEdges[e + 1]
    const p = pts[ia]
    const q = pts[ib]
    linePairs.push(p.x, p.y, p.z, q.x, q.y, q.z)
  }

  const usedIdx = new Set()
  for (let e = 0; e < keptEdges.length; e += 2) {
    usedIdx.add(keptEdges[e])
    usedIdx.add(keptEdges[e + 1])
  }
  const lineColors = new Float32Array((linePairs.length / 3) * 3)
  for (let i = 0; i < linePairs.length; i += 6) {
    const mx =
      (linePairs[i] / radius + linePairs[i + 3] / radius) * 0.5
    const col = goldToVioletForNx(mx)
    for (let k = 0; k < 2; k++) {
      const o = i + k * 3
      lineColors[o] = col.r * 0.78 + 0.22
      lineColors[o + 1] = col.g * 0.78 + 0.22
      lineColors[o + 2] = col.b * 0.82 + 0.18
    }
  }

  const usedList = Array.from(usedIdx).sort((a, b) => a - b)
  const nu = usedList.length
  const nodeColors = new Float32Array(nu * 3)
  const nodePos = new Float32Array(nu * 3)
  for (let ii = 0; ii < nu; ii++) {
    const i = usedList[ii]
    const u = dirs[i]
    const lat = Math.asin(Math.max(-1, Math.min(1, u.y)))
    const tt = (lat + Math.PI / 2) / Math.PI
    const col = goldToVioletForNx(u.x)
    const lift = 0.88 + tt * 0.1
    nodeColors[ii * 3] = col.r * lift * 0.92 + 0.08
    nodeColors[ii * 3 + 1] = col.g * lift * 0.92 + 0.08
    nodeColors[ii * 3 + 2] = col.b * lift * 0.92 + 0.1
    nodePos[ii * 3] = pts[i].x
    nodePos[ii * 3 + 1] = pts[i].y
    nodePos[ii * 3 + 2] = pts[i].z
  }
  return { linePairs, lineColors, nodePos, nodeColors, n: nu }
}

/**
 * Flat plexus “net” in the XZ plane: concentric rings + spokes + crossing chords (tech horizon).
 */
function buildHorizonNetGeometry(radii, divisions) {
  const positions = []
  const colors = []
  const colIn = new THREE.Color(0xc9a227)
  const colOut = new THREE.Color(0xc084fc)
  const pushSeg = (x1, z1, x2, z2, c) => {
    positions.push(x1, 0, z1, x2, 0, z2)
    colors.push(c.r, c.g, c.b, c.r, c.g, c.b)
  }

  for (let ri = 0; ri < radii.length; ri++) {
    const r = radii[ri]
    const t = ri / Math.max(1, radii.length - 1)
    const c = colIn.clone().lerp(colOut, t)
    for (let i = 0; i < divisions; i++) {
      const a1 = (i / divisions) * Math.PI * 2
      const a2 = ((i + 1) / divisions) * Math.PI * 2
      pushSeg(Math.cos(a1) * r, Math.sin(a1) * r, Math.cos(a2) * r, Math.sin(a2) * r, c)
    }
  }

  const spokeStride = Math.max(1, Math.floor(divisions / 24))
  const rMin = radii[0]
  const rMax = radii[radii.length - 1]
  for (let i = 0; i < divisions; i += spokeStride) {
    const a = (i / divisions) * Math.PI * 2
    const c = colIn.clone().lerp(colOut, 0.55)
    pushSeg(Math.cos(a) * rMin, Math.sin(a) * rMin, Math.cos(a) * rMax, Math.sin(a) * rMax, c)
  }

  for (let ri = 0; ri < radii.length - 1; ri++) {
    const rA = radii[ri]
    const rB = radii[ri + 1]
    for (let i = 0; i < divisions; i += 3) {
      const aA = (i / divisions) * Math.PI * 2
      const aB = ((i + 2) / divisions) * Math.PI * 2
      const c = colIn.clone().lerp(colOut, 0.4)
      c.multiplyScalar(0.85)
      pushSeg(
        Math.cos(aA) * rA,
        Math.sin(aA) * rA,
        Math.cos(aB) * rB,
        Math.sin(aB) * rB,
        c
      )
    }
  }

  const geom = new THREE.BufferGeometry()
  geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geom.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
  return geom
}

function HeroGlobePlexus({ blendWithBackdrop = false }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    if (blendWithBackdrop) {
      scene.background = null
    } else {
      scene.background = new THREE.Color(0x000000)
    }

    const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 100)
    camera.position.set(0, 0.12, 6.55)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({
      alpha: blendWithBackdrop,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setClearColor(0x000000, blendWithBackdrop ? 0 : 1)
    renderer.domElement.style.background = 'transparent'
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.18
    container.appendChild(renderer.domElement)

    const composer = new EffectComposer(renderer)
    composer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    composer.addPass(new RenderPass(scene, camera))
    composer.addPass(
      new UnrealBloomPass(
        new THREE.Vector2(container.clientWidth || 1, container.clientHeight || 1),
        0.32,
        0.36,
        0.22
      )
    )

    const ambient = new THREE.AmbientLight(0xffffff, 0.2)
    scene.add(ambient)
    const sun = new THREE.DirectionalLight(0xffffff, 1.0)
    sun.position.set(5.2, 2.8, 4.5)
    scene.add(sun)
    const fill = new THREE.DirectionalLight(0xa5bcff, 0.2)
    fill.position.set(-4, -1, -3)
    scene.add(fill)

    const R_SURFACE = 2.08
    const R_NETWORK = R_SURFACE * 1.16
    const R_HALO = R_NETWORK * 1.08

    /** Everything that spins together: globe + skin dots + outer net + halo */
    const earthSpinGroup = new THREE.Group()
    scene.add(earthSpinGroup)

    const earthGeom = new THREE.SphereGeometry(R_SURFACE, 96, 96)
    const earthMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.42,
      metalness: 0.14,
      emissive: new THREE.Color(0x061018),
      emissiveIntensity: 0.22,
    })
    const earthMesh = new THREE.Mesh(earthGeom, earthMat)
    earthSpinGroup.add(earthMesh)

    let earthMap = null
    let surfaceGeom = null
    let surfacePoints = null
    const surfaceMat = new THREE.PointsMaterial({
      size: 0.019,
      vertexColors: true,
      transparent: true,
      opacity: 0.94,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: true,
    })

    const texLoader = new THREE.TextureLoader()
    texLoader.load(
      EARTH_TEXTURE_PATH,
      (tex) => {
        earthMap = tex
        tex.colorSpace = THREE.SRGBColorSpace
        tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy())
        tex.generateMipmaps = true
        earthMat.map = tex
        earthMat.needsUpdate = true

        surfaceGeom = buildSurfaceDotsFromTexture(tex, R_SURFACE, 5200, 750)
        if (surfaceGeom) {
          surfacePoints = new THREE.Points(surfaceGeom, surfaceMat)
          earthSpinGroup.add(surfacePoints)
        }
      },
      undefined,
      () => {
        earthMat.color = new THREE.Color(0x1e3a5f)
      }
    )

    const outer = buildOuterPlexus(R_NETWORK)
    const lineGeom = new THREE.BufferGeometry()
    lineGeom.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(outer.linePairs, 3)
    )
    lineGeom.setAttribute('color', new THREE.BufferAttribute(outer.lineColors, 3))
    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.34,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const networkLines = new THREE.LineSegments(lineGeom, lineMat)

    const nodeGeom = new THREE.BufferGeometry()
    nodeGeom.setAttribute('position', new THREE.BufferAttribute(outer.nodePos, 3))
    nodeGeom.setAttribute('color', new THREE.BufferAttribute(outer.nodeColors, 3))
    const nodeMat = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.72,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const networkNodes = new THREE.Points(nodeGeom, nodeMat)

    const networkShell = new THREE.Group()
    networkShell.add(networkLines)
    networkShell.add(networkNodes)
    earthSpinGroup.add(networkShell)

    const haloGeom = new THREE.SphereGeometry(R_HALO, 48, 48)
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      transparent: true,
      opacity: 0.078,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const halo = new THREE.Mesh(haloGeom, haloMat)
    earthSpinGroup.add(halo)

    /** Fixed tech horizon — plexus net (not spun with Earth) */
    const horizonGroup = new THREE.Group()
    horizonGroup.position.set(0, -0.92, 0)
    scene.add(horizonGroup)

    const horizonRadii = [3.36, 3.46, 3.56, 3.66, 3.76, 3.88]
    const horizonNetGeom = buildHorizonNetGeometry(horizonRadii, 56)
    const horizonNetMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const horizonNet = new THREE.LineSegments(horizonNetGeom, horizonNetMat)
    horizonGroup.add(horizonNet)

    const ringOuter = horizonRadii[horizonRadii.length - 1] + 0.02
    const ringGlowGeom = new THREE.RingGeometry(ringOuter, ringOuter + 0.035, 96)
    const ringGlowMat = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.09,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const horizonRingGlow = new THREE.Mesh(ringGlowGeom, ringGlowMat)
    horizonRingGlow.rotation.x = Math.PI / 2
    horizonGroup.add(horizonRingGlow)

    /** Thin atmospheric rim — reads as “interface” around the globe */
    const rimGeom = new THREE.SphereGeometry(R_SURFACE * 1.004, 64, 64)
    const rimMat = new THREE.MeshBasicMaterial({
      color: 0xc9a227,
      transparent: true,
      opacity: 0.11,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const rimShell = new THREE.Mesh(rimGeom, rimMat)
    earthSpinGroup.add(rimShell)

    const spinSpeed = 0.0085
    const inertiaDamp = 0.968
    const maxPitch = Math.PI / 2.12
    const maxSpin = 0.09
    let dragging = false
    let prevX = 0
    let prevY = 0
    /** radians / frame — coast after release */
    let velYaw = 0
    let velPitch = 0
    let dragScale = 0

    const clampPitch = () => {
      earthSpinGroup.rotation.x = THREE.MathUtils.clamp(
        earthSpinGroup.rotation.x,
        -maxPitch,
        maxPitch
      )
    }

    const applyDragPixels = (dx, dy) => {
      const dYaw = dx * spinSpeed
      const dPitch = dy * spinSpeed * 0.52
      earthSpinGroup.rotation.y += dYaw
      earthSpinGroup.rotation.x += dPitch
      clampPitch()
      velYaw = THREE.MathUtils.clamp(dYaw * 1.05, -maxSpin, maxSpin)
      velPitch = THREE.MathUtils.clamp(dPitch * 1.05, -maxSpin, maxSpin)
    }

    const onPointerDown = (e) => {
      dragging = true
      velYaw = 0
      velPitch = 0
      prevX = e.clientX
      prevY = e.clientY
    }
    const onPointerMove = (e) => {
      if (!dragging) return
      const dx = e.clientX - prevX
      const dy = e.clientY - prevY
      prevX = e.clientX
      prevY = e.clientY
      applyDragPixels(dx, dy)
    }
    const onPointerUp = () => {
      dragging = false
    }

    const el = renderer.domElement
    const onTouchStart = (e) => {
      if (e.touches.length !== 1) return
      dragging = true
      velYaw = 0
      velPitch = 0
      prevX = e.touches[0].clientX
      prevY = e.touches[0].clientY
    }
    const onTouchMove = (e) => {
      if (!dragging || e.touches.length !== 1) return
      e.preventDefault()
      const t = e.touches[0]
      const dx = t.clientX - prevX
      const dy = t.clientY - prevY
      prevX = t.clientX
      prevY = t.clientY
      applyDragPixels(dx, dy)
    }
    const onTouchEnd = () => {
      dragging = false
    }

    el.addEventListener('mousedown', onPointerDown)
    window.addEventListener('mousemove', onPointerMove)
    window.addEventListener('mouseup', onPointerUp)
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', onTouchEnd)
    el.addEventListener('touchcancel', onTouchEnd)

    /** Always-on slow spin so the hero feels alive before any drag (rad / second). */
    const IDLE_YAW_SPEED = 0.1

    let animationFrame = null
    let t0 = performance.now()
    let lastFrameTime = performance.now()
    const animate = () => {
      animationFrame = requestAnimationFrame(animate)
      const now = performance.now()
      const dt = Math.min(0.05, Math.max(0, (now - lastFrameTime) / 1000))
      lastFrameTime = now
      const t = (now - t0) * 0.001

      if (!dragging) {
        earthSpinGroup.rotation.y += IDLE_YAW_SPEED * dt
      }

      if (!dragging && (Math.abs(velYaw) > 1e-6 || Math.abs(velPitch) > 1e-6)) {
        earthSpinGroup.rotation.y += velYaw
        earthSpinGroup.rotation.x += velPitch
        clampPitch()
        velYaw *= inertiaDamp
        velPitch *= inertiaDamp
      }
      dragScale = THREE.MathUtils.lerp(dragScale, dragging ? 1 : 0, 0.14)
      const s = 1 + dragScale * 0.018
      earthSpinGroup.scale.setScalar(s)
      rimMat.opacity = 0.09 + dragScale * 0.07 + Math.sin(t * 2.1) * 0.012

      const pulse =
        0.24 + Math.pow(Math.abs(Math.sin(t * 1.12)), 2.2) * 0.14
      const beat =
        0.018 *
        Math.exp(-Math.pow(((t * 1.8) % 1) - 0.12, 2) / 0.008)
      const dragBoost = dragging ? 0.08 : 0
      lineMat.opacity = Math.min(0.5, pulse + beat + dragBoost)
      nodeMat.opacity = Math.min(0.82, 0.68 + pulse * 0.12 + dragBoost * 0.5)

      horizonGroup.rotation.y = t * 0.092
      horizonNetMat.opacity =
        0.12 +
        Math.sin(t * 1.25) * 0.06 +
        Math.sin(t * 2.6 + 0.4) * 0.035 +
        Math.pow(Math.abs(Math.sin(t * 3.4)), 3) * 0.05
      ringGlowMat.opacity =
        0.06 + Math.sin(t * 1.05) * 0.04 + Math.sin(t * 2.2 + 1) * 0.025

      composer.render()
    }

    const setSize = () => {
      const w = container.clientWidth || 1
      const h = container.clientHeight || 1
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      composer.setSize(w, h)
    }

    setSize()
    animate()

    const ro = new ResizeObserver(setSize)
    ro.observe(container)

    return () => {
      ro.disconnect()
      if (animationFrame) cancelAnimationFrame(animationFrame)
      el.removeEventListener('mousedown', onPointerDown)
      window.removeEventListener('mousemove', onPointerMove)
      window.removeEventListener('mouseup', onPointerUp)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
      el.removeEventListener('touchcancel', onTouchEnd)
      earthGeom.dispose()
      earthMat.dispose()
      if (earthMap) earthMap.dispose()
      if (surfaceGeom) surfaceGeom.dispose()
      surfaceMat.dispose()
      lineGeom.dispose()
      lineMat.dispose()
      nodeGeom.dispose()
      nodeMat.dispose()
      haloGeom.dispose()
      haloMat.dispose()
      rimGeom.dispose()
      rimMat.dispose()
      horizonNetGeom.dispose()
      horizonNetMat.dispose()
      ringGlowGeom.dispose()
      ringGlowMat.dispose()
      composer.dispose()
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [blendWithBackdrop])

  return (
    <div
      ref={containerRef}
      data-cursor-intent="drag"
      className="absolute inset-0 z-0 cursor-grab touch-none overflow-hidden active:cursor-grabbing"
      aria-label="Earth view — rotates slowly; drag to spin"
    />
  )
}

export default HeroGlobePlexus
