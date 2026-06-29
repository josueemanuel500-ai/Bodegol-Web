/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],

  theme: {
    extend: {
      colors: {
        /* ── Semantic identity tokens (preferred) ─────────────────────
           Usage: bg-background, bg-surface, bg-surface-secondary,
                  bg-primary, hover:bg-primary-hover, text-accent,
                  border-line, bg-success / warning / danger          */
        background: 'var(--background)',
        primary: {
          DEFAULT: 'var(--primary)',
          hover:   'var(--primary-hover)',
        },
        accent:  'var(--accent)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger:  'var(--danger)',
        line: {                                 // semantic border color
          DEFAULT: 'var(--border)',
          strong:  'var(--border-strong-c)',
          glow:    'var(--border-glow-c)',
        },
        content: {                              // semantic text color
          primary:   'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted:     'var(--text-muted)',
          inverse:   'var(--text-inverse)',
        },

        /* ── surface group: new (DEFAULT/secondary) + legacy (base/elevated/raised/overlay) ── */
        surface: {
          DEFAULT:   'var(--surface)',
          secondary: 'var(--surface-secondary)',
          base:      'var(--surface-base)',     // legacy → page bg (dark navy)
          elevated:  'var(--surface-elevated)', // legacy → primary navy
          raised:    'var(--surface-raised)',
          overlay:   'var(--surface-overlay)',
        },

        /* ── Legacy aliases (repointed to the new identity) ───────────── */
        brand: {
          primary:        'var(--color-primary)',
          'primary-dark': 'var(--color-primary-dark)',
          'primary-light':'var(--color-primary-light)',
          accent:         'var(--color-accent)',
          'accent-dark':  'var(--color-accent-dark)',
          dark:           'var(--color-dark)',
          light:          'var(--color-light)',
          muted:          'var(--color-muted)',
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
        display: ['var(--font-display)', 'sans-serif'],
        body:    ['var(--font-body)', 'sans-serif'],
        ui:      ['var(--font-ui)', 'sans-serif'],
      },

      // Fluid type scale (tokens) — use these instead of hardcoded text-* sizes.
      fontSize: {
        hero:         ['var(--fs-hero)',       { lineHeight: 'var(--lh-hero)' }],
    