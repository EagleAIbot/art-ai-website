import './PartnersPage.css'

const teamMembers = [
  {
    name: 'Founder Name',
    role: 'Founder & AI Product Lead',
    summary:
      'Owns product direction, client strategy, and delivery outcomes. Replace this with a short founder bio and background.',
  },
  {
    name: 'Team Member Name',
    role: 'Machine Learning Engineer',
    summary:
      'Builds model pipelines, evaluation workflows, and deployment infrastructure. Replace with real profile details.',
  },
  {
    name: 'Team Member Name',
    role: 'Automation & Integrations Engineer',
    summary:
      'Designs end-to-end automations, API integrations, and agent workflows. Replace with real profile details.',
  },
]

export default function PartnersPage() {
  return (
    <div className="partners-page">
      <header className="partners-header">
        <a href="/" className="partners-logo-link" aria-label="Shift AI home">
          <img src="/logo.svg" alt="Shift AI logo" className="partners-logo-image" />
        </a>
        <nav className="partners-nav">
          <a href="/#projects" className="partners-nav-link">Projects</a>
          <a href="/#solutions" className="partners-nav-link">Solutions</a>
          <a href="/partners" className="partners-nav-link active">Partners</a>
          <a href="/#work-with-us" className="partners-nav-link">Work With Us</a>
          <a href="/our-story" className="partners-nav-link">Our Story</a>
          <a href="/blog" className="partners-nav-link">Blog</a>
        </nav>
      </header>

      <main className="partners-main">
        <section className="partners-hero">
          <p className="partners-kicker">Partners</p>
          <h1 className="partners-title">Meet the team behind Shift</h1>
          <p className="partners-subtitle">
            This page acts as an introduction to your core team members. Replace each profile with real names, photos,
            and details as you finalise your company profile.
          </p>
        </section>

        <section className="partners-grid">
          {teamMembers.map((member) => (
            <article key={member.name + member.role} className="partners-card">
              <p className="partners-type">{member.role}</p>
              <h2 className="partners-name">{member.name}</h2>
              <p className="partners-summary">{member.summary}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}
