import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo-link">
              <img
                src={`${import.meta.env.BASE_URL}shift-logo-new.png`}
                alt="Shift AI Tech"
                className="footer-logo-img"
              />
            </Link>
            <p className="footer-tagline">
              Custom AI models, full product builds, and intelligent automation for businesses across the United Kingdom.
            </p>
          </div>

          <div className="footer-nav-group">
            <p className="footer-nav-label">Company</p>
            <Link to="/our-story" className="footer-nav-link">Our Story</Link>
            <Link to="/partners" className="footer-nav-link">Partners</Link>
            <Link to="/team" className="footer-nav-link">Team</Link>
            <Link to="/blog" className="footer-nav-link">Insights</Link>
          </div>

          <div className="footer-nav-group">
            <p className="footer-nav-label">Services</p>
            <a href="/#solutions" className="footer-nav-link">Custom AI Models</a>
            <a href="/#solutions" className="footer-nav-link">Full Product Builds</a>
            <a href="/#solutions" className="footer-nav-link">Process Automation</a>
            <a href="/#solutions" className="footer-nav-link">AI Strategy</a>
          </div>

          <div className="footer-nav-group">
            <p className="footer-nav-label">Get Started</p>
            <a href="/#contact" className="footer-nav-link footer-nav-link--cta">
              Start a Project <ArrowRight size={14} />
            </a>
            <a href="mailto:jack@shiftaitech.com" className="footer-nav-link">
              jack@shiftaitech.com
            </a>
            <span className="footer-nav-link footer-nav-link--static">United Kingdom</span>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">&copy; 2026 Shift AI Tech. All rights reserved.</p>
          <p className="footer-legal">United Kingdom</p>
        </div>
      </div>
    </footer>
  )
}
