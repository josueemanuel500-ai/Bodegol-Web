/**
 * business.js - Bodegol Business Information
 */

export const business = {
  id:          'bodegol',
  name:        'Bodegol',
  legalName:   'Deportivo Bodegol S.A. de C.V.',
  tagline:     'Canchas, comida y la mejor vibra',
  description: 'El lugar donde el futbol se vive diferente. Canchas de futbol 5x5, pantallas gigantes, comida deliciosa y el ambiente perfecto para tus reuniones y eventos.',
  founding:    2021,
  rfc:         'DBD210101XXX',

  logo: {
    main:    '/images/logo/bodegol-logo.svg',
    white:   '/images/logo/bodegol-logo-white.svg',
    icon:    '/images/logo/bodegol-icon.svg',
    alt:     'Bodegol - Canchas, Comida y Eventos',
    width:   160,
    height:  52,
  },

  contact: {
    whatsapp:        '529995668248',
    whatsappMessage: 'Hola Bodegol, me gustaria hacer una reservacion.',
    phone:           '+52 999 566 8248',
    phoneTel:        '+529995668248',
    email:           'reservaciones@bodegol.mx',
  },

  location: {
    address:     'Calle 60 Norte #408, Col. Centro',
    city:        'Merida',
    state:       'Yucatan',
    country:     'Mexico',
    zip:         '97000',
    fullAddress: 'Calle 60 Norte #408, Col. Centro, Merida, Yucatan',
    mapsUrl:     'https://maps.google.com/?q=Bodegol+Merida+Yucatan',
    mapsEmbed:   '',
  },

  hours: [
    { days: 'Lunes a viernes', time: '10:00 AM - 11:00 PM' },
    { days: 'Sabado',          time: '9:00 AM - 7:00 PM'  },
    { days: 'Domingo',         time: '9:00 AM - 3:00 PM'  },
  ],

  socialProof: {
    fields:     6,
    capacity:   300,
    yearsOpen:  4,
    rating:     4.9,
    reviews:    '+500',
  },
}

export default business
