export function useBlogPostCreate() {
  const { addSluggedDocument } = useFirestoreCreate()

  const createBlogPost = async (postData: BlogPost): Promise<string> => {
    return addSluggedDocument('blogPosts', postData)
  }

  return { createBlogPost }
}
