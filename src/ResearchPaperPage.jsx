import { useNavigate, useParams } from 'react-router-dom'
import './ResearchPaperPage.css'

const paperDetails = {
  'research-paper-1': {
    title: 'Research Paper 1',
    summary: 'Placeholder page for a future linked research article.',
  },
  'research-paper-2': {
    title: 'Research Paper 2',
    summary: 'Placeholder page for a future linked research article.',
  },
  'research-paper-3': {
    title: 'The AI Value Shift',
    summary: 'How Artificial Intelligence is Driving Measurable Business Impact',
  },
}

const relatedResearch = [
  {
    id: 'research-paper-1',
    title: 'Deloitte: State of AI in the Enterprise (January 2026)',
    summary: 'How AI is driving productivity, efficiency and new business models.',
    thumbnail: '/research-paper-1-thumb.png',
    href: 'https://www.deloitte.com/content/dam/assets-shared/docs/about/2025/state-of-ai-2026-global.pdf',
  },
  {
    id: 'research-paper-2',
    title: 'McKinsey: The state of AI',
    summary: 'A clear snapshot of enterprise AI adoption, scaling maturity, and where organisations are unlocking measurable value.',
    thumbnail: '/research-paper-2-thumb.png',
    href: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai',
  },
]

const keyInsights = [
  { stat: '74%', detail: 'of organisations report a measurable ROI from AI within the first year (McKinsey).' },
  { stat: '66%', detail: 'of organisations report measurable productivity and efficiency gains (Deloitte).' },
  { stat: '3x', detail: 'greater cost reductions among AI-leading companies (BCG).' },
  { stat: 'Up to 90%', detail: 'cost reduction in customer service operations via AI automation (BCG).' },
  { stat: '20-30%', detail: 'cost savings in software engineering and maintenance (BCG).' },
  { stat: '34%', detail: 'of firms are using AI to transform core business processes (Deloitte).' },
  { stat: '40%', detail: 'of organisations cite cost reduction as a primary benefit (Deloitte).' },
  { stat: '27% vs 9%', detail: 'revenue-per-employee growth in AI-exposed industries versus others (PwC).' },
]

export default function ResearchPaperPage() {
  const { paperId } = useParams()
  const navigate = useNavigate()
  const paper = paperDetails[paperId] ?? {
    title: 'Research Paper',
    summary: 'Placeholder page for future research content.',
  }

  return (
    <div className="research-page">
      <header className="research-header">
        <a href="/" className="research-logo-link" aria-label="Shift AI home">
          <img src="/logo.svg" alt="Shift AI logo" className="research-logo-image" />
        </a>
        <nav className="research-nav">
          <a href="/#projects" className="research-nav-link">Projects</a>
          <a href="/#solutions" className="research-nav-link">Solutions</a>
          <a href="/partners" className="research-nav-link">Partners</a>
          <a href="/#work-with-us" className="research-nav-link">Work With Us</a>
          <a href="/our-story" className="research-nav-link active">Our Story</a>
          <a href="/blog" className="research-nav-link">Blog</a>
        </nav>
      </header>

      <main className="research-main">
        <div className="research-back-row">
          <button
            type="button"
            className="research-back-btn"
            onClick={() => {
              if (window.history.length > 1) {
                navigate(-1)
              } else {
                navigate('/our-story')
              }
            }}
          >
            ← Back
          </button>
        </div>
        {paperId !== 'research-paper-3' && (
          <>
            <p className="research-kicker">Research</p>
            <h1 className="research-title">{paper.title}</h1>
            <p className="research-subtitle">{paper.summary}</p>
          </>
        )}
        {paperId !== 'research-paper-3' ? (
          <div className="research-placeholder">
            <h2>Content Placeholder</h2>
            <p>
              Add your full research summary, key findings, data references, and source links here when ready.
            </p>
          </div>
        ) : (
          <article className="research-article">
            <section className="whitepaper-cover">
              <p className="whitepaper-label">Shift AI Research</p>
              <h2 className="whitepaper-title">The AI Value Shift</h2>
              <p className="whitepaper-subtitle">How Artificial Intelligence is Driving Measurable Business Impact</p>
              <p className="whitepaper-author">Author: Shift AI Research</p>
            </section>

            <section className="whitepaper-section">
              <h2>Executive Summary / Key Insights</h2>
              <p>
                Across leading global studies, AI is moving decisively from experimentation to measurable financial and
                operational impact. The strongest outcomes are concentrated among organisations deploying AI at scale
                across core processes rather than isolated pilots.
              </p>
              <div className="insight-grid">
                {keyInsights.map((item) => (
                  <div key={item.stat + item.detail} className="insight-card">
                    <p className="insight-stat">{item.stat}</p>
                    <p className="insight-detail">{item.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="whitepaper-section">
              <h2>Introduction</h2>
              <p>
                Over the past three years, major consulting firms including Boston Consulting Group, McKinsey,
                Deloitte, and PwC have published extensive research on the business impact of AI. The findings are
                increasingly aligned: AI adoption is shifting from pilot activity toward enterprise-scale transformation.
              </p>
              <p>
                While many organisations continue to test early use cases, high-performing companies are already
                capturing significant gains in productivity, cost efficiency, and commercial performance. This creates a
                widening gap between organisations that integrate AI strategically and those that remain in
                experimentation mode.
              </p>
            </section>

            <section className="whitepaper-section">
              <h2>Evidence from Global Research</h2>

              <section className="research-source-block">
                <h3>Boston Consulting Group</h3>
                <p>
                  <a href="https://www.bcg.com/publications/2025/are-you-generating-value-from-ai-the-widening-gap" target="_blank" rel="noopener noreferrer">
                    The Widening AI Value Gap (2025)
                  </a>
                </p>
                <ul>
                  <li>3x greater cost reductions among AI-leading organisations compared with lagging adopters.</li>
                  <li>Professionals using AI completed tasks 25% faster with 40% higher quality output (BCG-Harvard study).</li>
                  <li>Up to 90% cost reductions in customer service operations via AI automation.</li>
                  <li>20-30% savings in software engineering and maintenance.</li>
                </ul>
              </section>

              <section className="research-source-block">
                <h3>McKinsey &amp; Company</h3>
                <p>
                  <a href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai" target="_blank" rel="noopener noreferrer">
                    The State of AI (2025)
                  </a>
                </p>
                <ul>
                  <li>74% of organisations report a measurable ROI from AI within the first year.</li>
                  <li>The top 6% of high-performing firms attribute more than 5% of EBIT directly to AI adoption.</li>
                  <li>Strongest benefits are emerging across HR, IT, and service operations.</li>
                </ul>
              </section>

              <section className="research-source-block">
                <h3>Deloitte</h3>
                <p>
                  <a href="https://www.deloitte.com/dk/en/issues/generative-ai/state-of-ai-in-enterprise.html" target="_blank" rel="noopener noreferrer">
                    State of AI in the Enterprise (2026)
                  </a>
                </p>
                <ul>
                  <li>66% of organisations report measurable productivity and efficiency gains from AI.</li>
                  <li>34% of firms are using AI to transform core business processes.</li>
                  <li>40% of organisations cite cost reduction as a primary implementation benefit.</li>
                </ul>
              </section>

              <section className="research-source-block">
                <h3>PwC</h3>
                <p>
                  <a href="https://www.pwc.com/gx/en/news-room/press-releases/2025/ai-linked-to-a-fourfold-increase-in-productivity-growth.html" target="_blank" rel="noopener noreferrer">
                    Global AI Jobs Barometer (2025)
                  </a>
                </p>
                <ul>
                  <li>AI-exposed industries are seeing materially stronger productivity outcomes.</li>
                  <li>Revenue per employee increased by 27% in AI-intensive sectors versus 9% in less exposed sectors.</li>
                </ul>
              </section>
            </section>

            <section className="whitepaper-section">
              <h2>The Cost Compression Effect</h2>
              <p>
                A clear pattern emerging across these datasets is cost compression. AI is reducing the marginal cost of
                building and operating complex systems by automating repetitive workflows, accelerating production
                cycles, and improving output quality simultaneously.
              </p>
              <p>
                The practical implication is significant: capabilities that previously required long delivery horizons
                and heavy engineering spend are increasingly deliverable through leaner teams, faster development
                sprints, and lower operating cost structures.
              </p>
            </section>

            <section className="whitepaper-section">
              <h2>Implications for Businesses</h2>
              <p>
                For business leaders evaluating AI initiatives, the directional evidence is now unambiguous. The
                highest returns are being realised by organisations deploying AI strategically across core business
                functions rather than running disconnected pilots.
              </p>
              <p>
                As capabilities continue to mature, early and disciplined adopters are likely to secure a
                disproportionate competitive advantage through:
              </p>
              <ul>
                <li>More efficient operating models</li>
                <li>Improved cost structures</li>
                <li>Higher workforce productivity</li>
                <li>Stronger revenue expansion potential</li>
              </ul>
              <p>
                The emerging divide is best understood as an AI value shift: from experimentation to measurable business
                impact.
              </p>
            </section>

            <section className="research-related">
              <h2>Further Reading</h2>
              <div className="research-related-grid">
                {relatedResearch.map((paper) => (
                  <a
                    key={paper.id}
                    href={paper.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="research-related-card"
                  >
                    <div className="research-related-thumb" aria-hidden="true">
                      <img src={paper.thumbnail} alt="" className="research-related-thumb-image" />
                    </div>
                    <h3>{paper.title}</h3>
                    <p>{paper.summary}</p>
                  </a>
                ))}
              </div>
            </section>
          </article>
        )}
      </main>
    </div>
  )
}
