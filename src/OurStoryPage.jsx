import './OurStoryPage.css'

export default function OurStoryPage() {
  return (
    <div className="our-story-page">
      <header className="our-story-header">
        <a href="/" className="our-story-logo-link" aria-label="Shift AI home">
          <img src="/logo.svg" alt="Shift AI logo" className="our-story-logo-image" />
        </a>
        <nav className="our-story-nav">
          <a href="/#projects" className="our-story-nav-link">Projects</a>
          <a href="/#solutions" className="our-story-nav-link">Solutions</a>
          <a href="/partners" className="our-story-nav-link">Partners</a>
          <a href="/#work-with-us" className="our-story-nav-link">Work With Us</a>
          <a href="/our-story" className="our-story-nav-link active">Our Story</a>
          <a href="/blog" className="our-story-nav-link">Blog</a>
        </nav>
      </header>

      <main className="our-story-main">
        <p className="our-story-kicker">Our Story</p>
        <h1 className="our-story-title">Our Story</h1>
        <p className="our-story-subtitle">
          We started Shift AI Tech to help ambitious teams move faster with practical, revenue-focused AI systems.
          This page is ready for your full story content.
        </p>
        <section className="our-story-blocks">
          <article className="our-story-block">
            <h2>Why we started</h2>
            <p>
              We saw too many projects stuck between strategy decks and real output. Shift was built to close that
              gap with practical AI delivery that creates measurable results quickly.
            </p>
          </article>
          <article className="our-story-block">
            <h2>How we work</h2>
            <p>
              We keep teams lean, iterate fast, and ship in production cycles rather than long research phases. This
              section can be replaced with your full operating model and methodology.
            </p>
          </article>
          <article className="our-story-block">
            <h2>Where we are going</h2>
            <p>
              Our focus is to become the most trusted partner for businesses building high-impact AI products and
              automation systems in the UK and beyond.
            </p>
          </article>
        </section>
        <a href="/#contact" className="our-story-cta">Start a Project</a>
      </main>
    </div>
  )
}
