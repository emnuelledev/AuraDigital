import { useEffect, useState } from 'react'
import logo from '../../assets/logo.png'
import { loader } from '../../data/site.js'

let played = false // module-level: the entrance plays once per session

export default function Loader() {
  const [done, setDone] = useState(played)
  useEffect(() => {
    if (played) return
    const reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches
    document.body.classList.add('loading')
    const finish = () => { played = true; setDone(true); document.body.classList.remove('loading') }
    const t = setTimeout(finish, reduce ? 200 : 1650)
    const safety = setTimeout(finish, 3500)
    return () => { clearTimeout(t); clearTimeout(safety); document.body.classList.remove('loading') }
  }, [])
  if (played && done) return null
  return (
    <div id="loader" className={done ? 'done' : ''}>
      <img className="loader-mark" src={logo} alt="Aura Digital" />
      <div className="loader-bar"></div>
      <div className="loader-cap mono">{loader.cap}</div>
    </div>
  )
}
