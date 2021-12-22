module.exports = {
  mode: 'jit',
  future: 'all',
  experimental: 'all',
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'site': '#F8F8F8',
      'primary': '#F54337',
      'secondary': '#333',
    }),
    fontFamily: {
      'sans': ['Source Sans Pro', 'sans-serif'],
      'mono': ['Source Code Pro', 'mono'],
    },
    maxWidth: {
      'prose': '85ch',
    },
    extend: {
      colors: {
        primary: '#F54337',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
