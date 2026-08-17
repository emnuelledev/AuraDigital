import RichText from '../shared/RichText.jsx'
import { philosophy } from '../../data/site.js'

export default function Philosophy() {
  return (
    <section className="philosophy dark section-pad">
      <div className="wrap">
        <div className="eyebrow mono reveal"><span className="bar"></span>{philosophy.eyebrow}</div>
        <RichText as="h2" className="phil-head reveal" html={philosophy.head} />
        <div className="phil-body reveal">
          {philosophy.body.map((p, i) => <RichText key={i} html={p} />)}
        </div>
      </div>
    </section>
  )
}
