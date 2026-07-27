/**
 * hero.js — Hero Section Content
 */
export const heroContent = {
  badge: null,

  headline:    'DONDE EL FÚTBOL SE VIVE.',
  subheadline: 'Disfruta fútbol 5 vs 5 en nuestras cinco canchas, acompaña cada partido con excelente comida y bebidas, y vive el mejor ambiente deportivo de Mérida.',

  // IMAGE — football stadium / match. Recommended: 2400 × 1350 px (16:9), .webp < 500 KB.
  // Desktop 1920×1080 (16:9) WebP, máx 450 KB → public/images/hero/hero-stadium.jpg
  backgroundImage: '/images/hero/hero-stadium.jpg',
  // Mobile 1080×1350 (4:5) WebP, máx 350 KB → public/images/hero/hero-stadium-mobile.jpg
  backgroundImageMobile: '/images/hero/hero-stadium-mobile.jpg',
  backgroundAlt:   'Estadio de fútbol iluminado de noche — Bodegol, Mérida',

  stats: [
    { value: '5',    label: 'Canchas profesionales', icon: 'goal' },
    { value: '5v5',  label: 'Fútbol rápido', icon: 'people' },
    { value: '4.9★', label: 'Calificación Google', icon: 'star' },
    { value: '4+',   label: 'Años en Mérida', icon: 'calendar' },
  ],

  cta: {
    primary: {
      label:   'Reserva tu cancha',
      message: '¡Hola! Quiero reservar una cancha en Bodegol.',
    },
    secondary: {
      label: 'Ver promociones',
      href:  '/promociones',
    },
  },
}

export default heroContent
