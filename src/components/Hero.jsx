import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import './Hero.css'

const ROLES = ['Web Developer', 'C++ Engineer', 'Python Developer', 'Problem Solver', 'App Developer']

function useTypewriter(words) {
  const [display, setDisplay] = useState('')
  const state = useRef({ idx: 0, char: 0, deleting: false })

  useEffect(() => {
    let timer
    function tick() {
      const { idx, char, deleting } = state.current
      const word = words[idx]

      if (!deleting) {
        const next = char + 1
        setDisplay(word.slice(0, next))
        state.current.char = next
        if (next === word.length) {
          state.current.deleting = true
          timer = setTimeout(tick, 1400)
          return
        }
      } else {
        const next = char - 1
        setDisplay(word.slice(0, next))
        state.current.char = next
        if (next === 0) {
          state.current.deleting = false
          state.current.idx = (idx + 1) % words.length
        }
      }
      timer = setTimeout(tick, deleting ? 55 : 100)
    }
    timer = setTimeout(tick, 600)
    return () => clearTimeout(timer)
  }, [words])

  return display
}

function useThreeHero(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.set(5, 2, 8)
    camera.lookAt(0, 0, 0)

    // Main mesh
    const geo = new THREE.IcosahedronGeometry(2.2, 1)
    const mat = new THREE.MeshStandardMaterial({
      color: 0x6c63ff,
      metalness: 0.6,
      roughness: 0.3,
      emissive: 0x2a2060,
      emissiveIntensity: 0.4,
    })
    const mesh = new THREE.Mesh(geo, mat)
    scene.add(mesh)

    // Wireframe overlay
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff, wireframe: true,
      transparent: true, opacity: 0.15,
    })
    const wireMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(2.25, 1), wireMat)
    scene.add(wireMesh)

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.4))
    const dirLight = new THREE.DirectionalLight(0x6c63ff, 2)
    dirLight.position.set(5, 5, 5)
    scene.add(dirLight)
    const blueLight = new THREE.PointLight(0x00d4ff, 1.5, 20)
    blueLight.position.set(-5, 2, 3)
    scene.add(blueLight)

    // Particles
    const count = 180
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) positions[i] = (Math.random() - 0.5) * 28
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const pMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.04, transparent: true, opacity: 0.5 })
    scene.add(new THREE.Points(pGeo, pMat))

    // Mouse parallax
    let targetX = 0, targetY = 0
    const onMouse = (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 1.5
      targetY = (e.clientY / window.innerHeight - 0.5) * -1.2
    }
    document.addEventListener('mousemove', onMouse)

    let t = 0, animId
    const animate = () => {
      animId = requestAnimationFrame(animate)
      t += 0.008
      mesh.rotation.x += (targetY * 0.5 - mesh.rotation.x) * 0.05
      mesh.rotation.y = t + targetX * 0.5
      wireMesh.rotation.x = mesh.rotation.x
      wireMesh.rotation.y = mesh.rotation.y
      mesh.position.y = Math.sin(t) * 0.2
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      document.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, [canvasRef])
}

export default function Hero() {
  const canvasRef = useRef(null)
  const role = useTypewriter(ROLES)
  useThreeHero(canvasRef)

  return (
    <section id="hero" className="hero">
      <canvas ref={canvasRef} className="hero-canvas" />

      <div className="hero-content">
        <div className="hero-tag">
          <span className="status-dot" />
          Available for internships
        </div>

        <h1 className="hero-name">
          M. <span>Rizwan</span>
        </h1>

        <p className="hero-role">
          {role}<span className="cursor-blink">|</span>
        </p>

        <p className="hero-bio">
          <strong>Computer Engineering student</strong> building full-stack web apps,
          embedded systems, and everything in between.
          I turn ideas into working code — fast and clean.
        </p>

        <div className="hero-btns">
          <a href="#projects" className="btn-primary">View My Work</a>
          <a href="#contact" className="btn-outline">Get in Touch</a>
        </div>

        <div className="hero-stats">
          <div>
            <div className="stat-num">3<span>+</span></div>
            <div className="stat-label">Projects Built</div>
          </div>
          <div>
            <div className="stat-num">5<span>+</span></div>
            <div className="stat-label">Technologies</div>
          </div>
          <div>
            <div className="stat-num">1<span>yr</span></div>
            <div className="stat-label">Experience</div>
          </div>
        </div>
      </div>

      <div className="scroll-hint">
        <span>SCROLL</span>
        <span className="scroll-arrow">↓</span>
      </div>
    </section>
  )
}
