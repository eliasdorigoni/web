import NavBar from "./NavBar"
import Link from "next/link"

export default function Layout({ children }) {
  return (
    <div className="bg-site">
      <div className="container mx-auto flex flex-wrap ">

        <header className="bg-primary text-white w-48">
          <h1>
            <Link href="/">
              <a>Elías Dorigoni</a>
            </Link>
            <span>Desarrollador web<br /> Córdoba capital</span>
          </h1>
          <NavBar />
        </header>

        <main className="flex-grow" role="main">
          {children}
        </main>
      </div>
    </div>
  )
}