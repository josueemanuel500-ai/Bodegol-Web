/**
 * promotions.js — Current Promotions
 * ✏️  Edit promos, toggle active, change schedule/description.
 *     Set active: false to hide a promo without deleting it.
 */
// IMAGE (promo.image): 1080×1080 WebP cuadrada, máx 300 KB → public/images/promotions/

export const promotionsHeading = {
  eyebrow:  'Promociones',
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
    description: 'Pa que compartas caguamas a tan solo $240.',
    schedule:    'Diario · desde 10:00 PM',
    image:       '/images/promotions/happy-hour.jpg',
    imageAlt:    'Cervezas 2x1 Happy Hour Bodegol',
    cta: {
      label:   'Quiero aprovechar',
      message: '¡Hola! Vi que tienen caguamas a tan solo $240 desde las 10 PM. ¿Está disponible hoy?',
    },
  },
  {
    id:          'combo-partido',
    active:      true,
    tag:         'Tiempo limitado',
    emoji:       '📺',
    title:       'Hot Dogs',
    description: 'Hot Dogs con papas a la francesa por $60.',
    schedule:    'Válido por tiempo limitado',
    image:       '/images/promotions/combo-partido.jpg',
    imageAlt:    'Hot dogs con papas a la francesa Bodegol',
    cta: {
      label:   'Promociones del mes',
      message: '¡Hola! Vi la promo de Hot Dogs con papas a la francesa por $60. ¿Sigue disponible?',
    },
  },
  {
    id:          'cancha-madrugadores',
    active:      true,
    tag:         'Cubetazo',
    emoji:       '🌅',
    title:       'Cubetazos Mixtos',
    description: 'Cubetazos mixtos de XX Lager, Ultra y XX Lager Ámbar en $300.',
    schedule:    'Promoción por tiempo limitado',
    image:       '/images/promotions/madrugadores.jpg',
    imageAlt:    'Descuento cancha mañana Bodegol',
    cta: {
      label:   'Quiero aprovechar',
      message: '¡Hola! Vi la promo de cubetazos mixtos en $300. ¿Sigue disponible?',
    },
  },
]

export const activePromotions = promotions.filter(p => p.active)

export default promotions
