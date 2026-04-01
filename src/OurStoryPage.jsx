import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container, SectionLabel, Button } from './components/ui'
import './OurStoryPage.css'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

const researchPapers = [
  {
    id: 'research-paper-1',
    title: 'Deloitte: State of AI in the Enterprise (January 2026)',
    summary: 'How AI is driving productivity, efficiency and new business models.',
    href: 'https://www.deloitte.com/content/dam/assets-shared/docs/about/2025/state-of-ai-2026-global.pdf',
    external: true,
  },
  {
    id: 'research-paper-2',
    title: 'McKinsey: The state of AI',
    summary: 'A clear snapshot of enterprise AI adoption, scaling maturity, and where organisations are unlocking measurable value.',
    href: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai',
    external: true,
  },
  {
    id: 'research-paper-3',
    title: 'Shift AI: The AI Value Shift',
    summary: 'How artificial intelligence is driving measurable business impact across cost, productivity, and growth.',
  },
]

export default function OurStoryPage() {
  return (
    <div className="subpage our-story-page">
      <section className="subpage-hero">
        <Container>
          <motion.div {...fadeUp}>
            <SectionLabel>Our Story</SectionLabel>
            <h1 className="subpage-title">
              Why <span className="text-accent">Shift AI</span> Exists
            </h1>
          </motion.div>
        </Container>
      </section>

      <section className="section">
        <Container narrow>
          <motion.div className="story-prose" {...fadeUp}>
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
              With a targeted $100–300 million in assets under management, the stakes were high. The models had to
              perform. And they did.
            </p>
            <p className="story-emphasis">
              But the real breakthrough came later.
            </p>
            <p>
              By 2026, the same systems were rebuilt using a new generation of AI-assisted development tooling. What once
              required months of engineering effort and significant capital was reproduced with an 82% reduction in
              development cost.
            </p>
            <p className="story-emphasis">
              This moment revealed something much bigger.
            </p>
            <p>
              It exposed a structural shift in how advanced software — and particularly AI systems — can be built.
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
              first-hand — long before it became a widely discussed theme.
            </p>
          </motion.div>
        </Container>
      </section>

      <section className="section section--surface">
        <Container>
          <motion.div {...fadeUp}>
            <h2 className="ui-section-heading">Explore the Research</h2>
          </motion.div>
          <div className="research-grid">
            {researchPapers.map((paper) => {
              const inner = (
                <>
                  <h3 className="research-card-title">{paper.title}</h3>
                  <p className="research-card-summary">{paper.summary}</p>
                  <span className="research-card-link">
                    {paper.external ? 'Read report \u2192' : 'Read article \u2192'}
                  </span>
                </>
              )

              if (paper.external) {
                return (
                  <a
                    key={paper.id}
                    href={paper.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="research-card"
                  >
                    {inner}
                  </a>
                )
              }

              return (
                <Link key={paper.id} to={`/research/${paper.id}`} className="research-card">
                  {inner}
                </Link>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container narrow>
          <motion.div className="story-close" {...fadeUp}>
            <p>At Shift AI, we didn&apos;t discover this transformation in theory.</p>
            <p className="story-emphasis">We lived it.</p>
            <p>
              We learned through real development cycles, real capital investment and real-world deployment.
              That experience now forms the foundation of our work.
            </p>
            <div style={{ marginTop: '2.5rem' }}>
              <Button href="/#contact">Start a Project</Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  )
}
