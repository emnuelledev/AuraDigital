import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase.js'
import { uploadMedia } from '../../lib/uploadMedia.js'
import { experiments as experimentsFallback } from '../../data/experiments.js'

const emptyExperiment = {
  id: '', title: '', year: '', disciplines: [], status: 'Exploring', freq: 'soft',
  cta: '', link: '#', desc: '', placeholder: false, content: [],
}

const emptyBlock = {
  text: { type: 'text', body: '' },
  image: { type: 'image', url: '', caption: '' },
  file: { type: 'file', url: '', label: '' },
  link: { type: 'link', url: '', label: '' },
}

function UploadButton({ label, folder, onUploaded, accept }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)
  const pick = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setBusy(true)
    setError(null)
    try {
      onUploaded(await uploadMedia(file, folder))
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }
  return (
    <div>
      <label className="mgr-btn" style={{ cursor: busy ? 'default' : 'pointer' }}>
        {busy ? 'Uploading…' : label}
        <input type="file" accept={accept} onChange={pick} disabled={busy} style={{ display: 'none' }} />
      </label>
      {error && <p className="dc-error" role="alert">{error}</p>}
    </div>
  )
}

function BlockEditor({ blocks, onChange }) {
  const update = (i, patch) => { const b = blocks.slice(); b[i] = { ...b[i], ...patch }; onChange(b) }
  const remove = (i) => onChange(blocks.filter((_, idx) => idx !== i))
  const move = (i, dir) => {
    const j = i + dir
    if (j < 0 || j >= blocks.length) return
    const next = blocks.slice()
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
  }
  const add = (type) => onChange([...blocks, { ...emptyBlock[type] }])

  return (
    <div style={{ marginTop: '.5rem' }}>
      <label className="dc-label">Article content</label>
      <div className="mgr-list" style={{ marginTop: '.8rem' }}>
        {blocks.map((b, i) => (
          <div className="mgr-row" key={i}>
            <div className="mgr-row-head">
              <span className="mgr-row-title" style={{ fontSize: '.95rem' }}>{b.type}</span>
              <div className="mgr-row-actions">
                <button type="button" className="mgr-icon-btn" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up">&#8593;</button>
                <button type="button" className="mgr-icon-btn" onClick={() => move(i, 1)} disabled={i === blocks.length - 1} aria-label="Move down">&#8595;</button>
                <button type="button" className="mgr-btn danger" onClick={() => remove(i)}>Remove</button>
              </div>
            </div>

            {b.type === 'text' && (
              <div className="dc-field">
                <textarea className="dc-input dc-textarea" placeholder="Paragraph text…" value={b.body} onChange={(e) => update(i, { body: e.target.value })} />
              </div>
            )}

            {b.type === 'image' && (
              <div className="mgr-file-field">
                {b.url && <img src={b.url} alt="" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 10 }} />}
                <UploadButton label={b.url ? 'Replace image' : 'Upload image'} folder="labs" accept="image/*" onUploaded={(url) => update(i, { url })} />
                <input className="dc-input" style={{ flex: 1, minWidth: 200 }} placeholder="Caption (optional)" value={b.caption} onChange={(e) => update(i, { caption: e.target.value })} />
              </div>
            )}

            {b.type === 'file' && (
              <div className="mgr-file-field">
                {b.url && <a className="mgr-file-link" href={b.url} target="_blank" rel="noopener noreferrer">Current file &#8599;</a>}
                <UploadButton label={b.url ? 'Replace file' : 'Upload file (PDF, etc.)'} folder="labs" accept="*/*" onUploaded={(url) => update(i, { url })} />
                <input className="dc-input" style={{ flex: 1, minWidth: 200 }} placeholder="Label (e.g. “Download the PDF”)" value={b.label} onChange={(e) => update(i, { label: e.target.value })} />
              </div>
            )}

            {b.type === 'link' && (
              <>
                <div className="dc-field"><label className="dc-label">URL</label><input className="dc-input" value={b.url} onChange={(e) => update(i, { url: e.target.value })} /></div>
                <div className="dc-field"><label className="dc-label">Label</label><input className="dc-input" value={b.label} onChange={(e) => update(i, { label: e.target.value })} /></div>
              </>
            )}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap', marginTop: '.8rem' }}>
        <button type="button" className="mgr-btn" onClick={() => add('text')}>+ Text</button>
        <button type="button" className="mgr-btn" onClick={() => add('image')}>+ Image</button>
        <button type="button" className="mgr-btn" onClick={() => add('file')}>+ File</button>
        <button type="button" className="mgr-btn" onClick={() => add('link')}>+ Link</button>
      </div>
    </div>
  )
}

export default function ManagerExperiments() {
  const [items, setItems] = useState(null)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    let cancelled = false
    supabase.from('site_content').select('data').eq('section', 'experiments').maybeSingle().then(({ data: row }) => {
      if (cancelled) return
      setItems(row?.data ?? experimentsFallback)
      setLoading(false)
    })
    return () => { cancelled = true }
  }, [])

  if (loading || !items) return <p className="mgr-status">Loading…</p>

  const update = (i, patch) => { const next = items.slice(); next[i] = { ...next[i], ...patch }; setItems(next) }
  const remove = (i) => setItems(items.filter((_, idx) => idx !== i))
  const move = (i, dir) => {
    const j = i + dir
    if (j < 0 || j >= items.length) return
    const next = items.slice()
    ;[next[i], next[j]] = [next[j], next[i]]
    setItems(next)
  }

  const save = async () => {
    setStatus({ text: 'Saving…' })
    const { error } = await supabase.from('site_content').upsert({ section: 'experiments', data: items })
    setStatus(error ? { text: 'Could not save: ' + error.message, kind: 'err' } : { text: 'Saved.', kind: 'ok' })
  }

  return (
    <div>
      <div className="mgr-header">
        <div>
          <h1>Labs — Experiments</h1>
          <p>Each card in the Labs archive links to its own page — add photos, PDFs, links or write-ups under “Article content”.</p>
        </div>
        <button type="button" className="mgr-btn primary" onClick={save}>Save changes</button>
      </div>
      {status && <p className={'mgr-status' + (status.kind ? ' ' + status.kind : '')}>{status.text}</p>}

      <div className="mgr-list">
        {items.map((item, i) => (
          <div className="mgr-row" key={i}>
            <div className="mgr-row-head">
              <span className="mgr-row-title">{item.title || 'New experiment'}</span>
              <div className="mgr-row-actions">
                <button type="button" className="mgr-icon-btn" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up">&#8593;</button>
                <button type="button" className="mgr-icon-btn" onClick={() => move(i, 1)} disabled={i === items.length - 1} aria-label="Move down">&#8595;</button>
                <button type="button" className="mgr-btn danger" onClick={() => remove(i)}>Remove</button>
              </div>
            </div>

            <div className="dc-field"><label className="dc-label">ID (used in its URL — e.g. 001 → /labs/001)</label><input className="dc-input" value={item.id} onChange={(e) => update(i, { id: e.target.value })} /></div>
            <div className="dc-field"><label className="dc-label">Title</label><input className="dc-input" value={item.title} onChange={(e) => update(i, { title: e.target.value })} /></div>
            <div className="dc-field"><label className="dc-label">Year</label><input className="dc-input" value={item.year} onChange={(e) => update(i, { year: e.target.value })} /></div>
            <div className="dc-field">
              <label className="dc-label">Disciplines</label>
              <input className="dc-input" value={item.disciplines.join(', ')} onChange={(e) => update(i, { disciplines: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })} />
              <p className="dc-helper" style={{ marginTop: '.5rem', marginBottom: 0 }}>Comma-separated.</p>
            </div>
            <div className="dc-field"><label className="dc-label">Status</label><input className="dc-input" value={item.status} onChange={(e) => update(i, { status: e.target.value })} /></div>
            <div className="dc-field">
              <label className="dc-label">Card color</label>
              <select className="dc-input" value={item.freq} onChange={(e) => update(i, { freq: e.target.value })}>
                {['iris', 'cyan', 'violet', 'rose', 'soft'].map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div className="dc-field"><label className="dc-label">Card description</label><textarea className="dc-input dc-textarea" value={item.desc} onChange={(e) => update(i, { desc: e.target.value })} /></div>
            <div className="dc-field"><label className="dc-label">External link (optional — shown as a button on the article page)</label><input className="dc-input" value={item.link || ''} onChange={(e) => update(i, { link: e.target.value })} /></div>
            <div className="dc-field"><label className="dc-label">External link button label</label><input className="dc-input" value={item.cta || ''} onChange={(e) => update(i, { cta: e.target.value })} /></div>
            <label className="dc-field" style={{ display: 'flex', alignItems: 'center', gap: '.6em' }}>
              <input type="checkbox" checked={!!item.placeholder} onChange={(e) => update(i, { placeholder: e.target.checked })} />
              <span className="dc-label" style={{ margin: 0 }}>Placeholder card (dashed, not clickable)</span>
            </label>

            {!item.placeholder && (
              <BlockEditor blocks={item.content || []} onChange={(content) => update(i, { content })} />
            )}
          </div>
        ))}
      </div>
      <button
        type="button" className="mgr-btn"
        onClick={() => setItems([...items, { ...emptyExperiment }])}
      >
        + Add experiment
      </button>
    </div>
  )
}
