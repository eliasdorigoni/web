module.exports = {
  async redirects() {
    return [
      {
        source: '/categories/[slug]',
        destination: '/',
        permanent: true,
      },
      {
        source: '/posts/[slug]',
        destination: '/',
        permanent: true,
      },
    ]
  },
}
