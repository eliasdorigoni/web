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
    maxWidth: {
      'prose': '85ch',
    },
    extend: {
      colors: {
        primary: 'hsl(4, 90%, 59%)',
        'primary-darker': 'hsl(4, 90%, 42%)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
