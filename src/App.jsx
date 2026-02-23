import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Sparkles, 
  Brain, 
  Zap, 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin,
  CheckCircle2,
  Cpu,
  TrendingUp,
  Shield
} from 'lucide-react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // For now, just show success message
    // In production, this would send to a backend/API
    setFormSubmitted(true)
    console.log('Form submitted:', formData)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const services = [
    {
      icon: Brain,
      title: "AI Strategy & Consulting",
      description: "Transform your business with intelligent AI solutions tailored to your needs",
      color: "#8B5CF6"
    },
    {
      icon: Cpu,
      title: "Custom AI Development",
      description: "Build powerful AI products from concept to deployment with cutting-edge technology",
      color: "#3B82F6"
    },
    {
      icon: TrendingUp,
      title: "AI Optimization",
      description: "Reduce costs and maximize efficiency with intelligent automation and optimization",
      color: "#10B981"
    }
  ]

  const benefits = [
    { icon: Zap, text: "Lightning-fast implementation" },
    { icon: TrendingUp, text: "High margins, low costs" },
    { icon: Shield, text: "Enterprise-grade security" },
    { icon: Sparkles, text: "Cutting-edge AI technology" }
  ]

  return (
    <div className="app">
      {/* Hero Section */}
      <section className="hero">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="logo-badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Sparkles className="logo-icon" />
            <span>Art AI</span>
          </motion.div>

          <h1 className="hero-title">
            Building Tomorrow's
            <span className="gradient-text"> AI Solutions</span>
            <br />
            Today
          </h1>

          <p className="hero-subtitle">
            We craft intelligent AI products and solutions that keep your costs low and margins high.
            <br />
            Transform your business with cutting-edge artificial intelligence.
          </p>

          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <a href="#contact" className="btn btn-primary">
              Get Started <ArrowRight size={20} />
            </a>
            <a href="#services" className="btn btn-secondary">
              Our Services
            </a>
          </motion.div>

          <motion.div 
            className="benefits-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-item">
                <benefit.icon size={18} className="benefit-icon" />
                <span>{benefit.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="hero-bg-gradient"></div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">What We Do</h2>
            <p className="section-subtitle">
              Comprehensive AI solutions designed to accelerate your business growth
            </p>
          </motion.div>

          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="service-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="service-icon" style={{ background: `${service.color}15` }}>
                  <service.icon size={32} color={service.color} />
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-wrapper">
            <motion.div
              className="contact-info"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="contact-title">Let's Build Something Amazing</h2>
              <p className="contact-subtitle">
                Ready to transform your business with AI? Get in touch and let's discuss how we can help.
              </p>

              <div className="contact-details">
                <div className="contact-item">
                  <Mail className="contact-icon" />
                  <div>
                    <div className="contact-label">Email</div>
                    <a href="mailto:hello@artai.com" className="contact-link">hello@artai.com</a>
                  </div>
                </div>

                <div className="contact-item">
                  <MapPin className="contact-icon" />
                  <div>
                    <div className="contact-label">Location</div>
                    <div className="contact-value">Dubai, UAE</div>
                  </div>
                </div>
              </div>

              <div className="contact-cta">
                <Brain className="cta-icon" />
                <div>
                  <div className="cta-title">AI-Powered Solutions</div>
                  <div className="cta-text">Low costs. High margins. Exceptional results.</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="contact-form-wrapper"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {!formSubmitted ? (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@company.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary btn-full">
                    Send Message <ArrowRight size={20} />
                  </button>
                </form>
              ) : (
                <motion.div
                  className="form-success"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <CheckCircle2 className="success-icon" size={64} />
                  <h3>Thank You!</h3>
                  <p>We've received your message and will get back to you within 24 hours.</p>
                  <button 
                    onClick={() => {
                      setFormSubmitted(false)
                      setFormData({ name: '', email: '', company: '', message: '' })
                    }}
                    className="btn btn-secondary"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <Sparkles className="footer-logo" />
              <span>Art AI</span>
            </div>
            <p className="footer-text">
              © 2026 Art AI. Building the future with artificial intelligence.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
