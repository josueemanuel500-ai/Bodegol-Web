/**
 * services.js — Services Data
 *
 * Each service card on the website reads from this file.
 * icon: Lucide icon name (string). The Services component maps names → components.
 * image: path under public/images/ — optional hero image for that service card.
 */

export const services = [
  {
    id:          'pantallas',
    icon:        'Tv2',
    title:       'Pantallas Gigantes',
    description: 'Vive cada partido como si estuvieras en el estadio. Contamos con pantallas de alta definición en toda la sala para que no te pierdas ni un gol.',
    image:       '/images/services/pantallas.webp',
    highlight:   false,
  },
  {
    id:          'gastronomia',
    icon:        'UtensilsCrossed',
    title:       'Gastronomía de Calidad',
    description: 'Desde alitas y nachos hasta platillos gourmet. Nuestra cocina trabaja con ingredientes frescos para que la comida sea tan memorable como el partido.',
    image:       '/images/services/gastronomia.webp',
    highlight:   true,    // true → visually emphasized card
  },
  {
    id:          'eventos',
    icon:        'PartyPopper',
    title:       'Eventos Privados',
    description: 'Celebra con estilo: cumpleaños, despedidas, reuniones corporativas. Reserva el espacio completo o una zona privada con menú personalizado.',
    image:       '/images/services/eventos.webp',
    highlight:   false,
  },
  {
    id:          'bebidas',
    icon:        'Beer',
    title:       'Barra de Bebidas',
    description: 'Cervezas nacionales e importadas, cocteles clásicos y bebidas sin alcohol. El maridaje perfecto para acompañar cada momento.',
    image:       '/images/services/bebidas.webp',
    highlight:   false,
  },
  {
    id:          'reservaciones',
    icon:        'CalendarCheck',
    title:       'Reservaciones en Línea',
    description: 'Asegura tu mesa en segundos. Sistema de reservación en línea disponible las 24 horas para que llegues sin esperas.',
    image:       '/images/services/reservaciones.webp',
    highlight:   false,
  },
  {
    id:          'musica',
    icon:        'Music2',
    title:       'Música & Ambiente',
    description: 'Ambiente perfecto para cada momento: de la emoción del partido al after-match con música en vivo los fines de semana.',
    image:       '/images/services/musica.webp',
    highlight:   false,
  },
]

export default services
