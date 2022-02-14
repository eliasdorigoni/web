import Layout from '~/components/Layout'
import LinkExcerpt from '~/components/LinkExcerpt'
import PostExcerpt from '~/components/PostExcerpt'
import { getAllPosts } from '~/lib/api'

export default function Home({posts}) {
  return (
    <Layout>
      { posts && posts.map(post => (
        <>
          { post.kind === 'link' && <LinkExcerpt post={post} key={post.slug} /> }
          { post.kind === 'post' && <PostExcerpt post={post} key={post.slug} /> }
        </>
      ))}
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
