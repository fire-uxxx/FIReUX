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

  // Safe inject inside function (uses auto-imported useUser)
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

  // Retrieve addSluggedDocument from useFirestoreCreate via auto-import
  const { addSluggedDocument } = useFirestoreCreate()

  // Create a new blog post in Firestore using slug as ID
  async function createBlogPost(postData: Partial<BlogPost>): Promise<string> {
    if (!postData.title || !postData.content) {
      throw new Error('Post must have a title and content.')
    }

    const slug = generateSlug(postData.title)
    const readingTime = computeReadingTime(postData.content)
    const author = getAuthor()
    const { featuredImage, socialImage } = getImages()

    // Build a complete BlogPost object by providing defaults for missing fields.
    const data: BlogPost = {
      title: postData.title!, // non-null assertion because of the throw above
      content: postData.content!,
      metaDescription: postData.metaDescription ?? '',
      slug,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      author,
      keywords: postData.keywords ?? [],
      tags: postData.tags ?? [],
      canonicalUrl: postData.canonicalUrl ?? '',
      featuredImage,
      socialImage,
      readingTime,
      cta_link: postData.cta_link ?? '',
      type: postData.type ?? 'article',
      // Supply appId from postData if available, or else get it from your app context
      appId: postData.appId ?? 'default-app-id'
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
