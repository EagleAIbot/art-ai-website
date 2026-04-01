import { motion } from 'framer-motion'
import { Container, SectionLabel } from './components/ui'
import './BlogPage.css'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

const DRAFT_POSTS = [
  {
    id: 'launching-hyper-agile-ai-teams',
    title: 'Launching Hyper Agile AI Teams',
    excerpt: 'How we take ideas from concept to shipped product in days, not quarters.',
    content:
      'Hyper agile teams are built around tight feedback loops, real users, and measurable milestones. At Shift AI, we pair proven experts with practical delivery rituals so product momentum never stalls.',
    author: 'Shift Editorial',
    draftDate: '2026-03-01',
  },
  {
    id: 'what-we-automate-first',
    title: 'What We Automate First',
    excerpt: 'A practical framework for choosing the highest-impact AI automations.',
    content:
      'The fastest wins usually sit in repetitive workflows with clear inputs and measurable outcomes. We start there, prove value quickly, and then scale with confidence.',
    author: 'Delivery Team',
    draftDate: '2026-03-04',
  },
  {
    id: 'designing-ai-with-humans-in-loop',
    title: 'Designing AI with Humans in the Loop',
    excerpt: 'Why human oversight still matters in high-speed AI systems.',
    content:
      'Reliable AI products balance autonomy with clear checkpoints. Human-in-the-loop design helps teams maintain trust, accountability, and quality as systems evolve.',
    author: 'Product Strategy',
    draftDate: '2026-03-05',
  },
]

export default function BlogPage() {
  return (
    <div className="subpage blog-page">
      <section className="subpage-hero">
        <Container>
          <motion.div {...fadeUp}>
            <SectionLabel>Shift Journal</SectionLabel>
            <h1 className="subpage-title">
              Insights from High-Performance <span className="text-accent">AI Delivery Teams</span>
            </h1>
            <p className="subpage-sub">
              Internal draft board for upcoming blog content and release planning.
            </p>
          </motion.div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="blog-grid">
            {DRAFT_POSTS.map((post, i) => (
              <motion.article
                key={post.id}
                className="blog-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <p className="blog-card-meta">{post.author} &middot; {post.draftDate}</p>
                <h2 className="blog-card-title">{post.title}</h2>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <p className="blog-card-body">{post.content}</p>
              </motion.article>
            ))}
          </div>
        </Container>
      </section>
    </div>
  )
}
