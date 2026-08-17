import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase.js'

const Ctx = createContext(null)

export function ManagerAuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!supabase) { setReady(true); return }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setReady(true)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  const signIn = async (email, password) => {
    if (!supabase) return { error: 'Supabase is not configured.' }
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: error?.message }
  }

  const signOut = () => supabase?.auth.signOut()

  return (
    <Ctx.Provider value={{ session, ready, signIn, signOut, configured: !!supabase }}>
      {children}
    </Ctx.Provider>
  )
}

export function useManagerAuth() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useManagerAuth must be used within a ManagerAuthProvider')
  return ctx
}
