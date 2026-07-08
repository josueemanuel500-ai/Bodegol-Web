/**
 * events.js — Events & Live Matches Section
 *
 * ─── EDITABLE FIELDS ──────────────────────────────────────────────────────
 * upcomingEvents  List of upcoming events or live matches
 *   date          ISO date string (e.g. '2025-07-15')
 *   time          Display time string (e.g. '20:00')
 *   title         Event or match name
 *   subtitle      Additional context (e.g. league name, event type)
 *   image         Image path under public/images/events/
 *   tag           Short category label (e.g. 'Champions League', 'Evento Privado')
 *   isFeatured    true → shown with emphasis in the layout
 *   soldOut       true → shows a "Agotado" badge
 *   ctaLabel      CTA button text
 *   ctaWhatsapp   If true, CTA opens WhatsApp instead of routing
 *   ctaMessage    Custom WhatsApp message for this event
 *
 * INTEGRATION NOTE:
 *   In the future, this list can be fetched from Supabase or the Raven API
 *   and rendered dynamically. The component accepts either static data (this
 *   file) or a promise-resolved array with the same shape.
 * ──────────────────────────────────────────────────────────────────────────
 */
// IMAGE (event.image): 1200×900 WebP horizontal, máx 300 KB → public/images/events/

export const upcomingEvents = [
  {
    id:          'ucl-semifinal',
    date:        '2025-07-15',
    time:        '20:00',
    title:       'Semifinal UEFA Champions League',
    subtitle:    'UEFA Champions League',
    image:       '/images/events/champions.webp',
    imageAlt:    'Semifinal Champions League en Bodegol',
    tag:         'Champions League',
    isFeatured:  true,
    soldOut:     false,
    ctaLabel:    'Reservar para este partido',
    ctaWhatsapp: true,
    ctaMessage:  'Hola, quiero reservar para ver la semifinal de Champions el 15 de julio.',
  },
  {
    id:          'copa-mx',
    date:        '2025-07-18',
    time:        '19:00',
    title:       'Final Copa MX',
    subtitle:    'Copa MX',
    image:       '/images/events/copa-mx.webp',
    imageAlt:    'Final Copa MX en Bodegol',
    tag:         'Liga MX',
    isFeatured:  false,
    soldOut:     false,
    ctaLabel:    'Ver en Bodegol',
    ctaWhatsapp: true,
    ctaMessage:  'Hola, me gustaría reservar para ver la Final Copa MX.',
  },
  {
    id:          'noche-80s',
    date:        '2025-07-19',
    time:        '21:00',
    title:       'Noche Retro 80s',
    subtitle:    'Evento Musical',
    image:       '/images/events/retro-80s.webp',
    imageAlt:    'Noche retro 80s en Bodegol',
    tag:         'Evento Musical',
    isFeatured:  false,
    soldOut:     true,
    ctaLabel:    'Lista de espera',
    ctaWhatsapp: true,
    ctaMessage:  'Hola, me interesa la lista de espera para la Noche Retro 80s.',
  },
]

export const eventsHeading = {
  eyebrow:  'Próximos Eventos',
  title:    'No te pierdas nada',
  subtitle: 'Partidos en vivo, noches temáticas y eventos especiales. Reserva antes de que se agoten.',
}

export default upcomingEvents
