import { doc, deleteDoc, updateDoc, arrayRemove } from 'firebase/firestore'
import { useFirestore } from 'vuefire'

export function useAppUserDelete() {
  const {
    public: { APP_ID }
  } = useRuntimeConfig()

  const db = useFirestore()
  const { waitForUser } = useAppUser()

  async function deleteAppUserProfile(): Promise<void> {
    const uid = await waitForUser()

    try {
      // 🔥 Delete app-specific profile
      const profileRef = doc(db, `users/${uid}/profiles`, APP_ID)
      await deleteDoc(profileRef)
      console.log(`✅ Deleted profile for app ${APP_ID}`)

      // 🗂️ Remove app ID from core user
      const coreUserRef = doc(db, 'users', uid)
      await updateDoc(coreUserRef, {
        app_ids: arrayRemove(APP_ID) as unknown as CoreUser['app_ids']
      })
      console.log(`✅ Removed app ID ${APP_ID} from core user ${uid}`)

      // 🔒 Remove user from app's admin list (admin_ids on App model)
      const appRef = doc(db, 'apps', APP_ID)
      await updateDoc(appRef, {
        admin_ids: arrayRemove(uid) as unknown as App['admin_ids']
      })
      console.log(`✅ Removed user ${uid} from admins of app ${APP_ID}`)
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error)
      console.error('❌ Error deleting user profile from app:', message)
      throw new Error(message)
    }
  }

  return { deleteAppUserProfile }
}
