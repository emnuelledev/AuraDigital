import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase.js'
import { pricing } from '../../data/site.js'

const emptyPackage = { name: '', title: '', badge: '', feature: false, obj: '', amount: { eur: '', usd: '' }, from: 'Starting from', items: [], cta: '', ghost: true }
const emptyAlacarte = { n: '', t: '', d: '', pre: { eur: '€', usd: '$' }, amt: { eur: '', usd: '' } }

export default function ManagerPricing() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    let cancelled = false
    supabase.from('site_content').select('data').eq('section', 'pricing').maybeSingle().then(({ data: row }) => {
      if (cancelled) return
      setData(row?.data ?? pricing)
      setLoading(false)
    })
    return () => { cancelled = true }
  }, [])

  if (loading || !data) return <p className="mgr-status">Loading…</p>

  const setPackages = (packages) => setData({ ...data, packages })
  const setAlacarte = (alacarte) => setData({ ...data, alacarte })
  const updatePkg = (i, patch) => { const p = data.packages.slice(); p[i] = { ...p[i], ...patch }; setPackages(p) }
  const updateRow = (i, patch) => { const r = data.alacarte.slice(); r[i] = { ...r[i], ...patch }; setAlacarte(r) }
  const move = (list, setList, i, dir) => {
    const j = i + dir
    if (j < 0 || j >= list.length) return
    const next = list.slice()
    ;[next[i], next[j]] = [next[j], next[i]]
    setList(next)
  }

  const save = async () => {
    setStatus({ text: 'Saving…' })
    const { error } = await supabase.from('site_content').upsert({ section: 'pricing', data })
    setStatus(error ? { text: 'Could not save: ' + error.message, kind: 'err' } : { text: 'Saved.', kind: 'ok' })
  }

  return (
    <div>
      <div className="mgr-header">
        <div>
          <h1>Pricing</h1>
          <p>The package grid and the à la carte menu below it.</p>
        </div>
        <button type="button" className="mgr-btn primary" onClick={save}>Save changes</button>
      </div>
      {status && <p className={'mgr-status' + (status.kind ? ' ' + status.kind : '')}>{status.text}</p>}

      <div className="dc-field">
        <label className="dc-label">Note (below the à la carte menu)</label>
        <textarea className="dc-input dc-textarea" value={data.note} onChange={(e) => setData({ ...data, note: e.target.value })} />
      </div>

      <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.4rem', margin: '2rem 0 1rem' }}>Packages</h3>
      <div className="mgr-list">
        {data.packages.map((p, i) => (
          <div className="mgr-row" key={i}>
            <div className="mgr-row-head">
              <span className="mgr-row-title">{p.name || 'New package'}</span>
              <div className="mgr-row-actions">
                <button type="button" className="mgr-icon-btn" onClick={() => move(data.packages, setPackages, i, -1)} disabled={i === 0} aria-label="Move up">&#8593;</button>
                <button type="button" className="mgr-icon-btn" onClick={() => move(data.packages, setPackages, i, 1)} disabled={i === data.packages.length - 1} aria-label="Move down">&#8595;</button>
                <button type="button" className="mgr-btn danger" onClick={() => setPackages(data.packages.filter((_, idx) => idx !== i))}>Remove</button>
              </div>
            </div>
            <div className="dc-field"><label className="dc-label">Name</label><input className="dc-input" value={p.name} onChange={(e) => updatePkg(i, { name: e.target.value })} /></div>
            <div className="dc-field"><label className="dc-label">Title</label><input className="dc-input" value={p.title} onChange={(e) => updatePkg(i, { title: e.target.value })} /></div>
            <div className="dc-field"><label className="dc-label">Objective</label><textarea className="dc-input dc-textarea" value={p.obj} onChange={(e) => updatePkg(i, { obj: e.target.value })} /></div>
            <div className="dc-field"><label className="dc-label">Badge (optional, e.g. “Most chosen”)</label><input className="dc-input" value={p.badge || ''} onChange={(e) => updatePkg(i, { badge: e.target.value })} /></div>
            <div className="dc-field"><label className="dc-label">Price EUR</label><input className="dc-input" value={p.amount?.eur || ''} onChange={(e) => updatePkg(i, { amount: { ...p.amount, eur: e.target.value } })} /></div>
            <div className="dc-field"><label className="dc-label">Price USD</label><input className="dc-input" value={p.amount?.usd || ''} onChange={(e) => updatePkg(i, { amount: { ...p.amount, usd: e.target.value } })} /></div>
            <div className="dc-field"><label className="dc-label">Price qualifier (e.g. “Starting from” / “per month”)</label><input className="dc-input" value={p.from} onChange={(e) => updatePkg(i, { from: e.target.value })} /></div>
            <div className="dc-field">
              <label className="dc-label">Included items</label>
              <input className="dc-input" value={p.items.join(', ')} onChange={(e) => updatePkg(i, { items: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })} />
              <p className="dc-helper" style={{ marginTop: '.5rem', marginBottom: 0 }}>Comma-separated.</p>
            </div>
            <div className="dc-field"><label className="dc-label">Button label</label><input className="dc-input" value={p.cta} onChange={(e) => updatePkg(i, { cta: e.target.value })} /></div>
            <label className="dc-field" style={{ display: 'flex', alignItems: 'center', gap: '.6em' }}>
              <input type="checkbox" checked={!!p.feature} onChange={(e) => updatePkg(i, { feature: e.target.checked })} />
              <span className="dc-label" style={{ margin: 0 }}>Featured (dark, highlighted card)</span>
            </label>
          </div>
        ))}
      </div>
      <button type="button" className="mgr-btn" onClick={() => setPackages([...data.packages, { ...emptyPackage }])}>+ Add package</button>

      <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.4rem', margin: '2.4rem 0 1rem' }}>À la carte</h3>
      <div className="mgr-list">
        {data.alacarte.map((r, i) => (
          <div className="mgr-row" key={i}>
            <div className="mgr-row-head">
              <span className="mgr-row-title">{r.t || 'New item'}</span>
              <div className="mgr-row-actions">
                <button type="button" className="mgr-icon-btn" onClick={() => move(data.alacarte, setAlacarte, i, -1)} disabled={i === 0} aria-label="Move up">&#8593;</button>
                <button type="button" className="mgr-icon-btn" onClick={() => move(data.alacarte, setAlacarte, i, 1)} disabled={i === data.alacarte.length - 1} aria-label="Move down">&#8595;</button>
                <button type="button" className="mgr-btn danger" onClick={() => setAlacarte(data.alacarte.filter((_, idx) => idx !== i))}>Remove</button>
              </div>
            </div>
            <div className="dc-field"><label className="dc-label">Code (e.g. A—01)</label><input className="dc-input" value={r.n} onChange={(e) => updateRow(i, { n: e.target.value })} /></div>
            <div className="dc-field"><label className="dc-label">Title</label><input className="dc-input" value={r.t} onChange={(e) => updateRow(i, { t: e.target.value })} /></div>
            <div className="dc-field"><label className="dc-label">Description</label><input className="dc-input" value={r.d} onChange={(e) => updateRow(i, { d: e.target.value })} /></div>
            <div className="dc-field"><label className="dc-label">Price EUR (leave blank for “Custom”)</label><input className="dc-input" value={r.amt?.eur || ''} onChange={(e) => updateRow(i, { amt: { ...r.amt, eur: e.target.value } })} /></div>
            <div className="dc-field"><label className="dc-label">Price USD</label><input className="dc-input" value={r.amt?.usd || ''} onChange={(e) => updateRow(i, { amt: { ...r.amt, usd: e.target.value } })} /></div>
          </div>
        ))}
      </div>
      <button type="button" className="mgr-btn" onClick={() => setAlacarte([...data.alacarte, { ...emptyAlacarte }])}>+ Add à la carte item</button>
    </div>
  )
}
