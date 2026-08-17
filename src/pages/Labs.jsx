import { useEffect, useState } from 'react'
import useReveal from '../hooks/useReveal.js'
import useSmoothScroll from '../hooks/useSmoothScroll.js'
import '../styles/labs.css'
import LabsHeader from '../components/labs/LabsHeader.jsx'
import LabsHero from '../components/labs/LabsHero.jsx'
import ExperimentGrid from '../components/labs/ExperimentGrid.jsx'
import LabsBridge from '../components/labs/LabsBridge.jsx'
import LabNotes from '../components/labs/LabNotes.jsx'
import LabsToStudio from '../components/labs/LabsToStudio.jsx'
import LabsFooter from '../components/labs/LabsFooter.jsx'

// The Labs experience is scoped under .labs-page (labs.css), so the darker,
// more technical "frequency" can't clash with the studio home styles.
export default function Labs() {
  const [ready, setReady] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useReveal()
  useSmoothScroll()
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])
  const cls = 'labs-page' + (ready ? ' ready' : '') + (menuOpen ? ' menu-open' : '')
  return (
    <div className={cls}>
      <a href="#experiments" className="skip">Skip to experiments</a>
      <LabsHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <LabsHero />
        <ExperimentGrid />
        <LabsBridge />
        <LabNotes />
        <LabsToStudio />
      </main>
      <LabsFooter />
    </div>
  )
}
