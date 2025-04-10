import { addSluggedDocument } from '@/composables/firestore/useFirestoreCreate'
import { useUser } from '@/composables/user/useUser'
import type { BlogPost, Author } from '~/models/blog-post.model'

export function useBlogPostCreate() {
  // Generate an SEO-friendly slug from the title
  function generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }

  // Compute estimated reading time
  function computeReadingTime(content: string): string {
    if (!content) return '0 min'
    const text = content.replace(/<[^>]*>/g, '')
    const wordCount = text.trim().split(/\s+/).length
    const minutes = Math.ceil(wordCount / 200)
    return `${minutes} min`
  }

  // Safe inject inside function
  function getAuthor(): Author {
    const { user } = useUser()
    return {
      display_name: user.value?.display_name || '',
      handle: user.value?.handle || '',
      avatar: user.value?.avatar || '',
      id: user.value?.id || ''
    }
  }

  function getImages(): { featuredImage: string; socialImage: string } {
    return {
      featuredImage: '/img/logo-type-dark.png',
      socialImage: '/img/logo.png'
    }
  }

  // Create a new blog post in Firestore using slug as ID
  async function createBlogPost(postData: Partial<BlogPost>): Promise<string> {
    if (!postData.title || !postData.content) {
      throw new Error('Post must have a title and content.')
    }

    const slug = generateSlug(postData.title)
    const readingTime = computeReadingTime(postData.content)
    const author = getAuthor()
    const { featuredImage, socialImage } = getImages()

    const data: BlogPost = {
      ...postData,
      slug,
      author,
      readingTime,
      featuredImage,
      socialImage,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    const id = await addSluggedDocument('blogPosts', data)
    return id
  }

  return {
    createBlogPost,
    computeReadingTime,
    generateSlug,
    getAuthor,
    getImages
  }
}
