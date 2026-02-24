import type {Config} from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ad1ad',
          500: '#10b981',
          600: '#0f9f71',
          700: '#1e3a8a'
        }
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(13, 38, 46, 0.2)'
      }
    }
  },
  plugins: []
};

export default config;
