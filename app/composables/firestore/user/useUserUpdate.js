import { doc, updateDoc } from 'firebase/firestore'
import { useFirestore, useCurrentUser } from 'vuefire'

export function useUserUpdate() {
  const db = useFirestore()
  const currentUser = useCurrentUser()

  async function updateUser(updates) {
    if (!currentUser.value || !currentUser.value.uid) {
      throw new Error('No authenticated user found.')
    }
    const userRef = doc(db, 'users', currentUser.value.uid);
    if (!updates || typeof updates !== 'object') {
      throw new Error('Invalid update payload. Must be an object.');
    }
    try {
      await updateDoc(userRef, updates)
      console.log(`✅ User Updated Successfully: ${JSON.stringify(updates)}`)
    } catch (error) {
      console.error('❌ Error Updating User:', error.message)
      throw error
    }
  }

  return { updateUser }
}
