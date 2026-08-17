import { useState } from 'react'
import { NavLink, Route, Routes, Navigate, Link } from 'react-router-dom'
import { useManagerAuth } from '../context/ManagerAuthContext.jsx'
import ManagerTestimonials from '../components/manager/ManagerTestimonials.jsx'
import ManagerFaq from '../components/manager/ManagerFaq.jsx'
import ManagerServices from '../components/manager/ManagerServices.jsx'
import ManagerPricing from '../components/manager/ManagerPricing.jsx'
import ManagerWork from '../components/manager/ManagerWork.jsx'
import ManagerExperiments from '../components/manager/ManagerExperiments.jsx'
import ManagerNotes from '../components/manager/ManagerNotes.jsx'
import ManagerDiscovery from '../components/manager/ManagerDiscovery.jsx'
import '../styles/discovery.css'
import '../styles/manager.css'

function Login() {
  const { signIn, configured } = useManagerAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError(null)
    const { error: err } = await signIn(email, password)
    setBusy(false)
    if (err) setError(err)
  }

  return (
    <div className="manager-page mgr-login">
      <div className="mgr-login-card">
        <div className="brand"><span className="b1">Aura</span><span className="b2">Manager</span></div>
        <h1>Sign in</h1>
        {!configured && (
          <p className="mgr-status err">Supabase isn’t configured yet — set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.</p>
        )}
        <form onSubmit={submit}>
          <div className="dc-field">
            <label className="dc-label" htmlFor="mgr-email">Email</label>
            <input id="mgr-email" className="dc-input" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="dc-field">
            <label className="dc-label" htmlFor="mgr-password">Password</label>
            <input id="mgr-password" className="dc-input" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p className="dc-error" role="alert">{error}</p>}
          <button type="submit" className="mgr-btn primary" disabled={busy || !configured} style={{ width: '100%', justifyContent: 'center', marginTop: '.5rem' }}>
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <p style={{ marginTop: '2rem' }}><Link className="mgr-back-site" to="/">&larr; Back to Aura Digital</Link></p>
      </div>
    </div>
  )
}

const NAV = [
  { group: 'Studio site', links: [
    { to: 'services', label: 'Services' },
    { to: 'pricing', label: 'Pricing' },
    { to: 'work', label: 'Selected work' },
    { to: 'testimonials', label: 'Testimonials' },
    { to: 'faq', label: 'FAQ' },
  ] },
  { group: 'Labs', links: [
    { to: 'experiments', label: 'Experiments' },
    { to: 'notes', label: 'Lab notes' },
  ] },
  { group: 'Leads', links: [
    { to: 'discovery', label: 'Discovery submissions' },
  ] },
]

function Shell() {
  const { signOut } = useManagerAuth()
  return (
    <div className="manager-page">
      <div className="mgr-shell">
        <nav className="mgr-nav">
          <div className="brand"><span className="b1">Aura</span><span className="b2">Manager</span></div>
          {NAV.map((g) => (
            <div className="mgr-nav-group" key={g.group}>
              <div className="mgr-nav-label">{g.group}</div>
              {g.links.map((l) => (
                <NavLink key={l.to} to={l.to} className={({ isActive }) => 'mgr-nav-link' + (isActive ? ' active' : '')}>
                  {l.label}
                </NavLink>
              ))}
            </div>
          ))}
          <div className="mgr-nav-foot">
            <Link className="mgr-back-site" to="/">&larr; Back to Aura Digital</Link>
            <button type="button" className="mgr-signout" onClick={signOut}>Sign out</button>
          </div>
        </nav>
        <main className="mgr-main">
          <Routes>
            <Route index element={<Navigate to="services" replace />} />
            <Route path="services" element={<ManagerServices />} />
            <Route path="pricing" element={<ManagerPricing />} />
            <Route path="work" element={<ManagerWork />} />
            <Route path="testimonials" element={<ManagerTestimonials />} />
            <Route path="faq" element={<ManagerFaq />} />
            <Route path="experiments" element={<ManagerExperiments />} />
            <Route path="notes" element={<ManagerNotes />} />
            <Route path="discovery" element={<ManagerDiscovery />} />
            <Route path="*" element={<Navigate to="services" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default function Manager() {
  const { session, ready } = useManagerAuth()

  if (!ready) return <div className="manager-page mgr-login"><p className="mgr-status">Loading…</p></div>

  return (
    <Routes>
      <Route path="login" element={session ? <Navigate to="/manager" replace /> : <Login />} />
      <Route path="*" element={session ? <Shell /> : <Navigate to="/manager/login" replace />} />
    </Routes>
  )
}
