import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { useAppStore } from './store/useAppStore'
import { 
  ArrowRight, 
  Mail, 
  MapPin,
  CheckCircle2,
  MessageSquare,
  Zap,
  BarChart3,
  Bot,
  Search,
  FileText,
  Workflow,
  Phone,
  Database,
  TrendingUp,
  Activity,
  Shield,
  LineChart,
  AlertTriangle,
  Cpu,
  Globe,
  Layers
} from 'lucide-react'
import HeroScene from './HeroScene'
import StatsScene from './StatsScene'
import { CounterStat } from './components/CounterStat'
import './App.css'

function HeroEnergyOverlay() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const particles = []
    let rafId = 0
    let width = 0
    let height = 0
    let dpr = 1
    let isMobile = false

    const createParticle = () => {
      const angle = Math.random() * Math.PI * 2
      const speed = 0.09 + Math.random() * 0.18
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 1.4 + Math.random() * 2.2,
        twinkle: Math.random() * Math.PI * 2,
      }
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      isMobile = width <= 768
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const targetCount = isMobile
        ? Math.max(42, Math.floor((width * height) / 19000))
        : Math.max(30, Math.floor((width * height) / 30000))
      const minSpacing = isMobile
        ? Math.min(68, Math.max(36, Math.min(width, height) * 0.06))
        : Math.min(95, Math.max(58, Math.min(width, height) * 0.085))
      const nextParticles = []
      let attempts = 0
      const maxAttempts = targetCount * 45

      while (nextParticles.length < targetCount && attempts < maxAttempts) {
        const p = createParticle()
        let valid = true
        for (let i = 0; i < nextParticles.length; i++) {
          const q = nextParticles[i]
          if (Math.hypot(p.x - q.x, p.y - q.y) < minSpacing) {
            valid = false
            break
          }
        }
        if (valid) nextParticles.push(p)
        attempts++
      }

      while (nextParticles.length < targetCount) nextParticles.push(createParticle())
      particles.length = 0
      particles.push(...nextParticles)
    }

    const draw = (timeMs) => {
      const t = timeMs * 0.001
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.twinkle += 0.03

        if (p.x < -24) p.x = width + 24
        if (p.x > width + 24) p.x = -24
        if (p.y < -24) p.y = height + 24
        if (p.y > height + 24) p.y = -24
      }

      const maxDist = isMobile ? Math.min(260, width * 0.42) : Math.min(300, width * 0.23)
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist > maxDist) continue

          const energy = Math.max(0, 1 - dist / maxDist)
          const pulse = 0.6 + 0.4 * Math.sin(t * 2.4 + (i + j) * 0.2)
          const alpha = energy * energy * 0.68 * pulse
          ctx.strokeStyle = `rgba(147, 51, 234, ${alpha})`
          ctx.lineWidth = 0.55 + energy * 1.45
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 7.5)
        glow.addColorStop(0, 'rgba(168, 85, 247, 0.93)')
        glow.addColorStop(0.4, 'rgba(126, 34, 206, 0.54)')
        glow.addColorStop(1, 'rgba(88, 28, 135, 0)')
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius * 7.5, 0, Math.PI * 2)
        ctx.fill()

        const coreAlpha = 0.75 + 0.25 * Math.sin(p.twinkle)
        ctx.fillStyle = `rgba(233, 213, 255, ${coreAlpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      rafId = requestAnimationFrame(draw)
    }

    resize()
    rafId = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-energy-canvas" aria-hidden="true" />
}

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  const [formError, setFormError] = useState(false)
  const tickerRef = useRef(null)

  const { sceneLoaded, setAnimationsReady, setFinished } = useAppStore()

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // State machine: sceneLoaded → animationsReady → isFinished
  useEffect(() => {
    if (!sceneLoaded) return
    const t1 = setTimeout(() => setAnimationsReady(), 150)
    const t2 = setTimeout(() => setFinished(), 1000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [sceneLoaded])

  // Fallback so hero copy still appears even if 3D init lags.
  useEffect(() => {
    const t = setTimeout(() => {
      setAnimationsReady()
      setFinished()
    }, 2200)
    return () => clearTimeout(t)
  }, [setAnimationsReady, setFinished])

  // Hero text stagger — fires when animationsReady flips true
  const animationsReady = useAppStore((s) => s.animationsReady)
  useEffect(() => {
    if (!animationsReady) return
    const tl = gsap.timeline()
    tl.fromTo('.hero-title',    { opacity: 0, y: 55 }, { opacity: 1, y: 0, duration: 1,   ease: 'power3.out' })
      .fromTo('.hero-subtitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.55')
      .fromTo('.hero-cta-wrap', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.45')
  }, [animationsReady])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormLoading(true)
    setFormError(false)
    try {
      const res = await fetch(`https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setFormSubmitted(true)
      } else {
        setFormError(true)
      }
    } catch {
      setFormError(true)
    } finally {
      setFormLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const services = [
    {
      number: "01",
      title: "Custom AI Models",
      description: "Fine-tuned models, RAG pipelines, predictive systems, autonomous agents. If it involves building or deploying an AI model, we've done it. We work with GPT-4o, Claude, Llama, Mistral, and custom-trained architectures."
    },
    {
      number: "02",
      title: "Full Product Builds",
      description: "End-to-end development of AI-powered products, from initial concept through to live deployment. We own the full stack: frontend, backend, model integration, infrastructure."
    },
    {
      number: "03",
      title: "Process Automation",
      description: "Replace manual, repetitive work with intelligent automation. Multi-step workflows, browser agents, data pipelines, email sequences. We build systems that run themselves."
    },
    {
      number: "04",
      title: "AI Strategy",
      description: "Not sure where AI fits in your business? We map the opportunity, identify the highest-ROI use cases, build the roadmap, and give you a clear picture of cost and timeline before you commit to anything."
    }
  ]

  const useCases = [
    { icon: MessageSquare, title: "AI Chatbots", desc: "Customer support, lead qualification, and sales automation that works 24/7" },
    { icon: FileText, title: "Document AI", desc: "Extract, analyse, and act on data from contracts, invoices, and reports instantly" },
    { icon: BarChart3, title: "Predictive Models", desc: "Demand forecasting, pricing engines, risk scoring. Models trained on your actual data." },
    { icon: Search, title: "AI Search", desc: "Semantic search across your internal knowledge base, product catalogue, or document store" },
    { icon: Workflow, title: "Workflow Automation", desc: "Multi-step business processes automated end-to-end, from data ingestion to output delivery." },
    { icon: Bot, title: "Custom LLM Solutions", desc: "Fine-tuned models and RAG pipelines trained on your proprietary data and domain knowledge" },
    { icon: Zap, title: "AI Agents", desc: "Autonomous pipelines that research, act, and deliver results without human input. Like having an employee that never sleeps." },
    { icon: Phone, title: "Voice AI", desc: "Phone agents that handle inbound calls, answer questions, and book appointments around the clock" },
    { icon: Database, title: "Data Pipelines", desc: "Ingest, clean, and structure messy data so your models have something solid to work with" },
  ]

  const process = [
    { n: "01", title: "Brief", desc: "We listen. Understand your goals, constraints, and where AI fits." },
    { n: "02", title: "Design", desc: "We design the solution architecture and agree scope and cost upfront." },
    { n: "03", title: "Build", desc: "Rapid development using the best AI tools available. No bloat, no waste." },
    { n: "04", title: "Deploy", desc: "We ship, monitor, and iterate. Ongoing support as you scale." },
  ]

  const techStack = [
    "GPT-4o", "Claude 3.5", "Gemini 2.0", "Llama 3", "Mistral",
    "LangChain", "Pinecone", "Bloomberg API", "Alpaca", "Interactive Brokers",
    "OpenAI API", "Anthropic API", "Polygon.io", "Refinitiv", "QuantLib",
  ]

  const portfolio = [
    {
      sector: "Crypto Markets",
      partner: "Eagle AI Labs",
      description: "AI price prediction models and market simulators built for crypto asset traders. Real-time inference on live order book data.",
      tags: ["Price Prediction", "Market Simulation", "Real-time AI"],
      accent: "#a855f7",
      logoMark: "EAL",
      logoPath: "/eai-logo.png",
      quote: "Shift delivered a working model fast and kept iterating with us in live market conditions.",
      reference: "Founder, Eagle AI Labs",
    },
    {
      sector: "Financial Markets",
      partner: "FX · Agriculture · Oil & Gas · Gold",
      description: "Multi-asset intelligence across traditional commodity and currency markets. Signal detection, risk modelling, and execution automation.",
      tags: ["FX", "Commodities", "Algo Trading"],
      accent: "#06b6d4",
      logoMark: "MAI",
      quote: "They translated a complex trading brief into a practical AI workflow that our team uses daily.",
      reference: "Head of Trading Ops, Multi-Asset Desk",
    },
    {
      sector: "Sports",
      partner: "Pitch Predict",
      description: "AI-generated betting odds and outcome predictions for European football. Probabilistic modelling across leagues, form, and live match data.",
      tags: ["Football AI", "Odds Generation", "Predictive Models"],
      accent: "#10b981",
      logoMark: "PP",
      logoPath: "/pitch_predict_logo.svg",
      quote: "A different level of experience. We're live and ready for the FIFA World Cup.",
      reference: "Matt Simpson, CEO",
    },
    {
      sector: "Learning & Development",
      partner: "Commodity Partners",
      description: "Accredited AI learning and development courses. We built the AI-powered course platform and content delivery system.",
      tags: ["Accredited Courses", "AI Platform", "L&D Tech"],
      accent: "#f59e0b",
      logoMark: "CP",
      quote: "A rare team that balances technical depth with delivery speed and commercial focus.",
      reference: "Director, Commodity Partners",
    },
  ]

  const financeCapabilities = [
    {
      icon: TrendingUp,
      title: "Algorithmic Trading Systems",
      desc: "Custom algo strategies built and backtested on real market data. Execution automation across equities, FX, crypto, and derivatives."
    },
    {
      icon: Activity,
      title: "Signal Detection & Alpha Generation",
      desc: "ML models that scan price action, order flow, and alternative data to surface tradeable signals before they become obvious."
    },
    {
      icon: AlertTriangle,
      title: "Risk Modelling & Position Sizing",
      desc: "Real-time portfolio risk engines. VAR, drawdown limits, correlation matrices, and automated position management."
    },
    {
      icon: LineChart,
      title: "Market Sentiment Analysis",
      desc: "NLP pipelines that process news, earnings calls, social media, and analyst reports to quantify market sentiment in real time."
    },
    {
      icon: FileText,
      title: "Regulatory Intelligence (RegTech)",
      desc: "AI that monitors regulatory feeds, flags compliance risks, and drafts reports. Built for MiFID II, FCA, and ESMA frameworks."
    },
    {
      icon: Database,
      title: "Market Data Pipelines",
      desc: "High-throughput ingestion and structuring of tick data, order books, and alternative datasets. Clean data feeds your models can actually trust."
    },
    {
      icon: Cpu,
      title: "Quant Research Automation",
      desc: "Automate the research cycle — hypothesis generation, backtesting, parameter optimisation, and reporting — so your team ships strategies faster."
    },
    {
      icon: Globe,
      title: "Multi-Asset Intelligence Platforms",
      desc: "Unified dashboards and AI assistants that synthesise data across asset classes, portfolios, and geographies into a single view."
    },
  ]

  return (
    <div className="app">

      {/* Navigation */}
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <img
              src="/logo-with-border.png"
              alt="Shift AI Tech logo"
              className="nav-logo-image"
              onError={(e) => { e.currentTarget.src = '/vite.svg' }}
            />
          </div>
          <div className="nav-tabs">
            <a href="#projects" className="nav-tab">Projects</a>
            <a href="#solutions" className="nav-tab">Solutions</a>
            <a href="/team" className="nav-tab">Team</a>
            <a href="#work-with-us" className="nav-tab">Work With Us</a>
            <a href="#contact" className="nav-tab">Contact</a>
          </div>
          <a href="#contact" className="nav-build-btn">Let's Build</a>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="hero">
        <HeroScene />
        <HeroEnergyOverlay />
        <div className="hero-container">
          <div className="hero-title-wrap">
            <h1 className="hero-title">
              <span className="hero-title-line hero-title-line--top">Proven <span className="hero-title-accent">Hyper Agile</span></span>
              <span className="hero-title-line">AI Solutions.</span>
            </h1>
          </div>
          <p className="hero-subtitle">
            We build AI products using AI tools — making us faster, leaner,<br />and more responsive than 80% of technology firms.
          </p>
          <div className="hero-cta-wrap">
            <a href="#contact" className="hero-cta">Start a Project <ArrowRight size={18} /></a>
          </div>
        </div>
      </section>

      {/* ── Tech Ticker ──────────────────────────────── */}
      <div className="ticker-wrap">
        <div className="ticker-track">
          {[...techStack, ...techStack].map((t, i) => (
            <span key={i} className="ticker-item">{t}</span>
          ))}
        </div>
      </div>

      {/* ── 20% Differentiator Band ──────────────────── */}
      <section className="differentiator-band">
        <div className="differentiator-container">
          <motion.div className="differentiator-stat" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="differentiator-number">20%</span>
            <p className="differentiator-text">of technology firms build AI products using AI tools. We're one of them.</p>
          </motion.div>
          <div className="differentiator-divider" />
          <motion.div className="differentiator-pillars" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            {["Hyper Agile", "Income Generating", "Time Saving", "Cost Reducing"].map((p, i) => (
              <div key={i} className="differentiator-pill">{p}</div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Portfolio of Projects & Partners ─────────── */}
      <section id="projects" className="portfolio-section">
        <div className="portfolio-polygons" aria-hidden="true">
          <span className="poly-shape poly-shape-1" />
          <span className="poly-shape poly-shape-2" />
          <span className="poly-shape poly-shape-3" />
          <span className="poly-shape poly-shape-4" />
        </div>
        <div className="portfolio-container">
          <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="section-label">Proven track record</p>
            <h2 className="section-title">Portfolio of Projects &amp; Partners</h2>
            <p className="portfolio-intro">
              We are market agnostic. Proven solutions across financial markets, sports, and learning &amp; development.
            </p>
          </motion.div>
          <div className="portfolio-grid">
            {portfolio.map((p, i) => (
              <motion.div key={i} className="portfolio-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                <div className="portfolio-card-top">
                  <span className="portfolio-sector" style={{ color: p.accent, borderColor: p.accent + '33', background: p.accent + '11' }}>{p.sector}</span>
                  <div className="portfolio-logo-mark">
                    {p.logoPath ? (
                      <img src={p.logoPath} alt={`${p.partner} logo`} className="portfolio-logo-image" />
                    ) : (
                      p.logoMark
                    )}
                  </div>
                </div>
                <h3 className="portfolio-partner">{p.partner}</h3>
                <p className="portfolio-desc">{p.description}</p>
                <div className="portfolio-quote-wrap">
                  <p className="portfolio-quote">"{p.quote}"</p>
                  <p className="portfolio-reference">{p.reference}</p>
                </div>
                <div className="portfolio-tags">
                  {p.tags.map((t, j) => (
                    <span key={j} className="portfolio-tag">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Financial Markets ────────────────────────── */}
      <section id="markets" className="finance-section">
        <div className="finance-container">
          <motion.div className="finance-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="section-label finance-label">Core Speciality</p>
            <h2 className="finance-title">Built for financial markets</h2>
            <p className="finance-subtitle">
              Financial markets are our home ground. We build AI systems that trade, analyse, predict, and report — 
              with the rigour that regulated markets demand and the speed that gives you edge.
            </p>
          </motion.div>

          <div className="finance-grid">
            {financeCapabilities.map((cap, i) => (
              <motion.div key={i} className="finance-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }}>
                <div className="finance-card-icon">
                  <cap.icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="finance-card-title">{cap.title}</h3>
                <p className="finance-card-desc">{cap.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div className="finance-cta-row" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            <a href="#contact" className="finance-cta-btn">Discuss a markets project <ArrowRight size={18} /></a>
            <span className="finance-cta-note">Equities · FX · Crypto · Derivatives · Fixed Income</span>
          </motion.div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────── */}
      <section id="solutions" className="services">
        <div className="services-container">
          <motion.div className="services-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="section-label">Services</p>
            <h2 className="services-title">What we do</h2>
          </motion.div>
          <div className="services-list">
            {services.map((s, i) => (
              <motion.div key={i} className="service-item" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <div className="service-number">{s.number}</div>
                <div className="service-content">
                  <h3 className="service-title">{s.title}</h3>
                  <p className="service-description">{s.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Use Cases ────────────────────────────────── */}
      <section className="use-cases">
        <div className="use-cases-container">
          <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="section-label">What we build</p>
            <h2 className="section-title">If it runs on AI, <span className="section-title-accent">we build it</span></h2>
          </motion.div>
          <div className="use-cases-grid">
            {useCases.map((u, i) => (
              <motion.div key={i} className="use-case-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}>
                <div className="use-case-icon">
                  <u.icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="use-case-title">{u.title}</h3>
                <p className="use-case-desc">{u.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats / 3D Section ───────────────────────── */}
      <section className="stats">
        <StatsScene />
        <div className="stats-container">
          {[
            { value: "Day 1", label: "Useful output from day one. No lengthy onboarding." },
            { value: "Weeks", label: "Typical time from brief to working prototype" },
            { value: "UK", label: "Based in the UK, working with businesses across Britain." },
            { value: "24/7", label: "AI systems that work while you sleep" },
            { value: "100%", label: "Founder-led. You talk directly to the people building it." },
            { value: "Frontier", label: "GPT-4o, Claude, Gemini, Llama. Always the best model for the job." },
          ].map((s, i) => (
            <motion.div key={i} className="stat-item" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }}>
              <CounterStat value={s.value} label={s.label} />
              <div className="stat-label">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Process ──────────────────────────────────── */}
      <section id="work-with-us" className="process">
        <div className="process-container">
          <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="section-label">How we work</p>
            <h2 className="section-title">From idea to live in weeks</h2>
          </motion.div>
          <div className="process-grid">
            {process.map((p, i) => (
              <motion.div key={i} className="process-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <div className="process-number">{p.n}</div>
                <h3 className="process-title">{p.title}</h3>
                <p className="process-desc">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mid-page CTA ─────────────────────────────── */}
      <section className="cta-band">
        <div className="cta-band-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="cta-band-title">Ready to cut costs<br />and build smarter?</h2>
            <p className="cta-band-sub">One-off projects or ongoing retainers. No account managers. No nonsense.</p>
            <a href="#contact" className="cta-band-btn">Get a free consultation <ArrowRight size={18} /></a>
          </motion.div>
        </div>
      </section>

      {/* ── Local Business ───────────────────────────── */}
      <section id="local-business" className="local-biz">
        <div className="local-biz-container">
          <motion.div className="local-biz-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="section-label local-biz-label">For UK local businesses</p>
            <h2 className="local-biz-title">Something on your website<br />is costing you customers.</h2>
            <p className="local-biz-intro">
              Most local businesses we work with (dentists, gyms, roofers, electricians, salons) are losing 2 to 5 enquiries a week without knowing it. Slow site, not showing up on Google, no way to book out of hours. We audit your digital presence for free and tell you exactly what's happening. Then we fix it.
            </p>
          </motion.div>

          <div className="local-biz-steps">
            {[
              {
                n: "01",
                title: "Free audit, 48 hours",
                desc: "We look at your website speed, Google Business Profile, local search rankings, online booking, and reviews. You get a plain-English report back in 48 hours. No jargon, no obligation, no sales pitch."
              },
              {
                n: "02",
                title: "We fix what's broken",
                desc: "Site too slow? We'll fix it. Not showing up on Google Maps? We'll sort your listing. No way for customers to book or enquire online? We'll build that. Every fix is priced upfront with no surprises."
              },
              {
                n: "03",
                title: "AI receptionist",
                desc: "An AI that answers your phone, handles common questions, and books appointments, even at 11pm on a Sunday. You stop losing jobs to voicemail. Set up in a week, runs itself after that."
              }
            ].map((step, i) => (
              <motion.div key={i} className="local-biz-step" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <div className="local-biz-step-num">{step.n}</div>
                <h3 className="local-biz-step-title">{step.title}</h3>
                <p className="local-biz-step-desc">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div className="local-biz-pricing" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <p className="local-biz-pricing-label">What it costs</p>
            <div className="local-biz-pricing-grid">
              {[
                { service: "Digital audit + full report", price: "Free" },
                { service: "Google listing fix + profile setup", price: "From £200" },
                { service: "New website (fast, mobile, converts)", price: "From £1,500" },
                { service: "AI receptionist", price: "From £300/month" },
                { service: "SEO + ongoing maintenance", price: "From £200/month" },
              ].map((row, i) => (
                <div key={i} className="local-biz-pricing-row">
                  <span className="local-biz-pricing-service">{row.service}</span>
                  <span className="local-biz-pricing-price">{row.price}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div className="local-biz-cta" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            <a href="#contact" className="local-biz-btn">Get your free audit <ArrowRight size={18} /></a>
            <span className="local-biz-note">No commitment. 48-hour turnaround. Plain English results.</span>
          </motion.div>
        </div>
      </section>

      {/* ── Why Us ───────────────────────────────────── */}
      <section className="why-us">
        <div className="why-us-container">
          <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="section-label">Why Shift AI Tech</p>
            <h2 className="section-title">This is why we're different</h2>
          </motion.div>
          <div className="why-grid">
            {[
              { title: "We build AI using AI", desc: "Only 20% of technology firms build AI products using AI tools. We're in that 20%. It means we move faster, iterate quicker, and pass the cost savings directly to you." },
              { title: "Hyper agile by design", desc: "No legacy processes. No bloated teams. We're structured to move at the speed of the market — from brief to working product in weeks, not quarters." },
              { title: "We save you time and money", desc: "Friction-free development spend. Everything is scoped, priced, and delivered with zero waste. You pay for results, not hours." },
              { title: "Market agnostic", desc: "We provide proven solutions across financial markets, sports, and learning & development. If there's data and a problem, we can build the AI." },
            ].map((w, i) => (
              <motion.div key={i} className="why-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <div className="why-dot" />
                <h3 className="why-title">{w.title}</h3>
                <p className="why-desc">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Scenarios ────────────────────────────────── */}
      <section className="scenarios">
        <div className="scenarios-container">
          <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="section-label">Real problems we solve</p>
            <h2 className="section-title">What this looks like in practice</h2>
          </motion.div>
          <div className="scenarios-grid">
            {[
              {
                type: "Financial markets",
                problem: "A proprietary trading firm was manually reviewing news and earnings releases to inform short-term equity positions. The process was slow, inconsistent, and limited to what the team could physically read.",
                built: "We built a real-time sentiment pipeline ingesting news feeds, SEC filings, and earnings call transcripts. An LLM scores each event by expected price impact and direction, feeding directly into their pre-trade screening workflow.",
                outcome: "Analysis time cut from 40 minutes to under 90 seconds per event."
              },
              {
                type: "Local business",
                problem: "A dental practice in Manchester had no online booking, a site that took 5 seconds to load on mobile, and three unanswered Google reviews. They had no idea how many enquiries they were losing.",
                built: "We audited the site, fixed their Google Business Profile, integrated an online booking system, and set up an AI receptionist for out-of-hours calls.",
                outcome: "£2,100 upfront. £300/month ongoing."
              },
              {
                type: "AI product",
                problem: "A UK startup needed a recommendation engine to surface the right products to each visitor based on browsing behaviour — without a data science team to build or maintain it.",
                built: "We built a RAG-based recommendation pipeline trained on their product catalogue and user data. Integrated directly into their existing platform with no infrastructure changes needed.",
                outcome: "Delivered in under 3 weeks."
              },
              {
                type: "Process automation",
                problem: "A professional services firm had hundreds of client contracts in a shared drive. Finding key clauses, flagging renewals, and answering basic contract questions took hours of manual work every week.",
                built: "We built a document AI pipeline that ingests their contracts, extracts key terms, flags upcoming renewals, and answers plain-English questions about any document instantly.",
                outcome: "3+ hours saved per week from day one."
              }
            ].map((s, i) => (
              <motion.div key={i} className="scenario-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <div className="scenario-type">{s.type}</div>
                <div className="scenario-block">
                  <p className="scenario-label">The problem</p>
                  <p className="scenario-text">{s.problem}</p>
                </div>
                <div className="scenario-block">
                  <p className="scenario-label">What we built</p>
                  <p className="scenario-text">{s.built}</p>
                </div>
                <div className="scenario-outcome">{s.outcome}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────── */}
      <section id="contact" className="contact">
        <div className="contact-container">
          <motion.div className="contact-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="section-label" style={{ color: '#888' }}>Contact</p>
            <h2 className="contact-title">Let's build something</h2>
            <p className="contact-subtitle">Tell us about your project and let's get to work.</p>
          </motion.div>
          <div className="contact-content">
            <motion.div className="contact-info" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="contact-item">
                <Mail size={20} />
                <a href="mailto:jack@shiftaitech.com">jack@shiftaitech.com</a>
              </div>
              <div className="contact-item">
                <MapPin size={20} />
                <span>United Kingdom</span>
              </div>
              <div className="contact-turnaround">
                <Zap size={16} />
                We respond within 24 hours
              </div>
            </motion.div>
            <motion.div className="contact-form-container" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              {!formSubmitted ? (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Name" />
                    </div>
                    <div className="form-group">
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Email" />
                    </div>
                  </div>
                  <div className="form-group">
                    <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company" />
                  </div>
                  <div className="form-group">
                    <textarea name="message" value={formData.message} onChange={handleChange} required rows="5" placeholder="Tell us about your project" />
                  </div>
                  <button type="submit" className="form-submit" disabled={formLoading}>
                    {formLoading ? 'Sending…' : <><span>Send Message</span> <ArrowRight size={18} /></>}
                  </button>
                  {formError && (
                    <p className="form-error">Something went wrong. Please email us directly at <a href="mailto:jack@shiftaitech.com">jack@shiftaitech.com</a></p>
                  )}
                </form>
              ) : (
                <motion.div className="form-success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
                  <CheckCircle2 size={48} />
                  <h3>Message received</h3>
                  <p>We'll get back to you within 24 hours.</p>
                  <button onClick={() => { setFormSubmitted(false); setFormData({ name: '', email: '', company: '', message: '' }) }} className="form-reset">
                    Send another message
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo-wrap">
            <img
              src="/logo-with-border.png"
              alt="Shift AI Tech logo"
              className="footer-logo-image"
              onError={(e) => { e.currentTarget.src = '/vite.svg' }}
            />
            <div className="footer-logo">Shift AI Tech</div>
          </div>
          <p className="footer-text">© 2026 Shift AI Tech — United Kingdom</p>
        </div>
      </footer>

    </div>
  )
}

export default App
