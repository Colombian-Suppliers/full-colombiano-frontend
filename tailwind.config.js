/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Color Palette (Green)
        // Used for: headings, links, buttons, focus states, accents
        primary: {
          50: '#f0f9f0',   // Lightest: background gradients (from-primary-50)
          100: '#e0f2e0',
          200: '#c1e5c1',  // Card borders (border-primary-200)
          300: '#a2d8a2',
          400: '#83cb83',  // Input hover borders (hover:border-primary-400)
          500: '#46802f',  // Focus rings, checkboxes (focus:ring-primary-500, accent-primary-500)
          600: '#3d6b28',  // Links, buttons (text-primary-600, bg-primary-600) - Main brand color
          700: '#345621',  // Headings, link hover (text-primary-700, hover:text-primary-700)
          800: '#2b411a',  // Darker shades
          900: '#222c13',  // Darkest
          50: '#f0f9f0',
          100: '#e0f2e0',
          200: '#c1e5c1',
          300: '#a2d8a2',
          400: '#83cb83',
          500: '#46802f',
          600: '#3d6b28',
          700: '#345621',
          800: '#2b411a',
          900: '#222c13',
        },
        // Secondary Color Palette (Dark Green)
        // Used for: gradient backgrounds, secondary buttons
        secondary: {
          50: '#f0f9f0',   // Background gradients (to-secondary-50)
          100: '#e0f2e0',
          200: '#c1e5c1',
          300: '#a2d8a2',
          400: '#83cb83',
          500: '#1b5903',  // Medium shades
          600: '#164d03',  // Secondary buttons (bg-secondary-600)
          700: '#124102',  // Secondary button hover (hover:bg-secondary-700)
          800: '#0e3502',
          900: '#0a2901',
        },
        // Neutral/Gray Colors (Standard Tailwind grays)
        // Used extensively throughout the app
        gray: {
          50: '#f9fafb',   // Footer backgrounds (bg-gray-50)
          100: '#f3f4f6',
          200: '#e5e7eb',  // Borders (border-gray-200)
          300: '#d1d5db',  // Input borders (border-gray-300)
          400: '#9ca3af',  // Placeholders, icons (placeholder:text-gray-400, text-gray-400)
          500: '#6b7280',  // Helper text (text-gray-500)
          600: '#4b5563',  // Descriptions, labels (text-gray-600)
          700: '#374151',  // Form labels (text-gray-700)
          800: '#1f2937',
          900: '#111827',  // Body text (text-gray-900)
          50: '#f0f9f0',
          100: '#e0f2e0',
          200: '#c1e5c1',
          300: '#a2d8a2',
          400: '#83cb83',
          500: '#1b5903',
          600: '#164d03',
          700: '#124102',
          800: '#0e3502',
          900: '#0a2901',
        },
        // Additional theme colors
        'background-light': '#f6f7f8',
      },
      fontFamily: {
        display: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
    },
  },
  plugins: [],
};
