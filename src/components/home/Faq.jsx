import { useLayoutEffect, useRef, useState } from 'react'
import { faq } from '../../data/site.js'

function FaqItem({ item, open, onToggle }) {
  const panel = useRef(null)
  useLayoutEffect(() => {
    const el = panel.current
    if (el) el.style.maxHeight = open ? el.scrollHeight + 'px' : '0px'
  }, [open])
  return (
    <div className={'faq-item' + (open ? ' open' : '')}>
      <button className="faq-q" aria-expanded={open} onClick={onToggle}>{item.q}<span className="faq-ic"></span></button>
      <div className="faq-a" ref={panel}>
        <div className="faq-a-inner">{item.a}</div>
      </div>
    </div>
  )
}

export default function Faq() {
  const [openIdx, setOpenIdx] = useState(-1)
  return (
    <section id="faq" className="section-pad">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow mono"><span className="rn">VIII</span><span className="bar"></span>{faq.eyebrow}</div>
          <h2>{faq.head}</h2>
        </div>
        <div className="faq-list reveal">
          {faq.items.map((it, i) => (
            <FaqItem key={i} item={it} open={openIdx === i} onToggle={() => setOpenIdx(openIdx === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  )
}
