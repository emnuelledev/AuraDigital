import { useEffect, useRef } from 'react'

// Custom cursor + reactive aura glow (fine-pointer only). Marks <body> ready
// so the design system's entrance states activate.
export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const aura = useRef(null)

  useEffect(() => {
    document.body.classList.add('ready')
    const fine = window.matchMedia('(pointer:fine)').matches
    if (!fine) {
      if (aura.current) { aura.current.style.left = '70%'; aura.current.style.top = '20%' }
      return
    }
    let mx = innerWidth / 2, my = innerHeight / 2
    let ax = mx, ay = my, rx = mx, ry = my
    const onMove = (e) => {
      mx = e.clientX; my = e.clientY
      if (dot.current) { dot.current.style.left = mx + 'px'; dot.current.style.top = my + 'px' }
    }
    let raf
    const loop = () => {
      ax += (mx - ax) * 0.08; ay += (my - ay) * 0.08
      rx += (mx - rx) * 0.2; ry += (my - ry) * 0.2
      if (aura.current) { aura.current.style.left = ax + 'px'; aura.current.style.top = ay + 'px' }
      if (ring.current) { ring.current.style.left = rx + 'px'; ring.current.style.top = ry + 'px' }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    window.addEventListener('mousemove', onMove, { passive: true })
    // Delegated (not per-element) so it keeps working for content mounted
    // later — e.g. the Discovery Call modal's steps and buttons.
    const over = (e) => { if (e.target.closest('a,button,[data-cursor]')) ring.current?.classList.add('hover') }
    const out = (e) => { if (e.target.closest('a,button,[data-cursor]')) ring.current?.classList.remove('hover') }
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
    }
  }, [])

  return (
    <>
      <div id="aura" ref={aura}></div>
      <div className="cursor-dot" ref={dot}></div>
      <div className="cursor-ring" ref={ring}></div>
    </>
  )
}
