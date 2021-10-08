module.exports = {
  purge: [
    `./pages/**/*.{js,ts,jsx,tsx}`,
    `./src/**/*.{js,ts,jsx,tsx}`,
    `./libs/**/*.{js,ts,jsx,tsx}`,
    `./public/**/*.{js,ts,jsx,tsx,html}`,
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minWidth: {
      0: `0`,
      '1/4': `25%`,
      '1/2': `50%`,
      '3/4': `75%`,
      full: `100%`,
    },
    screens: {
      xs: `375px`,
      sm: `640px`,
      md: `768px`,
      lg: `1024px`,
      xl: `1280px`,
      '2xl': `1536px`,
    },
    extend: {
      boxShadow: {
        '3xl': `0 35px 60px -15px rgba(0, 0, 0, 1.3)`,
      },
      colors: {
        transparent: `transparent`,
        primary: {
          100: `#ecf2f6`,
          200: `#c5d9e4`,
          300: `#9ebfd2`,
          400: `#78a6c0`,
          500: `#518cae`,
          600: `#3f6d87`,
          700: `#2d4e61`,
          800: `#1b2f3a`,
          900: `#091013`,
          DEFAULT: `#518cae`,
        },
        secondary: {
          100: `#fde5ea`,
          200: `#f8b1bf`,
          300: `#f37e95`,
          400: `#ee4a6a`,
          500: `#e91640`,
          600: `#b51132`,
          700: `#810c24`,
          800: `#4d0715`,
          900: `#1a0207`,
          DEFAULT: `#e91640`,
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: [`checked`],
      borderColor: [`checked`],
      inset: [`checked`],
      zIndex: [`hover`, `active`],
    },
  },
  plugins: [],
}
