import { useParams } from 'react-router-dom'
import './ResearchPaperPage.css'

const paperDetails = {
  'research-paper-1': {
    title: 'Research Paper 1',
    summary: 'Placeholder page for a future linked research article.',
  },
  'research-paper-2': {
    title: 'Research Paper 2',
    summary: 'Placeholder page for a future linked research article.',
  },
  'research-paper-3': {
    title: 'Research Paper 3',
    summary: 'Placeholder page for a future linked research article.',
  },
}

export default function ResearchPaperPage() {
  const { paperId } = useParams()
  const paper = paperDetails[paperId] ?? {
    title: 'Research Paper',
    summary: 'Placeholder page for future research content.',
  }

  return (
    <div className="research-page">
      <header className="research-header">
        <a href="/" className="research-logo-link" aria-label="Shift AI home">
          <img src="/logo.svg" alt="Shift AI logo" className="research-logo-image" />
        </a>
      </header>

      <main className="research-main">
        <p className="research-kicker">Research</p>
        <h1 className="research-title">{paper.title}</h1>
        <p className="research-subtitle">{paper.summary}</p>
        <div className="research-placeholder">
          <h2>Content Placeholder</h2>
          <p>
            Add your full research summary, key findings, data references, and source links here when ready.
          </p>
        </div>
      </main>
    </div>
  )
}
