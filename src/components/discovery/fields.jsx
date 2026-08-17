// Shared field primitives for the Discovery Call form — kept intentionally
// small so every step renders fields the same way (label, helper, error).

export function Field({ label, required, helper, error, htmlFor, field, children }) {
  return (
    <div className="dc-field" data-field={field}>
      {label && (
        <label className="dc-label" htmlFor={htmlFor}>
          {label}{required && <span className="dc-req" aria-hidden="true"> *</span>}
        </label>
      )}
      {helper && <p className="dc-helper" id={htmlFor ? `${htmlFor}-helper` : undefined}>{helper}</p>}
      {children}
      {error && <p className="dc-error" id={htmlFor ? `${htmlFor}-error` : undefined} role="alert">{error}</p>}
    </div>
  )
}

function describedBy(id, helper, error) {
  const ids = []
  if (helper) ids.push(`${id}-helper`)
  if (error) ids.push(`${id}-error`)
  return ids.length ? ids.join(' ') : undefined
}

export function TextInput({ id, value, onChange, error, helper, placeholder, type = 'text', autoComplete, ...rest }) {
  return (
    <input
      id={id}
      className={'dc-input' + (error ? ' invalid' : '')}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoComplete={autoComplete}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={describedBy(id, helper, error)}
      {...rest}
    />
  )
}

export function TextArea({ id, value, onChange, error, helper, placeholder, rows = 4, ...rest }) {
  return (
    <textarea
      id={id}
      className={'dc-input dc-textarea' + (error ? ' invalid' : '')}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={describedBy(id, helper, error)}
      {...rest}
    />
  )
}

// Single-choice pills — value is a string, clicking selects it (click again to clear).
export function PillSingle({ name, options, value, onChange }) {
  return (
    <div className="dc-pills" role="radiogroup" aria-label={name}>
      {options.map((opt) => {
        const active = value === opt
        return (
          <button
            key={opt}
            type="button"
            role="radio"
            aria-checked={active}
            className={'dc-pill' + (active ? ' active' : '')}
            data-cursor
            onClick={() => onChange(active ? '' : opt)}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}

// Multi-choice pills — value is an array. "I'm not sure yet" (or any option
// flagged exclusive) clears the rest, and picking anything else clears it.
// Toggling is expressed as an updater (not a computed array) so two toggles
// in the same batch never clobber one another.
export function PillMulti({ name, options, value, onChange, exclusive }) {
  const toggle = (opt) => {
    onChange((prev) => {
      if (exclusive && exclusive === opt) return prev.includes(opt) ? [] : [opt]
      let next = prev.includes(opt) ? prev.filter((v) => v !== opt) : [...prev, opt]
      if (exclusive) next = next.filter((v) => v !== exclusive)
      return next
    })
  }
  return (
    <div className="dc-pills" role="group" aria-label={name}>
      {options.map((opt) => {
        const active = value.includes(opt)
        return (
          <button
            key={opt}
            type="button"
            aria-pressed={active}
            className={'dc-pill' + (active ? ' active' : '')}
            data-cursor
            onClick={() => toggle(opt)}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}
