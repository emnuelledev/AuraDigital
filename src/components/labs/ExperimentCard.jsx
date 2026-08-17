import { Link } from 'react-router-dom'
import ExperimentStatus from './ExperimentStatus.jsx'

export default function ExperimentCard({ e }) {
  return (
    <article className={'exp reveal freq-' + e.freq + (e.placeholder ? ' placeholder' : '')} data-cursor>
      <div className="preview">
        <div className="grid-fx"></div>
        <span className="pv-id">LAB / {e.id}</span>
      </div>
      <div className="body">
        <div className="top">
          <span className="disc">{e.disciplines.join(' · ')}</span>
          <ExperimentStatus status={e.status} />
        </div>
        <h3>{e.title}</h3>
        {e.year && <div className="yr">{e.year}</div>}
        <p className="desc">{e.desc}</p>
        {!e.placeholder && (
          <Link className="cta" to={`/labs/${e.id}`}>{e.cta || 'View experiment'} &#8599;</Link>
        )}
      </div>
    </article>
  )
}
