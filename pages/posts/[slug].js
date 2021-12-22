import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import Layout from '~/components/Layout'
import { getPostBySlug, getAllPosts } from '~/lib/api'
import markdownToHtml from '~/lib/markdownToHtml'

export default function Post({ post, preview }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout>
      <Head>
        <title key="title">
          {post.title} | Titulo
        </title>
        <link key="font" href="https://fonts.googleapis.com/css?family=Source+Code+Pro:300,400,600|Source+Sans+Pro:300,400,600,700" rel="stylesheet" />
        <link key="prism" type="text/css" href="https://unpkg.com/prismjs@1.25.0/themes/prism.css" rel="stylesheet" />
        {/* <link key="prism" type="text/css" href="https://unpkg.com/prismjs@1.25.0/themes/prism-okaidia.css" rel="stylesheet" /> */}

      </Head>

      {router.isFallback ? (
        <p>Loading…</p>
      ) : (
        <div>
          <h1 className="text-2xl text-center">{post.title}</h1>
          <p className="text-center mb-8 italic">{post.date}</p>
          <article className="pb-32 main-article">
            <div dangerouslySetInnerHTML={{__html: post.content}}>
            </div>
          </article>
          <script src="https://unpkg.com/prismjs@1.25.0/components/prism-core.min.js"></script>
          <script src="https://unpkg.com/prismjs@1.25.0/plugins/autoloader/prism-autoloader.min.js"></script>
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
