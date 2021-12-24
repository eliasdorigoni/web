import Link from 'next/link'
import slugify from 'slugify'

function formatDate(isoDate) {
  let months = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
  ]

  let day = isoDate.substr(8, 2),
    month = months[parseInt(isoDate.substr(5, 2))-1],
    year = isoDate.substr(0, 4),
    hour = isoDate.substr(11, 2),
    minute = isoDate.substr(14, 2),
    second = isoDate.substr(17, 2)

  return `${day} ${month}, ${year}`
}

export default function PostExcerpt({post}) {
  return (
    <article className="pb-6 mb-4" key={post.slug}>
      <p className="text-gray-400 text-sm italic">
        <time>{formatDate(post.date)}</time>
      </p>

      <h2>
        <Link href={"/posts/" + post.slug}>
          <a title={post.title} className="text-2xl font-semibold text-primary hover:text-black inline-block">
            {post.isDraft ? <span className="bg-black text-white text-sm px-1 rounded relative bottom-1 mr-1">Draft</span> : ''}
            {post.title}
          </a>
        </Link>
      </h2>

      <p class="text-gray-700">{post.description}</p>

      <div className="text-sm mt-1">
        {post.categories.map(category =>
          <Link href={"/categories/" + slugify(category, {lower:true})}>
            <a className="bg-primary text-white rounded px-1 inline-block mr-1">{category}</a>
          </Link>
        )}
      </div>
    </article>
  )
}
