import { useEffect, useRef } from 'react'

// Drag-to-compare before/after slider (mouse + touch, with desktop hover-follow),
// ported 1:1 from the original site.
export default function BeforeAfter({ data }) {
  const baRef = useRef(null)
  const afterRef = useRef(null)
  const handleRef = useRef(null)
  useEffect(() => {
    const ba = baRef.current, after = afterRef.current, handle = handleRef.current
    if (!ba) return
    let dragging = false
    const fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches
    const setPos = (clientX) => {
      const r = ba.getBoundingClientRect()
      let p = (clientX - r.left) / r.width
      p = Math.max(0, Math.min(1, p))
      const pct = p * 100
      after.style.clipPath = 'inset(0 0 0 ' + pct + '%)'
      handle.style.left = pct + '%'
    }
    const start = (e) => { dragging = true; setPos((e.touches ? e.touches[0] : e).clientX) }
    const move = (e) => { if (!dragging) return; setPos((e.touches ? e.touches[0] : e).clientX) }
    const end = () => { dragging = false }
    const hover = (e) => { if (!dragging) setPos(e.clientX) }
    ba.addEventListener('mousedown', start)
    ba.addEventListener('touchstart', start, { passive: true })
    window.addEventListener('mousemove', move)
    window.addEventListener('touchmove', move, { passive: true })
    window.addEventListener('mouseup', end)
    window.addEventListener('touchend', end)
    if (fine) ba.addEventListener('mousemove', hover)
    return () => {
      ba.removeEventListener('mousedown', start)
      ba.removeEventListener('touchstart', start)
      window.removeEventListener('mousemove', move)
      window.removeEventListener('touchmove', move)
      window.removeEventListener('mouseup', end)
      window.removeEventListener('touchend', end)
      if (fine) ba.removeEventListener('mousemove', hover)
    }
  }, [])
  return (
    <div className="ba" id="ba" data-cursor ref={baRef}>
      <div className="ba-layer ba-before">
        <div className="ba-word-wrap"><span className="ba-eye">{data.eyebrow}</span><span className="ba-word">{data.word}</span></div>
      </div>
      <div className="ba-layer ba-after" id="baAfter" ref={afterRef}>
        <div className="ba-word-wrap"><span className="ba-eye">{data.eyebrow}</span><span className="ba-word">{data.word}</span></div>
      </div>
      <span className="ba-tag b">Before</span>
      <span className="ba-tag a">After</span>
      <div className="ba-handle" id="baHandle" ref={handleRef}><div className="grip">&#8646;</div></div>
    </div>
  )
}
