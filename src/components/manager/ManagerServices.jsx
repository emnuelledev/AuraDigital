import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase.js'
import { services } from '../../data/site.js'

// The three pillars are a fixed 3-column layout by design — this editor
// lets her rewrite each one's copy, but doesn't allow adding/removing
// cards (that would break the section's grid).
export default function ManagerServices() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    let cancelled = false
    supabase.from('site_content').select('data').eq('section', 'services').maybeSingle().then(({ data: row }) => {
      if (cancelled) return
      setData(row?.data ?? services)
      setLoading(false)
    })
    return () => { cancelled = true }
  }, [])

  if (loading || !data) return <p className="mgr-status">Loading…</p>

  const updateItem = (i, key, value) => {
    const items = data.items.slice()
    items[i] = { ...items[i], [key]: value }
    setData({ ...data, items })
  }
  const updateLong = (i, pIdx, value) => {
    const items = data.items.slice()
    const long = (items[i].long || ['', '']).slice()
    long[pIdx] = value
    items[i] = { ...items[i], long }
    setData({ ...data, items })
  }

  const save = async () => {
    setStatus({ text: 'Saving…' })
    const { error } = await supabase.from('site_content').upsert({ section: 'services', data })
    setStatus(error ? { text: 'Could not save: ' + error.message, kind: 'err' } : { text: 'Saved.', kind: 'ok' })
  }

  return (
    <div>
      <div className="mgr-header">
        <div>
          <h1>Services — Three Pillars</h1>
          <p>“What we do” section. The card grid and layout stay fixed — only the copy changes here.</p>
        </div>
        <button type="button" className="mgr-btn primary" onClick={save}>Save changes</button>
      </div>
      {status && <p className={'mgr-status' + (status.kind ? ' ' + status.kind : '')}>{status.text}</p>}

      <div className="mgr-list">
        {data.items.map((item, i) => (
          <div className="mgr-row" key={item.idx}>
            <div className="mgr-row-head"><span className="mgr-row-title">{item.idx} · {item.title}</span></div>
            <div className="dc-field">
              <label className="dc-label">Title</label>
              <input className="dc-input" type="text" value={item.title} onChange={(e) => updateItem(i, 'title', e.target.value)} />
            </div>
            <div className="dc-field">
              <label className="dc-label">Card summary (short)</label>
              <input className="dc-input" type="text" value={item.desc} onChange={(e) => updateItem(i, 'desc', e.target.value)} />
            </div>
            <div className="dc-field">
              <label className="dc-label">Modal opening line</label>
              <textarea className="dc-input dc-textarea" value={item.long?.[0] || ''} onChange={(e) => updateLong(i, 0, e.target.value)} />
            </div>
            <div className="dc-field">
              <label className="dc-label">Modal full description</label>
              <textarea className="dc-input dc-textarea" value={item.long?.[1] || ''} onChange={(e) => updateLong(i, 1, e.target.value)} />
            </div>
            <div className="dc-field">
              <label className="dc-label">“We work across” tags</label>
              <input
                className="dc-input" type="text"
                value={item.tags.join(', ')}
                onChange={(e) => updateItem(i, 'tags', e.target.value.split(',').map((s) => s.trim()).filter(Boolean))}
              />
              <p className="dc-helper" style={{ marginTop: '.5rem', marginBottom: 0 }}>Comma-separated.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
