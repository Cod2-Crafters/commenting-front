import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

import { default as defaultTheme } from 'tailwindcss/defaultTheme'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      screens: {
        ...defaultTheme.screens,
        sm: '300px',
      },
      transitionProperty: {
        height: 'height',
        width: 'width',
      },
      fontFamily: {
        sans: ['var(--font-pretendard)'],
      },
      colors: {
        transparent: 'transparent',
        'modern-gray': '#1c1c1e',
        'light-gray': '#2c2c2e',
        'medium-gray': '#2a2a2b',
        'custom-white': '#ffffff',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        //background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        talkborder: '#D9D9D9',
        primary: {
          DEFAULT: 'var(--primary)',
          variant: 'var(--primary-variant)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          variant: 'var(--secondary-variant)',
          foreground: 'var(--secondary-foreground)',
        },
        background: {
          DEFAULT: 'var(--background)',
        },
        surface: {
          DEFAULT: 'var(--surface)',
        },
        error: {
          DEFAULT: 'var(--error)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderWidth: {
        1: '1px',
      },
      borderRadius: {
        '3lg': 'calc(var(--radius) + 4px)',
        '2lg': 'calc(var(--radius) + 2px)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontSize: {
        ...defaultTheme.fontSize,
        // xs(12px) < sm(14px) < base(16px/1rem) < lg(18x) < xl(20px) < 2xl(24px) < 3xl(30px) < 4xl(36px) < 5xl(48px) ... < 9xl(128px)
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
