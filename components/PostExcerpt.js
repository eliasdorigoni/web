import Link from 'next/link'

export default function PostExcerpt({post}) {
  console.log(post)
  return (
    <article className="bg-gray-100 mb-4 mx-2">
      <h2 className="text-xl bold hover:underline">
        <Link href={"/posts/" + post.slug}>
          <a title="Leer el artículo: Sumar todos los numeros de 1 a N">
            {post.title}
          </a>
        </Link>
      </h2>
      <p><time>{post.date}</time></p>
      <p>
        <span>
          Publicado en
            <a href="/categorias/algoritmos">Algoritmos</a>,
            <a href="/categorias/php">PHP</a>.
        </span>
      </p>
    </article>
  )
}
