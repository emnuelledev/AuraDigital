import { useState } from 'react'
import { services } from '../../data/site.js'
import ServiceModal from './ServiceModal.jsx'

export default function Services() {
  const [openIdx, setOpenIdx] = useState(null)
  return (
    <section id="services" className="section-pad">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow mono"><span className="rn">II</span><span className="bar"></span>{services.eyebrow}</div>
          <h2>{services.head}</h2>
        </div>
        <div className="svc-grid reveal">
          {services.items.map((s, i) => (
            <button
              type="button"
              className="svc"
              data-cursor
              key={s.idx}
              aria-haspopup="dialog"
              onClick={() => setOpenIdx(i)}
            >
              <div className="svc-top"><span className="idx">{s.idx}</span><span className="arw">&#8599;</span></div>
              <h3>{s.title}</h3>
              <p className="svc-desc">{s.desc}</p>
              <div className="tags">{s.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
            </button>
          ))}
        </div>
      </div>
      <ServiceModal service={openIdx !== null ? services.items[openIdx] : null} onClose={() => setOpenIdx(null)} />
    </section>
  )
}
