export function useBlogPostCreate() {
  const currentUser = useCurrentUser()
  const { addSluggedDocument } = useFirestoreCreate()

  // Function to generate SEO-friendly slugs
  const generateSlug = title => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }

  // Default values for SEO-related fields
  const defaultValues = {
    metaDescription: '',
    keywords: ['FireUX', 'UX', 'Web Development', 'Firebase'],
    tags: ['FireUX', 'Web Development'],
    canonicalUrl: '',
    featuredImage: '/img/logo-type-dark.png',
    socialImage: '/img/logo-type-dark.png',
    readingTime: '3 min',
    cta_link: 'http://fireux.app'
  }

  // Function to create a blog post
  async function createBlogPost(postData) {
    if (!postData.title) {
      return Promise.reject('[createBlogPost] Title is required.')
    }

    const slug = postData.slug || generateSlug(postData.title)

    if (!currentUser.value) {
      return Promise.reject('No authenticated user')
    }

    const seoData = {
      metaDescription:
        postData.metaDescription || postData.content.slice(0, 160),
      keywords: postData.keywords || defaultValues.keywords,
      tags: postData.tags || defaultValues.tags,
      canonicalUrl: postData.canonicalUrl || defaultValues.canonicalUrl,
      featuredImage: postData.featuredImage || defaultValues.featuredImage,
      socialImage: postData.socialImage || defaultValues.socialImage,
      readingTime: postData.readingTime || defaultValues.readingTime
    }

    try {
      const postId = await addSluggedDocument('blogs', {
        ...postData,
        slug,
        userId: currentUser.value.uid,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        author: currentUser.value.displayName || 'Anonymous',
        ...seoData
      })

      console.log(`Blog post created with slug: ${postId}`)
      return postId
    } catch (error) {
      console.error('[createBlogPost] Error creating blog post:', error)
      throw error
    }
  }

  return { createBlogPost }
}
