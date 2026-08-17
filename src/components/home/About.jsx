import RichText from '../shared/RichText.jsx'
import { about } from '../../data/site.js'

export default function About() {
  return (
    <section id="about" className="section-pad">
      <div className="wrap">
        <div className="eyebrow mono reveal"><span className="rn">I</span><span className="bar"></span>{about.eyebrow}</div>
        <RichText as="p" className="about-statement reveal" style={{ marginTop: '1.8rem' }} html={about.statement} />
        <div className="about-grid">
          <div className="about-lede reveal">
            {about.lede.map((p, i) => <RichText key={i} html={p} />)}
          </div>
          <div className="principles reveal">
            {about.principles.map((p) => (
              <div className="principle" data-cursor key={p.n}>
                <span className="pn">{p.n}</span>
                <div><div className="pt">{p.t}</div><div className="pd">{p.d}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
