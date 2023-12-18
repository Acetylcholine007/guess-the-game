/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      dropShadow: {
        glow: [
          '0 0px 0.2rem rgba(255,255, 255, 0.35)',
          '0 0px 0.4rem rgba(255, 255,255, 0.2)',
        ],
      },
    },
  },
  plugins: [
    require('daisyui'),
    plugin(function ({ addComponents, theme }) {
      const newComponents = {
        '.card-flat': {
          border: `0.125rem solid ${theme('colors.slate.700')}`,
          backgroundColor: theme('colors.slate.800') ?? 'transparent',
          borderRadius: theme('borderRadius.lg') ?? '0.5rem',
        },
        '.card-fade': {
          border: `0.125rem solid ${theme('colors.slate.800')}`,
          backgroundImage: `linear-gradient(to right, transparent,${theme(
            'colors.slate.800'
          )})`,
          borderRadius: theme('borderRadius.lg') ?? '0.5rem',
        },
      };
      addComponents(newComponents);
    }),
  ],
};
export default config;
