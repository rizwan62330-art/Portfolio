import { useEffect, useRef } from 'react'
import image from "../assets/Images/orginal.png"
import './About.css'

const highlights = [
  { icon: '⚡', title: 'Frontend Dev',  sub: 'React, CSS, JS' },
  { icon: '🔧', title: 'Systems',       sub: 'C++, Embedded' },
  { icon: '🗄️', title: 'Databases',    sub: 'MySQL, PostgreSQL' },
  { icon: '🌐', title: 'Networking',    sub: 'TCP/IP, Routing' },
]

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.fade-in')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) }
      }),
      { threshold: 0.1 }
    )
    els?.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="about" className="about" ref={sectionRef}>
      <span className="section-tag">// about me</span>
      <h2 className="section-title">Building things that<br />actually work</h2>

      <div className="about-grid">
        <div className="about-img-wrap fade-in">
          {/* Floating glowing orbs */}
          {/* <div className="about-orb about-orb-1" />
          <div className="about-orb about-orb-2" />
          <div className="about-orb about-orb-3" />*/}

          {/* Inner wrapper keeps the dark gap between border and image */}
          <div className="about-img-inner">
            <img src={image} alt="Rizwan" className="about-img" />
          </div>

          <div className="exp-badge">
            <div className="num">2027</div>
            <div className="label">Expected Grad.</div>
          </div>
        </div>

        <div className="about-text fade-in" style={{ '--delay': '0.15s' }}>
          <p>Hi, I'm <strong>M Rizwan</strong> — a Computer Engineering student with a genuine passion for building systems that bridge software and hardware.</p>
          <p>I spend my time working on <strong>web applications</strong>, writing clean <strong>C++ and Python</strong> for data structures and automation, and exploring <strong>embedded systems</strong>. I'm not just studying engineering — I'm practicing it.</p>
         {/* <p>Currently seeking internship opportunities where I can contribute to real products and grow fast alongside a strong team.</p>*/}

          <div className="about-highlights">
            {highlights.map(h => (
              <div className="highlight-item" key={h.title}>
                <div className="highlight-icon">{h.icon}</div>
                <div className="highlight-title">{h.title}</div>
                <div className="highlight-sub">{h.sub}</div>
              </div>
            ))}
          </div>

          <a href="#contact" className="btn-primary">Let's Talk →</a>
        </div>
      </div>
    </section>
  )
}
