import RichText from '../shared/RichText.jsx'
import { featured } from '../../data/site.js'

export default function Featured({ cur }) {
  return (
    <section className="feat dark section-pad">
      <div className="glow"></div>
      <div className="wrap">
        <div className="feat-inner">
          <div className="reveal">
            <div className="feat-tag"><span className="pill">{featured.tag}</span></div>
            <RichText as="h2" html={featured.head} />
            <RichText as="p" className="feat-lede" html={featured.lede} />
            <div className="feat-price">
              <span className="num">{featured.price[cur]}</span>
              <span className="lbl">{featured.priceLabel}</span>
            </div>
            <a href={featured.cta.href} className="btn btn-primary" data-cursor>{featured.cta.label} <span className="arw">&#8599;</span></a>
          </div>
          <div className="feat-list reveal">
            {featured.items.map((it) => (
              <div className="feat-item" data-cursor key={it.t}>
                <span className="star">&#10022;</span><span className="fi-t">{it.t}</span><span className="fi-d">{it.d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
