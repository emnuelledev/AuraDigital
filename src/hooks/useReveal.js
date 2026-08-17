import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// IntersectionObserver reveal. Re-runs on every route change (RAF timing +
// cleanup) so elements mounted on a new page are always observed — the same
// fix pattern used across the studio's other React projects.
export default function useReveal() {
  const { pathname } = useLocation()
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal'))
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    const id = requestAnimationFrame(() => els.forEach((el) => io.observe(el)))
    return () => {
      cancelAnimationFrame(id)
      io.disconnect()
    }
  }, [pathname])
}
