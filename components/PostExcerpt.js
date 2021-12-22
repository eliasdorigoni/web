import Link from 'next/link'

function formatDate(isoDate) {
  let months = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
  ]

  let day = isoDate.substr(8, 2),
    month = months[parseInt(isoDate.substr(5, 2))],
    year = isoDate.substr(0, 4),
    hour = isoDate.substr(11, 2),
    minute = isoDate.substr(14, 2),
    second = isoDate.substr(17, 2)

  return `${day} ${month}, ${year}`
}

export default function PostExcerpt({post}) {
  return (
    <article className="pb-6" key={post.slug}>
      <h2>
        <Link href={"/posts/" + post.slug}>
          <a title={post.title} className="text-2xl font-semibold text-primary hover:text-black">
            {post.title}
          </a>
        </Link>
      </h2>
      <p className="text-gray-500 text-sm"><time>{formatDate(post.date)}</time></p>
      <p>{post.description}</p>
    </article>
  )
}
