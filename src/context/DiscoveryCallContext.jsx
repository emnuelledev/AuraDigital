import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import DiscoveryCall from '../components/discovery/DiscoveryCall.jsx'

const Ctx = createContext(null)

// Global controller for the Discovery Call modal. Mounted once near the app
// root so any CTA, anywhere, can open the same experience via useDiscoveryCall().
export function DiscoveryCallProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef(null)

  const open = useCallback((e) => {
    triggerRef.current = e?.currentTarget || null
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    if (triggerRef.current && typeof triggerRef.current.focus === 'function') {
      triggerRef.current.focus()
    }
  }, [])

  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close])

  return (
    <Ctx.Provider value={value}>
      {children}
      <DiscoveryCall isOpen={isOpen} onClose={close} />
    </Ctx.Provider>
  )
}

export function useDiscoveryCall() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useDiscoveryCall must be used within a DiscoveryCallProvider')
  return ctx
}
