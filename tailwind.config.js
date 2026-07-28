/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './accounts/**/*.html',
    './courses/**/*.html',
    './assets/js/**/*.js',
    './data/**/*.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans Arabic', 'Outfit', 'sans-serif'],
        mono: ['Fira Code', 'monospace']
      },
      colors: {
        academic: {
          bg: 'var(--bg-primary)',
          card: 'var(--bg-card)',
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          accent: 'var(--accent-primary)',
          muted: 'var(--text-muted)',
          surface: 'var(--bg-card-hover)'
        }
      }
    }
  },
  plugins: []
};
