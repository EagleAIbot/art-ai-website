import './TeamPage.css'

const teamProfiles = [
  {
    name: 'Your Name',
    role: 'Founder & AI Product Lead',
    location: 'United Kingdom',
    bio: 'Add a short 2-3 sentence bio here covering background, specialism, and the kind of business outcomes this person drives.',
    image: '',
    skills: ['AI Strategy', 'Product Delivery', 'LLM Solutions'],
    email: 'hello@yourcompany.com',
    linkedin: '#',
  },
  {
    name: 'Team Member Name',
    role: 'Machine Learning Engineer',
    location: 'United Kingdom',
    bio: 'Add profile details, technical strengths, and examples of the projects this person typically supports.',
    image: '',
    skills: ['Model Training', 'RAG Pipelines', 'MLOps'],
    email: 'member@yourcompany.com',
    linkedin: '#',
  },
  {
    name: 'Team Member Name',
    role: 'Automation & Integrations Engineer',
    location: 'United Kingdom',
    bio: 'Describe this person in practical terms: what they build, what business problems they solve, and what tools they use.',
    image: '',
    skills: ['Workflow Automation', 'API Integrations', 'Agent Systems'],
    email: 'member@yourcompany.com',
    linkedin: '#',
  },
]

function initialsFor(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export default function TeamPage() {
  return (
    <div className="team-page">
      <header className="team-header">
        <a href="/" className="team-logo-link">
          <img src="/logo-with-border.png" alt="Shift logo" className="team-logo" />
        </a>
        <nav className="team-nav">
          <a href="/#projects" className="team-nav-link">Projects</a>
          <a href="/#solutions" className="team-nav-link">Solutions</a>
          <a href="/team" className="team-nav-link active">Team</a>
          <a href="/#work-with-us" className="team-nav-link">Work With Us</a>
          <a href="/blog" className="team-nav-link">Blog</a>
          <a href="/#contact" className="team-nav-link">Contact</a>
        </nav>
      </header>

      <main className="team-main">
        <section className="team-hero">
          <p className="team-label">Team</p>
          <h1 className="team-title">Meet the people behind Shift</h1>
          <p className="team-subtitle">
            This page is a ready-to-edit template. Add photos, bios, and links for each team member.
          </p>
        </section>

        <section className="team-grid">
          {teamProfiles.map((member, idx) => (
            <article key={idx} className="team-card">
              <div className="team-card-top">
                {member.image ? (
                  <img src={member.image} alt={member.name} className="team-photo" />
                ) : (
                  <div className="team-photo team-photo-placeholder">{initialsFor(member.name)}</div>
                )}
                <div className="team-meta">
                  <h2 className="team-name">{member.name}</h2>
                  <p className="team-role">{member.role}</p>
                  <p className="team-location">{member.location}</p>
                </div>
              </div>

              <p className="team-bio">{member.bio}</p>

              <div className="team-skills">
                {member.skills.map((skill, skillIdx) => (
                  <span key={skillIdx} className="team-skill">{skill}</span>
                ))}
              </div>

              <div className="team-links">
                <a href={`mailto:${member.email}`} className="team-link">Email</a>
                <a href={member.linkedin} className="team-link">LinkedIn</a>
              </div>
            </article>
          ))}
        </section>

        <section className="team-cta-row">
          <a href="/#contact" className="team-cta-btn">Start a Project</a>
        </section>
      </main>
    </div>
  )
}
