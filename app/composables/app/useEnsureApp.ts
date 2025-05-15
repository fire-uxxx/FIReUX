import { getDoc, doc } from 'firebase/firestore'
import { useFirestore } from 'vuefire'

export function useAppEnsure() {
  const db = useFirestore()
  const { waitForCurrentUser, createDocumentWithId } = useFirestoreManager()
  const { public: { APP_ID } } = useRuntimeConfig()

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
      console.log(`✅ [ensureApp] App with ID '${APP_ID}' already exists. Please choose a different name. Continuing with established app '${APP_ID}' created on ${createdAt}.`)
      return
    }

    const collectionName = 'apps'
    const appData = {
      id: APP_ID,
      created_at: new Date().toISOString(),
      admin_ids: [uid]
    }

    return await createDocumentWithId(collectionName, APP_ID, appData)
  }

  return { ensureApp }
}