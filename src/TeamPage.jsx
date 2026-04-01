import { motion } from 'framer-motion'
import { Container, SectionLabel, Button } from './components/ui'
import './TeamPage.css'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

const teamProfiles = [
  {
    name: 'Your Name',
    role: 'Founder & AI Product Lead',
    location: 'United Kingdom',
    bio: 'Add a short 2–3 sentence bio here covering background, specialism, and the kind of business outcomes this person drives.',
    skills: ['AI Strategy', 'Product Delivery', 'LLM Solutions'],
    email: 'hello@yourcompany.com',
    linkedin: '#',
  },
  {
    name: 'Team Member Name',
    role: 'Machine Learning Engineer',
    location: 'United Kingdom',
    bio: 'Add profile details, technical strengths, and examples of the projects this person typically supports.',
    skills: ['Model Training', 'RAG Pipelines', 'MLOps'],
    email: 'member@yourcompany.com',
    linkedin: '#',
  },
  {
    name: 'Team Member Name',
    role: 'Automation & Integrations Engineer',
    location: 'United Kingdom',
    bio: 'Describe this person in practical terms: what they build, what business problems they solve, and what tools they use.',
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
    <div className="subpage team-page">
      <section className="subpage-hero">
        <Container>
          <motion.div {...fadeUp}>
            <SectionLabel>Team</SectionLabel>
            <h1 className="subpage-title">Meet the People Behind Shift</h1>
            <p className="subpage-sub">
              This page is a ready-to-edit template. Add photos, bios, and links for each team member.
            </p>
          </motion.div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="team-grid">
            {teamProfiles.map((member, i) => (
              <motion.article
                key={i}
                className="team-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="team-card-header">
                  <div className="team-avatar">{initialsFor(member.name)}</div>
                  <div>
                    <h2 className="team-name">{member.name}</h2>
                    <p className="team-role">{member.role}</p>
                    <p className="team-location">{member.location}</p>
                  </div>
                </div>
                <p className="team-bio">{member.bio}</p>
                <div className="team-skills">
                  {member.skills.map((s) => (
                    <span key={s} className="tag">{s}</span>
                  ))}
                </div>
                <div className="team-links">
                  <a href={`mailto:${member.email}`} className="team-link">Email</a>
                  <a href={member.linkedin} className="team-link">LinkedIn</a>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="team-cta">
            <Button href="/#contact">Start a Project</Button>
          </div>
        </Container>
      </section>
    </div>
  )
}
