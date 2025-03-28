import { useFirestore, useCollection } from 'vuefire'
import { collection } from 'firebase/firestore'

export function useBlogPostFetch() {
  const db = useFirestore()

  // Function to fetch a collection of blog posts
  function blogPostsCollection(limitCount = 0) {
    const blogs = useCollection(collection(db, 'blogs'))
    return computed(() => {
      const data = blogs.value || []
      return limitCount > 0 ? data.slice(0, limitCount) : data
    })
  }

  return {
    blogPostsCollection
  }
}
