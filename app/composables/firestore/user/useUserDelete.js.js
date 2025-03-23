// composables/firestore/operations/useUserDelete.js
import { doc, deleteDoc } from 'firebase/firestore'
import { useFirestore, useCurrentUser } from 'vuefire'

export function useUserDelete() {
  const db = useFirestore()
  const currentUser = useCurrentUser()

  async function deleteFireUXUser() {
    if (!currentUser.value || !currentUser.value.uid) {
      throw new Error('No authenticated user found.')
    }
    const userRef = doc(db, 'users', currentUser.value.uid)
    try {
      await deleteDoc(userRef)
      console.log('✅ FireUX User Deleted Successfully')
    } catch (error) {
      console.error('❌ Error Deleting FireUX User:', error.message)
      throw error
    }
  }

  return { deleteFireUXUser }
}
