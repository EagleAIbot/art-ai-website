import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, Menu, X, Sun, Moon } from 'lucide-react'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark'
    }
    return 'dark'
  })
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  const navLinks = [
    { label: 'Projects', href: '/#projects', type: 'hash' },
    { label: 'Services', href: '/#solutions', type: 'hash' },
    { label: 'Partners', href: '/partners', type: 'route' },
    { label: 'Process', href: '/#work-with-us', type: 'hash' },
    { label: 'Our Story', href: '/our-story', type: 'route' },
    { label: 'Insights', href: '/blog', type: 'route' },
  ]

  const renderLink = (link) => {
    const isActive =
      link.type === 'route' && location.pathname === link.href

    if (link.type === 'route') {
      return (
        <Link
          key={link.label}
          to={link.href}
          className={`nav-link${isActive ? ' nav-link--active' : ''}`}
        >
          {link.label}
        </Link>
      )
    }

    if (isHome) {
      return (
        <a key={link.label} href={link.href.replace('/', '')} className="nav-link">
          {link.label}
        </a>
      )
    }

    return (
      <a key={link.label} href={link.href} className="nav-link">
        {link.label}
      </a>
    )
  }

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}${mobileOpen ? ' nav--open' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo" aria-label="Shift AI Tech home">
          <img
            src={`${import.meta.env.BASE_URL}shift-logo-new.png`}
            alt="Shift AI Tech"
            className="nav-logo-img"
          />
        </Link>

        <div className="nav-links">
          {navLinks.map(renderLink)}
        </div>

        <div className="nav-right">
          <button
            className="nav-theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a href={isHome ? '#contact' : '/#contact'} className="nav-cta">
            <span>Get in Touch</span>
            <ArrowRight size={15} />
          </a>
          <button
            className="nav-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="nav-mobile">
          {navLinks.map(renderLink)}
          <a href={isHome ? '#contact' : '/#contact'} className="nav-mobile-cta">
            Get in Touch <ArrowRight size={15} />
          </a>
        </div>
      )}
    </nav>
  )
}
