import { doc, updateDoc } from 'firebase/firestore'
import { useFirestore, useCurrentUser } from 'vuefire'

export function useBlogPostUpdate() {
  const db = useFirestore()
  const currentUser = useCurrentUser()

  async function updateBlogPost(postId, updates) {
    if (!postId) throw new Error('No BlogPost ID provided.')
    if (!updates || typeof updates !== 'object')
      throw new Error('Invalid update payload. Must be an object.')

    return currentUser.value
      ? await updateDoc(doc(db, 'blogs', postId), updates).then(() => {
          console.log(
            `✅ BlogPost Updated Successfully: ${JSON.stringify(updates)}`
          )
          return true
        })
      : Promise.reject('No authenticated user')
  }

  return { updateBlogPost }
}
