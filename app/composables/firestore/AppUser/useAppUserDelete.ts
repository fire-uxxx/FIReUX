import { doc, deleteDoc, updateDoc, arrayRemove } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { useFirestoreManager } from '@/composables/firestore/_useFirestoreManager'

export function useAppUserDelete() {
  const {
    public: { appId }
  } = useRuntimeConfig()

  const db = useFirestore()
  const { waitForCurrentUser } = useFirestoreManager()

  async function deleteAppUserProfile(): Promise<void> {
    const user = await waitForCurrentUser()
    const uid = user.uid

    try {
      // 🔥 Delete app-specific profile
      const profileRef = doc(db, `users/${uid}/profiles`, appId)
      await deleteDoc(profileRef)
      console.log(`✅ Deleted profile for app ${appId}`)

      // 🗂️ Remove app ID from core user (userOf array)
      const coreUserRef = doc(db, 'users', uid)
      await updateDoc(coreUserRef, {
        userOf: arrayRemove(appId)
      })
      console.log(`✅ Removed app ID ${appId} from core user ${uid}`)

      // 🔒 Remove user from app's admin list (admin_ids on App model)
      const appRef = doc(db, 'apps', appId)
      await updateDoc(appRef, {
        admin_ids: arrayRemove(uid)
      })
    } catch (error) {
      console.error('❌ Error deleting app user profile:', error)
    }
  }

  return { deleteAppUserProfile }
}
