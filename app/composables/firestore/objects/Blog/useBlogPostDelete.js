import { doc, deleteDoc } from 'firebase/firestore'
import { useFirestore, useCurrentUser } from 'vuefire'

export function useBlogPostDelete() {
  const db = useFirestore()
  const currentUser = useCurrentUser()

  async function deleteBlogPost(postId) {
    if (!postId) {
      throw new Error('No blog post ID provided.')
    }
    return currentUser.value
      ? await deleteDoc(doc(db, 'blogs', postId)).then(() => {
          console.log('✅ Blog Post Deleted Successfully')
          return true
        })
      : Promise.reject('No authenticated user')
  }

  return { deleteBlogPost }
}
