/**
 * fields.js — Football Fields Data (5 professional 5v5 fields)
 * IMAGE per field — recommended: 1600 × 1000 px (16:10), .webp < 350 KB.
 *   field.image → public/images/fields/<id>.jpg
 */
// IMAGE (field.image): 1200×900 WebP horizontal, máx 300 KB → public/images/fields/
export const fieldsHeading = {
  eyebrow:  'Nuestras Canchas',
  title:    'Canchas de fútbol 5v5 en Mérida',
  subtitle: 'Cinco canchas de fútbol en Mérida con pasto sintético de alta calidad, iluminación nocturna LED e instalaciones cómodas para tu partido 5 vs 5.',
}

const baseSpecs = {
  capacity: '10 jugadores (5 vs 5)',
  surface:  'Pasto sintético profesional',
  lighting: 'Iluminación nocturna LED',
  features: ['Vestidores y regaderas', 'Balón oficial incluido', 'Porterías con red', 'Marcación reglamentaria'],
  available: true,
}

export const fields = [
  { id: 'cancha-1', name: 'Cancha 1', description: 'Cancha estándar de fútbol 5v5 con pasto sintético profesional e iluminación nocturna LED.', image: '/images/fields/cancha-1.jpg', imageAlt: 'Cancha 1 de fútbol 5v5 en Bodegol', price: '$600 MXN / hora', priceNote: '1 hora · 1.5 horas $1,000', featured: true, ...baseSpecs },
  { id: 'cancha-2', name: 'Cancha 2', description: 'Cancha estándar ideal para partidos rápidos 5 vs 5 con tus amigos.', image: '/images/fields/cancha-2.jpg', imageAlt: 'Cancha 2 de fútbol 5v5 en Bodegol', price: '$600 MXN / hora', priceNote: '1 hora · 1.5 horas $1,000', featured: false, ...baseSpecs },
  { id: 'cancha-3', name: 'Cancha 3', description: 'Cancha estándar con excelente iluminación para los partidos nocturnos.', image: '/images/fields/cancha-3.jpg', imageAlt: 'Cancha 3 nocturna en Bodegol', price: '$600 MXN / hora', priceNote: '1 hora · 1.5 horas $1,000', featured: false, ...baseSpecs },
  { id: 'cancha-4', name: 'Cancha 4', description: 'Cancha estándar de fútbol 5v5 con instalaciones cómodas y ambiente profesional.', image: '/images/fields/cancha-4.jpg', imageAlt: 'Cancha 4 de fútbol 5v5 en Bodegol', price: '$600 MXN / hora', priceNote: '1 hora · 1.5 horas $1,000', featured: false, ...baseSpecs },
  { id: 'cancha-5', name: 'Cancha Especial', description: 'Tarifa especial disponible a partir de las 10:00 PM. Pregunta por disponibilidad antes de reservar.', image: '/images/fields/cancha-5.jpg', imageAlt: 'Cancha Especial de fútbol 5v5 en Bodegol', price: '$500 MXN / hora', priceNote: 'Desde las 10:00 PM · Sujeta a disponibilidad', reservationMessage: '¡Hola! Quiero reservar la Cancha Especial de $500 después de las 10:00 PM. ¿Tienen disponibilidad?', featured: false, ...baseSpecs },
]

export const fieldFAQ = [
  { q: '¿Puedo reservar por horas?',        a: 'Sí, reservamos por horas. Mínimo 1 hora por reservación.' },
  { q: '¿Incluyen balón?',                  a: 'Sí, el balón oficial está incluido.' },
  { q: '¿Tienen vestidores?',               a: 'Sí, contamos con vestidores y regaderas sin costo adicional.' },
  { q: '¿Puedo cancelar mi reservación?',   a: 'Cancelaciones con más de 2 horas de anticipación no generan cargo.' },
]

export default fields
