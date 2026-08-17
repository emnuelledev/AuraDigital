// Vercel serverless function — receives a Discovery Call submission and
// emails it to the studio via Resend. Secrets (RESEND_API_KEY, TO_EMAIL)
// live only in the deployment's environment, never in client code.

const REQUIRED = ['name', 'email', 'description', 'stage', 'goal', 'timeline']

function isEmail(v) {
  return typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
}

function esc(v) {
  return String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
}

function row(label, value) {
  if (!value) return ''
  return `<tr><td style="padding:6px 0;font-family:monospace,monospace;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#8b8398;width:170px;vertical-align:top">${esc(label)}</td><td style="padding:6px 0;color:#0C0A12;font-size:14px;line-height:1.5">${esc(value)}</td></tr>`
}

function section(title, rowsHtml) {
  if (!rowsHtml.replace(/\s/g, '')) return ''
  return `<tr><td style="padding:22px 0 6px">
      <p style="margin:0 0 10px;font-family:monospace,monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#7A6BD6">${esc(title)}</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tbody>${rowsHtml}</tbody></table>
    </td></tr>`
}

function buildEmailHtml(d) {
  const services = Array.isArray(d.services)
    ? d.services.map((s) => (s === 'Other' && d.servicesOther ? `Other — ${d.servicesOther}` : s)).join(', ')
    : ''
  const stage = d.stage === 'Other' && d.stageOther ? `Other — ${d.stageOther}` : d.stage
  const submittedAt = new Date().toLocaleString('en-GB', { dateStyle: 'long', timeStyle: 'short' })

  const contactRows = row('Name', d.name) + row('Email', d.email) + row('Business / Brand', d.business) + row('Location', d.location) + row('Website / Social', d.website)
  const businessRows = row('Business description', d.description) + row('Current stage', stage) + row('Target customers', d.audience)
  const projectRows = row('Services selected', services) + row('Project goal', d.goal) + row('Existing materials', d.materials)
  const detailRows = row('Desired timeline', d.timeline) + row('Budget range', d.budget) + row('Additional notes', d.notes)

  return `<!doctype html>
<html><body style="margin:0;background:#F3F1F8;font-family:Georgia,'Times New Roman',serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F3F1F8;padding:32px 16px">
<tbody><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden">
<tbody>
<tr><td style="background:#0C0A12;padding:28px 32px">
  <p style="margin:0;font-family:Georgia,serif;font-size:20px;letter-spacing:.02em;color:#F3F1F8">Aura<span style="font-family:monospace,monospace;font-size:11px;letter-spacing:.3em;color:#DCCFFF;margin-left:8px">DIGITAL</span></p>
  <p style="margin:14px 0 0;font-family:monospace,monospace;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#DCCFFF">New Aura Digital Discovery</p>
</td></tr>
<tr><td style="padding:6px 32px 28px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tbody>
${section('Contact', contactRows)}
${section('Business', businessRows)}
${section('Project', projectRows)}
${section('Project Details', detailRows)}
</tbody></table>
</td></tr>
<tr><td style="padding:16px 32px;border-top:1px solid #EAE6F4;font-family:monospace,monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#A9A3BC">
  Submitted via Aura Digital — Discovery Call &middot; ${esc(submittedAt)}
</td></tr>
</tbody></table>
</td></tr></tbody></table>
</body></html>`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'method_not_allowed' })
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {}

  // Honeypot + timing trap — quiet spam filtering, no CAPTCHA needed.
  // Both report success so bots get no signal about what tripped the filter.
  if (body.hp) return res.status(200).json({ ok: true })
  if (typeof body.elapsedMs === 'number' && body.elapsedMs < 2500) {
    return res.status(200).json({ ok: true })
  }

  for (const key of REQUIRED) {
    const v = body[key]
    if (!v || (typeof v === 'string' && !v.trim())) {
      return res.status(400).json({ ok: false, error: `missing_${key}` })
    }
  }
  if (!isEmail(body.email)) return res.status(400).json({ ok: false, error: 'invalid_email' })
  if (!Array.isArray(body.services) || !body.services.length) {
    return res.status(400).json({ ok: false, error: 'missing_services' })
  }

  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.TO_EMAIL
  const fromEmail = process.env.FROM_EMAIL || 'Aura Digital <onboarding@resend.dev>'

  if (!apiKey || !toEmail) {
    console.error('Discovery Call: missing RESEND_API_KEY or TO_EMAIL env var')
    return res.status(500).json({ ok: false, error: 'server_not_configured' })
  }

  const subjectName = (body.business && body.business.trim()) || body.name
  const subject = `New Discovery — ${subjectName}`

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: body.email,
        subject,
        html: buildEmailHtml(body),
      }),
    })
    if (!r.ok) {
      const text = await r.text().catch(() => '')
      console.error('Resend error', r.status, text)
      return res.status(502).json({ ok: false, error: 'send_failed' })
    }
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Discovery Call submit failed', err)
    return res.status(502).json({ ok: false, error: 'send_failed' })
  }
}
