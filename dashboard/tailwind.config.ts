import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        noc: {
          bg: '#080c14',
          surface: 'rgba(255,255,255,0.04)',
          border: 'rgba(255,255,255,0.08)',
        },
      },
      backgroundImage: {
        'noc-gradient': 'linear-gradient(135deg, #080c14 0%, #0d1b2a 60%, #091520 100%)',
      },
    },
  },
  plugins: [],
}

export default config
