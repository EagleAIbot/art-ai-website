import { motion } from 'framer-motion'
import { Container, SectionLabel } from './components/ui'
import './PartnersPage.css'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

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
    <div className="subpage partners-page">
      <section className="subpage-hero">
        <Container>
          <motion.div {...fadeUp}>
            <SectionLabel>Partners</SectionLabel>
            <h1 className="subpage-title">Meet the Team Behind Shift</h1>
            <p className="subpage-sub">
              Introduction to the core team. Replace each profile with real names, photos, and details as you finalise.
            </p>
          </motion.div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="partners-grid">
            {teamMembers.map((member, i) => (
              <motion.article
                key={member.name + member.role}
                className="partner-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <p className="partner-role">{member.role}</p>
                <h2 className="partner-name">{member.name}</h2>
                <p className="partner-summary">{member.summary}</p>
              </motion.article>
            ))}
          </div>
        </Container>
      </section>
    </div>
  )
}
