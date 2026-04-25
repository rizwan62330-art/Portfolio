import { useEffect, useRef } from 'react'
import './Skills.css'

const CATEGORIES = [
  {
    name: 'Frontend',
    skills: [
      { icon: '🌐', name: 'HTML5',      level: 'expert'   },
      { icon: '🎨', name: 'CSS3',       level: 'expert'   },
      { icon: '⚡', name: 'JavaScript', level: 'advanced' },
      { icon: '⚛️', name: 'React',     level: 'advanced' },
      { icon: '🔷', name: 'TypeScript', level: 'learning' },
    ],
  },
  {
    name: 'Languages',
    skills: [
      { icon: '🔧', name: 'C++',        level: 'expert'   },
      { icon: '🐍', name: 'Python',     level: 'advanced' },
      { icon: '☕', name: 'JavaScript', level: 'advanced' },
    ],
  },
  {
    name: 'Databases & Systems',
    skills: [
      { icon: '🗄️', name: 'MySQL',      level: 'advanced' },
      { icon: '🐘', name: 'PostgreSQL', level: 'advanced' },
      { icon: '🌐', name: 'TCP/IP',     level: 'advanced' },
      { icon: '🔌', name: 'Embedded C', level: 'learning' },
      { icon: '🔀', name: 'Networking', level: 'advanced' },
    ],
  },
  {
    name: 'Tools',
    skills: [
      { icon: '🔀', name: 'Git / GitHub', level: 'advanced' },
      { icon: '⚡', name: 'Vite',         level: 'advanced' },
      { icon: '🐳', name: 'Docker',       level: 'learning' },
      { icon: '💻', name: 'VS Code',      level: 'advanced' },
    ],
  },
]

export default function Skills() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const pills = sectionRef.current?.querySelectorAll('.skill-pill')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) }
      }),
      { threshold: 0.1 }
    )
    pills?.forEach((p, i) => {
      p.style.setProperty('--delay', `${i * 0.04}s`)
      io.observe(p)
    })
    return () => io.disconnect()
  }, [])

  return (
    <section id="skills" className="skills" ref={sectionRef}>
      <span className="section-tag">// skills & tools</span>
      <h2 className="section-title">What I work with</h2>
      <p className="section-subtitle">
        A dot means:&nbsp;
        <span style={{ color: 'var(--green)' }}>●</span> expert&nbsp;&nbsp;
        <span style={{ color: 'var(--accent2)' }}>●</span> advanced&nbsp;&nbsp;
        <span style={{ color: 'var(--gold)' }}>●</span> learning
      </p>

      <div className="skills-container">
        {CATEGORIES.map(cat => (
          <div className="skills-category" key={cat.name}>
            <div className="cat-title">{cat.name}</div>
            <div className="skills-row">
              {cat.skills.map(s => (
                <div className={`skill-pill ${s.level}`} key={s.name}>
                  <span className="skill-icon">{s.icon}</span>
                  {s.name}
                  <span className="skill-level" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
