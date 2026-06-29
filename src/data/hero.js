/**
 * hero.js - Hero Section Content
 */

export const heroContent = {
  badge: 'Canchas 5x5 - Reservaciones abiertas',

  headline:    'El campo es tuyo.\nLa comida, tambien.',
  subheadline: 'Canchas de futbol 5x5, pantallas gigantes, bar con todo y la mejor comida en Merida. Para los que juegan y para los que animan.',

  backgroundImage: '/images/hero/hero-bg.jpg',
  backgroundAlt:   'Cancha de futbol 5x5 iluminada en Bodegol, Merida',

  stats: [
    { value: '6',    label: 'Canchas de futbol 5x5', icon: 'goal' },
    { value: '300+', label: 'Personas de capacidad', icon: 'people' },
    { value: '4.9',  label: 'Calificacion Google', icon: 'star' },
    { value: '4+',   label: 'Anios en Merida', icon: 'calendar' },
  ],

  cta: {
    primary: {
      label:   'Reserva tu cancha',
      message: 'Hola, quiero reservar una cancha 5x5 en Bodegol.',
    },
    secondary: {
      label:   'Ver menu y precios',
      href:    '/#menu',
    },
  },
}

export default heroContent

