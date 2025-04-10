// Define an Author interface for our blog posts.
export interface Author {
  display_name: string
  handle: string
  avatar: string
  id: string
}

// Define the BlogPost interface.
export interface BlogPost {
  title: string
  content: string
  metaDescription: string
  slug: string // `slug` is used instead of `id`
  created_at: string
  updated_at: string
  author: Author
  keywords: string[]
  tags: string[]
  canonicalUrl: string
  featuredImage: string
  socialImage: string
  readingTime: string
  cta_link: string
  type: 'article' | 'product'
  product_id?: string
  appId: string // ✅ Add this line
}

// Define a default author which will be used as fallback values.
const defaultAuthor: Author = {
  display_name: '',
  handle: '',
  avatar: '',
  id: ''
}

// Helper function to get an Author from a partial user object.
export function getAuthor(user: Partial<Author>): Author {
  return { ...defaultAuthor, ...user }
}
