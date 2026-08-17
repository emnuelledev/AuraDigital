import RichText from '../shared/RichText.jsx'
import founderImg from '../../assets/founder.jpg'
import { founder } from '../../data/site.js'

export default function Founder() {
  return (
    <section id="founder" className="founder dark section-pad">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow mono"><span className="rn">VII</span><span className="bar"></span>{founder.eyebrow}</div>
          <h2>{founder.head}</h2>
        </div>
        <div className="founder-grid">
          <div className="founder-portrait reveal">
            <div className="spectrum"></div>
            <span className="founder-star">&#10022;</span>
            <div className="founder-photo">
              <img loading="lazy" decoding="async" src={founderImg} alt={founder.alt} />
              <div className="scrim"></div>
              <div className="founder-caption">
                <div className="fc-n">{founder.caption.n}</div>
                <div className="fc-r">{founder.caption.r}</div>
              </div>
            </div>
          </div>
          <div className="founder-body reveal">
            <RichText as="p" className="founder-lead" html={founder.lead} />
            <div className="founder-story">
              {founder.story.map((p, i) => <RichText key={i} html={p} />)}
            </div>
            <div className="founder-ids">
              {founder.chips.map((c) => <span className="id-chip" key={c}>{c}</span>)}
            </div>
            <div className="founder-links">
              <a className="founder-cta" href={founder.links.linkedin} target="_blank" rel="noopener noreferrer" data-cursor>
                <svg className="li" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.35c0-1.28-.02-2.92-1.78-2.92-1.78 0-2.05 1.39-2.05 2.83V21H9z" /></svg>
                Connect on LinkedIn <span className="arw">&#8599;</span>
              </a>
              <a className="founder-git" href={founder.links.github} target="_blank" rel="noopener noreferrer" data-cursor>
                <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true"><path fill="currentColor" d="M12 2A10 10 0 0 0 8.84 21.5c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" /></svg>
                GitHub <span className="arw">&#8599;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
