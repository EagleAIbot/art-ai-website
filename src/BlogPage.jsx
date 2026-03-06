import './BlogPage.css'

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
    <div className="blog-page">
      <header className="blog-header">
        <a href="/" className="blog-logo-link" aria-label="Shift AI home">
          <img src="/logo-with-border.png" alt="Shift AI logo" className="blog-logo-image" />
        </a>
        <nav className="blog-nav">
          <a href="/#projects" className="blog-nav-link">Projects</a>
          <a href="/#solutions" className="blog-nav-link">Solutions</a>
          <a href="/team" className="blog-nav-link">Team</a>
          <a href="/#work-with-us" className="blog-nav-link">Work With Us</a>
          <a href="/blog" className="blog-nav-link active">Blog</a>
          <a href="/#contact" className="blog-nav-link">Contact</a>
        </nav>
      </header>

      <main className="blog-main">
        <section className="blog-hero">
          <p className="blog-kicker">Shift Journal</p>
          <h1>
            Insights from high-performance
            <span className="blog-title-accent"> AI delivery teams</span>
          </h1>
          <p>
            Internal draft board for upcoming blog content and release planning.
          </p>
        </section>

        <section className="blog-posts">
          {DRAFT_POSTS.map((post) => (
            <article className="blog-post-card" key={post.id}>
              <p className="blog-post-meta">{post.author} - Drafted {post.draftDate}</p>
              <h2>{post.title}</h2>
              {post.excerpt ? <p className="blog-post-excerpt">{post.excerpt}</p> : null}
              <p>{post.content}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}
