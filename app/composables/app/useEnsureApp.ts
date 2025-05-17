import { getDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { useFirestore } from 'vuefire'

export function useAppEnsure() {
  const db = useFirestore()
  const { waitForCurrentUser, createDocumentWithId } = useFirestoreManager()
  const {
    public: { APP_ID, PWA_APP_NAME }
  } = useRuntimeConfig()

  async function ensureApp() {
    const currentUser = await waitForCurrentUser()
    const uid = currentUser.uid

    if (!APP_ID) {
      console.warn('🐶 [ensureApp] No APP_ID found. Aborting.')
      return
    }

    const appDocRef = doc(db, 'apps', APP_ID)
    const appSnap = await getDoc(appDocRef)

    if (appSnap.exists()) {
      const createdAt = appSnap.data()?.created_at || 'unknown date'
      console.log(
        `✅ [ensureApp] App '${APP_ID}' already exists. Created on ${createdAt}.`
      )
      return
    }

    const appData: Partial<App> = {
      id: APP_ID,
      app_name: PWA_APP_NAME,
      admin_ids: [uid]
    }
    // Create the app document (includes created_at, created_in automatically)
    await createDocumentWithId('apps', APP_ID, appData)

    // ✅ Update Core User to reflect admin role
    const coreUserRef = doc(db, 'users', uid)
    await updateDoc(coreUserRef, {
      adminOf: arrayUnion(APP_ID)
    })

    console.log(
      `🎉 [ensureApp] App '${APP_ID}' created and user '${uid}' added as admin.`
    )
    return APP_ID
  }

  return { ensureApp }
}
