import { why } from '../../data/site.js'

export default function WhyAura() {
  return (
    <section className="dark section-pad">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow mono"><span className="rn">V</span><span className="bar"></span>{why.eyebrow}</div>
          <h2>{why.head}</h2>
        </div>
        <div className="why-grid reveal">
          {why.items.map((w) => (
            <div className="why" data-cursor key={w.t}>
              <div className="wm"></div><h3>{w.t}</h3><p>{w.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
