import Head from 'next/head'
import Layout from '../components/Layout'
import PostExcerpt from '../components/PostExcerpt'
import { getAllPosts } from '../lib/api'

export default function Home({posts}) {
  return (
    <>
      <Head>
        <title>Elías Dorigoni - Desarrollador web</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        { posts && posts.map(post => (
          <PostExcerpt post={post} />
        )) }
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const posts = getAllPosts([
    'title',
    'slug',
    'date',
  ])

  return {
    props: { posts },
  }
}
