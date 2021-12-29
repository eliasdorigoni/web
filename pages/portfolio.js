import Head from 'next/head'
import Image from "next/image"
import Layout from "~/components/Layout"
import MikesMechsScreenshot from "~/public/img/screenshot-mikes-mechs.png"

export default function Portfolio() {
  return (
    <Layout>
      <Head>
        <title key="title">
          Portfolio | Elías Dorigoni - Desarrollador web
        </title>
      </Head>
      <p className="pt-4 mb-6">
        Estas son algunas de las cosas que hice, mayormente proyectos de hobby o no
        laborales.
      </p>

      <div className="portfolio-item flow-root">
        <h2 className="inline-block mr-2">Mike's Mechs</h2>
        <p className="inline-block text-gray-400">
          (<a
            href="https://github.com/eliasdorigoni/coderhouse-desafio-ecommerce"
            target="_blank"
            title="Repositorio en Github"
            rel="noopener">GitHub</a> <span className="mx-0.5">&middot;</span> <a
            href="https://mikes-mechs.netlify.app/"
            target="_blank"
            title="mikes-mechs.netlify.app"
            rel="noopener">Web</a>)
        </p>

        <p className="mb-2">
          Este fue un ecommerce desarrollado en React JS para el final del curso de Coderhouse, hecho
          en agosto del 2021. Usa ReactJS para el maquetado, Tailwind para los estilos y Firebase como base de datos
          de los productos.<br />
          La nota final del profesor fue 10/10.
        </p>

        <div className="">
          <Image
            src={MikesMechsScreenshot}
            alt="Mike's Mechs cover"
            width={1366 * 0.4}
            height={768 * 0.4}
            />
        </div>
      </div>
    </Layout>
  )
}

