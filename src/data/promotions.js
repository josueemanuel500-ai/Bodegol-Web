/**
 * promotions.js — Current Promotions
 * ✏️  Edit promos, toggle active, change schedule/description.
 *     Set active: false to hide a promo without deleting it.
 */
// IMAGE (promo.image): 1080×1080 WebP cuadrada, máx 300 KB → public/images/promotions/

export const promotionsHeading = {
  eyebrow:  '🔥 Promociones',
  title:    'Ofertas que no se repiten',
  subtitle: 'Aprovecha nuestras promos semanales. Llega temprano, come bien y no pagues de más.',
}

export const promotions = [
  {
    id:          'happy-hour',
    active:      true,
    tag:         'Diario',
    emoji:       '🍺',
    title:       'Happy Hour',
    description: 'Cervezas nacionales 2×1 y cocteles con 30% OFF. De lunes a viernes.',
    schedule:    'Lun–Vie · 5:00 – 7:00 PM',
    image:       '/images/promotions/happy-hour.jpg',
    imageAlt:    'Cervezas 2x1 Happy Hour Bodegol',
    cta: {
      label:   'Quiero aprovechar',
      message: '¡Hola! Vi que tienen Happy Hour 2x1. ¿A qué hora está disponible hoy?',
    },
  },
  {
    id:          'miercoles-alitas',
    active:      true,
    tag:         'Cada miércoles',
    emoji:       '🍗',
    title:       'Miércoles de Alitas',
    description: 'Docena de alitas al precio de media. En cualquier sabor: BBQ, Buffalo o Mango Habanero.',
    schedule:    'Todos los miércoles',
    image:       '/images/promotions/alitas.jpg',
    imageAlt:    'Miércoles de alitas 2x1 Bodegol',
    cta: {
      label:   'Reservar mesa',
      message: '¡Hola! Quiero reservar para el miércoles de alitas. ¿Tienen espacio disponible?',
    },
  },
  {
    id:          'combo-partido',
    active:      true,
    tag:         'Días de partido',
    emoji:       '📺',
    title:       'Combo Partido',
    description: 'Jarra de cerveza + orden de nachos + entrada al área de pantallas a precio especial.',
    schedule:    'Días de partido de Champions y Liga MX',
    image:       '/images/promotions/combo-partido.jpg',
    imageAlt:    'Combo partido Bodegol pantallas',
    cta: {
      label:   'Ver próximos partidos',
      message: '¡Hola! ¿Cuándo es el próximo partido con el combo especial?',
    },
  },
  {
    id:          'cancha-madrugadores',
    active:      true,
    tag:         'Fines de semana',
    emoji:       '🌅',
    title:       'Madrugadores',
    description: '30% de descuento en canchas reservadas antes de las 2 PM los sábados y domingos.',
    schedule:    'Sáb y Dom · antes de 2:00 PM',
    image:       '/images/promotions/madrugadores.jpg',
    imageAlt:    'Descuento cancha mañana Bodegol',
    cta: {
      label:   'Reservar temprano',
      message: '¡Hola! Quiero aprovechar el descuento de madrugadores. ¿Tienen disponibilidad este fin de semana?',
    },
  },
]

export const activePromotions = promotions.filter(p => p.active)

export default promotions
