/**
 * hero.js — Hero Section Content
 * ✏️  Edit headline, subheadline, badge, background image.
 */

export const heroContent = {
  // ✏️  Small pill shown above headline — set null to hide
  badge: '⚽ Abierto hoy · 3:00 PM – 11:00 PM',

  headline:    'El campo es tuyo.\nLa comida, también.',
  subheadline: 'Canchas de fútbol 7, pantallas gigantes, bar con todo y la mejor comida en Mérida. Para los que juegan y para los que animan.',

  // ✏️  Path: public/images/hero/hero-bg.jpg  (or .webp)
  backgroundImage: '/images/hero/hero-bg.jpg',
  backgroundAlt:   'Cancha de fútbol 7 iluminada en Bodegol, Mérida',

  // Stats strip shown inside the hero
  stats: [
    { value: '6',    label: 'Canchas de fútbol 7', icon: 'goal' },
    { value: '300+', label: 'Personas de capacidad', icon: 'people' },
    { value: '4.9★', label: 'Calificación Google', icon: 'star' },
    { value: '4+',   label: 'Años en Mérida', icon: 'calendar' },
  ],

  cta: {
    primary: {
      label:   '¡Reserva tu Cancha!',
      message: '¡Hola! Quiero reservar una cancha en Bodegol.',
    },
    secondary: {
      label:   'Ver menú y precios',
      href:    '/#menu',
    },
  },
}

export default heroContent
