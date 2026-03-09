import './OurStoryPage.css'
import { Link } from 'react-router-dom'

const researchPapers = [
  {
    id: 'research-paper-1',
    title: 'Deloitte: State of AI in the Enterprise (January 2026)',
    summary: 'How AI is driving productivity, efficiency and new business models.',
    thumbnail: '/research-paper-1-thumb.png',
    href: 'https://www.deloitte.com/content/dam/assets-shared/docs/about/2025/state-of-ai-2026-global.pdf',
    external: true,
  },
  {
    id: 'research-paper-2',
    title: 'McKinsey: The state of AI',
    summary: 'A clear snapshot of enterprise AI adoption, scaling maturity, and where organisations are unlocking measurable value.',
    thumbnail: '/research-paper-2-thumb.png',
    href: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai',
    external: true,
  },
  {
    id: 'research-paper-3',
    title: 'Shift AI: The AI Value Shift',
    summary: 'How artificial intelligence is driving measurable business impact across cost, productivity, and growth.',
    thumbnail: '/research-paper-3-thumb.png',
  },
]

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
        <h1 className="our-story-title">Why <span className="our-story-accent">Shift AI</span> Exists</h1>

        <section className="our-story-prose">
          <p>
            In 2024, the founding partners of Shift AI commissioned the development of advanced neural network models
            designed to predict Bitcoin price movements.
          </p>
          <p>
            The project required over $650,000 in capital across development, training, backtesting and infrastructure.
            It was a serious undertaking built to institutional standards.
          </p>
          <p>
            The result was a set of models so sophisticated that they contributed to the creation of Infinite Point
            Capital, a U.S. regulated Bitcoin investment fund licensed to operate a customised, risk-managed BTC trading
            strategy built on this technology.
          </p>
          <p>
            With a targeted $100-300 million in assets under management, the stakes were high. The models had to
            perform. And they did.
          </p>
          <p>
            But the real breakthrough came later.
          </p>
          <p>
            By 2026, the same systems were rebuilt using a new generation of AI-assisted development tooling. What once
            required months of engineering effort and significant capital was reproduced with an 82% reduction in
            development cost.
          </p>
          <p>
            This moment revealed something much bigger.
          </p>
          <p>
            It exposed a structural shift in how advanced software - and particularly AI systems - can be built.
            Projects that once demanded enormous capital expenditure can now be delivered faster, leaner and far more
            efficiently.
          </p>
          <p>
            Leading consulting firms including Accenture, EY, McKinsey and Gartner are now publishing research
            highlighting this same transformation across the global technology landscape.
          </p>
          <p>
            We encourage you to explore some of this research yourself.
          </p>
          <p>
            The industry is only beginning to recognise the scale of this shift. At Shift AI, we experienced it
            first-hand - long before it became a widely discussed theme.
          </p>
        </section>

        <section className="our-story-research">
          <h2 className="our-story-research-title">Explore the Research</h2>
          <div className="our-story-research-grid">
            {researchPapers.map((paper) => {
              const cardContent = (
                <>
                  <div className="our-story-research-thumb" aria-hidden="true">
                    {paper.thumbnail ? (
                      <img src={paper.thumbnail} alt="" className="our-story-research-thumb-image" />
                    ) : (
                      'Research'
                    )}
                  </div>
                  <h3>{paper.title}</h3>
                  <p>{paper.summary}</p>
                </>
              )

              if (paper.external) {
                return (
                  <a
                    key={paper.id}
                    href={paper.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="our-story-research-card"
                  >
                    {cardContent}
                  </a>
                )
              }

              return (
                <Link key={paper.id} to={`/research/${paper.id}`} className="our-story-research-card">
                  {cardContent}
                </Link>
              )
            })}
          </div>
        </section>

        <p className="our-story-close">
          At Shift AI, we didn&apos;t discover this transformation in theory.
          <br />
          We lived it.
          <br />
          We learned through real development cycles, real capital investment and real-world deployment.
          <br />
          That experience now forms the foundation of our work.
        </p>
        <a href="/#contact" className="our-story-cta">Start a Project</a>
      </main>
    </div>
  )
}
