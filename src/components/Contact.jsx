import { useState } from 'react'
import './Contact.css'

export default function Contact() {
  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setForm({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  return (
    <section id="contact" className="contact">
      <span className="section-tag">// let's connect</span>
      <h2 className="section-title">Start a conversation</h2>
      <p className="section-subtitle">
        Open to internships, collaboration, or just talking code.
      </p>

      <div className="contact-wrapper">
        <div className="contact-card">
          <div className="contact-socials">
            <a href="https://github.com/" target="_blank" rel="noreferrer" className="social-link">
              ⌥ GitHub
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="social-link">
              in LinkedIn
            </a>
            <a href="mailto:rizwan62330@email.com" className="social-link">
              ✉ Email
            </a>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Internship opportunity / Collaboration / ..."
                value={form.subject}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                placeholder="Tell me about the opportunity or project..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className={`form-submit ${submitted ? 'sent' : ''}`}
            >
              {submitted ? '✓ Message sent!' : 'Send Message →'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
