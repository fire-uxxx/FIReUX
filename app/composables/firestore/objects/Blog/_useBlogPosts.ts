export function useBlogPosts() {
  const { firestoreFetchCollection, firestoreFetchDoc } = useFirestoreManager()

  const { collectionData: blogPostsCollection } =
    firestoreFetchCollection<BlogPost>('blogs')

  const sortedBlogPostsCollection = computed(() => {
    return blogPostsCollection.value
      ?.slice()
      .sort((a: BlogPost, b: BlogPost) => {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
      })
  })

  function fetchBlogPost(slug: string): Ref<BlogPost | null | undefined> {
    return firestoreFetchDoc<BlogPost>('blogs', slug)
  }

  return {
    blogPostsCollection: sortedBlogPostsCollection,
    fetchBlogPost,
    ...useBlogPostCreate(),
    ...useBlogPostDelete(),
    ...useBlogPostUpdate(),
    ...useBlogPostUtils()
  }
}
