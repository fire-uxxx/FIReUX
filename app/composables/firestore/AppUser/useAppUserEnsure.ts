import { getDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { useFirestore } from 'vuefire'

export function useAppUserEnsure() {
  const db = useFirestore()
  const { createDocumentWithId, waitForCurrentUser } = useFirestoreManager()
  const {
    public: { APP_ID }
  } = useRuntimeConfig()

  async function ensureAppUser() {
    const user = await waitForCurrentUser()
    const uid = user.uid

    if (!uid || !APP_ID) {
      console.warn('🐶 [ensureAppUser] Missing UID or APP_ID. Aborting.')
      return
    }

    const appRef = doc(db, 'apps', APP_ID)
    const appSnap = await getDoc(appRef)
    const isAdmin = appSnap.exists() && appSnap.data().admin_ids?.includes(uid)
    const role = isAdmin ? 'admin' : 'user'

    const { generateHandle } = useAppUser()

    const appUserData = {
      id: uid,
      created_at: new Date().toISOString(),
      role,
      display_name: user?.displayName ?? '',
      avatar: user?.photoURL ?? '',
      handle: generateHandle(user?.displayName ?? ''),
      bio: '',
      is_complete: false
    }

    const appUserDocRef = doc(db, `users/${uid}/apps`, APP_ID)
    const appUserSnap = await getDoc(appUserDocRef)

    if (!appUserSnap.exists()) {
      await createDocumentWithId(`users/${uid}/apps`, APP_ID, appUserData)
      console.log(`✅ [ensureAppUser] Created new app user for ${APP_ID}.`)
    } else {
      console.log(
        `✅ [ensureAppUser] App user already exists. No changes made.`
      )
    }

    const coreUserRef = doc(db, 'users', uid)
    await updateDoc(coreUserRef, {
      app_ids: arrayUnion(APP_ID)
    })

    console.log(
      `✅ [ensureAppUser] App User ensured with role: ${role} and APP_ID ensured in core user.`
    )
  }

  return { ensureAppUser }
}
