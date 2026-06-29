/**
 * constants/index.js — App-Wide Constants
 */

// ─── Framer Motion animation presets ─────────────────────────────────────
export const ANIMATION = {
  FADE_UP: {
    hidden:  { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  },
  FADE_IN: {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
  },
  SCALE_IN: {
    hidden:  { opacity: 0, scale: 0.94 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
  },
  SLIDE_LEFT: {
    hidden:  { opacity: 0, x: -32 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  },
  SLIDE_RIGHT: {
    hidden:  { opacity: 0, x: 32 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  },
  // Both names work — STAGGER is the current name, STAGGER_CONTAINER kept for backwards compat
  STAGGER: {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.08 } },
  },
  STAGGER_CONTAINER: {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.08 } },
  },
}

// ─── Section anchor IDs — must match navigation.js hrefs ─────────────────
export const SECTION_IDS = {
  HERO:         'hero',
  HIGHLIGHTS:   'highlights',
  CANCHAS:      'canchas',
  MENU:         'menu',
  PROMOTIONS:   'promotions',
  PACKAGES:     'packages',
  EVENTS:       'events',
  GALLERY:      'gallery',
  TESTIMONIALS: 'testimonials',
  FAQ:          'faq',
  CONTACT:      'contact',
}

// ─── Breakpoints (mirrors Tailwind) ──────────────────────────────────────
export const BREAKPOINTS = { SM: 640, MD: 768, LG: 1024, XL: 1280 }

// ─── LocalStorage keys ────────────────────────────────────────────────────
export const STORAGE_KEYS = {
  THEME:      'bodegol:theme',
  AUTH_TOKEN: 'bodegol:auth-token',
}

// ─── Form status ─────────────────────────────────────────────────────────
export const FORM_STATUS = {
  IDLE: 'idle', LOADING: 'loading', SUCCESS: 'success', ERROR: 'error',
}

// ─── Routes ───────────────────────────────────────────────────────────────
export const ROUTES = {
  HOME:     '/',
  PRIVACY:  '/privacidad',
  TERMS:    '/terminos',
  NOT_FOUND:'/404',
}
