/**
 * business.js — Bodegol Business Information
 * All UI reads from this file (single source of truth for contact, hours, etc.)
 */
export const business = {
  id:          'bodegol',
  name:        'Bodegol',
  legalName:   'Deportivo Bodegol S.A. de C.V.',
  tagline:     'Fútbol 5v5, comida y la mejor vibra',
  description: '5 canchas profesionales de fútbol 5v5 con pasto sintético de alta calidad, iluminación nocturna e instalaciones cómodas, en un ambiente deportivo de primer nivel en Mérida.',
  founding:    2021,
  rfc:         'DBD210101XXX',

  logo: {
    main:    '/images/logo/bodegol-logo.png',        // escudo (vertical)
    header:  '/images/logo/bodegol-logo-footer.png',  // horizontal (footer, blanco)
    white:   '/images/logo/bodegol-logo-footer.png',
    icon:    '/images/logo/bodegol-logo.png',
    alt:     'Bodegol — Futbolito 5x5 Indoor',
    width:   1331,
    height:  1483,
  },

  contact: {
    // Official WhatsApp / phone: 999 566 8248
    whatsapp:        '529995668248',
    whatsappMessage: '¡Hola Bodegol! Me gustaría hacer una reservación.',
    phone:           '999 566 8248',
    phoneTel:        '+529995668248',
    email:           'reservaciones@bodegol.mx',
  },

  location: {
    address:     'C. 3 Bodega 5 y 6, Zona Industrial',
    city:        'Mérida',
    state:       'Yucatán',
    country:     'México',
    zip:         '97204',
    fullAddress: 'C. 3 Bodega 5 y 6, Zona Industrial, 97204 Mérida, Yucatán',
    mapsUrl:     'https://maps.google.com/?q=Deportivo+Bodegol+C.+3+Bodega+5+y+6+Zona+Industrial+97204+Merida+Yucatan',
    mapsEmbed:   'https://maps.google.com/maps?q=Deportivo+Bodegol,+C.+3+Bodega+5+y+6,+Zona+Industrial,+97204+Merida,+Yucatan&z=17&output=embed',
  },

  // Official opening hours
  hours: [
    { days: 'Lunes – Viernes', time: '10:00 AM – 2:00 AM'  },
    { days: 'Sábado',          time: '9:00 AM – 7:00 PM'   },
    { days: 'Domingo',         time: '9:00 AM – 3:00 PM'   },
  ],

  socialProof: {
    fields:     5,      // 5 professional football fields
    capacity:   250,
    yearsOpen:  4,
    rating:     4.9,
    reviews:    '+500',
  },
}

export default business
