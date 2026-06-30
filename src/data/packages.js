/**
 * packages.js — Birthday & Event Packages
 * ✏️  Edit package names, prices, features, images, WhatsApp messages.
 */

export const packagesHeading = {
  eyebrow:  '🎉 Paquetes',
  title:    'Celebra con todo en Bodegol',
  subtitle: 'Cumpleaños, despedidas, reuniones de empresa o simplemente querer pasarla increíble. Tenemos el paquete para ti.',
}

export const packages = [
  {
    id:          'cancha',
    name:        'Paquete Cancha',
    subtitle:    'Solo a jugar',
    emoji:       '⚽',
    highlighted: false,
    badge:       null,
    priceLabel:  'Desde $600 / hora',
    priceNote:   'Por cancha completa',
    minGuests:   10,
    maxGuests:   14,
    duration:    '1 hora mínimo',
    image:       '/images/packages/paquete-cancha.jpg',
    features: [
      'Cancha de fútbol 7 (7 vs 7)',
      'Balón oficial incluido',
      'Vestidores y regaderas',
      'Marcación reglamentaria',
      'Cronómetro digital',
    ],
    notIncluded: ['Comida y bebidas (pagar por separado)', 'Decoración'],
    cta: {
      label:   'Reservar cancha',
      message: '¡Hola! Quiero reservar una cancha en Bodegol. ¿Qué disponibilidad tienen?',
    },
  },
  {
    id:          'cumpleanos',
    name:        'Paquete Cumpleaños',
    subtitle:    'La fiesta perfecta',
    emoji:       '🎂',
    highlighted: true,
    badge:       '⭐ Más Popular',
    priceLabel:  'Desde $2,500',
    priceNote:   'Para 15 personas',
    minGuests:   15,
    maxGuests:   30,
    duration:    '3 horas',
    image:       '/images/packages/paquete-cumpleanos.jpg',
    features: [
      '1 hora de cancha de fútbol 7',
      'Mesa reservada por 2 horas',
      'Decoración básica incluida',
      'Pastel de cumpleaños (1 kg)',
      'Mesero exclusivo para el grupo',
      'Carta de menú completa',
      '10% de descuento en bebidas',
    ],
    notIncluded: ['Bebidas (pago por separado)', 'Decoración extra'],
    cta: {
      label:   'Reservar este paquete',
      message: '¡Hola! Me interesa el Paquete Cumpleaños. ¿Tienen disponibilidad?',
    },
  },
  {
    id:          'grupal',
    name:        'Paquete Grupal',
    subtitle:    'Equipos y empresas',
    emoji:       '🏆',
    highlighted: false,
    badge:       null,
    priceLabel:  'Desde $5,000',
    priceNote:   'Para 30+ personas',
    minGuests:   30,
    maxGuests:   null,
    duration:    '4+ horas',
    image:       '/images/packages/paquete-grupal.jpg',
    features: [
      '2 canchas de fútbol 7 (torneo)',
      'Área privada reservada',
      'Menú buffet personalizable',
      'Barra de bebidas por consumo',
      'Decoración temática',
      'Staff dedicado de servicio',
      'Sistema de sonido exclusivo',
      'Coordinador de evento incluido',
    ],
    notIncluded: [],
    cta: {
      label:   'Solicitar cotización',
      message: '¡Hola! Quiero información sobre el Paquete Grupal para un evento. ¿Podemos hablar?',
    },
  },
]

export default packages
