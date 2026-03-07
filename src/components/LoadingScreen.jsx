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
      <img
        src="/logo.svg"
        alt="Shift AI Tech logo"
        className="loading-icon"
        onError={(e) => { e.currentTarget.src = '/vite.svg' }}
      />
      <div className="loading-network-spinner" aria-hidden="true">
        <span className="loading-network-node loading-network-node-a" />
        <span className="loading-network-node loading-network-node-b" />
        <span className="loading-network-node loading-network-node-c" />
        <span className="loading-network-link loading-network-link-ab" />
        <span className="loading-network-link loading-network-link-bc" />
        <span className="loading-network-link loading-network-link-ca" />
      </div>
    </div>
  )
}
