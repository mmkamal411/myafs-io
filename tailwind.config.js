/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Use system fonts as fallbacks for better performance and consistency
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif'
        ],
        // Use a more readable font for headings
        display: [
          'Space Grotesk',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif'
        ],
        // Add monospace font for code and metrics
        mono: [
          'JetBrains Mono',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace'
        ]
      },
      fontSize: {
        // Adjust font sizes for better readability
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      },
      letterSpacing: {
        // Improve letter spacing for better readability
        'tight': '-0.015em',
        'normal': '0',
        'wide': '0.015em'
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'bounce-chat': 'bounce-chat 10s infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-down': 'slide-down 0.5s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'bounce-chat': {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-12px)' },
          '60%': { transform: 'translateY(-8px)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      colors: {
        light: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        accent: {
          DEFAULT: '#9900FF',
          50: '#F2E6FF',
          100: '#E6CCFF',
          200: '#CC99FF',
          300: '#B366FF',
          400: '#9933FF',
          500: '#9900FF',
          600: '#7A00CC',
          700: '#5C0099',
          800: '#3D0066',
          900: '#1F0033',
        },
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #9900FF 0%, #5C0099 100%)',
        'accent-gradient-hover': 'linear-gradient(135deg, #7A00CC 0%, #3D0066 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(153, 0, 255, 0.2)',
        'glow-lg': '0 0 30px rgba(153, 0, 255, 0.3)',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
  safelist: [
    {
      pattern: /bg-(gray|accent|light)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /text-(gray|accent|light)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /animate-(slide-up|slide-down|fade-in|scale-in|pulse-slow)/,
    },
  ],
};