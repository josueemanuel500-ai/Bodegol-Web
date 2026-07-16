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
  // Nota: la URL y la anon key de Supabase son PÚBLICAS (viajan en el navegador;
  // la seguridad real la dan las políticas RLS). Se dejan como valor por defecto
  // para que funcione al desplegar por git sin configurar variables de entorno.
  // El .env local (VITE_SUPABASE_*) sigue teniendo prioridad como override.
  api: {
    baseUrl:      import.meta.env.VITE_API_URL           || 'http://localhost:4000',
    supabaseUrl:  import.meta.env.VITE_SUPABASE_URL      || 'https://vucytmlgksahnoqtbyhf.supabase.co',
    supabaseKey:  import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1Y3l0bWxna3NhaG5vcXRieWhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3NDY0NzMsImV4cCI6MjA5ODMyMjQ3M30.JtHTm4GU-PaH7Y51Gksvcje5PS2aD6-_QzCZzkWOr1k',
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

    // Marca de agua sutil "Bodegol" en galería/promos (protección casual). Off por defecto.
    imageWatermark: false,

    // Dark mode toggle in navbar (currently site is always dark)
    darkModeToggle: false,

    // Live match schedule widget (future — pull from API)
    liveSchedule: false,
  },
}

export default siteConfig
