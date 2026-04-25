import { useEffect, useRef } from 'react'
import './Projects.css'

const PROJECTS = [
  {
    icon: '🌐',
    title: 'Portfolio Website',
    featured: true,
    desc: 'This very portfolio — built from scratch with React and Vite. Custom CSS animations, responsive design, floating label contact form, and a Three.js 3D hero.',
    tags: ['React', 'Vite', 'CSS3', 'Three.js'],
    code: '#',
    live: '#',
  },
  {
    icon: '🖥️',
    title: 'Student Management System',
    featured: false,
    desc: 'A full CRUD application built with C++ and file I/O. Manages student records, grades, and generates reports using OOP principles throughout.',
    tags: ['C++', 'OOP', 'File I/O', 'STL'],
    code: '#',
    live: null,
  },
  {
    icon: '🤖',
    title: 'Python Automation Scripts',
    featured: false,
    desc: 'A collection of utility scripts for file organization, data processing, and web scraping. Saved hours of manual work for repetitive tasks.',
    tags: ['Python', 'Automation', 'Data Processing'],
    code: '#',
    live: null,
  },
]

export default function Projects() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.project-card')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) }
      }),
      { threshold: 0.1 }
    )
    cards?.forEach(c => io.observe(c))
    return () => io.disconnect()
  }, [])

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      <span className="section-tag">// what i've built</span>
      <h2 className="section-title">Projects</h2>
      <p className="section-subtitle">Real things I've built. Each one taught me something new.</p>

      <div className="projects-grid">
        {PROJECTS.map((p, i) => (
          <div
            className="project-card"
            key={p.title}
            style={{ '--delay': `${i * 0.1}s` }}
            onMouseMove={tilt}
            onMouseLeave={resetTilt}
          >
            <div className="project-header">
              <div className="project-icon">{p.icon}</div>
              <div className="project-links">
                <a href={p.code} target="_blank" rel="noreferrer">⌥ Code</a>
                {p.live && <a href={p.live} target="_blank" rel="noreferrer">↗ Live</a>}
              </div>
            </div>
            <div className="project-body">
              {p.featured && <span className="featured-badge">★ Featured</span>}
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.desc}</p>
              <div className="tech-tags">
                {p.tags.map(t => <span className="tech-tag" key={t}>{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function tilt(e) {
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const cx = rect.width  / 2
  const cy = rect.height / 2
  const rotX = ((y - cy) / cy) * -6
  const rotY = ((x - cx) / cx) *  6
  card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px)`
}
function resetTilt(e) {
  e.currentTarget.style.transform = ''
}
