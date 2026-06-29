/**
 * gallery.js — Photo Gallery
 * ✏️  Add/remove images. Each image needs: src, alt, category.
 *     Images live in public/images/gallery/
 */

export const galleryCategories = [
  { id: 'all',      label: 'Todo' },
  { id: 'canchas',  label: 'Canchas' },
  { id: 'comida',   label: 'Comida' },
  { id: 'ambiente', label: 'Ambiente' },
  { id: 'eventos',  label: 'Eventos' },
]

export const galleryHeading = {
  eyebrow:  '📸 Galería',
  title:    'Una imagen vale más que mil palabras',
  subtitle: 'Así se ve Bodegol. Así se vive.',
}

export const galleryImages = [
  { id: 'g1',  src: '/images/gallery/cancha-noche.jpg',    alt: 'Cancha de futbol 5x5 iluminada de noche en Bodegol',          category: 'canchas',  featured: true  },
  { id: 'g2',  src: '/images/gallery/alitas-bbq.jpg',      alt: 'Alitas BBQ recien servidas en Bodegol',                     category: 'comida',   featured: true  },
  { id: 'g3',  src: '/images/gallery/ambiente-bar.jpg',    alt: 'Ambiente del bar y pantallas gigantes en Bodegol',           category: 'ambiente', featured: true  },
  { id: 'g4',  src: '/images/gallery/cumpleanos.jpg',      alt: 'Celebracion de cumpleanos con decoración en Bodegol',       category: 'eventos',  featured: false },
  { id: 'g5',  src: '/images/gallery/hamburguesa.jpg',     alt: 'Hamburguesa Bodegol con papas fritas',                      category: 'comida',   featured: false },
  { id: 'g6',  src: '/images/gallery/cancha-dia.jpg',      alt: 'Cancha de pasto sintetico de día en Bodegol',               category: 'canchas',  featured: false },
  { id: 'g7',  src: '/images/gallery/michelada.jpg',       alt: 'Michelada servida con chile y limon',                       category: 'comida',   featured: false },
  { id: 'g8',  src: '/images/gallery/partido.jpg',         alt: 'Grupo viendo partido de futbol en pantalla gigante',        category: 'ambiente', featured: false },
  { id: 'g9',  src: '/images/gallery/cancha-aerial.jpg',   alt: 'Vista aerea de las canchas de Bodegol',                    category: 'canchas',  featured: false },
  { id: 'g10', src: '/images/gallery/evento-empresa.jpg',  alt: 'Evento corporativo en las instalaciones de Bodegol',       category: 'eventos',  featured: false },
  { id: 'g11', src: '/images/gallery/frappe.jpg',          alt: 'Frappe de Oreo servido en Bodegol',                        category: 'comida',   featured: false },
  { id: 'g12', src: '/images/gallery/vestidores.jpg',      alt: 'Vestidores modernos y limpios de Bodegol',                 category: 'canchas',  featured: false },
]

export default galleryImages
