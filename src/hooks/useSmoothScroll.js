import { useEffect } from 'react'

// Smooth-scrolls in-page anchor clicks (respecting reduced-motion), matching
// the original site behaviour. Delegated listener so it also covers content
// rendered after mount.
export default function useSmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')
      if (id.length > 1) {
        const t = document.querySelector(id)
        if (t) {
          e.preventDefault()
          t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
        }
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
}
