import { Fragment } from 'react'
import { marquee } from '../../data/site.js'

// Flat spans inside the track (word + star), matching the original DOM so the
// track's flex/animation spacing is preserved. The run is duplicated for the
// seamless loop.
export default function Marquee() {
  const run = (key) =>
    marquee.map((m, i) => (
      <Fragment key={key + i}>
        <span className={m.ital ? 'ital' : undefined}>{m.t}</span>
        <span className="star">&#10022;</span>
      </Fragment>
    ))
  return (
    <div className="marquee reveal" aria-hidden="true">
      <div className="marquee-track">
        {run('a')}
        {run('b')}
      </div>
    </div>
  )
}
