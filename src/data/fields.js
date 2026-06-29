/**
 * fields.js - Soccer Fields Data
 */

export const fieldsHeading = {
  eyebrow:  'Nuestras Canchas',
  title:    '6 canchas de futbol 5x5',
  subtitle: 'Canchas de pasto sintetico de alta calidad con iluminacion profesional y sistema de reservaciones en linea.',
}

export const fields = [
  {
    id:          'cancha-1',
    name:        'Cancha Tigre',
    description: 'Cancha ideal para partidos rapidos de futbol 5x5, con iluminacion LED profesional, porterias y pasto sintetico de ultima generacion.',
    image:       '/images/fields/cancha-tigre.jpg',
    imageAlt:    'Cancha Tigre de futbol 5x5 en Bodegol',
    capacity:    '10 jugadores (5 vs 5)',
    surface:     'Pasto sintetico 3G',
    lighting:    'LED profesional',
    price:       '$600 MXN / hora',
    priceNote:   'Precio en horario regular. Fines de semana puede variar.',
    features:    ['Vestuarios incluidos', 'Marcacion para futbol 5x5', 'Porterias con red', 'Cronometro digital'],
    available:   true,
    featured:    true,
  },
  {
    id:          'cancha-2',
    name:        'Cancha Leon',
    description: 'Cancha cubierta para jugar futbol 5x5 con buena sombra, ritmo intenso y toda la comodidad del complejo.',
    image:       '/images/fields/cancha-leon.jpg',
    imageAlt:    'Cancha Leon cubierta en Bodegol',
    capacity:    '10 jugadores (5 vs 5)',
    surface:     'Pasto sintetico 3G',
    lighting:    'LED cubierta',
    price:       '$550 MXN / hora',
    priceNote:   'Incluye balon oficial.',
    features:    ['Cubierta techada', 'Marcacion para futbol 5x5', 'Porterias con red', 'Balon incluido'],
    available:   true,
    featured:    false,
  },
  {
    id:          'cancha-3',
    name:        'Cancha Aguila',
    description: 'La favorita para los partidos nocturnos de futbol 5x5. Vista directa a las pantallas de transmision desde la cancha.',
    image:       '/images/fields/cancha-aguila.jpg',
    imageAlt:    'Cancha Aguila nocturna en Bodegol',
    capacity:    '10 jugadores (5 vs 5)',
    surface:     'Pasto sintetico 3G',
    lighting:    'LED + pantalla exterior',
    price:       '$650 MXN / hora',
    priceNote:   'Incluye acceso a zona de descanso y pantalla.',
    features:    ['Vista a pantalla HD', 'Zona de descanso', 'Marcacion para futbol 5x5', 'Iluminacion nocturna premium'],
    available:   true,
    featured:    false,
  },
]

export const fieldFAQ = [
  { q: 'Puedo reservar por horas?',       a: 'Si, reservamos por horas. Minimo 1 hora por reservacion.' },
  { q: 'Incluyen balon?',                 a: 'El balon esta incluido en todos nuestros paquetes.' },
  { q: 'Tienen casilleros o vestidores?', a: 'Si, contamos con vestidores para hombres y mujeres sin costo adicional.' },
  { q: 'Puedo cancelar mi reservacion?',  a: 'Cancelaciones con mas de 2 horas de anticipacion no generan cargo.' },
]

export default fields
