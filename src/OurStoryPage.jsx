import './OurStoryPage.css'

export default function OurStoryPage() {
  return (
    <div className="our-story-page">
      <header className="our-story-header">
        <a href="/" className="our-story-logo-link" aria-label="Shift AI home">
          <img src="/logo.svg" alt="Shift AI logo" className="our-story-logo-image" />
        </a>
      </header>

      <main className="our-story-main">
        <p className="our-story-kicker">Our Story</p>
        <h1 className="our-story-title">Our Story</h1>
        <p className="our-story-subtitle">
          We started Shift AI Tech to help ambitious teams move faster with practical, revenue-focused AI systems.
          This page is ready for your full story content.
        </p>
        <a href="/#contact" className="our-story-cta">Start a Project</a>
      </main>
    </div>
  )
}
