import Layout from '~/components/Layout'
import LinkExcerpt from '~/components/LinkExcerpt'
import PostExcerpt from '~/components/PostExcerpt'
import { getAllPosts } from '~/lib/api'

export default function Home({posts}) {
  return (
    <Layout>
      { posts && posts.map(post => {
        if (post.kind === 'link') {
          return (
            <LinkExcerpt post={post} key={post.slug} />
          )
        } else {
          return (
            <PostExcerpt post={post} key={post.slug} />
          )
        }
      }
      )}
    </Layout>
  )
}

export async function getStaticProps() {
  const posts = getAllPosts([
    'title',
    'slug',
    'date',
    'description',
    'isDraft',
    'categories',
    'kind',
    'link',
  ])

  return {
    props: { posts },
  }
}
