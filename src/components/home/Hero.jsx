import Sparkles from './Sparkles.jsx'
import { hero } from '../../data/site.js'

export default function Hero() {
  return (
    <header className="hero">
      <Sparkles />
      <div className="wrap">
        <div className="hero-eyebrow eyebrow mono"><span className="bar"></span>{hero.eyebrow}</div>
        <h1>
          <span className="line l1"><span>{hero.l1}</span></span>
          <span className="line l2"><span><span className="hero-lav grad">{hero.lav}</span>{hero.l2rest}</span></span>
        </h1>
        <div className="hero-bottom">
          <p className="hero-sub">{hero.sub}</p>
          <div className="hero-ctas">
            {hero.ctas.map((c) => (
              <a key={c.label} href={c.href} className={'btn ' + (c.primary ? 'btn-primary' : 'btn-ghost')} data-cursor>
                {c.label}{c.arw && <span className="arw"> &#8599;</span>}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="scroll-cue mono"><div className="rail"></div>Scroll</div>
    </header>
  )
}
