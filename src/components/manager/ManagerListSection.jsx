import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase.js'
import { uploadMedia } from '../../lib/uploadMedia.js'

function ImageField({ f, value, onChange }) {
  const id = 'f-' + f.key
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)

  const pick = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setBusy(true)
    setError(null)
    try {
      const url = await uploadMedia(file, f.folder || 'images')
      onChange(url)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="dc-field">
      <label className="dc-label" htmlFor={id}>{f.label}</label>
      <div className="mgr-image-field">
        {value ? <img className="mgr-image-preview" src={value} alt="" /> : <div className="mgr-image-preview empty">No photo yet</div>}
        <div>
          <input id={id} type="file" accept="image/*" onChange={pick} disabled={busy} />
          {value && <button type="button" className="mgr-btn danger" style={{ marginTop: '.6rem' }} onClick={() => onChange('')}>Remove photo</button>}
        </div>
      </div>
      {busy && <p className="mgr-status">Uploading…</p>}
      {error && <p className="dc-error" role="alert">{error}</p>}
      <p className="dc-helper" style={{ marginTop: '.5rem', marginBottom: 0 }}>{f.helper}</p>
    </div>
  )
}

function Field({ f, value, onChange }) {
  const id = 'f-' + f.key
  if (f.type === 'image') return <ImageField f={f} value={value} onChange={onChange} />
  if (f.type === 'checkbox') {
    return (
      <label className="dc-field" htmlFor={id} style={{ display: 'flex', alignItems: 'center', gap: '.6em' }}>
        <input id={id} type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} />
        <span className="dc-label" style={{ margin: 0 }}>{f.label}</span>
      </label>
    )
  }
  if (f.type === 'select') {
    return (
      <div className="dc-field">
        <label className="dc-label" htmlFor={id}>{f.label}</label>
        <select id={id} className="dc-input" value={value || ''} onChange={(e) => onChange(e.target.value)}>
          <option value="" disabled>Choose…</option>
          {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
    )
  }
  if (f.type === 'textarea') {
    return (
      <div className="dc-field">
        <label className="dc-label" htmlFor={id}>{f.label}</label>
        <textarea id={id} className="dc-input dc-textarea" value={value || ''} onChange={(e) => onChange(e.target.value)} />
      </div>
    )
  }
  if (f.type === 'list') {
    return (
      <div className="dc-field">
        <label className="dc-label" htmlFor={id}>{f.label}</label>
        <input
          id={id} className="dc-input" type="text"
          value={Array.isArray(value) ? value.join(', ') : ''}
          onChange={(e) => onChange(e.target.value.split(',').map((s) => s.trim()).filter(Boolean))}
        />
        <p className="dc-helper" style={{ marginTop: '.5rem', marginBottom: 0 }}>Comma-separated.</p>
      </div>
    )
  }
  return (
    <div className="dc-field">
      <label className="dc-label" htmlFor={id}>{f.label}</label>
      <input id={id} className="dc-input" type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}

// Generic editor for site_content sections shaped as an array of similar
// objects (testimonials, FAQ, Labs experiments, Labs notes). `itemFields`
// describes each row's inputs; `headFields` (optional) edits top-level
// copy like `eyebrow`/`head` on sections that wrap the array.
export default function ManagerListSection({
  section, fallback, title, description, itemFields, headFields, emptyItem, itemLabel, getItems, setItems,
}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    supabase
      .from('site_content')
      .select('data')
      .eq('section', section)
      .maybeSingle()
      .then(({ data: row }) => {
        if (cancelled) return
        setData(row?.data ?? fallback)
        setLoading(false)
      })
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section])

  if (loading || !data) return <p className="mgr-status">Loading…</p>

  const items = getItems(data)

  const updateItems = (next) => setData(setItems(data, next))
  const updateHead = (key, value) => setData({ ...data, [key]: value })
  const updateItem = (i, key, value) => {
    const next = items.slice()
    next[i] = { ...next[i], [key]: value }
    updateItems(next)
  }
  const addItem = () => updateItems([...items, { ...emptyItem }])
  const removeItem = (i) => updateItems(items.filter((_, idx) => idx !== i))
  const moveItem = (i, dir) => {
    const j = i + dir
    if (j < 0 || j >= items.length) return
    const next = items.slice()
    ;[next[i], next[j]] = [next[j], next[i]]
    updateItems(next)
  }

  const save = async () => {
    setStatus({ text: 'Saving…' })
    const { error } = await supabase.from('site_content').upsert({ section, data })
    setStatus(error ? { text: 'Could not save: ' + error.message, kind: 'err' } : { text: 'Saved.', kind: 'ok' })
  }

  return (
    <div>
      <div className="mgr-header">
        <div>
          <h1>{title}</h1>
          {description && <p>{description}</p>}
        </div>
        <button type="button" className="mgr-btn primary" onClick={save}>Save changes</button>
      </div>
      {status && <p className={'mgr-status' + (status.kind ? ' ' + status.kind : '')}>{status.text}</p>}

      {headFields && headFields.map((f) => (
        <Field key={f.key} f={f} value={data[f.key]} onChange={(v) => updateHead(f.key, v)} />
      ))}

      <div className="mgr-list">
        {items.length === 0 && <div className="mgr-empty">Nothing here yet — add the first one below.</div>}
        {items.map((item, i) => (
          <div className="mgr-row" key={i}>
            <div className="mgr-row-head">
              <span className="mgr-row-title">{itemLabel ? itemLabel(item, i) : `#${i + 1}`}</span>
              <div className="mgr-row-actions">
                <button type="button" className="mgr-icon-btn" onClick={() => moveItem(i, -1)} disabled={i === 0} aria-label="Move up">&#8593;</button>
                <button type="button" className="mgr-icon-btn" onClick={() => moveItem(i, 1)} disabled={i === items.length - 1} aria-label="Move down">&#8595;</button>
                <button type="button" className="mgr-btn danger" onClick={() => removeItem(i)}>Remove</button>
              </div>
            </div>
            {itemFields.map((f) => (
              <Field key={f.key} f={f} value={item[f.key]} onChange={(v) => updateItem(i, f.key, v)} />
            ))}
          </div>
        ))}
      </div>

      <button type="button" className="mgr-btn" onClick={addItem}>+ Add {itemFields ? '' : 'item'}</button>
    </div>
  )
}
