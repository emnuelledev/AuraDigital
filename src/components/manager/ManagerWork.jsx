import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase.js'
import { work } from '../../data/site.js'

const emptyCase = {
  kind: 'mock', mkTheme: 'a', mkEyebrow: '', mkH: '',
  cn: '', title: '', cd: '', tags: [], stats: [{ n: '', l: '' }, { n: '', l: '' }],
  url: '', siteUrl: '', liveLabel: 'Visit the live site',
}

export default function ManagerWork() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    let cancelled = false
    supabase.from('site_content').select('data').eq('section', 'work').maybeSingle().then(({ data: row }) => {
      if (cancelled) return
      setData(row?.data ?? work)
      setLoading(false)
    })
    return () => { cancelled = true }
  }, [])

  if (loading || !data) return <p className="mgr-status">Loading…</p>

  const setCases = (cases) => setData({ ...data, cases })
  const updateCase = (i, patch) => { const c = data.cases.slice(); c[i] = { ...c[i], ...patch }; setCases(c) }
  const updateStat = (i, si, patch) => {
    const stats = data.cases[i].stats.slice()
    stats[si] = { ...stats[si], ...patch }
    updateCase(i, { stats })
  }
  const move = (i, dir) => {
    const j = i + dir
    if (j < 0 || j >= data.cases.length) return
    const next = data.cases.slice()
    ;[next[i], next[j]] = [next[j], next[i]]
    setCases(next)
  }

  const save = async () => {
    setStatus({ text: 'Saving…' })
    const { error } = await supabase.from('site_content').upsert({ section: 'work', data })
    setStatus(error ? { text: 'Could not save: ' + error.message, kind: 'err' } : { text: 'Saved.', kind: 'ok' })
  }

  return (
    <div>
      <div className="mgr-header">
        <div>
          <h1>Selected work</h1>
          <p>Case studies. New cases are added as a themed “mock” card (color block, no screenshot) — a real embedded live screenshot needs a design pass first, ask Claude to add one.</p>
        </div>
        <button type="button" className="mgr-btn primary" onClick={save}>Save changes</button>
      </div>
      {status && <p className={'mgr-status' + (status.kind ? ' ' + status.kind : '')}>{status.text}</p>}

      <div className="mgr-list">
        {data.cases.map((c, i) => (
          <div className="mgr-row" key={i}>
            <div className="mgr-row-head">
              <span className="mgr-row-title">{c.title || 'New case'} <span style={{ opacity: .5, fontSize: '.8rem' }}>({c.kind})</span></span>
              <div className="mgr-row-actions">
                <button type="button" className="mgr-icon-btn" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up">&#8593;</button>
                <button type="button" className="mgr-icon-btn" onClick={() => move(i, 1)} disabled={i === data.cases.length - 1} aria-label="Move down">&#8595;</button>
                <button type="button" className="mgr-btn danger" onClick={() => setCases(data.cases.filter((_, idx) => idx !== i))}>Remove</button>
              </div>
            </div>
            <div className="dc-field"><label className="dc-label">Category line (e.g. “Beauty & Wellness · Brand + Website”)</label><input className="dc-input" value={c.cn} onChange={(e) => updateCase(i, { cn: e.target.value })} /></div>
            <div className="dc-field"><label className="dc-label">Title</label><input className="dc-input" value={c.title} onChange={(e) => updateCase(i, { title: e.target.value })} /></div>
            <div className="dc-field"><label className="dc-label">Description</label><textarea className="dc-input dc-textarea" value={c.cd} onChange={(e) => updateCase(i, { cd: e.target.value })} /></div>
            <div className="dc-field">
              <label className="dc-label">Tags</label>
              <input className="dc-input" value={c.tags.join(', ')} onChange={(e) => updateCase(i, { tags: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })} />
              <p className="dc-helper" style={{ marginTop: '.5rem', marginBottom: 0 }}>Comma-separated.</p>
            </div>
            <div className="dc-field"><label className="dc-label">Stat 1 (number)</label><input className="dc-input" value={c.stats?.[0]?.n || ''} onChange={(e) => updateStat(i, 0, { n: e.target.value })} /></div>
            <div className="dc-field"><label className="dc-label">Stat 1 (label)</label><input className="dc-input" value={c.stats?.[0]?.l || ''} onChange={(e) => updateStat(i, 0, { l: e.target.value })} /></div>
            <div className="dc-field"><label className="dc-label">Stat 2 (number)</label><input className="dc-input" value={c.stats?.[1]?.n || ''} onChange={(e) => updateStat(i, 1, { n: e.target.value })} /></div>
            <div className="dc-field"><label className="dc-label">Stat 2 (label)</label><input className="dc-input" value={c.stats?.[1]?.l || ''} onChange={(e) => updateStat(i, 1, { l: e.target.value })} /></div>
            <div className="dc-field"><label className="dc-label">Live site URL (optional — shows a “Visit the live site” link)</label><input className="dc-input" value={c.url || ''} onChange={(e) => updateCase(i, { url: e.target.value })} /></div>
            {c.kind === 'mock' && (
              <>
                <div className="dc-field"><label className="dc-label">Mock card eyebrow</label><input className="dc-input" value={c.mkEyebrow || ''} onChange={(e) => updateCase(i, { mkEyebrow: e.target.value })} /></div>
                <div className="dc-field"><label className="dc-label">Mock card heading</label><input className="dc-input" value={c.mkH || ''} onChange={(e) => updateCase(i, { mkH: e.target.value })} /></div>
                <div className="dc-field">
                  <label className="dc-label">Mock color theme</label>
                  <select className="dc-input" value={c.mkTheme || 'a'} onChange={(e) => updateCase(i, { mkTheme: e.target.value })}>
                    <option value="a">Lavender</option>
                    <option value="b">Dark</option>
                    <option value="c">Cream</option>
                    <option value="d">Olive</option>
                    <option value="e">Lilac</option>
                  </select>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <button type="button" className="mgr-btn" onClick={() => setCases([...data.cases, { ...emptyCase, stats: [{ n: '', l: '' }, { n: '', l: '' }] }])}>+ Add case</button>
    </div>
  )
}
