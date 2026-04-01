import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Mail,
  MapPin,
  Zap,
  MessageSquare,
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
  GraduationCap,
  Utensils,
  Users,
} from 'lucide-react'
import { Container, SectionLabel, SectionHeading, Button, Card } from './components/ui'
import ContactForm from './components/ContactForm'
import './App.css'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
}

const stagger = (i, base = 0.06) => ({
  ...fadeUp,
  transition: { ...fadeUp.transition, delay: i * base },
})

const IMG = {
  finance: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
  aiChip: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
  data: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
  server: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
  office: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
  skyline: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  meeting: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
  localShop: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
}

const techStack = [
  'GPT-4o', 'Claude 3.5', 'Gemini 2.0', 'Llama 3', 'Mistral',
  'LangChain', 'Pinecone', 'Bloomberg API', 'Alpaca', 'Interactive Brokers',
  'OpenAI API', 'Anthropic API', 'Polygon.io', 'Refinitiv', 'QuantLib',
]

const services = [
  {
    number: '01',
    title: 'Custom AI Models',
    description: 'Fine-tuned models, RAG pipelines, predictive systems, autonomous agents. We work with GPT-4o, Claude, Llama, Mistral, and custom-trained architectures.',
    img: IMG.aiChip,
  },
  {
    number: '02',
    title: 'Full Product Builds',
    description: 'End-to-end development of AI-powered products, from initial concept through to live deployment. We own the full stack: frontend, backend, model integration, infrastructure.',
    img: IMG.server,
  },
  {
    number: '03',
    title: 'Process Automation',
    description: 'Replace manual, repetitive work with intelligent automation. Multi-step workflows, browser agents, data pipelines, email sequences — systems that run themselves.',
    img: IMG.data,
  },
  {
    number: '04',
    title: 'AI Strategy',
    description: 'We map the opportunity, identify the highest-ROI use cases, build the roadmap, and give you a clear picture of cost and timeline before you commit.',
    img: IMG.meeting,
  },
]

const portfolio = [
  {
    icon: Shield,
    sector: 'Compliance & Finance',
    partner: 'AML Intelligence Suite',
    description: 'Automated Anti-Money Laundering reporting platform for accountancy firms. Monitors transaction data, flags suspicious patterns with ML, and generates regulator-ready reports — reducing compliance workload from days to hours.',
    tags: ['AML Reporting', 'Compliance Automation', 'Financial Crime Detection'],
    quote: 'What used to take our compliance team three days now takes under two hours. The accuracy and audit trail are exceptional.',
    reference: 'Compliance Director, Mid-Sized Accountancy Practice',
  },
  {
    icon: GraduationCap,
    sector: 'Learning & Development',
    partner: 'AI Course Delivery Platform',
    description: 'End-to-end AI-powered content delivery for professional training providers. Courses scripted, narrated, and delivered by AI avatar instructors — scaling L&D without studio costs or scheduling constraints.',
    tags: ['AI Avatars', 'Course Delivery', 'Content Automation'],
    quote: 'We went from concept to a fully accredited, AI-delivered course catalogue in eight weeks. The cost saving versus traditional production is significant.',
    reference: 'Head of Learning & Development, Professional Training Provider',
  },
  {
    icon: Utensils,
    sector: 'Health & Fitness',
    partner: 'Smart Kitchen & Nutrition Planner',
    description: 'AI-powered kitchen inventory tracker and meal planning system. Tracks pantry stock, designs macro-balanced meal plans aligned to fitness goals, and generates budget-optimised shopping lists.',
    tags: ['Nutrition AI', 'Meal Planning', 'Fitness Optimisation'],
    quote: 'Users report saving an average of £60 per month on groceries while hitting their nutrition targets more consistently than before.',
    reference: 'Founder, Fitness & Nutrition App',
  },
  {
    icon: Users,
    sector: 'Customer Success & SaaS',
    partner: 'Churn Prediction & Retention Engine',
    description: 'Predictive ML platform that identifies at-risk subscribers up to 60 days before churn, triggers personalised retention workflows, and surfaces the usage signals correlated with cancellation.',
    tags: ['Churn Prediction', 'Retention Automation', 'Predictive ML'],
    quote: 'Churn rate dropped 23% in the first quarter after deployment. The early-warning signals have completely changed how our CS team prioritises.',
    reference: 'Head of Customer Success, B2B SaaS Platform',
  },
]

const financeCapabilities = [
  { icon: TrendingUp, title: 'Algorithmic Trading Systems', desc: 'Custom algo strategies built and backtested on real market data. Execution automation across equities, FX, crypto, and derivatives.' },
  { icon: Activity, title: 'Signal Detection & Alpha Generation', desc: 'ML models that scan price action, order flow, and alternative data to surface tradeable signals before they become obvious.' },
  { icon: AlertTriangle, title: 'Risk Modelling & Position Sizing', desc: 'Real-time portfolio risk engines. VAR, drawdown limits, correlation matrices, and automated position management.' },
  { icon: LineChart, title: 'Market Sentiment Analysis', desc: 'NLP pipelines processing news, earnings calls, social media, and analyst reports to quantify sentiment in real time.' },
  { icon: FileText, title: 'Regulatory Intelligence', desc: 'AI that monitors regulatory feeds, flags compliance risks, and drafts reports. Built for MiFID II, FCA, and ESMA frameworks.' },
  { icon: Database, title: 'Market Data Pipelines', desc: 'High-throughput ingestion and structuring of tick data, order books, and alternative datasets. Clean feeds your models can trust.' },
  { icon: Cpu, title: 'Quant Research Automation', desc: 'Automate the research cycle — hypothesis generation, backtesting, parameter optimisation, and reporting — so strategies ship faster.' },
  { icon: Globe, title: 'Multi-Asset Intelligence', desc: 'Unified dashboards and AI assistants that synthesise data across asset classes, portfolios, and geographies into a single view.' },
]

const useCases = [
  { icon: MessageSquare, title: 'AI Chatbots', desc: 'Customer support, lead qualification, and sales automation that operates around the clock.' },
  { icon: FileText, title: 'Document AI', desc: 'Extract, analyse, and act on data from contracts, invoices, and reports instantly.' },
  { icon: BarChart3, title: 'Predictive Models', desc: 'Demand forecasting, pricing engines, risk scoring — models trained on your actual data.' },
  { icon: Search, title: 'AI Search', desc: 'Semantic search across your internal knowledge base, product catalogue, or document store.' },
  { icon: Workflow, title: 'Workflow Automation', desc: 'Multi-step business processes automated end-to-end, from data ingestion to output delivery.' },
  { icon: Bot, title: 'Custom LLM Solutions', desc: 'Fine-tuned models and RAG pipelines trained on your proprietary data and domain knowledge.' },
  { icon: Zap, title: 'AI Agents', desc: 'Autonomous pipelines that research, act, and deliver results without human input.' },
  { icon: Phone, title: 'Voice AI', desc: 'Phone agents that handle inbound calls, answer questions, and book appointments around the clock.' },
  { icon: Database, title: 'Data Pipelines', desc: 'Ingest, clean, and structure messy data so your models have something solid to work with.' },
]

const processSteps = [
  { n: '01', title: 'Brief', desc: 'We listen. Understand your goals, constraints, and where AI fits.' },
  { n: '02', title: 'Design', desc: 'We design the solution architecture and agree scope and cost upfront.' },
  { n: '03', title: 'Build', desc: 'Rapid development using the best AI tools available. No bloat, no waste.' },
  { n: '04', title: 'Deploy', desc: 'We ship, monitor, and iterate. Ongoing support as you scale.' },
]

const stats = [
  { value: 'Day 1', label: 'Useful output from day one. No lengthy onboarding.' },
  { value: 'Weeks', label: 'Typical time from brief to working prototype.' },
  { value: 'UK', label: 'Based in the United Kingdom, working with businesses across Britain.' },
  { value: '24/7', label: 'AI systems that work while you sleep.' },
  { value: '100%', label: 'Founder-led. You speak directly to the people building it.' },
  { value: 'Frontier', label: 'GPT-4o, Claude, Gemini, Llama. Always the best model for the job.' },
]

const scenarios = [
  {
    type: 'Financial Markets',
    problem: 'A proprietary trading firm was manually reviewing news and earnings releases to inform short-term equity positions. The process was slow, inconsistent, and limited to what the team could physically read.',
    built: 'We built a real-time sentiment pipeline ingesting news feeds, SEC filings, and earnings call transcripts. An LLM scores each event by expected price impact and direction, feeding directly into their pre-trade screening workflow.',
    outcome: 'Analysis time cut from 40 minutes to under 90 seconds per event.',
  },
  {
    type: 'Local Business',
    problem: 'A dental practice in Manchester had no online booking, a site that took 5 seconds to load on mobile, and three unanswered Google reviews. They had no idea how many enquiries they were losing.',
    built: 'We audited the site, fixed their Google Business Profile, integrated an online booking system, and set up an AI receptionist for out-of-hours calls.',
    outcome: '£2,100 upfront. £300/month ongoing.',
  },
  {
    type: 'AI Product',
    problem: 'A UK startup needed a recommendation engine to surface the right products to each visitor based on browsing behaviour — without a data science team to build or maintain it.',
    built: 'We built a RAG-based recommendation pipeline trained on their product catalogue and user data. Integrated directly into their existing platform with no infrastructure changes needed.',
    outcome: 'Delivered in under 3 weeks.',
  },
  {
    type: 'Process Automation',
    problem: 'A professional services firm had hundreds of client contracts in a shared drive. Finding key clauses, flagging renewals, and answering basic contract questions took hours of manual work every week.',
    built: 'We built a document AI pipeline that ingests their contracts, extracts key terms, flags upcoming renewals, and answers plain-English questions about any document instantly.',
    outcome: '3+ hours saved per week from day one.',
  },
]

const localBizPricing = [
  { service: 'Digital audit + full report', price: 'Free' },
  { service: 'Google listing fix + profile setup', price: 'From £200' },
  { service: 'New website (fast, mobile, converts)', price: 'From £1,500' },
  { service: 'AI receptionist', price: 'From £300/month' },
  { service: 'SEO + ongoing maintenance', price: 'From £200/month' },
]

function App() {
  return (
    <div className="page">

      {/* Hero */}
      <section className="hero">
        <div className="hero-video-wrap" aria-hidden="true">
          <video
            className="hero-video"
            src="/hero-bg.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="hero-video-overlay" />
        </div>
        <Container>
          <motion.div className="hero-inner" {...fadeUp}>
            <h1 className="hero-title">
              <span className="hero-line">Proven <span className="text-accent">Hyper Agile</span></span>
              <span className="hero-line">AI Solutions.</span>
            </h1>
            <p className="hero-sub">
              We build AI products using AI tools — making us faster, leaner,
              and more responsive than 80% of technology firms.
            </p>
            <p className="hero-bridge">
              If you can imagine it, we can <span className="text-accent">build it</span>.
            </p>
            <div className="hero-actions">
              <Button href="#contact">Start a Project</Button>
              <Link to="/our-story" className="hero-story-link">
                Read our story <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Tech Ticker */}
      <div className="ticker">
        <div className="ticker-track">
          {[...techStack, ...techStack].map((t, i) => (
            <span key={i} className="ticker-item">{t}</span>
          ))}
        </div>
      </div>

      {/* Differentiator */}
      <section className="differentiator">
        <Container>
          <motion.div className="differentiator-inner" {...fadeUp}>
            <div className="differentiator-stat">
              <span className="differentiator-number">20%</span>
              <p className="differentiator-text">
                of technology firms build AI products using AI tools. We are one of them.
              </p>
            </div>
            <div className="differentiator-divider" />
            <div className="differentiator-pills">
              {['Hyper Agile', 'Income Generating', 'Time Saving', 'Cost Reducing'].map((p) => (
                <span key={p} className="differentiator-pill">{p}</span>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Services — Featured layout with images */}
      <section id="solutions" className="section">
        <Container>
          <motion.div {...fadeUp}>
            <SectionLabel>Services</SectionLabel>
            <SectionHeading>What We Do</SectionHeading>
            <p className="section-intro">
              Four core capabilities, each refined through real-world delivery across regulated industries, startups, and enterprise.
            </p>
          </motion.div>
          <div className="services-featured">
            {services.map((s, i) => (
              <motion.div key={i} className="service-featured-card" {...stagger(i, 0.1)}>
                <div className="service-featured-img">
                  <img src={s.img} alt="" loading="lazy" />
                  <div className="service-featured-img-overlay" />
                  <span className="service-featured-num">{s.number}</span>
                </div>
                <div className="service-featured-body">
                  <h3 className="service-featured-title">{s.title}</h3>
                  <p className="service-featured-desc">{s.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Portfolio */}
      <section id="projects" className="section section--dark">
        <Container>
          <motion.div {...fadeUp}>
            <SectionLabel>Proven Track Record</SectionLabel>
            <SectionHeading>Portfolio of Projects &amp; Partners</SectionHeading>
            <p className="section-intro">
              Sector agnostic. Proven solutions across compliance, learning &amp; development, health &amp; fitness, SaaS, and financial markets.
            </p>
          </motion.div>
          <div className="portfolio-grid">
            {portfolio.map((p, i) => (
              <motion.div key={i} {...stagger(i)}>
                <Card className="portfolio-card">
                  <div className="portfolio-card-top">
                    <span className="portfolio-sector">{p.sector}</span>
                    <p.icon size={22} strokeWidth={1.5} className="portfolio-icon" />
                  </div>
                  <h3 className="portfolio-name">{p.partner}</h3>
                  <p className="portfolio-desc">{p.description}</p>
                  <div className="portfolio-quote">
                    <p className="portfolio-quote-text">&ldquo;{p.quote}&rdquo;</p>
                    <p className="portfolio-quote-ref">{p.reference}</p>
                  </div>
                  <div className="portfolio-tags">
                    {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Financial Markets — Hero image + grid */}
      <section id="markets" className="section section--finance">
        <div className="finance-hero-img" aria-hidden="true">
          <img src={IMG.finance} alt="" loading="lazy" />
          <div className="finance-hero-overlay" />
        </div>
        <Container>
          <motion.div className="finance-header" {...fadeUp}>
            <SectionLabel>Core Speciality</SectionLabel>
            <SectionHeading>Built for Financial Markets</SectionHeading>
            <p className="section-intro section-intro--onDark">
              Financial markets are our home ground. We build AI systems that trade, analyse, predict, and report — with the rigour regulated markets demand and the speed that gives you edge.
            </p>
          </motion.div>
          <div className="finance-grid">
            {financeCapabilities.map((cap, i) => (
              <motion.div key={i} className="finance-card" {...stagger(i)}>
                <div className="finance-card-icon">
                  <cap.icon size={20} strokeWidth={1.5} />
                </div>
                <h3 className="finance-card-title">{cap.title}</h3>
                <p className="finance-card-desc">{cap.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div className="finance-cta" {...fadeUp}>
            <Button href="#contact">Discuss a Markets Project</Button>
            <span className="finance-note">Equities · FX · Crypto · Derivatives · Fixed Income</span>
          </motion.div>
        </Container>
      </section>

      {/* Use Cases — Visual grid */}
      <section className="section section--surface">
        <Container>
          <div className="usecase-header">
            <motion.div {...fadeUp}>
              <SectionLabel>What We Build</SectionLabel>
              <SectionHeading>If It Runs on AI, <span className="text-accent">We Build It</span></SectionHeading>
            </motion.div>
            <motion.div className="usecase-header-img" {...fadeUp}>
              <img src={IMG.server} alt="" loading="lazy" />
            </motion.div>
          </div>
          <div className="usecase-grid">
            {useCases.map((u, i) => (
              <motion.div key={i} className="usecase-card" {...stagger(i, 0.05)}>
                <div className="usecase-icon"><u.icon size={20} strokeWidth={1.5} /></div>
                <h3 className="usecase-title">{u.title}</h3>
                <p className="usecase-desc">{u.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="section section--dark">
        <Container>
          <div className="stats-grid">
            {stats.map((s, i) => (
              <motion.div key={i} className="stat-cell" {...stagger(i)}>
                <p className="stat-value">{s.value}</p>
                <p className="stat-label">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Process — Timeline */}
      <section id="work-with-us" className="section">
        <Container>
          <motion.div {...fadeUp}>
            <SectionLabel>How We Work</SectionLabel>
            <SectionHeading>From Idea to Live in Weeks</SectionHeading>
          </motion.div>
          <div className="process-timeline">
            {processSteps.map((p, i) => (
              <motion.div key={i} className="process-step" {...stagger(i, 0.1)}>
                <div className="process-step-marker">
                  <span className="process-step-dot" />
                  {i < processSteps.length - 1 && <span className="process-step-line" />}
                </div>
                <div className="process-step-content">
                  <span className="process-step-num">{p.n}</span>
                  <h3 className="process-step-title">{p.title}</h3>
                  <p className="process-step-desc">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Mid CTA — with background image */}
      <section className="cta-band">
        <div className="cta-band-bg" aria-hidden="true">
          <img src={IMG.skyline} alt="" loading="lazy" />
          <div className="cta-band-overlay" />
        </div>
        <Container>
          <motion.div className="cta-band-inner" {...fadeUp}>
            <h2 className="cta-band-title">
              Ready to cut costs and <span className="text-accent">build smarter?</span>
            </h2>
            <p className="cta-band-sub">
              One-off projects or ongoing retainers. No account managers. No nonsense.
            </p>
            <Button href="#contact">Get a Free Consultation</Button>
          </motion.div>
        </Container>
      </section>

      {/* Local Business — with image */}
      <section id="local-business" className="section">
        <Container>
          <div className="localbiz-hero-row">
            <motion.div className="localbiz-hero-text" {...fadeUp}>
              <SectionLabel>For UK Local Businesses</SectionLabel>
              <SectionHeading>Something on Your Website Is Costing You Customers.</SectionHeading>
              <p className="section-intro" style={{ marginBottom: 0 }}>
                Most local businesses we work with — dentists, gyms, roofers, electricians, salons — are losing 2 to 5 enquiries a week without knowing it. Slow site, not showing up on Google, no way to book out of hours. We audit your digital presence for free and tell you exactly what&apos;s happening. Then we fix it.
              </p>
            </motion.div>
            <motion.div className="localbiz-hero-img" {...fadeUp}>
              <img src={IMG.localShop} alt="" loading="lazy" />
            </motion.div>
          </div>

          <div className="localbiz-steps">
            {[
              { n: '01', title: 'Free audit, 48 hours', desc: 'We look at your website speed, Google Business Profile, local search rankings, online booking, and reviews. You get a plain-English report back in 48 hours. No jargon, no obligation, no sales pitch.' },
              { n: '02', title: 'We fix what\'s broken', desc: 'Site too slow? We fix it. Not showing up on Google Maps? We sort your listing. No way for customers to book or enquire online? We build that. Every fix is priced upfront with no surprises.' },
              { n: '03', title: 'AI receptionist', desc: 'An AI that answers your phone, handles common questions, and books appointments — even at 11pm on a Sunday. You stop losing jobs to voicemail. Set up in a week, runs itself after that.' },
            ].map((step, i) => (
              <motion.div key={i} className="localbiz-step" {...stagger(i, 0.08)}>
                <span className="localbiz-step-num">{step.n}</span>
                <h3 className="localbiz-step-title">{step.title}</h3>
                <p className="localbiz-step-desc">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div className="localbiz-pricing" {...fadeUp}>
            <p className="localbiz-pricing-label">What It Costs</p>
            <div className="localbiz-pricing-table">
              {localBizPricing.map((row, i) => (
                <div key={i} className="localbiz-pricing-row">
                  <span>{row.service}</span>
                  <span className="localbiz-pricing-price">{row.price}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div className="localbiz-cta" {...fadeUp}>
            <Button href="#contact">Get Your Free Audit</Button>
            <span className="localbiz-note">No commitment. 48-hour turnaround. Plain English results.</span>
          </motion.div>
        </Container>
      </section>

      {/* Why Us */}
      <section className="section section--surface">
        <Container>
          <motion.div {...fadeUp}>
            <SectionLabel>Why Shift AI Tech</SectionLabel>
            <SectionHeading>This Is Why <span className="text-accent">We&apos;re Different</span></SectionHeading>
          </motion.div>
          <div className="why-grid">
            {[
              { title: 'We build AI using AI', desc: 'Only 20% of technology firms build AI products using AI tools. We\'re in that 20%. It means we move faster, iterate quicker, and pass the cost savings directly to you.' },
              { title: 'Hyper agile by design', desc: 'No legacy processes. No bloated teams. We\'re structured to move at the speed of the market — from brief to working product in weeks, not quarters.' },
              { title: 'We save you time and money', desc: 'Friction-free development spend. Everything is scoped, priced, and delivered with zero waste. You pay for results, not hours.' },
              { title: 'Sector agnostic', desc: 'Proven solutions across compliance, learning & development, health & fitness, SaaS, and financial markets. If there\'s data and a problem, we can build the AI.' },
            ].map((w, i) => (
              <motion.div key={i} className="why-card" {...stagger(i, 0.08)}>
                <span className="why-num">0{i + 1}</span>
                <h3 className="why-title">{w.title}</h3>
                <p className="why-desc">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Scenarios */}
      <section className="section section--dark">
        <Container>
          <motion.div {...fadeUp}>
            <SectionLabel>Real Problems We Solve</SectionLabel>
            <SectionHeading>What This Looks Like in Practice</SectionHeading>
          </motion.div>
          <div className="scenarios-grid">
            {scenarios.map((s, i) => (
              <motion.div key={i} {...stagger(i, 0.08)}>
                <Card className="scenario-card">
                  <span className="scenario-type">{s.type}</span>
                  <div className="scenario-block">
                    <p className="scenario-label">The problem</p>
                    <p className="scenario-text">{s.problem}</p>
                  </div>
                  <div className="scenario-block">
                    <p className="scenario-label">What we built</p>
                    <p className="scenario-text">{s.built}</p>
                  </div>
                  <p className="scenario-outcome">{s.outcome}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact — with skyline bg */}
      <section id="contact" className="section section--contact">
        <div className="contact-bg" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=80"
            alt=""
            loading="lazy"
          />
          <div className="contact-bg-overlay" />
        </div>
        <Container>
          <motion.div {...fadeUp}>
            <SectionLabel>Contact</SectionLabel>
            <SectionHeading>Let&apos;s Build Something</SectionHeading>
            <p className="section-intro">Tell us about your project and let&apos;s get to work.</p>
          </motion.div>
          <div className="contact-grid">
            <motion.div className="contact-info" {...fadeUp}>
              <div className="contact-item">
                <Mail size={18} />
                <a href="mailto:jack@shiftaitech.com">jack@shiftaitech.com</a>
              </div>
              <div className="contact-item">
                <MapPin size={18} />
                <span>United Kingdom</span>
              </div>
              <div className="contact-response">
                <Zap size={14} />
                We respond within 24 hours
              </div>
            </motion.div>
            <motion.div className="contact-form-wrap" {...fadeUp}>
              <ContactForm />
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default App
