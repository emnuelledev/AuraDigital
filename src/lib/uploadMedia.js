import { supabase } from './supabase.js'

// Uploads to the public "media" Storage bucket (see README for the
// one-time bucket + policy setup) and returns the public URL. Used for
// testimonial photos and Labs article images/files.
export async function uploadMedia(file, folder) {
  if (!supabase) throw new Error('Supabase is not configured.')
  const ext = file.name.includes('.') ? file.name.split('.').pop() : 'bin'
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const { error } = await supabase.storage.from('media').upload(path, file)
  if (error) throw error
  const { data } = supabase.storage.from('media').getPublicUrl(path)
  return data.publicUrl
}
