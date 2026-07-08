/**
 * gallery.js — Galería de fotos (sin categorías/filtros)
 * ✏️  Agrega o quita imágenes libremente. Cada una necesita: id, src, alt.
 *     Coloca las fotos en public/images/gallery/
 */
// IMAGE (img.src): 1200×800 WebP horizontal, máx 350 KB → public/images/gallery/

export const galleryHeading = {
  eyebrow:  'Galería',
  title:    'Una imagen vale más que mil palabras',
  subtitle: 'Así se vive Bodegol Mérida: canchas, comida y el mejor ambiente deportivo.',
}

export const galleryImages = [
  { id: 'g1',  src: '/images/gallery/cancha-noche.jpg',   alt: 'Cancha de fútbol 5v5 iluminada de noche en Bodegol' },
  { id: 'g2',  src: '/images/gallery/botana.jpg',         alt: 'Botana recién servida en Bodegol' },
  { id: 'g3',  src: '/images/gallery/ambiente-bar.jpg',   alt: 'Ambiente del bar y pantallas gigantes en Bodegol' },
  { id: 'g4',  src: '/images/gallery/cumpleanos.jpg',     alt: 'Celebración de cumpleaños en Bodegol' },
  { id: 'g5',  src: '/images/gallery/hamburguesa.jpg',    alt: 'Hamburguesa Bodegol con papas' },
  { id: 'g6',  src: '/images/gallery/cancha-dia.jpg',     alt: 'Cancha de pasto sintético de día en Bodegol' },
  { id: 'g7',  src: '/images/gallery/michelada.jpg',      alt: 'Michelada servida en Bodegol' },
  { id: 'g8',  src: '/images/gallery/partido.jpg',        alt: 'Grupo viendo el partido en pantalla gigante' },
  { id: 'g9',  src: '/images/gallery/cancha-aerial.jpg',  alt: 'Vista aérea de las canchas de Bodegol' },
  { id: 'g10', src: '/images/gallery/evento-empresa.jpg', alt: 'Evento en las instalaciones de Bodegol' },
  { id: 'g11', src: '/images/gallery/frappe.jpg',         alt: 'Frappé servido en Bodegol' },
  { id: 'g12', src: '/images/gallery/vestidores.jpg',     alt: 'Vestidores modernos y limpios de Bodegol' },
]

export default galleryImages
