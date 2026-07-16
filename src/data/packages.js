/**
 * packages.js — Cumpleaños y eventos
 * IMAGE (pkg.image): 1200×900 WebP horizontal, máx 300 KB → public/images/packages/
 */
export const packagesHeading = {
  eyebrow:  'Eventos',
  title:    'Cumpleaños y eventos',
  subtitle: 'Canchas para cumpleaños en Mérida y eventos en áreas climatizadas. Nuestro Paquete Fiesta es todo incluido, de 3 horas. Pregúntanos por WhatsApp.',
}

export const packages = [
  {
    id:          'cancha',
    name:        'Paquete Cancha',
    subtitle:    'Solo a jugar',
    highlighted: false,
    badge:       null,
    priceLabel:  'Desde $600 / hora',
    priceNote:   'Por cancha completa',
    minGuests:   10,
    maxGuests:   10,
    duration:    '1 hora mínimo',
    image:       '/images/packages/paquete-cancha.jpg',
    features: [
      'Cancha de fútbol 5v5 (5 vs 5)',
      'Vestidores y regaderas',
      'Marcación reglamentaria',
    ],
    notIncluded: ['Comida y bebidas (por separado)'],
    cta: {
      label:   'Reservar cancha',
      message: '¡Hola! Quiero reservar una cancha en Bodegol. ¿Qué disponibilidad tienen?',
    },
  },
  {
    id:          'fiesta',
    name:        'Paquete Fiesta',
    subtitle:    'Cumpleaños y eventos',
    highlighted: true,
    badge:       'Más popular',
    priceLabel:  '',        // sin precio: se cotiza por WhatsApp
    priceNote:   '',
    minGuests:   15,
    maxGuests:   null,
    duration:    '3 horas de servicio',
    image:       '/images/packages/paquete-fiesta.jpg',
    features: [
      'Áreas climatizadas',
      '3 horas de servicio',
      'Opciones de comida: pizza, hot dogs, hamburguesas y croissants',
      'Agua 500 ml y Power 500 ml',
      'Pastel de chocolate o vainilla',
      'Piñata',
    ],
    notIncluded: [],
    cta: {
      label:   'Solicitar información',
      message: '¡Hola! Quiero información del Paquete Fiesta (cumpleaños/evento) en Bodegol. ¿Me pueden dar los detalles?',
    },
  },
]

export default packages
