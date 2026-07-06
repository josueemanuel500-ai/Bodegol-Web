/**
 * menu.js — Menú de Comida y Bebidas
 * ✏️  Edita nombres, descripciones, categorías e imágenes.
 * Nota: los platillos NO llevan precio (price vacío) por indicación del negocio.
 */
// IMAGE (item.image): 1200×900 WebP horizontal, máx 300 KB → public/images/food/ | drinks/

export const menuCategories = [
  { id: 'all',      label: 'Todo' },
  { id: 'comida',   label: 'Para comer' },
  { id: 'bebidas',  label: 'Bebidas' },
]

export const menuHeading = {
  eyebrow:  'Menú',
  title:    'Comida y bebidas para acompañar el partido',
  subtitle: 'Antes, durante y después de tu partido. Botana, comida y bebidas preparadas para disfrutar en Bodegol.',
}

export const menuItems = [
  // ── Para comer ─────────────────────────────────────────────────────────
  {
    id:          'boneless',
    category:    'comida',
    name:        'Boneless',
    description: 'Boneless bañados en la salsa de tu elección, crujientes por fuera.',
    price:       '',
    image:       '/images/food/boneless.jpg',
    imageAlt:    'Boneless en salsa',
    tag:         'popular',
    available:   true,
  },
  {
    id:          'hamburguesa',
    category:    'comida',
    name:        'Hamburguesa',
    description: 'Hamburguesa con carne jugosa, queso y todos sus complementos.',
    price:       '',
    image:       '/images/food/hamburguesa.jpg',
    imageAlt:    'Hamburguesa con papas',
    tag:         null,
    available:   true,
  },
  {
    id:          'hot-dog',
    category:    'comida',
    name:        'Hot Dog',
    description: 'Hot dog al estilo Bodegol, con aderezos y complementos.',
    price:       '',
    image:       '/images/food/hot-dog.jpg',
    imageAlt:    'Hot dog preparado',
    tag:         null,
    available:   true,
  },
  {
    id:          'dedos-queso',
    category:    'comida',
    name:        'Dedos de Queso',
    description: 'Dedos de queso empanizados y fundidos por dentro.',
    price:       '',
    image:       '/images/food/dedos-queso.jpg',
    imageAlt:    'Dedos de queso',
    tag:         null,
    available:   true,
  },
  {
    id:          'aros-cebolla',
    category:    'comida',
    name:        'Aros de Cebolla',
    description: 'Aros de cebolla crujientes, ideales para compartir.',
    price:       '',
    image:       '/images/food/aros-cebolla.jpg',
    imageAlt:    'Aros de cebolla',
    tag:         null,
    available:   true,
  },
  {
    id:          'plato-botanero',
    category:    'comida',
    name:        'Plato Botanero',
    description: 'Surtido de botana para toda la mesa mientras ves el partido.',
    price:       '',
    image:       '/images/food/plato-botanero.jpg',
    imageAlt:    'Plato botanero surtido',
    tag:         'popular',
    available:   true,
  },
  {
    id:          'totitos-preparados',
    category:    'comida',
    name:        'Totitos Preparados',
    description: 'Totopos preparados con sus complementos, para picar entre amigos.',
    price:       '',
    image:       '/images/food/totitos-preparados.jpg',
    imageAlt:    'Totitos preparados',
    tag:         null,
    available:   true,
  },

  // ── Bebidas ────────────────────────────────────────────────────────────
  {
    id:          'frappes',
    category:    'bebidas',
    name:        'Frappes',
    description: 'Frappés preparados al momento en distintos sabores.',
    price:       '',
    image:       '/images/drinks/frappes.jpg',
    imageAlt:    'Frappé preparado',
    tag:         null,
    available:   true,
  },
  {
    id:          'micheladas',
    category:    'bebidas',
    name:        'Micheladas',
    description: 'Micheladas bien preparadas para acompañar el juego.',
    price:       '',
    image:       '/images/drinks/micheladas.jpg',
    imageAlt:    'Michelada preparada',
    tag:         'popular',
    available:   true,
  },
  {
    id:          'cocteles',
    category:    'bebidas',
    name:        'Cócteles Preparados',
    description: 'Cócteles y bebidas preparadas de la casa.',
    price:       '',
    image:       '/images/drinks/cocteles.jpg',
    imageAlt:    'Cóctel de bebida preparada',
    tag:         null,
    available:   true,
  },
]

export default menuItems
