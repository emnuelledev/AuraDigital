import { notes } from '../../data/notes.js'
import LabNoteCard from './LabNoteCard.jsx'

export default function LabNotes() {
  return (
    <section id="notes" className="section-pad">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow mono"><span className="bar"></span>Lab notes</div>
          <h2>Fragments from building.</h2>
          <p className="note">Short observations, questions and lessons &mdash; written while the work is still warm. This space grows as we do.</p>
        </div>
        <div className="notes-grid">
          {notes.map((n, i) => (
            <LabNoteCard key={i} n={n} />
          ))}
        </div>
      </div>
    </section>
  )
}
