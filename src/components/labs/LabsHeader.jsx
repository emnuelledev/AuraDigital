import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function LabsHeader({ menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const close = () => setMenuOpen(false)
  return (
    <>
      <nav className={'labs-nav' + (scrolled ? ' scrolled' : '')} aria-label="Labs">
        <div className="nav-inner">
          <Link to="/" className="brand" aria-label="Aura Digital Labs, back to studio">
            <span className="bd">Aura Digital</span><span className="sep">/</span><span className="bl">Labs</span>
          </Link>
          <div className="nav-links">
            <a href="#experiments">Experiments</a>
            <a href="#notes">Lab Notes</a>
            <a href="#bridge">From experiment</a>
          </div>
          <Link to="/" className="nav-back">&larr; Studio</Link>
          <button className="burger" aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)}>
            <span></span><span></span>
          </button>
        </div>
      </nav>
      <div className="mobile-menu" id="mobileMenu">
        <a href="#experiments" onClick={close}><span className="mm-n">01</span>Experiments</a>
        <a href="#notes" onClick={close}><span className="mm-n">02</span>Lab Notes</a>
        <a href="#bridge" onClick={close}><span className="mm-n">03</span>From experiment</a>
        <Link to="/" onClick={close}><span className="mm-n">&#8617;</span>Back to Studio</Link>
        <div className="mm-foot">Aura Digital / Labs &mdash; Valencia</div>
      </div>
    </>
  )
}
