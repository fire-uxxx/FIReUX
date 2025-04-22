// app/composables/firestore/documents/Blog/blogPostUtils.ts


/**
 * Provides helper functions for blog post creation and editing.
 */
export function useBlogPostUtils() {
  // Generate an SEO‑friendly slug from the title
  function generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }

  // Compute estimated reading time (~200 words/minute)
  function computeReadingTime(content: string): string {
    const text = content?.replace(/<[^>]*>/g, '').trim() || ''
    const minutes = Math.ceil((text.split(/\s+/).length || 0) / 200)
    return `${minutes} min`
  }

  // Get the current user as an Author object
  function getAuthor(): Author {
    const { user } = useUser()
    return {
      display_name: user.value?.display_name || '',
      handle: user.value?.handle || '',
      avatar: user.value?.avatar || '',
      id: user.value?.id || ''
    }
  }

  // Default images for a blog post
  function getDefaultImages(): Pick<BlogPost, 'featuredImage' | 'socialImage'> {
    return {
      featuredImage: '/img/logo-type-dark.png',
      socialImage: '/img/logo.png'
    }
  }

  return {
    generateSlug,
    computeReadingTime,
    getAuthor,
    getDefaultImages
  }
}
