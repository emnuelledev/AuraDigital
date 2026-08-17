import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Both are meant to be public (the anon key is safe to ship — Row Level
// Security in Supabase is what actually gates writes, not this key).
// `supabase` is null when unconfigured so the rest of the app can fall
// back to the static site content instead of crashing.
export const supabase = url && anonKey ? createClient(url, anonKey) : null
