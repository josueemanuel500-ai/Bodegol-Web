/**
 * supabase.service.js — Cliente Supabase (único punto de creación).
 * Si no hay credenciales (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY),
 * `supabase` es null y la app funciona con los datos estáticos.
 */
import { createClient } from '@supabase/supabase-js'
import siteConfig from '@/config/site.config'

const { supabaseUrl, supabaseKey } = siteConfig.api

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey, { auth: { persistSession: true, autoRefreshToken: true } })
  : null

if (!isSupabaseConfigured && siteConfig.isDev) {
  console.warn('[Supabase] Sin credenciales. Se usan datos estáticos. Configura VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en .env')
}

export default supabase
