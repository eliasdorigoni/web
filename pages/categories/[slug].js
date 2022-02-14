import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import Layout from '~/components/Layout'
import PostExcerpt from '~/components/PostExcerpt'
import { getAllPosts } from '~/lib/api'
import slugify from 'slugify'
import LinkExcerpt from '~/components/LinkExcerpt'

export default function Category({ posts, name }) {
  const router = useRouter()

  if (!router.isFallback && posts.length == 0) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout>
      <Head>
        <title key="title">
          Categoria: {name} | Elías Dorigoni - Desarrollador web
        </title>
      </Head>
      <h2 className="text-lg mb-4 text-gray-600 text-center">
        Estás viendo todos los artículos en la categoría <strong>{name}</strong>.
      </h2>
      { posts && posts.map(post => (
        <>
          { post.kind === 'link' && <LinkExcerpt post={post} key={post.slug} /> }
          { post.kind === 'post' && <PostExcerpt post={post} key={post.slug} /> }
        </>
      )) }
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  let posts = getAllPosts([
    'title',
    'slug',
    'date',
    'description',
    'categories',
    'kind',
    'link',
  ])

  let originalName = ''

  posts = posts.filter(post => {
    let includesSlug = post.categories.map(name => slugify(name, { lower: true })).includes(params.slug)
    if (includesSlug && originalName === '') {
      originalName = post.categories
        .filter(name => slugify(name, { lower: true }) === params.slug)
        .shift()
    }
    return includesSlug
  })

  return {
    props: {
      posts: posts,
      name: originalName,
    }
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['categories']).map(post => post.categories)
  const categories = uniqueArray([].concat(...posts))

  return {
    paths: categories.map(category => {
      return {
        params: {
          slug: slugify(category, { lower: true }),
        },
      }
    }),
    fallback: false,
  }
}

function uniqueArray(ar) {
  var j = {};

  ar.forEach( function(v) {
    j[v+ '::' + typeof v] = v;
  });

  return Object.keys(j).map(function(v){
    return j[v];
  });
}
