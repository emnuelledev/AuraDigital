import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal.js'
import '../styles/labs.css'
import LabsHeader from '../components/labs/LabsHeader.jsx'
import LabsFooter from '../components/labs/LabsFooter.jsx'
import ExperimentStatus from '../components/labs/ExperimentStatus.jsx'
import useContentSection from '../hooks/useContentSection.js'
import { experiments as experimentsFallback } from '../data/experiments.js'

function Block({ b }) {
  if (b.type === 'text') return <p className="exp-block-text">{b.body}</p>
  if (b.type === 'image') return (
    <figure className="exp-block-image">
      <img src={b.url} alt={b.caption || ''} loading="lazy" />
      {b.caption && <figcaption>{b.caption}</figcaption>}
    </figure>
  )
  if (b.type === 'file') return (
    <a className="exp-block-file" href={b.url} target="_blank" rel="noopener noreferrer">
      <span className="k">&#8615;</span>{b.label || 'Download file'}
    </a>
  )
  if (b.type === 'link') return (
    <a className="exp-block-link" href={b.url} target="_blank" rel="noopener noreferrer">
      {b.label || b.url} <span className="a">&#8599;</span>
    </a>
  )
  return null
}

export default function LabExperiment() {
  const { id } = useParams()
  const [menuOpen, setMenuOpen] = useState(false)
  const [ready, setReady] = useState(false)
  useReveal()
  useEffect(() => {
    const raf = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(raf)
  }, [])
  const [experiments] = useContentSection('experiments', experimentsFallback)
  const exp = experiments.find((e) => e.id === id)

  const cls = 'labs-page' + (ready ? ' ready' : '') + (menuOpen ? ' menu-open' : '')

  if (!exp) {
    return (
      <div className={cls}>
        <LabsHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <main className="section-pad">
          <div className="wrap">
            <p className="mono">Experiment not found.</p>
            <Link to="/labs" className="s-cta" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>&larr; Back to Labs</Link>
          </div>
        </main>
        <LabsFooter />
      </div>
    )
  }

  const hasExternal = exp.link && exp.link !== '#'

  return (
    <div className={cls}>
      <LabsHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main className="section-pad exp-detail">
        <div className="wrap wrap-narrow">
          <Link to="/labs" className="exp-back reveal">&larr; Back to Labs</Link>
          <div className="exp-detail-top reveal">
            <span className="disc mono">{exp.disciplines.join(' · ')}</span>
            <ExperimentStatus status={exp.status} />
          </div>
          <h1 className="reveal">{exp.title}</h1>
          {exp.year && <div className="yr mono reveal">{exp.year}</div>}
          <p className="exp-detail-desc reveal">{exp.desc}</p>

          {hasExternal && (
            <a className="cta reveal" href={exp.link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', marginBottom: '2.5rem' }}>
              {exp.cta || 'View externally'} &#8599;
            </a>
          )}

          <div className="exp-blocks reveal">
            {(!exp.content || exp.content.length === 0) && (
              <p className="mono" style={{ color: 'var(--mist)' }}>More on this experiment is coming soon.</p>
            )}
            {exp.content?.map((b, i) => <Block key={i} b={b} />)}
          </div>
        </div>
      </main>
      <LabsFooter />
    </div>
  )
}
