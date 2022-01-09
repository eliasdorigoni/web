import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const postsDirectory = join(process.cwd(), 'content')

export function getPostBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items = {}

  if (
    ('draft' in data && data.draft === true)
    && process.env.NODE_ENV === 'production'
  ) {
    // Los borradores no se muestran en producción.
    return {}
  }

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }
    if (field === 'date') {
      items[field] = data[field].substr(0, 10)
    }
    if (field === 'isDraft') {
      items[field] = ('draft' in data && data.draft === true)
    }
    if (field === 'categories') {
      items[field] = data[field] || []
    }
    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllPosts(fields = []) {
  const slugs = fs.readdirSync(postsDirectory)
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .filter(obj => Object.keys(obj).length > 0)
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}
