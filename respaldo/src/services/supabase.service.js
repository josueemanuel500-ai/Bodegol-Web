/**
 * supabase.service.js — Supabase Client
 *
 * Initializes and exports the Supabase client.
 * All database queries go through this file — never import createClient elsewhere.
 *
 * CURRENT STATE: Stub — returns null client when credentials are not set.
 * INTEGRATION: Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env
 *
 * Usage (when integrated):
 *   import { supabase } from '@/services/supabase.service'
 *   const { data } = await supabase.from('reservations').select('*')
 *
 * Install:  npm install @supabase/supabase-js
 */

import siteConfig from '@/config/site.config'

let supabaseClient = null

/**
 * Get the Supabase client instance.
 * Returns null if credentials are not configured.
 * Lazy-initialized on first call.
 */
export async function getSupabase() {
  if (supabaseClient) return supabaseClient

  const { supabaseUrl, supabaseKey } = siteConfig.api
  if (!supabaseUrl || !supabaseKey) {
    if (siteConfig.isDev) {
      console.warn('[Supabase] Credentials not set. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env')
    }
    return null
  }

  // Dynamically import to keep bundle size down when Supabase is not used
  // Uncomment when @supabase/supabase-js is installed:
  // const { createClient } = await import('@supabase/supabase-js')
  // supabaseClient = createClient(supabaseUrl, supabaseKey)

  return supabaseClient
}

// Convenience export for use in services
export { supabaseClient as supabase }
export default getSupabase
