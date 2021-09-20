module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'site': '#F8F8F8',
      'primary': '#F54337',
      'secondary': '#333',
    }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
