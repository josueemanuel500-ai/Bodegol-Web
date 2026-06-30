/**
 * menu.js — Food & Drinks Menu Data
 * ✏️  Edit item names, descriptions, prices, images, categories.
 *
 * Each item has:
 *   category   → used for tab filtering
 *   tag        → optional badge: 'popular' | 'new' | 'spicy' | 'vegetarian'
 *   price      → display string (e.g. '$120 MXN')
 *   image      → path under public/images/food/ or public/images/drinks/
 */
// IMAGE (item.image): 1200×900 WebP horizontal, máx 300 KB → public/images/food/ | drinks/

export const menuCategories = [
  { id: 'all',        label: 'Todo' },
  { id: 'antojitos',  label: 'Antojitos' },
  { id: 'principales',label: 'Platos Fuertes' },
  { id: 'alitas',     label: 'Alitas' },
  { id: 'bebidas',    label: 'Bebidas' },
  { id: 'cervezas',   label: 'Cervezas' },
]

export const menuHeading = {
  eyebrow:  '🍔 Menú',
  title:    'Comida de verdad, para gente que juega',
  subtitle: 'Todo lo que necesitas antes, durante y después del partido. Sin complicaciones.',
}

export const menuItems = [
  // ── Antojitos ──────────────────────────────────────────────────────────
  {
    id:          'nachos',
    category:    'antojitos',
    name:        'Nachos Bodegol',
    description: 'Totopos artesanales con queso fundido, jalapeños, pico de gallo y crema.',
    price:       '$120',
    image:       '/images/food/nachos.jpg',
    imageAlt:    'Nachos con queso y jalapeños',
    tag:         'popular',
    available:   true,
  },
  {
    id:          'papas-fritas',
    category:    'antojitos',
    name:        'Papas a la Francesa',
    description: 'Papas cortadas en casa, fritas perfectas con sal de mar y aderezo a elegir.',
    price:       '$80',
    image:       '/images/food/papas.jpg',
    imageAlt:    'Papas fritas con aderezo',
    tag:         null,
    available:   true,
  },
  {
    id:          'deditos',
    category:    'antojitos',
    name:        'Deditos de Queso',
    description: 'Palitos de queso Oaxaca empanizados con salsa marinara. Perfectos para compartir.',
    price:       '$100',
    image:       '/images/food/deditos.jpg',
    imageAlt:    'Deditos de queso fritos',
    tag:         'new',
    available:   true,
  },

  // ── Alitas ─────────────────────────────────────────────────────────────
  {
    id:          'alitas-bbq',
    category:    'alitas',
    name:        'Alitas BBQ',
    description: 'Docena de alitas bañadas en salsa BBQ ahumada de la casa. Servidas con celery y aderezo ranch.',
    price:       '$180',
    image:       '/images/food/alitas-bbq.jpg',
    imageAlt:    'Alitas BBQ Bodegol',
    tag:         'popular',
    available:   true,
  },
  {
    id:          'alitas-buffalo',
    category:    'alitas',
    name:        'Alitas Buffalo',
    description: 'Con la salsa buffalo clásica, picante y mantequilla. Nivel de picor a elegir.',
    price:       '$180',
    image:       '/images/food/alitas-buffalo.jpg',
    imageAlt:    'Alitas Buffalo picantes',
    tag:         'spicy',
    available:   true,
  },
  {
    id:          'alitas-mango',
    category:    'alitas',
    name:        'Alitas Mango Habanero',
    description: 'La combinación perfecta: dulce y picante. Para los que buscan algo diferente.',
    price:       '$195',
    image:       '/images/food/alitas-mango.jpg',
    imageAlt:    'Alitas mango habanero',
    tag:         'spicy',
    available:   true,
  },

  // ── Platos Fuertes ─────────────────────────────────────────────────────
  {
    id:          'hamburguesa',
    category:    'principales',
    name:        'Hamburguesa Bodegol',
    description: 'Carne 200g de res, tocino crujiente, queso americano, lechuga, jitomate y nuestra salsa secreta. Con papas.',
    price:       '$195',
    image:       '/images/food/hamburguesa.jpg',
    imageAlt:    'Hamburguesa Bodegol con papas',
    tag:         'popular',
    available:   true,
  },
  {
    id:          'hotdog',
    category:    'principales',
    name:        'Hot Dog Gourmet',
    description: 'Salchicha premium en pan artesanal, aguacate, mayonesa de chipotle y cebolla caramelizada.',
    price:       '$130',
    image:       '/images/food/hotdog.jpg',
    imageAlt:    'Hot Dog gourmet Bodegol',
    tag:         null,
    available:   true,
  },
  {
    id:          'boneless',
    category:    'principales',
    name:        'Boneless Cheddar',
    description: 'Pechuga empanizada en trozos, salsa cheddar derretida, encurtidos y pan tostado.',
    price:       '$160',
    image:       '/images/food/boneless.jpg',
    imageAlt:    'Boneless con cheddar',
    tag:         'new',
    available:   true,
  },

  // ── Bebidas ────────────────────────────────────────────────────────────
  {
    id:          'frappe',
    category:    'bebidas',
    name:        'Frappé de la Casa',
    description: 'Frappé cremoso en sabores: Oreo, Nutella, Caramelo o Vainilla. 24 oz.',
    price:       '$90',
    image:       '/images/drinks/frappe.jpg',
    imageAlt:    'Frappé helado Bodegol',
    tag:         'popular',
    available:   true,
  },
  {
    id:          'michelada',
    category:    'bebidas',
    name:        'Michelada Bodegol',
    description: 'La clásica del estadio: chile, limón, salsa inglesa y clamato. Con cerveza a elegir.',
    price:       '$120',
    image:       '/images/drinks/michelada.jpg',
    imageAlt:    'Michelada con chile y limón',
    tag:         'popular',
    available:   true,
  },
  {
    id:          'aguas',
    category:    'bebidas',
    name:        'Agua de Sabor',
    description: 'Aguas frescas del día: jamaica, horchata, tamarindo o limón. 1 litro.',
    price:       '$50',
    image:       '/images/drinks/aguas.jpg',
    imageAlt:    'Aguas frescas de sabor',
    tag:         null,
    available:   true,
  },

  // ── Cervezas ──────────────────────────────────────────────────────────
  {
    id:          'modelo',
    category:    'cervezas',
    name:        'Modelo Especial',
    description: 'La original. Fría, perfecta para el partido.',
    price:       '$65',
    image:       '/images/drinks/modelo.jpg',
    imageAlt:    'Cerveza Modelo Especial',
    tag:         null,
    available:   true,
  },
  {
    id:          'heineken',
    category:    'cervezas',
    name:        'Heineken',
    description: 'La cerveza europea más famosa del mundo. Botella fría de 355ml.',
    price:       '$75',
    image:       '/images/drinks/heineken.jpg',
    imageAlt:    'Cerveza Heineken fría',
    tag:         null,
    available:   true,
  },
  {
    id:          'xx-lager',
    category:    'cervezas',
    name:        'XX Lager',
    description: 'Fresca y ligera. La elección favorita para los días calurosos de Mérida.',
    price:       '$65',
    image:       '/images/drinks/xx-lager.jpg',
    imageAlt:    'Cerveza XX Lager',
    tag:         null,
    available:   true,
  },
]

export const popularItems = menuItems.filter(i => i.tag === 'popular')

export default menuItems
