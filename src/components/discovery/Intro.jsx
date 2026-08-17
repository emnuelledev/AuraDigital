import RichText from '../shared/RichText.jsx'
import { intro } from '../../data/discovery.js'

export default function Intro({ onBegin, onClose, beginRef }) {
  return (
    <div className="dc-intro">
      <div className="eyebrow mono dc-eyebrow"><span className="bar"></span>{intro.eyebrow}</div>
      <RichText as="h2" className="dc-intro-head" html={intro.head} />
      {intro.body.map((p, i) => (
        <RichText as="p" key={i} className="dc-intro-p" html={p} />
      ))}
      <p className="dc-time mono">{intro.time}</p>
      <div className="dc-intro-actions">
        <button type="button" className="btn btn-primary" onClick={onBegin} ref={beginRef} data-cursor>
          <RichText as="span" html={intro.cta} /> <span className="arw">&#8599;</span>
        </button>
        <button type="button" className="dc-back-link" onClick={onClose} data-cursor>{intro.back}</button>
      </div>
    </div>
  )
}
