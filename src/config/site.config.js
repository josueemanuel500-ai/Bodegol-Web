/**
 * site.config.js — Site Configuration
 *
 * All environment variables are read HERE only.
 * Rest of the app imports from this file, never from import.meta.env directly.
 */

export const siteConfig = {
  businessId: import.meta.env.VITE_BUSINESS_ID || 'bodegol',

  env:    import.meta.env.MODE     || 'development',
  isDev:  import.meta.env.DEV,
  isProd: import.meta.env.PROD,

  // ── API endpoints ──────────────────────────────────────────────────
  api: {
    baseUrl:      import.meta.env.VITE_API_URL           || 'http://localhost:4000',
    supabaseUrl:  import.meta.env.VITE_SUPABASE_URL      || '',
    supabaseKey:  import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  },

  // ── Analytics ──────────────────────────────────────────────────────
  analytics: {
    googleId: import.meta.env.VITE_GA_ID         || '',
    pixelId:  import.meta.env.VITE_FB_PIXEL_ID   || '',
    enabled:  import.meta.env.PROD === true,
  },

  // ── Feature flags ──────────────────────────────────────────────────
  // Toggle features without deleting code.
  // Set to true when the corresponding backend integration is ready.
  features: {
    // Online reservation form (currently uses WhatsApp)
    // Set true when api.bodegol.com.mx + Supabase is connected
    reservationSystem: false,

    // Online menu ordering (future)
    onlineOrdering: false,

    // Loyalty / points system (future)
    loyaltyProgram: false,

    // Backoffice link in footer (show to staff only when auth is ready)
    backofficeLink: false,

    // Dark mode toggle in navbar (currently site is always dark)
    darkModeToggle: false,

    // Live match schedule widget (future — pull from API)
    liveSchedule: false,
  },
}

export default siteConfig
