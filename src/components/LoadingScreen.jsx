import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useAppStore } from '../store/useAppStore'

export function LoadingScreen() {
  const isFinished = useAppStore((s) => s.isFinished)
  const ref        = useRef()

  useEffect(() => {
    if (!isFinished) return
    gsap.to(ref.current, {
      opacity: 0,
      duration: 0.9,
      ease: 'power2.out',
      onComplete: () => {
        if (ref.current) ref.current.style.display = 'none'
      },
    })
  }, [isFinished])

  return (
    <div ref={ref} className="loading-screen">
      <div className="loading-shell">
        <img
          src="/logo.svg"
          alt="Shift AI Tech logo"
          className="loading-icon"
          onError={(e) => { e.currentTarget.src = '/vite.svg' }}
        />
        <div className="loading-tech-loader" aria-hidden="true">
          <span className="loading-tech-ring" />
          <span className="loading-tech-ring loading-tech-ring-secondary" />
          <span className="loading-tech-dot loading-tech-dot-1" />
          <span className="loading-tech-dot loading-tech-dot-2" />
          <span className="loading-tech-dot loading-tech-dot-3" />
        </div>
      </div>
    </div>
  )
}
