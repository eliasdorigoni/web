import Link from 'next/link'

export default function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            <a>Artículos</a>
          </Link>
        </li>
        <li>
          <Link href="/portfolio/">
            <a>Portfolio</a>
          </Link>
        </li>
        <li>
          <Link href="/sobre-mi/">
            <a>Sobre mí</a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}