import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import TeamPage from './TeamPage.jsx'
import BlogPage from './BlogPage.jsx'
import OurStoryPage from './OurStoryPage.jsx'
import PartnersPage from './PartnersPage.jsx'
import { LenisProvider } from './components/LenisProvider.jsx'
import { MagneticCursor } from './components/MagneticCursor.jsx'
import { LoadingScreen } from './components/LoadingScreen.jsx'

function AppShell() {
  const location = useLocation()
  const showLoading = location.pathname === '/'

  return (
    <LenisProvider>
      {showLoading && <LoadingScreen />}
      <MagneticCursor />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/our-story" element={<OurStoryPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </LenisProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  </StrictMode>,
)
