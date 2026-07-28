/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './accounts/**/*.html',
    './courses/**/*.html',
    './src/**/*.html',
    './src/**/*.mjs',
    './assets/js/**/*.js',
    './data/**/*.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans Arabic', 'Outfit', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
        arabic: ['Noto Sans Arabic', 'sans-serif']
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
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 5s ease-in-out 1s infinite'
      }
    }
  },
  plugins: []
};
