import Link from "next/link"
import Head from 'next/head'
import NextScript from 'next/script'
import { useRouter } from "next/router"

export default function Layout({ children }) {
  const router = useRouter()
  const pageClasses = "flex-initial text-white text-opacity-70 px-2 py-1 hover:text-opacity-100"
  const activePageClasses = "flex-initial text-white text-opacity-100 px-2 py-1 font-bold"

  return (
    <>
      <Head>
        <title>Elías Dorigoni - Desarrollador web</title>
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
              <a className={router.pathname == '/' || router.pathname.startsWith('/posts/') ? activePageClasses : pageClasses}>Artículos</a>
            </Link>
            <Link href="/portfolio">
              <a className={router.pathname == '/portfolio' ? activePageClasses : pageClasses}>Portfolio</a>
            </Link>
            <Link href="/sobre-mi">
              <a className={router.pathname == '/sobre-mi' ? activePageClasses : pageClasses}>Sobre mí</a>
            </Link>
          </nav>
        </header>

        <div className="container mx-auto px-2 mb-12">
          <main className="max-w-prose mx-auto" role="main">
            {children}
          </main>
        </div>

        <footer className="bg-gray-300 pb-8 pt-4 px-4 text-gray-700 text-center text-sm">
          <p>Todo el contenido de este sitio es de carácter estrictamente personal y no reflejan las opiniones de mi empleador.</p>
          <p>Desarrollado en <a className="font-bold" href="https://nextjs.org/" target="_blank" rel="noopener">next.js</a> y hosteado en <a className="font-bold" href="https://www.netlify.com/" target="_blank" rel="noopener">Netlify</a>.</p>
        </footer>
      </div>
      <NextScript />
    </>
  )
}
