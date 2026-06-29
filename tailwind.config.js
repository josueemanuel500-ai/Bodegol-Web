/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
        },
        accent: 'var(--accent)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
        line: {
          DEFAULT: 'var(--border)',
          strong: 'var(--border-strong-c)',
          glow: 'var(--border-glow-c)',
        },
        content: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
          inverse: 'var(--text-inverse)',
        },
        surface: {
          DEFAULT: 'var(--surface)',
          secondary: 'var(--surface-secondary)',
          base: 'var(--surface-base)',
          elevated: 'var(--surface-elevated)',
          raised: 'var(--surface-raised)',
          overlay: 'var(--surface-overlay)',
        },
        brand: {
          primary: 'var(--color-primary)',
          'primary-dark': 'var(--color-primary-dark)',
          'primary-light': 'var(--color-primary-light)',
          accent: 'var(--color-accent)',
          'accent-dark': 'var(--color-accent-dark)',
          dark: 'var(--color-dark)',
          light: 'var(--color-light)',
          muted: 'var(--color-muted)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
          inverse: 'var(--text-inverse)',
        },
        border: {
          DEFAULT: 'var(--border-default)',
          strong: 'var(--border-strong)',
          glow: 'var(--border-glow)',
        },
        status: {
          success: 'var(--status-success)',
          warning: 'var(--status-warning)',
          error: 'var(--status-error)',
          info: 'var(--status-info)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        ui: ['var(--font-ui)', 'sans-serif'],
      },
      fontSize: {
        hero: ['var(--fs-hero)', { lineHeight: 'var(--lh-hero)' }],
        section: ['var(--fs-section)', { lineHeight: 'var(--lh-heading)' }],
        lead: ['var(--fs-lead)', { lineHeight: 'var(--lh-body)' }],
        caption: ['var(--fs-caption)', { lineHeight: '1.5' }],
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        'card-lg': 'var(--shadow-card-lg)',
        glow: 'var(--shadow-glow)',
        'glow-primary': 'var(--shadow-glow-primary)',
        'glow-accent': 'var(--shadow-glow-accent)',
        'glow-green': 'var(--shadow-glow-green)',
      },
      zIndex: {
        nav: '100',
        modal: '200',
        toast: '300',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.45', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.06)' },
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
