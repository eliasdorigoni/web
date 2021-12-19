module.exports = {
  mode: 'jit',
  future: 'all',
  experimental: 'all',
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': ['Source Sans Pro', 'sans-serif'],
      'mono': ['Source Code Pro', 'mono'],
    },
    backgroundColor: theme => ({
      ...theme('colors'),
      'site': '#F8F8F8',
      'primary': '#F54337',
      'secondary': '#333',
    }),
    maxWidth: {
      'prose': '85ch',
     }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
