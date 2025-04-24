import { doc, deleteDoc, getDoc } from 'firebase/firestore'
import { useFirestore, useCurrentUser } from 'vuefire'
import { useUserUpdate } from './useUserUpdate'

export function useUserDelete() {
  const db = useFirestore()
  const currentUser = useCurrentUser()
  const { updateDependents } = useUserUpdate()

  async function deleteUser(): Promise<void> {
    if (!currentUser.value || !currentUser.value.uid) {
      throw new Error('No authenticated user found.')
    }
    const userRef = doc(db, 'users', currentUser.value.uid)

    try {
      // Remove the user from all apps where they are an admin
      const userSnapshot = await getDoc(userRef)
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data()
        if (Array.isArray(userData.adminAppIds)) {
          await updateDependents(currentUser.value.uid, userData.adminAppIds)
        }
      }

      // Delete the user document
      await deleteDoc(userRef)
      console.log('✅ FireUX User Deleted Successfully')
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error)
      console.error('❌ Error Deleting FireUX User:', errorMessage)
      throw new Error(errorMessage)
    }
  }

  return { deleteUser }
}
