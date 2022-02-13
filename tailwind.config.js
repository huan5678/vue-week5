const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      container: {
        center: true,
        padding: '0.9375rem',
      },
      fontFamily: {
        sans: ['Noto Sans TC', ...fontFamily.sans],
      },
      colors: {
        success: {
          50: '#f6fcf4',
          100: '#eef9ea',
          200: '#d4f1ca',
          300: '#bbe8aa',
          400: '#87d66b',
          500: '#54c52b',
          600: '#4cb127',
          700: '#3f9420',
          800: '#32761a',
          900: '#296115',
        },
        warning: {
          50: '#fefbf4',
          100: '#fdf6ea',
          200: '#fbe9c9',
          300: '#f8dca9',
          400: '#f3c169',
          500: '#EEA728',
          600: '#d69624',
          700: '#b37d1e',
          800: '#8f6418',
          900: '#755214',
        },
        danger: {
          50: '#fdf6f3',
          100: '#fcece7',
          200: '#f7d0c4',
          300: '#f2b4a0',
          400: '#e97c58',
          500: '#df4411',
          600: '#c93d0f',
          700: '#a7330d',
          800: '#86290a',
          900: '#6d2108',
        },
        primary: {
          50: '#f4f7fb',
          100: '#eaeff6',
          200: '#cad6e9',
          300: '#aabddb',
          400: '#6b8cc0',
          500: '#2B5AA5',
          600: '#275195',
          700: '#20447c',
          800: '#1a3663',
          900: '#152c51',
        },
        secondary: {
          50: '#f5f6f9',
          100: '#ecedf3',
          200: '#cfd3e0',
          300: '#b3b8cd',
          400: '#7982a8',
          500: '#404d82',
          600: '#3a4575',
          700: '#303a62',
          800: '#262e4e',
          900: '#1f2640',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    function({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          '@screen sm': {
            maxWidth: '540px',
          },
          '@screen md': {
            maxWidth: '720px',
          },
          '@screen lg': {
            maxWidth: '960px',
          },
          '@screen xl': {
            maxWidth: '1366px',
          },
        },
      });
    },
  ],
};
