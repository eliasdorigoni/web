import NavBar from "./NavBar"

export default function Layout({ children }) {
  return (
    <>
      <header>
        <h1>
          <a href="/">Elías Dorigoni</a>
          <span>Desarrollador web<br /> Córdoba capital</span>
        </h1>
      </header>

      <NavBar />

      <main role="main">
        {children}
      </main>

    </>
  )
}