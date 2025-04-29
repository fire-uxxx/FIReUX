export function useBlogPostCreate() {
  const { createDocument } = useFirestoreCreate()

  const createBlogPost = async (
    postData: Partial<BlogPost>
  ): Promise<string> => {
    // Use auto-generated ID instead of slug
    return createDocument('blogs', postData)
  }

  return { createBlogPost }
}
