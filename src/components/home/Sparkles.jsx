import { useEffect, useRef } from 'react'

// Hero sparkle field — drifting four-point stars on a canvas (iris tint),
// disabled for reduced-motion. Ported 1:1 from the original site.
export default function Sparkles() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return
    const ctx = canvas.getContext('2d')
    let W, H, dpr, stars = [], raf
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = canvas.clientWidth; H = canvas.clientHeight
      canvas.width = W * dpr; canvas.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(46, Math.round((W * H) / 26000))
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        s: Math.random() * 1.6 + 0.5,
        vy: -(Math.random() * 0.25 + 0.05),
        vx: (Math.random() - 0.5) * 0.12,
        tw: Math.random() * Math.PI * 2,
        tws: Math.random() * 0.03 + 0.008,
      }))
    }
    function star(x, y, r, a) {
      ctx.save(); ctx.translate(x, y); ctx.globalAlpha = a; ctx.fillStyle = '#7A6BD6'
      ctx.beginPath()
      for (let i = 0; i < 4; i++) {
        const ang = (i * Math.PI) / 2
        ctx.lineTo(Math.cos(ang) * r, Math.sin(ang) * r)
        ctx.lineTo(Math.cos(ang + Math.PI / 4) * r * 0.28, Math.sin(ang + Math.PI / 4) * r * 0.28)
      }
      ctx.closePath(); ctx.fill(); ctx.restore()
    }
    function frame() {
      ctx.clearRect(0, 0, W, H)
      stars.forEach((p) => {
        p.x += p.vx; p.y += p.vy; p.tw += p.tws
        if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W }
        if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10
        const a = (Math.sin(p.tw) * 0.5 + 0.5) * 0.6 + 0.1
        star(p.x, p.y, p.s * 3, a)
      })
      raf = requestAnimationFrame(frame)
    }
    let rt
    const onResize = () => { clearTimeout(rt); rt = setTimeout(resize, 150) }
    resize(); frame()
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); clearTimeout(rt); window.removeEventListener('resize', onResize) }
  }, [])
  return <canvas id="sparkles" ref={ref} aria-hidden="true"></canvas>
}
