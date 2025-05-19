import { getDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { useFirestore } from 'vuefire'

export function useAppEnsure() {
  const db = useFirestore()
  const { waitForCurrentUser, createDocumentWithId } = useFirestoreManager()
  const {
    public: { appId, pwaAppName }
  } = useRuntimeConfig()

  async function ensureApp() {
    const currentUser = await waitForCurrentUser()
    const uid = currentUser.uid

    if (!appId) {
      console.warn('🐶 [ensureApp] No appId found. Aborting.')
      return
    }

    const appDocRef = doc(db, 'apps', appId)
    const appSnap = await getDoc(appDocRef)

    if (appSnap.exists()) {
      const createdAt = appSnap.data()?.created_at || 'unknown date'
      console.log(
        `✅ [ensureApp] App '${appId}' already exists. Created on ${createdAt}.`
      )
      return
    }

    const appData: Partial<App> = {
      id: appId,
      app_name: pwaAppName,
      admin_ids: [uid]
    }
    // Create the app document (includes created_at, created_in automatically)
    await createDocumentWithId('apps', appId, appData)

    // ✅ Update Core User to reflect admin role
    const coreUserRef = doc(db, 'users', uid)
    await updateDoc(coreUserRef, {
      adminOf: arrayUnion(appId)
    })

    console.log(
      `🎉 [ensureApp] App '${appId}' created and user '${uid}' added as admin.`
    )
    return appId
  }

  return { ensureApp }
}
