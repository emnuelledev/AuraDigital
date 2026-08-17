import { useEffect, useRef, useState } from 'react'

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])'

// Single modal, reused for every service pillar — content comes entirely
// from the `service` prop (see data/site.js services.items) so there is
// only one implementation to maintain, not one per card.
export default function ServiceModal({ service, onClose }) {
  const isOpen = !!service
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const triggerRef = useRef(null)
  const [display, setDisplay] = useState(service)

  // Keep rendering the last open service while the panel fades out, so the
  // close transition animates real content instead of an empty shell.
  useEffect(() => {
    if (service) setDisplay(service)
  }, [service])

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement
      const t = setTimeout(() => closeRef.current?.focus(), 60)
      return () => clearTimeout(t)
    }
    triggerRef.current?.focus?.()
  }, [isOpen])

  useEffect(() => {
    document.body.classList.toggle('svc-modal-open', isOpen)
    return () => document.body.classList.remove('svc-modal-open')
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') { onClose(); return }
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
  }, [isOpen, onClose])

  return (
    <div
      className={'svc-modal-overlay' + (isOpen ? ' open' : '')}
      aria-hidden={!isOpen}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="svc-modal-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="svc-modal-title"
      >
        {display && (
          <>
            <button type="button" className="svc-modal-close" onClick={onClose} aria-label="Close" ref={closeRef}>
              <span></span><span></span>
            </button>
            <span className="idx svc-modal-idx">{display.idx}</span>
            <h3 id="svc-modal-title" className="svc-modal-title">{display.title}</h3>
            <div className="svc-modal-body">
              {display.long.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="svc-modal-divider"></div>
            <span className="svc-modal-label mono">We work across</span>
            <div className="tags">
              {display.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
