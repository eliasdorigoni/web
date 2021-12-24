import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Layout from '~/components/Layout'
import PostExcerpt from '~/components/PostExcerpt'
import { getAllPosts } from '~/lib/api'
import slugify from 'slugify'

export default function Category({ posts, preview }) {
  const router = useRouter()

  if (!router.isFallback && posts.length == 0) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout>
      { posts && posts.map(post => (
        <PostExcerpt post={post} key={post.slug} />
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
  ])

  posts = posts.filter(post => {
    return post.categories.map(name => slugify(name, { lower: true})).includes(params.slug)
  })

  return {
    props: { posts }
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['categories']).map(post => post.categories)
  const categories = uniqueArray([].concat(...posts))

  return {
    paths: categories.map(category => {
      return {
        params: { slug: slugify(category, { lower: true }) },
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