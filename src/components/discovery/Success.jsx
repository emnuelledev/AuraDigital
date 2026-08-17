import { success } from '../../data/discovery.js'

export default function Success({ onClose, closeRef }) {
  return (
    <div className="dc-success">
      <div className="mono dc-eyebrow dc-success-label">{success.label}</div>
      <h2 className="dc-success-head">{success.head}</h2>
      {success.body.map((p, i) => (
        <p className="dc-intro-p" key={i}>{p}</p>
      ))}
      <button type="button" className="btn btn-primary" onClick={onClose} ref={closeRef} data-cursor>
        {success.cta} <span className="arw">&#8599;</span>
      </button>
    </div>
  )
}
