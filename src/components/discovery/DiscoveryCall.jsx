import { useEffect, useRef, useState } from 'react'
import Intro from './Intro.jsx'
import StepAbout from './StepAbout.jsx'
import StepBusiness from './StepBusiness.jsx'
import StepProject from './StepProject.jsx'
import StepDetails from './StepDetails.jsx'
import Review from './Review.jsx'
import Success from './Success.jsx'
import { steps } from '../../data/discovery.js'
import '../../styles/discovery.css'

const emptyData = {
  name: '', email: '', business: '', location: '', website: '',
  description: '', stage: '', stageOther: '', audience: '',
  services: [], servicesOther: '', goal: '', materials: '',
  timeline: '', budget: '', notes: '',
}

const STEP_COMPONENTS = [StepAbout, StepBusiness, StepProject, StepDetails]
const TOTAL_SECTIONS = 5 // 4 question steps + review

function validateStep(idx, d) {
  const e = {}
  if (idx === 0) {
    if (!d.name.trim()) e.name = 'Please enter your name.'
    if (!d.email.trim()) e.email = 'Please enter your email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) e.email = 'Please enter a valid email address.'
  } else if (idx === 1) {
    if (!d.description.trim()) e.description = 'Please tell us a little about your business.'
    if (!d.stage) e.stage = 'Please select an option.'
  } else if (idx === 2) {
    if (!d.services.length) e.services = 'Please select at least one option.'
    if (!d.goal.trim()) e.goal = 'Please tell us what you’re hoping to achieve.'
  } else if (idx === 3) {
    if (!d.timeline) e.timeline = 'Please select an option.'
  }
  return e
}

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])'

export default function DiscoveryCall({ isOpen, onClose }) {
  const [stepIndex, setStepIndex] = useState(-1) // -1 intro, 0-3 questions, 4 review
  const [submitted, setSubmitted] = useState(false)
  const [status, setStatus] = useState('idle') // idle | submitting | error
  const [data, setData] = useState(emptyData)
  const [errors, setErrors] = useState({})
  const startedAtRef = useRef(null)
  const honeypotRef = useRef('')

  const panelRef = useRef(null)
  const beginRef = useRef(null)
  const closeRef = useRef(null)

  const setField = (key, value) => {
    setData((d) => ({ ...d, [key]: typeof value === 'function' ? value(d[key]) : value }))
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e))
  }

  const resetAll = () => {
    setData(emptyData)
    setErrors({})
    setStepIndex(-1)
    setSubmitted(false)
    setStatus('idle')
  }

  // Body scroll lock while the experience is open.
  useEffect(() => {
    document.body.classList.toggle('dc-open', isOpen)
    return () => document.body.classList.remove('dc-open')
  }, [isOpen])

  // Focus the right element whenever a screen becomes active.
  useEffect(() => {
    if (!isOpen) return
    const t = setTimeout(() => {
      if (submitted) { closeRef.current?.focus(); return }
      if (stepIndex === -1) { beginRef.current?.focus(); return }
      const el = panelRef.current?.querySelector(FOCUSABLE)
      el?.focus()
    }, 60)
    return () => clearTimeout(t)
  }, [isOpen, stepIndex, submitted])

  // Escape to close, Tab to stay trapped inside the overlay.
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape' && status !== 'submitting') { onClose(); return }
      if (e.key !== 'Tab') return
      const nodes = panelRef.current?.querySelectorAll(FOCUSABLE)
      if (!nodes || !nodes.length) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, status, onClose])

  const handleBegin = () => {
    startedAtRef.current = Date.now()
    setStepIndex(0)
  }

  const goToStep = (idx) => { setErrors({}); setStepIndex(idx) }

  const handleContinue = () => {
    const e = validateStep(stepIndex, data)
    if (Object.keys(e).length) {
      setErrors(e)
      const firstKey = Object.keys(e)[0]
      const wrapper = panelRef.current?.querySelector(`[data-field="${firstKey}"]`)
      wrapper?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      wrapper?.querySelector('input,textarea,button')?.focus()
      return
    }
    setErrors({})
    setStepIndex((i) => Math.min(i + 1, TOTAL_SECTIONS - 1))
  }

  const handleBack = () => {
    setErrors({})
    setStepIndex((i) => Math.max(i - 1, -1))
  }

  const handleSubmit = async () => {
    if (status === 'submitting') return
    setStatus('submitting')
    try {
      const res = await fetch('/api/discovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          hp: honeypotRef.current,
          elapsedMs: Date.now() - (startedAtRef.current || Date.now()),
        }),
      })
      let json = {}
      try { json = await res.json() } catch { /* non-JSON error body */ }
      if (!res.ok || !json.ok) throw new Error(json.error || 'send_failed')
      setStatus('idle')
      setSubmitted(true)
    } catch {
      setStatus('error')
    }
  }

  const handleCloseFromSuccess = () => { resetAll(); onClose() }

  const progressPct = stepIndex >= 0 ? ((stepIndex + 1) / TOTAL_SECTIONS) * 100 : 0
  const StepComp = stepIndex >= 0 && stepIndex < 4 ? STEP_COMPONENTS[stepIndex] : null
  const meta = stepIndex >= 0 ? steps[stepIndex] : null

  return (
    <div className={'dc-overlay dark' + (isOpen ? ' open' : '')} aria-hidden={!isOpen} role="dialog" aria-modal="true" aria-label="Discovery call form">
      <div className="dc-glow" aria-hidden="true"></div>
      <div className="dc-panel" ref={panelRef}>
        {!submitted && (
          <button type="button" className="dc-close" onClick={onClose} aria-label="Close discovery call" data-cursor>
            <span></span><span></span>
          </button>
        )}

        {stepIndex >= 0 && stepIndex < TOTAL_SECTIONS && !submitted && (
          <div className="dc-progress" aria-hidden="true">
            <div className="dc-progress-bar" style={{ width: progressPct + '%' }}></div>
          </div>
        )}

        <div className="dc-body">
          {stepIndex === -1 && !submitted && (
            <Intro onBegin={handleBegin} onClose={onClose} beginRef={beginRef} />
          )}

          {stepIndex >= 0 && stepIndex < TOTAL_SECTIONS && !submitted && (
            <div className="dc-step" key={stepIndex}>
              <div className="eyebrow mono dc-eyebrow"><span className="bar"></span>{meta.label}</div>
              <p className="dc-step-intro">{meta.intro}</p>

              {/* honeypot — hidden from sighted users, real bots often fill it */}
              <div className="dc-hp" aria-hidden="true">
                <label htmlFor="dc-company">Company</label>
                <input id="dc-company" type="text" tabIndex="-1" autoComplete="off" onChange={(e) => { honeypotRef.current = e.target.value }} />
              </div>

              {stepIndex < 4 && <StepComp data={data} setField={setField} errors={errors} />}
              {stepIndex === 4 && (
                <Review data={data} onEdit={goToStep} onSubmit={handleSubmit} status={status} />
              )}

              {stepIndex < 4 && (
                <div className="dc-nav">
                  <button type="button" className="dc-back" onClick={handleBack} data-cursor>&#8592; Back</button>
                  <button type="button" className="btn btn-primary" onClick={handleContinue} data-cursor>Continue <span className="arw">&#8599;</span></button>
                </div>
              )}
              {stepIndex === 4 && (
                <div className="dc-nav dc-nav-review">
                  <button type="button" className="dc-back" onClick={handleBack} data-cursor>&#8592; Back</button>
                </div>
              )}
            </div>
          )}

          {submitted && <Success onClose={handleCloseFromSuccess} closeRef={closeRef} />}
        </div>
      </div>
    </div>
  )
}
