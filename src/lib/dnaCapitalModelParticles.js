import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

const DNA_GLB_URL = '/assets/dna-clone/dna-02.glb'
const DRACO_DECODER = 'https://www.gstatic.com/draco/versioned/decoders/1.5.6/'
const STRIDE_CAP = 14000

let loadPromiseMap = new Map()

/** Stable 0–1 value per index (no per-frame randomness). */
function seeded01(index, salt = 0) {
  const x = Math.sin((index + 1) * 127.1 + salt * 311.7) * 43758.5453
  return x - Math.floor(x)
}

function dedupeVertexIndices(srcPos, precision = 1000) {
  const seen = new Set()
  const indices = []
  for (let i = 0; i < srcPos.count; i += 1) {
    const key = [
      Math.round(srcPos.getX(i) * precision),
      Math.round(srcPos.getY(i) * precision),
      Math.round(srcPos.getZ(i) * precision),
    ].join(',')
    if (seen.has(key)) continue
    seen.add(key)
    indices.push(i)
  }
  return indices
}

/** Even stride along mesh order — keeps ribbon continuity (no random outliers). */
function pickVertexIndices(total, maxPoints) {
  const dedupedTotal = total
  if (dedupedTotal <= maxPoints) {
    return Array.from({ length: dedupedTotal }, (_, i) => i)
  }
  const step = dedupedTotal / maxPoints
  return Array.from({ length: maxPoints }, (_, i) => Math.min(dedupedTotal - 1, Math.floor(i * step)))
}

/**
 * Sample mesh vertices into particle BufferGeometry (Codrops / dnacapital.com pattern).
 * Uses all unique vertices — no random subsampling, no per-particle displacement.
 */
export function buildParticleGeometryFromMesh(sourceGeometry, maxPoints = STRIDE_CAP) {
  const srcPos = sourceGeometry.attributes.position
  const srcUv = sourceGeometry.attributes.uv
  if (!srcPos) {
    throw new Error('DNA mesh has no position attribute')
  }

  const uniqueIndices = dedupeVertexIndices(srcPos)
  const sampled = pickVertexIndices(uniqueIndices.length, maxPoints)
  const count = sampled.length

  const positions = new Float32Array(count * 3)
  const uvs = new Float32Array(count * 2)
  const randoms = new Float32Array(count)
  const colorRandoms = new Float32Array(count)
  const edgeHighlights = new Float32Array(count)

  for (let i = 0; i < count; i += 1) {
    const srcIndex = uniqueIndices[sampled[i]]
    const px = srcPos.getX(srcIndex)
    const py = srcPos.getY(srcIndex)
    const pz = srcPos.getZ(srcIndex)

    positions[i * 3] = px
    positions[i * 3 + 1] = py
    positions[i * 3 + 2] = pz

    if (srcUv) {
      uvs[i * 2] = srcUv.getX(srcIndex)
      uvs[i * 2 + 1] = srcUv.getY(srcIndex)
      edgeHighlights[i] = Math.pow(Math.max(0, srcUv.getY(srcIndex)), 1.55)
    } else {
      uvs[i * 2] = i / count
      uvs[i * 2 + 1] = seeded01(i, 2)
      edgeHighlights[i] = seeded01(i, 3) > 0.82 ? 1 : 0
    }

    randoms[i] = 0.78 + seeded01(i, 1) * 0.22
    colorRandoms[i] = seeded01(i, 4)
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2))
  geometry.setAttribute('randoms', new THREE.BufferAttribute(randoms, 1))
  geometry.setAttribute('colorRandoms', new THREE.BufferAttribute(colorRandoms, 1))
  geometry.setAttribute('edgeHighlights', new THREE.BufferAttribute(edgeHighlights, 1))

  geometry.center()
  geometry.computeBoundingBox()
  const centeredSize = new THREE.Vector3()
  geometry.boundingBox.getSize(centeredSize)
  const fitScale = 11.8 / Math.max(centeredSize.y, 0.001)
  geometry.scale(fitScale, fitScale, fitScale)
  geometry.center()

  const posAttr = geometry.attributes.position
  const scatters = new Float32Array(count * 3)
  const scatterRadius = Math.max(centeredSize.x, centeredSize.y, centeredSize.z) * fitScale * 0.48
  for (let i = 0; i < count; i += 1) {
    const px = posAttr.getX(i)
    const py = posAttr.getY(i)
    const pz = posAttr.getZ(i)
    const radial = Math.sqrt(px * px + pz * pz) || 1
    const push = scatterRadius * (0.35 + seeded01(i, 5) * 0.65)
    scatters[i * 3] = px + (px / radial) * push
    scatters[i * 3 + 1] = py + (seeded01(i, 6) - 0.5) * push * 0.35
    scatters[i * 3 + 2] = pz + (pz / radial) * push
  }
  geometry.setAttribute('scatter', new THREE.BufferAttribute(scatters, 3))

  return geometry
}

function loadDnaGltfGeometry() {
  return new Promise((resolve, reject) => {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath(DRACO_DECODER)

    const gltfLoader = new GLTFLoader()
    gltfLoader.setDRACOLoader(dracoLoader)

    gltfLoader.load(
      DNA_GLB_URL,
      (gltf) => {
        dracoLoader.dispose()
        gltf.scene.updateMatrixWorld(true)

        const parts = []
        gltf.scene.traverse((child) => {
          if (!child.isMesh || !child.geometry) return
          const geom = child.geometry.clone()
          geom.applyMatrix4(child.matrixWorld)
          parts.push(geom)
        })

        if (!parts.length) {
          reject(new Error('No mesh geometry in DNA GLB'))
          return
        }

        const merged = parts.length === 1 ? parts[0] : mergeGeometries(parts, false)
        if (!merged) {
          reject(new Error('Failed to merge DNA mesh geometries'))
          return
        }
        resolve(merged)
      },
      undefined,
      (error) => {
        dracoLoader.dispose()
        reject(error)
      },
    )
  })
}

/** Cached load of dna-02.glb particle geometry. */
export function loadDnaCapitalParticleAssets(options = {}) {
  const maxPoints = options.maxPoints ?? STRIDE_CAP
  if (!loadPromiseMap.has(maxPoints)) {
    const promise = loadDnaGltfGeometry()
      .then((meshGeometry) => ({
        particleGeometry: buildParticleGeometryFromMesh(meshGeometry, maxPoints),
      }))
      .catch((error) => {
        loadPromiseMap.delete(maxPoints)
        throw error
      })
    loadPromiseMap.set(maxPoints, promise)
  }
  return loadPromiseMap.get(maxPoints)
}

export function resetDnaCapitalParticleCache() {
  loadPromiseMap.clear()
}
