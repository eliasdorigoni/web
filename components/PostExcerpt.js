import Link from 'next/link'

export default function PostExcerpt({post}) {
  return (
    <article className="pb-6" key={post.slug}>
      <h2 className="text-2xl font-semibold text-gray-700 hover:text-black">
        <Link href={"/posts/" + post.slug}>
          <a title={post.title}>
            {post.title}
          </a>
        </Link>
      </h2>
      <p className="text-gray-500 text-sm"><time>{post.date}</time></p>
      <p>{post.description}</p>
    </article>
  )
}
