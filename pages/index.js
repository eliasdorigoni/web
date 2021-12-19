import Layout from '~/components/Layout'
import PostExcerpt from '~/components/PostExcerpt'
import { getAllPosts } from '~/lib/api'

export default function Home({posts}) {
  return (
    <Layout>
      { posts && posts.map(post => (
        <PostExcerpt post={post} key={post.slug} />
      )) }
    </Layout>
  )
}

export async function getStaticProps() {
  const posts = getAllPosts([
    'title',
    'slug',
    'date',
    'description',
  ])

  return {
    props: { posts },
  }
}
