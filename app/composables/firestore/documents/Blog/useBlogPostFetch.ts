// composables/firestore/documents/Blog/useBlogPostFetch.ts
export function useBlogPostFetch() {
  const { collectionData: blogsCollection } =
    firestoreFetchCollection<BlogPost>('blogs')

  // Fetch a single blog post using its slug as the document ID
  function fetchBlogPost(slug: string) {
    return firestoreFetchDoc<BlogPost>('blogs', slug)
  }

  return {
    blogsCollection,
    fetchBlogPost
  }
}
