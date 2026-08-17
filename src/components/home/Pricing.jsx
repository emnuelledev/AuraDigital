import { pricing } from '../../data/site.js'

export default function Pricing({ cur, setCur }) {
  const sym = cur === 'usd' ? '$' : '\u20ac'
  return (
    <section id="pricing" className="section-pad">
      <div className="wrap">
        <div className="price-head">
          <div className="sec-head reveal" style={{ marginBottom: 0 }}>
            <div className="eyebrow mono"><span className="rn">III</span><span className="bar"></span>{pricing.eyebrow}</div>
            <h2>{pricing.head}</h2>
          </div>
          <div className={'toggle reveal' + (cur === 'usd' ? ' usd' : '')} id="curToggle" role="group" aria-label="Currency">
            <div className="knob"></div>
            <button className={cur === 'eur' ? 'active' : undefined} aria-pressed={cur === 'eur'} onClick={() => setCur('eur')}>EUR &euro;</button>
            <button className={cur === 'usd' ? 'active' : undefined} aria-pressed={cur === 'usd'} onClick={() => setCur('usd')}>USD $</button>
          </div>
        </div>

        <div className="pkg-grid">
          {pricing.packages.map((p) => (
            <article className={'pkg reveal' + (p.feature ? ' feature' : '')} data-cursor key={p.name}>
              <div className="pkg-top">
                <span className="pkg-name">{p.name}</span>
                {p.badge && <span className="pkg-badge">{p.badge}</span>}
              </div>
              <h3>{p.title}</h3>
              <p className="obj">{p.obj}</p>
              <div className="amount"><span className="cur">{sym}</span><span>{p.amount[cur]}</span></div>
              <span className="from">{p.from}</span>
              <ul>
                {p.items.map((it) => <li key={it}><span className="k">&#10022;</span>{it}</li>)}
              </ul>
              <a href="#contact" className={'btn' + (p.ghost ? ' btn-ghost' : '')} data-cursor>{p.cta}</a>
            </article>
          ))}
        </div>

        <div className="ala reveal">
          {pricing.alacarte.map((r) => (
            <div className="ala-row" data-cursor key={r.n}>
              <span className="an">{r.n}</span><span className="at">{r.t}</span>
              <span className="ad">{r.d}</span>
              <span className="ap">
                {r.pre && <span className="cur">{r.pre[cur]}</span>}<span>{r.amt[cur]}</span>
              </span>
            </div>
          ))}
        </div>
        <p className="mono reveal" style={{ marginTop: '2rem', color: 'var(--mist)' }}>{pricing.note}</p>
      </div>
    </section>
  )
}
