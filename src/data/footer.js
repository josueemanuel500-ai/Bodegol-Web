/**
 * footer.js - Footer Content
 */

export const footerConfig = {
  tagline: 'Canchas de futbol 5x5, comida de calidad, pantallas gigantes y la mejor vibra en Merida.',
  copyrightName: 'Deportivo Bodegol S.A. de C.V.',
  showNewsletter: false,

  columns: [
    {
      heading: 'Bodegol',
      links: [
        { label: 'Canchas de Futbol',  href: '/#canchas'    },
        { label: 'Menu',               href: '/#menu'       },
        { label: 'Promociones',        href: '/#promotions' },
        { label: 'Paquetes y Eventos', href: '/#packages'   },
        { label: 'Galeria',            href: '/#gallery'    },
      ],
    },
    {
      heading: 'Reservaciones',
      links: [
        { label: 'Reservar Cancha',      href: '/#canchas'  },
        { label: 'Paquete Cumpleanos',   href: '/#packages' },
        { label: 'Evento Privado',       href: '/#packages' },
        { label: 'Preguntas Frecuentes', href: '/#faq'      },
        { label: 'Contacto',             href: '/#contact'  },
      ],
    },
    {
      heading: 'Legal',
      links: [
        { label: 'Aviso de Privacidad',      href: '/privacidad' },
        { label: 'Terminos y Condiciones',   href: '/terminos'   },
      ],
    },
  ],

  bottomLinks: [
    { label: 'Privacidad', href: '/privacidad' },
    { label: 'Terminos',   href: '/terminos'   },
  ],

  badges: [
    { label: 'Pagos seguros' },
    { label: 'Facturacion CFDI 4.0' },
    { label: 'Establecimiento verificado' },
  ],

  madeBy: null,
}

export default footerConfig
