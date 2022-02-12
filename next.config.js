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
      // Migración de entradas
      {
        source: '/posts/numeros-en-otra-fuente',
        destination: '/posts/2018-08-28-numeros-en-otra-fuente',
        permanent: false,
      },
      {
        source: '/posts/transients-en-wordpress',
        destination: '/posts/2018-10-29-transients-en-wordpress',
        permanent: false,
      },
      {
        source: '/posts/usar-dominios-personalizados-en-xampp-virtualhost',
        destination: '/posts/2018-11-12-usar-dominios-personalizados-en-xampp-virtualhost',
        permanent: false,
      },
      {
        source: '/posts/proyecto-pacman',
        destination: '/posts/2019-06-24-proyecto-pacman',
        permanent: false,
      },
      {
        source: '/posts/sumar-todos-los-numeros-de-1-a-n',
        destination: '/posts/2019-10-29-sumar-todos-los-numeros-de-1-a-n',
        permanent: false,
      },
      {
        source: '/posts/copiar-archivos-entre-servidores-sin-conexion-directa',
        destination: '/posts/2021-12-22-copiar-archivos-entre-servidores-sin-conexion-directa',
        permanent: false,
      },
    ]
  },
}
