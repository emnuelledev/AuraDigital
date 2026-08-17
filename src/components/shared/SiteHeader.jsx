import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { brand, nav } from '../../data/site.js'

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    return () => document.body.classList.remove('menu-open')
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <nav className={'top' + (scrolled ? ' scrolled' : '')} aria-label="Primary">
        <div className="nav-inner">
          <a href="#top" className="brand" aria-label="Aura Digital, home">
            <span className="b1">{brand.a}</span><span className="b2">{brand.b}</span>
          </a>
          <div className="nav-links">
            {nav.links.map((l) =>
              l.to
                ? <Link key={l.label} to={l.to}>{l.label}</Link>
                : <a key={l.label} href={l.href}>{l.label}</a>
            )}
          </div>
          <a href={nav.cta.href} className="nav-cta"><span className="dot"></span>{nav.cta.label}</a>
          <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            <span></span><span></span>
          </button>
        </div>
      </nav>
      <div className="mobile-menu" id="mobileMenu">
        {nav.mobile.map((l) =>
          l.to
            ? <Link key={l.n} to={l.to} onClick={close}><span className="mm-n">{l.n}</span>{l.label}</Link>
            : <a key={l.n} href={l.href} onClick={close}><span className="mm-n">{l.n}</span>{l.label}</a>
        )}
        <div className="mm-foot">{nav.mobileFoot}</div>
      </div>
    </>
  )
}
