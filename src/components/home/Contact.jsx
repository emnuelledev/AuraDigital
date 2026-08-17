import RichText from '../shared/RichText.jsx'
import { contact } from '../../data/site.js'
import { useDiscoveryCall } from '../../context/DiscoveryCallContext.jsx'
import { externalProps } from '../../utils/links.js'

export default function Contact() {
  const { open } = useDiscoveryCall()
  return (
    <section id="contact" className="contact dark section-pad">
      <div className="glow"></div>
      <div className="wrap">
        <div className="contact-inner">
          <div className="eyebrow mono reveal"><span className="bar"></span>{contact.eyebrow}</div>
          <RichText as="h2" className="reveal" html={contact.head} />
          <RichText as="p" className="contact-sub reveal" html={contact.sub} />
          <div className="channels reveal">
            {contact.channels.map((c) => (
              <a href={c.href} className="channel" data-cursor key={c.label} {...externalProps(c.href)}><span className="k">&#10022;</span>{c.label}</a>
            ))}
          </div>
          <button type="button" onClick={open} className="btn btn-primary reveal" data-cursor>{contact.cta.label} <span className="arw">&#8599;</span></button>
          <div className="contact-loc reveal">
            {contact.loc.map((l) => <span key={l}><span className="k">&#9670;</span> {l}</span>)}
          </div>
        </div>
      </div>
    </section>
  )
}
