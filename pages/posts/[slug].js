import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import Layout from '~/components/Layout'
import Comments from '~/components/Comments'
import { getPostBySlug, getAllPosts } from '~/lib/api'
import markdownToHtml from '~/lib/markdownToHtml'

function formatDate(isoDate) {
  let months = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
  ]

  let day = isoDate.substr(8, 2),
    month = months[parseInt(isoDate.substr(5, 2))-1],
    year = isoDate.substr(0, 4),
    hour = isoDate.substr(11, 2),
    minute = isoDate.substr(14, 2),
    second = isoDate.substr(17, 2)

  return `${day} de ${month}, ${year} - ${hour}:${minute}`
}

export default function Post({ post }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout>
      <Head>
        <title key="title">
          {post.title} | Elías Dorigoni - Desarrollador web
        </title>
      </Head>

      {router.isFallback ? (
        <p>Loading…</p>
      ) : (
        <div>
          <h1 className="text-3xl font-bold text-primary text-center">{post.title}</h1>
          <p className="text-center mb-8 italic text-gray-400">Publicado el {formatDate(post.date)}</p>
          <article
            className="pb-8 content"
            dangerouslySetInnerHTML={{__html: post.content}}>
          </article>
          <Comments url={router.asPath} identifier={post.slug}></Comments>
        </div>
      )}
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
  ])
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
