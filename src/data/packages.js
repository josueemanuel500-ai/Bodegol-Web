/**
 * packages.js - Birthday & Event Packages
 */

export const packagesHeading = {
  eyebrow:  'Paquetes',
  title:    'Celebra con todo en Bodegol',
  subtitle: 'Cumpleanos, despedidas, reuniones de empresa o simplemente querer pasarla increible. Tenemos el paquete para ti.',
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
    maxGuests:   10,
    duration:    '1 hora minimo',
    image:       '/images/packages/paquete-cancha.jpg',
    features: [
      'Cancha de futbol 5x5',
      'Balon oficial incluido',
      'Vestidores y regaderas',
      'Marcacion para futbol 5x5',
      'Cronometro digital',
    ],
    notIncluded: ['Comida y bebidas (pagar por separado)', 'Decoracion'],
    cta: {
      label:   'Reservar cancha',
      message: 'Hola, quiero reservar una cancha 5x5 en Bodegol. Que disponibilidad tienen?',
    },
  },
  {
    id:          'cumpleanos',
    name:        'Paquete Cumpleanos',
    subtitle:    'La fiesta perfecta',
    emoji:       '🎂',
    highlighted: true,
    badge:       'Mas Popular',
    priceLabel:  'Desde $2,500',
    priceNote:   'Para 15 personas',
    minGuests:   15,
    maxGuests:   30,
    duration:    '3 horas',
    image:       '/images/packages/paquete-cumpleanos.jpg',
    features: [
      '1 hora de cancha de futbol 5x5',
      'Mesa reservada por 2 horas',
      'Decoracion basica incluida',
      'Pastel de cumpleanos (1 kg)',
      'Mesero exclusivo para el grupo',
      'Carta de menu completa',
      '10% de descuento en bebidas',
    ],
    notIncluded: ['Bebidas (pago por separado)', 'Decoracion extra'],
    cta: {
      label:   'Reservar este paquete',
      message: 'Hola, me interesa el Paquete Cumpleanos. Tienen disponibilidad?',
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
      '2 canchas de futbol 5x5 para torneo',
      'Area privada reservada',
      'Menu buffet personalizable',
      'Barra de bebidas por consumo',
      'Decoracion tematica',
      'Staff dedicado de servicio',
      'Sistema de sonido exclusivo',
      'Coordinador de evento incluido',
    ],
    notIncluded: [],
    cta: {
      label:   'Solicitar cotizacion',
      message: 'Hola, quiero informacion sobre el Paquete Grupal para un evento. Podemos hablar?',
    },
  },
]

export default packages
