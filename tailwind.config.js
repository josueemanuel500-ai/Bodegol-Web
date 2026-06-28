/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],

  theme: {
    extend: {
      colors: {
        brand: {
          primary:      'var(--color-primary)',
          'primary-dark':'var(--color-primary-dark)',
          'primary-light':'var(--color-primary-light)',
          accent:       'var(--color-accent)',
          'accent-dark':'var(--color-accent-dark)',
          dark:         'var(--color-dark)',
          light:        'var(--color-light)',
          muted:        'var(--color-muted)',
        },
        surface: {
          base:     'var(--surface-base)',
          elevated: 'var(--surface-elevated)',
          raised:   'var(--surface-raised)',
          overlay:  'var(--surface-overlay)',
        },
        text: {
          primary:   'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted:     'var(--text-muted)',
          inverse:   'var(--text-inverse)',
        },
        border: {
          DEFAULT: 'var(--border-default)',
          strong:  'var(--border-strong)',
          glow:    'var(--border-glow)',
        },
        status: {
          success: 'var(--status-success)',
          warning: 'var(--status-warning)',
          error:   'var(--status-error)',
          info:    'var(--status-info)',
        },
      },

      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body:    ['var(--font-body)', 'sans-serif'],
        ui:      ['var(--font-ui)', 'sans-serif'],
      },

      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '120': '30rem',
        '144': '36rem',
        'nav': 'var(--nav-height)',
      },

      borderRadius: {
        card: 'var(--border-radius-card)',
        xl:   '1rem',
        '2xl':'1.5rem',
        '3xl':'2rem',
      },

      boxShadow: {
        card:     '0 1px 12px 0 rgba(0,0,0,0.4)',
        'card-lg':'0 4px 32px 0 rgba(0,0,0,0.5)',
        'glow-green': '0 0 20px rgba(22,163,74,0.35)',
        'glow-orange': '0 0 20px rgba(249,115,22,0.35)',
      },

      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '400': '400ms',
      },

      container: {
        center: true,
        padding: {
          DEFAULT: '1.25rem',
          sm:      '1.5rem',
          lg:      '2rem',
        },
      },

      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 8px rgba(22,163,74,0.3)' },
          '50%':      { boxShadow: '0 0 24px rgba(22,163,74,0.6)' },
        },
      },
      animation: {
        'fade-up':    'fade-up 0.5s ease-out forwards',
        'fade-in':    'fade-in 0.4s ease-out forwards',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },

      zIndex: {
        nav:     '100',
        modal:   '200',
        toast:   '300',
        tooltip: '400',
      },
    },
  },
  plugins: [],
}
