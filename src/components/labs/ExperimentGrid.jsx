import { experiments } from '../../data/experiments.js'
import ExperimentCard from './ExperimentCard.jsx'

export default function ExperimentGrid() {
  return (
    <section id="experiments" className="section-pad">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow mono"><span className="bar"></span>The archive</div>
          <h2>Experiments beyond the brief.</h2>
          <p className="note">A living index of what we&apos;re exploring. Some entries move forward, some pause, some are left unfinished on purpose &mdash; the process is the point.</p>
        </div>
        <div className="exp-grid">
          {experiments.map((e) => (
            <ExperimentCard key={e.id} e={e} />
          ))}
        </div>
      </div>
    </section>
  )
}
