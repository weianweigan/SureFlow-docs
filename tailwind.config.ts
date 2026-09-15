import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#000000',
        canvas: '#ffffff',
        'inverse-canvas': '#000000',
        'inverse-ink': '#ffffff',
        hairline: '#D1D1D1',
        'hairline-soft': '#f1f1f1',
        'surface-soft': '#E9E9E9',
        'block-lime': '#dceeb1',
        'block-lilac': '#c5b0f4',
        'block-cream': '#f4ecd6',
        'block-pink': '#efd4d4',
        'block-mint': '#c8e6cd',
        'block-coral': '#f3c9b6',
        'block-navy': '#1f1d3d',
        'accent-magenta': '#ff3d8b',
        'semantic-success': '#1ea64a',
      },
      fontFamily: {
        sans: ['figmaSans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['figmaMono', 'JetBrains Mono', 'Menlo', 'monospace'],
      },
      borderRadius: {
        xs: '2px',
        sm: '6px',
        md: '8px',
        lg: '24px',
        xl: '32px',
        pill: '50px',
      },
    },
  },
  plugins: [typography],
};

export default config;
