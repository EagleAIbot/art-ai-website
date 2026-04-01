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
    name: 'Jack Rockell',
    role: 'Partner',
    image: `${import.meta.env.BASE_URL}jack-rockell.png`,
    summary:
      'Co-founder of Shift AI Tech. Leads product strategy, client partnerships, and technical delivery across AI and web projects.',
  },
  {
    name: 'Darren Bishop',
    role: 'Partner',
    image: `${import.meta.env.BASE_URL}darren-bishop.png`,
    summary:
      'Co-founder of Shift AI Tech. Drives business development, operations, and growth strategy across the company.',
  },
]

export default function PartnersPage() {
  return (
    <div className="subpage partners-page">
      <section className="subpage-hero">
        <Container>
          <motion.div {...fadeUp}>
            <SectionLabel>Partners</SectionLabel>
            <h1 className="subpage-title">Meet the Partners Behind Shift</h1>
            <p className="subpage-sub">
              The people driving Shift AI Tech forward. Strategy, delivery, and growth.
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
                {member.image && (
                  <div className="partner-img-wrap">
                    <img src={member.image} alt={member.name} className="partner-img" />
                  </div>
                )}
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
