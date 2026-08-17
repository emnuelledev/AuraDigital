import { Link } from 'react-router-dom'
import RichText from '../shared/RichText.jsx'
import { portal } from '../../data/site.js'

export default function LabsPortal() {
  return (
    <section id="labs-portal" className="labs-portal dark section-pad">
      <div className="wrap">
        <div className="lp-inner">
          <div className="lp-left reveal">
            <div className="eyebrow mono"><span className="bar"></span>{portal.eyebrow}</div>
            <h2>{portal.head}</h2>
            <RichText as="p" className="lp-lede" html={portal.lede} />
            <Link to="/labs" className="lp-cta" data-cursor>{portal.cta} <span className="arw">&#8599;</span></Link>
            <div className="lp-freq mono">{portal.freq}</div>
          </div>
          <div className="lp-right reveal" aria-hidden="true">
            {portal.cards.map((c) => (
              <div className={'lp-card' + (c.ghost ? ' ghost' : '')} key={c.id}>
                <div className="lp-row"><span className="lid">LAB / {c.id}</span><span className="lst"><span className={'lp-dot ' + c.dot}></span>{c.status}</span></div>
                <div className="lp-title">{c.title}</div>
                <div className="lp-meta">{c.meta}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
