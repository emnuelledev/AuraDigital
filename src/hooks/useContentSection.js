import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase.js'

// Reads a manager-editable section from Supabase, falling back to the
// static seed data (the current src/data/*.js exports) if Supabase isn't
// configured, the row doesn't exist yet, or the fetch fails — a content
// outage should never blank a section of the live site.
export default function useContentSection(section, fallback) {
  const [data, setData] = useState(fallback)
  const [loading, setLoading] = useState(!!supabase)

  useEffect(() => {
    if (!supabase) return
    let cancelled = false
    supabase
      .from('site_content')
      .select('data')
      .eq('section', section)
      .maybeSingle()
      .then(({ data: row, error }) => {
        if (cancelled) return
        if (!error && row?.data) setData(row.data)
        setLoading(false)
      })
      .catch(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [section])

  return [data, loading]
}
