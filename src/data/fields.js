/**
 * fields.js — Soccer Fields Data
 * ✏️  Edit field names, descriptions, prices, capacities, images.
 */

export const fieldsHeading = {
  eyebrow:  '⚽ Nuestras Canchas',
  title:    '6 canchas de fútbol 7',
  subtitle: 'Canchas de pasto sintético de alta calidad con iluminación profesional, marcación reglamentaria y sistema de reservaciones en línea.',
}

export const fields = [
  {
    id:          'cancha-1',
    name:        'Cancha Tigre',
    description: 'La más grande del complejo. Iluminación LED profesional, porterías reglamentarias y pasto sintético de última generación.',
    image:       '/images/fields/cancha-tigre.jpg',
    imageAlt:    'Cancha Tigre de fútbol 7 en Bodegol',
    capacity:    '14 jugadores (7 vs 7)',
    surface:     'Pasto sintético 3G',
    lighting:    'LED profesional',
    price:       '$600 MXN / hora',
    priceNote:   'Precio en horario regular. Fines de semana puede variar.',
    features:    ['Vestuarios incluidos', 'Marcación reglamentaria', 'Porterías con red', 'Cronómetro digital'],
    available:   true,
    featured:    true,
  },
  {
    id:          'cancha-2',
    name:        'Cancha León',
    description: 'Cancha cubierta ideal para cuando el calor aprieta. Capacidad para partidos completos 7 vs 7 con toda la intensidad.',
    image:       '/images/fields/cancha-leon.jpg',
    imageAlt:    'Cancha León cubierta en Bodegol',
    capacity:    '14 jugadores (7 vs 7)',
    surface:     'Pasto sintético 3G',
    lighting:    'LED cubierta',
    price:       '$550 MXN / hora',
    priceNote:   'Incluye balón oficial.',
    features:    ['Cubierta techada', 'Marcación reglamentaria', 'Porterías con red', 'Balón incluido'],
    available:   true,
    featured:    false,
  },
  {
    id:          'cancha-3',
    name:        'Cancha Águila',
    description: 'La favorita para los torneos nocturnos. Vista directa a las pantallas de transmisión desde la cancha.',
    image:       '/images/fields/cancha-aguila.jpg',
    imageAlt:    'Cancha Águila nocturna en Bodegol',
    capacity:    '14 jugadores (7 vs 7)',
    surface:     'Pasto sintético 3G',
    lighting:    'LED + pantalla exterior',
    price:       '$650 MXN / hora',
    priceNote:   'Incluye acceso a zona de descanso y pantalla.',
    features:    ['Vista a pantalla HD', 'Zona de descanso', 'Marcación reglamentaria', 'Iluminación nocturna premium'],
    available:   true,
    featured:    false,
  },
]

export const fieldFAQ = [
  { q: '¿Puedo reservar por horas?',              a: 'Sí, reservamos por horas. Mínimo 1 hora por reservación.' },
  { q: '¿Incluyen balón?',                        a: 'El balón está incluido en todos nuestros paquetes.' },
  { q: '¿Tienen casilleros o vestidores?',        a: 'Sí, contamos con vestidores para hombres y mujeres sin costo adicional.' },
  { q: '¿Puedo cancelar mi reservación?',         a: 'Cancelaciones con más de 2 horas de anticipación no generan cargo.' },
]

export default fields
