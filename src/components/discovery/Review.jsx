import { review, errorState } from '../../data/discovery.js'

function Group({ title, step, onEdit, rows }) {
  const visible = rows.filter((r) => r.value)
  if (!visible.length) return null
  return (
    <div className="dc-review-group">
      <div className="dc-review-group-head">
        <h4>{title}</h4>
        <button type="button" className="dc-edit" onClick={() => onEdit(step)} data-cursor>Edit</button>
      </div>
      <dl>
        {visible.map((r) => (
          <div className="dc-review-row" key={r.label}>
            <dt>{r.label}</dt>
            <dd>{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default function Review({ data, onEdit, onSubmit, status }) {
  const stage = data.stage === 'Other' && data.stageOther ? `Other — ${data.stageOther}` : data.stage
  const services = data.services
    .map((s) => (s === 'Other' && data.servicesOther ? `Other — ${data.servicesOther}` : s))
    .join(', ')

  return (
    <div className="dc-review">
      <Group
        title="Contact"
        step={0}
        onEdit={onEdit}
        rows={[
          { label: 'Name', value: data.name },
          { label: 'Email', value: data.email },
          { label: 'Business / Brand', value: data.business },
          { label: 'Location', value: data.location },
          { label: 'Website / Social', value: data.website },
        ]}
      />
      <Group
        title="Business"
        step={1}
        onEdit={onEdit}
        rows={[
          { label: 'What they do', value: data.description },
          { label: 'Stage', value: stage },
          { label: 'Audience', value: data.audience },
        ]}
      />
      <Group
        title="Project"
        step={2}
        onEdit={onEdit}
        rows={[
          { label: 'Services', value: services },
          { label: 'Goal', value: data.goal },
          { label: 'Existing materials', value: data.materials },
        ]}
      />
      <Group
        title="Project details"
        step={3}
        onEdit={onEdit}
        rows={[
          { label: 'Timeline', value: data.timeline },
          { label: 'Budget', value: data.budget },
          { label: 'Notes', value: data.notes },
        ]}
      />

      <p className="dc-privacy">{review.privacy}</p>

      {status === 'error' && (
        <div className="dc-inline-error" role="alert">
          <p className="dc-inline-error-head">{errorState.head}</p>
          <p>{errorState.body}</p>
        </div>
      )}

      <button
        type="button"
        className={'btn btn-primary dc-submit' + (status === 'submitting' ? ' loading' : '')}
        onClick={onSubmit}
        disabled={status === 'submitting'}
        data-cursor
      >
        <span className="dc-submit-label">{status === 'error' ? errorState.cta : review.cta}</span>
        <span className="arw">&#8599;</span>
        <span className="dc-spinner" aria-hidden="true"></span>
      </button>
    </div>
  )
}
