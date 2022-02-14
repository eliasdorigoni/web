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

export default function LinkExcerpt({post}) {
  return (
    <article className="pb-6 mb-4" key={post.slug}>
      <p className="text-gray-400 text-sm italic">
        <time>{formatDate(post.date)}</time>
      </p>

      <h2>
        <a href={post.link} target="_blank" rel="noopener" title={post.title} className="text-2xl font-semibold text-primary hover:text-primary-darker inline-block">
          {post.isDraft ? <span className="bg-black text-white text-sm px-1 rounded relative bottom-1 mr-1">Draft</span> : ''}
          <span className="bg-green-600 text-white text-sm px-1 rounded relative bottom-1 mr-1">Link</span>
          {post.title}
        </a>
      </h2>

      <p className="text-gray-700">{post.description || post.content}</p>

      <div className="text-sm mt-1">
        {post.categories.map(category =>
          <Link key={category} href={"/categories/" + slugify(category, {lower:true})}>
            <a className="bg-primary hover:bg-primary-darker text-white rounded px-1 inline-block mr-1">
              {category}
            </a>
          </Link>
        )}
      </div>
    </article>
  )
}
