import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer-text">
        Built by <span>M. Rizwan</span> · {new Date().getFullYear()}
      </p>
      <a href="#hero" className="back-top">↑ Back to top</a>
    </footer>
  )
}
