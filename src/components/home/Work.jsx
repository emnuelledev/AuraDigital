import BeforeAfter from './BeforeAfter.jsx'
import sweetBronze from '../../assets/sweet-bronze.jpg'
import { work } from '../../data/site.js'

function CaseMeta({ c }) {
  return (
    <div className="case-meta reveal">
      <span className="cn">{c.cn}</span>
      <h3>{c.title}</h3>
      <p className="cd">{c.cd}</p>
      <div className="case-tags">{c.tags.map((t) => <span key={t}>{t}</span>)}</div>
      <div className="case-stats">
        {c.stats.map((s) => <div className="st" key={s.l}><div className="stn">{s.n}</div><div className="stl">{s.l}</div></div>)}
      </div>
      {c.kind === 'live' && (
        <a className="case-live mono" href={c.url} target="_blank" rel="noopener noreferrer">{c.liveLabel} <span className="arw">&#8599;</span></a>
      )}
    </div>
  )
}

export default function Work() {
  return (
    <section id="work" className="section-pad">
      <div className="wrap">
        <div className="sec-head wide reveal">
          <div className="eyebrow mono"><span className="rn">IV</span><span className="bar"></span>{work.eyebrow}</div>
          <h2>{work.head}</h2>
        </div>

        {work.cases.map((c, i) => (
          <article className="case" style={c.first ? { borderTop: 'none', paddingTop: 0 } : undefined} key={i}>
            <div className="case-media reveal">
              {c.kind === 'live' && (
                <a className="case-link" href={c.url} target="_blank" rel="noopener noreferrer" aria-label="Open the live Sweet Bronze website in a new tab" data-cursor>
                  <div className="site-frame">
                    <div className="site-bar"><span className="d d1"></span><span className="d d2"></span><span className="d d3"></span><span className="site-url">{c.siteUrl}</span></div>
                    <img className="site-shot" loading="lazy" decoding="async" src={sweetBronze} alt="Sweet Bronze — live website in Valencia" />
                  </div>
                </a>
              )}
              {c.kind === 'ba' && <BeforeAfter data={c} />}
              {c.kind === 'mock' && (
                <div className="mock mock-b" data-cursor>
                  <span className="mk-star" style={{ bottom: '16%', left: '14%' }}>&#10022;</span>
                  <div className="mock-inner">
                    <span className="mk-eyebrow">{c.mkEyebrow}</span>
                    <span className="mk-h">{c.mkH}</span>
                    <div className="mk-line"></div>
                    <div className="mk-chips"><i></i><i></i><i></i></div>
                  </div>
                </div>
              )}
            </div>
            <CaseMeta c={c} />
          </article>
        ))}
      </div>
    </section>
  )
}
