import RichText from '../shared/RichText.jsx'
import { testimonials as testimonialsFallback } from '../../data/site.js'
import useContentSection from '../../hooks/useContentSection.js'
import lucileneAvatar from '../../assets/testimonial-lucilene.jpg'
import sarahAvatar from '../../assets/testimonial-sarah.jpg'
import sweetBronzeAvatar from '../../assets/testimonial-sweetbronze.png'

const avatars = {
  'Lucilene Ferraz': lucileneAvatar,
  'Sarah Victoria': sarahAvatar,
  'Dayane B.': sweetBronzeAvatar,
}

// Per-photo crop focus for the circular avatar (defaults to centered).
const avatarPosition = {
  'Lucilene Ferraz': 'center 12%',
}

export default function Testimonials() {
  const [testimonials] = useContentSection('testimonials', testimonialsFallback)
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
                <span className="av">
                  {avatars[q.name] && (
                    <img
                      src={avatars[q.name]}
                      alt={q.name}
                      loading="lazy"
                      decoding="async"
                      style={{ objectPosition: avatarPosition[q.name] || 'center' }}
                    />
                  )}
                </span>
                <div><div className="wn">{q.name}</div><div className="wr">{q.role}</div></div>
              </div>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
