import ExperimentStatus from './ExperimentStatus.jsx'

export default function ExperimentCard({ e }) {
  const showCta = !e.placeholder && e.cta
  const external = e.link && e.link !== '#'
  return (
    <article className={'exp reveal freq-' + e.freq + (e.placeholder ? ' placeholder' : '')} data-cursor>
      <div className="preview">
        <div className="grid-fx"></div>
        <span className="pv-id">LAB / {e.id}</span>
      </div>
      <div className="body">
        <div className="top">
          <span className="disc">{e.disciplines.join(' \u00b7 ')}</span>
          <ExperimentStatus status={e.status} />
        </div>
        <h3>{e.title}</h3>
        {e.year && <div className="yr">{e.year}</div>}
        <p className="desc">{e.desc}</p>
        {showCta &&
          (external ? (
            <a className="cta" href={e.link} target="_blank" rel="noopener">{e.cta} ↗</a>
          ) : (
            <a className="cta" href={e.link || '#'}>{e.cta} ↗</a>
          ))}
      </div>
    </article>
  )
}
