/**
 * business.js — Bodegol Business Information
 *
 * ✏️  EDIT HERE: name, address, phone, WhatsApp, email, hours, logo paths.
 * No component file needs to be touched — all UI reads from this file.
 */

export const business = {
  id:          'bodegol',
  name:        'Bodegol',
  legalName:   'Deportivo Bodegol S.A. de C.V.',
  tagline:     'Canchas, comida y la mejor vibra',
  description: 'El lugar donde el fútbol se vive diferente. Canchas de fútbol 7, pantallas gigantes, comida deliciosa y el ambiente perfecto para tus reuniones y eventos.',
  founding:    2021,
  rfc:         'DBD210101XXX',

  logo: {
    // ✏️  Replace with real logo paths
    main:    '/images/logo/bodegol-logo.svg',
    white:   '/images/logo/bodegol-logo-white.svg',
    icon:    '/images/logo/bodegol-icon.svg',
    alt:     'Bodegol — Canchas, Comida y Eventos',
    width:   160,
    height:  52,
  },

  contact: {
    // ✏️  UPDATE: your real WhatsApp number (country code + number, no +)
    whatsapp:        '529991234567',
    whatsappMessage: '¡Hola Bodegol! Me gustaría hacer una reservación.',
    phone:           '+52 999 123 4567',
    phoneTel:        '+529991234567',
    email:           'reservaciones@bodegol.mx',
  },

  location: {
    address:     'Calle 60 Norte #408, Col. Centro',
    city:        'Mérida',
    state:       'Yucatán',
    country:     'México',
    zip:         '97000',
    fullAddress: 'Calle 60 Norte #408, Col. Centro, Mérida, Yucatán',
    mapsUrl:     'https://maps.google.com/?q=Bodegol+Merida+Yucatan',
    mapsEmbed:   '', // ✏️  Paste your Google Maps embed URL here
  },

  hours: [
    { days: 'Lunes – Jueves', time: '3:00 PM – 11:00 PM' },
    { days: 'Viernes',        time: '3:00 PM – 1:00 AM'  },
    { days: 'Sábado',         time: '12:00 PM – 1:00 AM' },
    { days: 'Domingo',        time: '12:00 PM – 10:00 PM'},
  ],

  socialProof: {
    fields:     6,      // number of soccer fields
    capacity:   300,    // max people
    yearsOpen:  4,
    rating:     4.9,
    reviews:    '+500',
  },
}

export default business
