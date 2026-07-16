/**
 * pricing.js — Field Rental Pricing
 */
export const pricingHeading = {
  eyebrow:  'Precios',
  title:    'Renta tu cancha',
  subtitle: 'Renta de canchas en Mérida con tarifas claras y sin sorpresas. Reserva por WhatsApp y confirma al instante.',
}

export const pricingPlans = [
  {
    id:       'standard',
    name:     'Cancha Estándar',
    popular:  true,
    tiers: [
      { label: '1 hora',    price: '$600',   unit: 'MXN' },
      { label: '1.5 horas', price: '$1,000', unit: 'MXN' },
    ],
    features: [
      'Fútbol 5 vs 5 (10 jugadores)',
      'Pasto sintético profesional',
      'Iluminación nocturna LED',
    ],
    cta: { label: 'Reservar cancha', message: '¡Hola! Quiero reservar una Cancha Estándar en Bodegol.' },
  },
  {
    id:       'special',
    name:     'Cancha Especial',
    popular:  false,
    tiers: [
      { label: '1 hora · desde 10 PM', price: '$500', unit: 'MXN' },
    ],
    features: [
      'Fútbol 5 vs 5 (10 jugadores)',
      'Disponible a partir de las 10:00 PM',
      'Sujeta a disponibilidad',
      'Iluminación nocturna LED',
    ],
    cta: { label: 'Preguntar disponibilidad', message: '¡Hola! Quiero reservar la Cancha Especial de $500 después de las 10:00 PM. ¿Tienen disponibilidad?' },
  },
]

export default pricingPlans
