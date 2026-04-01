import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import TeamPage from './TeamPage.jsx'
import BlogPage from './BlogPage.jsx'
import OurStoryPage from './OurStoryPage.jsx'
import PartnersPage from './PartnersPage.jsx'
import ResearchPaperPage from './ResearchPaperPage.jsx'
import Navigation from './components/Navigation.jsx'
import Footer from './components/Footer.jsx'

function AppShell() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/our-story" element={<OurStoryPage />} />
        <Route path="/research/:paperId" element={<ResearchPaperPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  </StrictMode>,
)
