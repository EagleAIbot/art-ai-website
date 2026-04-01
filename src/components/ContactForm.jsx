import { useState } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const formspreeId = import.meta.env.VITE_FORMSPREE_ID?.trim()
      if (!formspreeId) throw new Error('FORMSPREE_NOT_CONFIGURED')

      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
          _subject: `New Shift AI enquiry from ${formData.name}`,
        }),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        let msg = 'Something went wrong. Please email us directly at jack@shiftaitech.com.'
        try {
          const payload = await res.json()
          if (payload?.errors?.[0]?.message) msg = payload.errors[0].message
        } catch { /* keep default */ }
        setError(msg)
      }
    } catch (err) {
      if (err instanceof Error && err.message === 'FORMSPREE_NOT_CONFIGURED') {
        setError('Contact form is not configured yet. Please add VITE_FORMSPREE_ID in .env.local.')
      } else {
        setError('Network error. Please email us directly at jack@shiftaitech.com.')
      }
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <motion.div
        className="contact-form-success"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <CheckCircle2 size={40} />
        <h3>Message received</h3>
        <p>We&apos;ll respond within 24 hours.</p>
        <button
          className="contact-form-reset"
          onClick={() => {
            setSubmitted(false)
            setFormData({ name: '', email: '', company: '', message: '' })
          }}
        >
          Send another message
        </button>
      </motion.div>
    )
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form-row">
        <div className="contact-form-group">
          <label htmlFor="cf-name">Name</label>
          <input
            id="cf-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your name"
          />
        </div>
        <div className="contact-form-group">
          <label htmlFor="cf-email">Email</label>
          <input
            id="cf-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="you@company.com"
          />
        </div>
      </div>
      <div className="contact-form-group">
        <label htmlFor="cf-company">Company <span className="contact-form-optional">(optional)</span></label>
        <input
          id="cf-company"
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Your company"
        />
      </div>
      <div className="contact-form-group">
        <label htmlFor="cf-message">Project details</label>
        <textarea
          id="cf-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="5"
          placeholder="Describe your project, goals, and timeline"
        />
      </div>
      <button type="submit" className="contact-form-submit" disabled={loading}>
        {loading ? 'Sending\u2026' : <><span>Send Message</span> <ArrowRight size={16} /></>}
      </button>
      {error && (
        <p className="contact-form-error">
          {error}
        </p>
      )}
    </form>
  )
}
