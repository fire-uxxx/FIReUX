// app/composables/firestore/documents/Blog/useBlogPostFetch.ts

export function useBlogPostFetch(): {
  blogPostsCollection: Ref<BlogPost[]>
  fetchBlogPost: (slug: string) => Ref<BlogPost | null | undefined>
} {
  const { firestoreFetchCollection, firestoreFetchDoc } = useFirestoreFetch()

  // Grab the raw data ref (may be undefined initially)
  const { collectionData } = firestoreFetchCollection<BlogPost>('blogs')

  // Wrap in a computed to always return an array
  const blogPostsCollection = computed<BlogPost[]>(
    () =>
      (collectionData.value ?? [])
        .slice()
        .sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        )
  )

  function fetchBlogPost(slug: string): Ref<BlogPost | null | undefined> {
    return firestoreFetchDoc<BlogPost>('blogPosts', slug)
  }

  return {
    blogPostsCollection,
    fetchBlogPost
  }
}
