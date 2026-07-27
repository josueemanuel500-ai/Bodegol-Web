/**
 * footer.js — Footer Content
 * ✏️  Edit tagline, nav columns, legal links, badges, madeBy attribution.
 */

export const footerConfig = {
  tagline: 'Canchas de fútbol 5v5, comida de calidad, pantallas gigantes y la mejor vibra en Mérida.',
  copyrightName: 'Deportivo Bodegol S.A. de C.V.',
  showNewsletter: false,

  columns: [
    {
      heading: 'Bodegol',
      links: [
        { label: 'Canchas de Fútbol',  href: '/canchas'    },
        { label: 'Menú',               href: '/menu'       },
        { label: 'Promociones',        href: '/promociones' },
        { label: 'Paquetes y Eventos', href: '/paquetes'   },
        { label: 'Galería',            href: '/galeria'    },
      ],
    },
    {
      heading: 'Reservaciones',
      links: [
        { label: 'Reservar Cancha',    href: '/canchas'  },
        { label: 'Paquete Cumpleaños', href: '/paquetes' },
        { label: 'Evento Privado',     href: '/paquetes' },
        { label: 'Preguntas Frecuentes', href: '/faq'   },
        { label: 'Contacto',           href: '/faq'  },
      ],
    },
    {
      heading: 'Legal',
      links: [
        { label: 'Aviso de Privacidad',    href: '/privacidad' },
        { label: 'Términos y Condiciones', href: '/terminos'   },
      ],
    },
  ],

  bottomLinks: [
    { label: 'Privacidad', href: '/privacidad' },
    { label: 'Términos',   href: '/terminos'   },
  ],

  badges: [
    { label: 'Pagos seguros'          },
    { label: 'Facturación CFDI 4.0'   },
    { label: 'Establecimiento verificado' },
  ],

  // ✏️  Set null to hide attribution
  madeBy: {
    label: 'Hecho con ♥ por',
    name:  'Rave Studio',
    href:  'https://rave.studio',
  },
}

export default footerConfig
