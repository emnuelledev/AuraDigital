import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase.js'

function fmtDate(iso) {
  try { return new Date(iso).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }) } catch { return iso }
}

export default function ManagerDiscovery() {
  const [rows, setRows] = useState(null)
  const [selected, setSelected] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    supabase
      .from('discovery_submissions')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error: err }) => {
        if (cancelled) return
        if (err) setError(err.message)
        setRows(data || [])
      })
    return () => { cancelled = true }
  }, [])

  return (
    <div>
      <div className="mgr-header">
        <div>
          <h1>Discovery Call submissions</h1>
          <p>Everyone who has filled out the discovery form, newest first. Read-only — the email Resend sends is still the primary notification.</p>
        </div>
      </div>

      {error && <p className="mgr-status err">Could not load submissions: {error}</p>}
      {!error && rows === null && <p className="mgr-status">Loading…</p>}
      {rows && rows.length === 0 && <div className="mgr-empty">No submissions yet.</div>}

      {rows && rows.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table className="mgr-table">
            <thead>
              <tr><th>Date</th><th>Name</th><th>Business</th><th>Email</th><th>Timeline</th></tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} onClick={() => setSelected(r)}>
                  <td className="muted">{fmtDate(r.created_at)}</td>
                  <td>{r.name}</td>
                  <td className="muted">{r.business || '—'}</td>
                  <td className="muted">{r.email}</td>
                  <td className="muted">{r.timeline || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <div className="mgr-detail">
          <div className="mgr-row-head">
            <span className="mgr-row-title">{selected.name}</span>
            <button type="button" className="mgr-btn" onClick={() => setSelected(null)}>Close</button>
          </div>
          <dl>
            <dt>Submitted</dt><dd>{fmtDate(selected.created_at)}</dd>
            <dt>Email</dt><dd>{selected.email}</dd>
            <dt>Business</dt><dd>{selected.business || '—'}</dd>
            <dt>Location</dt><dd>{selected.location || '—'}</dd>
            <dt>Website</dt><dd>{selected.website || '—'}</dd>
            <dt>Description</dt><dd>{selected.description || '—'}</dd>
            <dt>Stage</dt><dd>{selected.stage || '—'}{selected.stage_other ? ` — ${selected.stage_other}` : ''}</dd>
            <dt>Audience</dt><dd>{selected.audience || '—'}</dd>
            <dt>Services</dt><dd>{(Array.isArray(selected.services) ? selected.services : []).join(', ') || '—'}{selected.services_other ? ` — ${selected.services_other}` : ''}</dd>
            <dt>Goal</dt><dd>{selected.goal || '—'}</dd>
            <dt>Materials</dt><dd>{selected.materials || '—'}</dd>
            <dt>Timeline</dt><dd>{selected.timeline || '—'}</dd>
            <dt>Budget</dt><dd>{selected.budget || '—'}</dd>
            <dt>Notes</dt><dd>{selected.notes || '—'}</dd>
          </dl>
        </div>
      )}
    </div>
  )
}
