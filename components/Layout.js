import Link from "next/link"
import Head from 'next/head'
import NextScript from 'next/script'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Elías Dorigoni - Desarrollador web</title>
        <link key="font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Code+Pro:300,400,600|Source+Sans+Pro:300,400,600,700" />
      </Head>
      <div className="bg-gray-200 min-h-screen font-sans">
        <header className="bg-primary text-white text-center pt-2 mb-4">
          <h1 className="mb-3">
            <Link href="/">
              <a className="text-3xl font-bold -mb-1">Elías Dorigoni</a>
            </Link>
            <span className="block italic opacity-80 font-light">PHP Developer</span>
          </h1>
          <nav className="flex justify-center text-lg pb-2">
            <Link href="/">
              <a className="flex-initial px-2 py-1 hover:underline">Artículos</a>
            </Link>
            <Link href="/portfolio/">
              <a className="flex-initial px-2 py-1 hover:underline">Portfolio</a>
            </Link>
            <Link href="/sobre-mi/">
              <a className="flex-initial px-2 py-1 hover:underline">Sobre mí</a>
            </Link>
          </nav>
        </header>

        <div className="container mx-auto px-2">
          <main className="max-w-prose mx-auto" role="main">
            {children}
          </main>
        </div>

        <footer className="container mx-auto text-gray-700 text-center text-sm pb-6">
          <p>Desarrollado en <a className="font-bold" href="https://nextjs.org/" target="_blank" rel="noopener">next.js</a>.</p>
          <p>Hosteado en <a className="font-bold" href="https://www.netlify.com/" target="_blank" rel="noopener">Netlify</a>.</p>
        </footer>
      </div>
      <NextScript />
    </>
  )
}