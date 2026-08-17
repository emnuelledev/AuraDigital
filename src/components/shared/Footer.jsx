import { Link } from 'react-router-dom'
import { footer } from '../../data/site.js'
import { externalProps } from '../../utils/links.js'

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-word">{footer.word.a}<span className="digital">{footer.word.b}</span></div>
        <div className="foot-cols">
          <div className="foot-blurb">
            <span className="fb-brand">{footer.blurb.brand}</span> {footer.blurb.text}
          </div>
          {footer.cols.map((c) => (
            <div key={c.h}>
              <h4>{c.h}</h4>
              {c.links.map((l) => <a key={l.label} href={l.href} {...externalProps(l.href)}>{l.label}</a>)}
            </div>
          ))}
        </div>
        <div className="foot-bottom">
          <span>{footer.bottom.left}</span>
          <span>{footer.bottom.mid}</span>
          <Link to="/manager" className="to-top" data-cursor>Manager</Link>
          <a href="#top" className="to-top" data-cursor>Back to top &#8593;</a>
        </div>
      </div>
    </footer>
  )
}
