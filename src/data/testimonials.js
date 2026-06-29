/**
 * testimonials.js — Customer Testimonials
 *
 * ─── EDITABLE FIELDS ──────────────────────────────────────────────────────
 * name      Customer's first name + last initial (e.g. 'Carlos M.')
 * role      Optional descriptor (e.g. 'Cliente frecuente', 'Organizador de eventos')
 * avatar    Path under public/images/team/ or null for initials fallback
 * rating    1–5 star rating
 * text      The review/testimonial text
 * date      Display date string (e.g. 'Junio 2025')
 * source    Platform source: 'google' | 'facebook' | 'direct'
 * featured  true → appears in the highlighted testimonial slot
 * ──────────────────────────────────────────────────────────────────────────
 */

export const testimonials = [
  {
    id:       't-01',
    name:     'Carlos M.',
    role:     'Cliente frecuente',
    avatar:   null,
    rating:   5,
    text:     'El mejor lugar para ver fútbol en Mérida, sin duda. Las pantallas son enormes, el sonido increíble y la comida está deliciosa. ¡Las alitas son un must!',
    date:     'Junio 2025',
    source:   'google',
    featured: true,
  },
  {
    id:       't-02',
    name:     'Daniela R.',
    role:     'Celebró su cumpleaños',
    avatar:   null,
    rating:   5,
    text:     'Celebré mi cumpleaños aquí y fue perfecto. El equipo nos ayudó con la decoración, el menú personalizado estuvo buenísimo y el ambiente es increíble.',
    date:     'Mayo 2025',
    source:   'google',
    featured: false,
  },
  {
    id:       't-03',
    name:     'Roberto V.',
    role:     'Organizador de eventos corporativos',
    avatar:   null,
    rating:   5,
    text:     'Organizamos una reunión de equipo aquí y superó todas las expectativas. Salón privado perfecto, servicio profesional y la comida excelente.',
    date:     'Mayo 2025',
    source:   'facebook',
    featured: false,
  },
  {
    id:       't-04',
    name:     'Ana P.',
    role:     'Fanática del fútbol',
    avatar:   null,
    rating:   5,
    text:     'Vine a ver el clásico con mis amigos y la experiencia fue única. El ambiente se siente como estar en el estadio. Ya tenemos fecha para el siguiente partido.',
    date:     'Abril 2025',
    source:   'google',
    featured: false,
  },
  {
    id:       't-05',
    name:     'Miguel S.',
    role:     'Cliente frecuente',
    avatar:   null,
    rating:   4,
    text:     'Muy buen lugar. Comida sabrosa, cervezas frías y pantallas perfectas. El servicio es rápido aunque en partidos muy concurridos puede tardarse un poco.',
    date:     'Abril 2025',
    source:   'google',
    featured: false,
  },
  {
    id:       't-06',
    name:     'Sofía L.',
    role:     'Primera visita',
    avatar:   null,
    rating:   5,
    text:     'Primera vez que venía y quedé enamorada del lugar. El staff muy atento, los precios justos y la vibra del lugar es increíble. Definitivamente vuelvo.',
    date:     'Marzo 2025',
    source:   'facebook',
    featured: false,
  },
]

export const testimonialsHeading = {
  eyebrow:  'Lo Que Dicen',
  title:    'Clientes que ya lo vivieron',
  subtitle: 'Más de 10,000 personas han elegido Bodegol para sus mejores momentos.',
}

export default testimonials
