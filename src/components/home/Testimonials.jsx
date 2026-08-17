import RichText from '../shared/RichText.jsx'
import { testimonials } from '../../data/site.js'

export default function Testimonials() {
  return (
    <section className="section-pad">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow mono"><span className="rn">VI</span><span className="bar"></span>{testimonials.eyebrow}</div>
          <h2>{testimonials.head}</h2>
        </div>
        <div className="quotes">
          {testimonials.items.map((q) => (
            <blockquote className={'quote reveal' + (q.wide ? ' wide' : '')} data-cursor key={q.name}>
              <span className="mark">&ldquo;</span>
              <RichText as="blockquote" html={q.quote} />
              <div className="who">
                <span className="av"></span>
                <div><div className="wn">{q.name}</div><div className="wr">{q.role}</div></div>
              </div>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
