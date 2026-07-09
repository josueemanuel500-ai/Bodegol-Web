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
  { id: 'g1', src: '/images/gallery/ambiente-bar.jpg',          alt: 'Ambiente del bar y pantallas gigantes en Bodegol' },
  { id: 'g2', src: '/images/gallery/evento-empresa.jpg',        alt: 'Evento en las instalaciones de Bodegol' },
  { id: 'g3', src: '/images/gallery/partido.jpg',               alt: 'Grupo viendo el partido en pantalla gigante' },
  { id: 'g4', src: '/images/gallery/vestidores.jpg',            alt: 'Vestidores modernos y limpios de Bodegol' },
  { id: 'g5', src: '/images/gallery/evento-equipo-verde.jpg',   alt: 'Equipo reunido en la cancha interior de Bodegol' },
  { id: 'g6', src: '/images/gallery/subcampeones-torneo.jpg',   alt: 'Subcampeones del torneo Bodegol con trofeo y premio' },
  { id: 'g7', src: '/images/gallery/trofeo-subcampeon.jpg',     alt: 'Jugador con trofeo de subcampeón en Bodegol' },
  { id: 'g8', src: '/images/gallery/campeonas-torneo.jpg',      alt: 'Campeonas del torneo Bodegol con trofeo y premio' },
]

export default galleryImages
