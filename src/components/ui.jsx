import { ArrowRight } from 'lucide-react'

export function Container({ children, className = '', narrow = false }) {
  return (
    <div
      className={`ui-container${narrow ? ' ui-container--narrow' : ''} ${className}`.trim()}
    >
      {children}
    </div>
  )
}

export function SectionLabel({ children }) {
  return <p className="ui-section-label">{children}</p>
}

export function SectionHeading({ children, className = '' }) {
  return <h2 className={`ui-section-heading ${className}`.trim()}>{children}</h2>
}

export function Button({ children, href, variant = 'primary', className = '', ...props }) {
  const cls = `ui-btn ui-btn--${variant} ${className}`.trim()

  if (href) {
    return (
      <a href={href} className={cls} {...props}>
        <span>{children}</span>
        <ArrowRight size={16} />
      </a>
    )
  }

  return (
    <button className={cls} {...props}>
      <span>{children}</span>
      <ArrowRight size={16} />
    </button>
  )
}

export function Card({ children, className = '', hover = true }) {
  return (
    <div className={`ui-card${hover ? ' ui-card--hover' : ''} ${className}`.trim()}>
      {children}
    </div>
  )
}

export function Divider() {
  return <div className="ui-divider" />
}
