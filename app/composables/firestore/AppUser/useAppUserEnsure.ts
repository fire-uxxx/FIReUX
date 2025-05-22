import { getDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { useFirestore } from 'vuefire'

export function useAppUserEnsure() {
  const db = useFirestore()
  const { setDocumentWithId, waitForCurrentUser } = useFirestoreManager()
  const {
    public: { tenantId }
  } = useRuntimeConfig()

  async function ensureAppUser(onSuccess?: () => void) {
    console.log('🚀 [ensureAppUser] Function invoked.')

    const { generateHandle } = useAppUserUtils()

    const user = await waitForCurrentUser()
    const uid = user.uid
    const { coreUser } = useCoreUser()

    if (!uid || !tenantId) {
      console.warn('🐶 [ensureAppUser] Missing UID or tenantId. Aborting.')
      return
    }

    const appRef = doc(db, 'apps', tenantId)
    const appSnap = await getDoc(appRef)
    const isAdmin = appSnap.exists() && appSnap.data().admin_ids?.includes(uid)
    const role = isAdmin ? 'admin' : 'user'

    const appUserData: Partial<AppUserProfile> = {
      uid,
      role,
      display_name: user?.displayName ?? '',
      avatar:
        coreUser.value?.avatar || user?.photoURL || 'img/default-avatar.png',
      handle: generateHandle(user?.displayName ?? ''),
      bio: ''
    }

    const appUserDocRef = doc(db, `users/${uid}/apps`, tenantId)
    const appUserSnap = await getDoc(appUserDocRef)

    if (!appUserSnap.exists()) {
      await setDocumentWithId(`users/${uid}/apps`, tenantId, appUserData)
      console.log(`✅ [ensureAppUser] Created new app user for ${tenantId}.`)
    } else {
      console.log(
        `✅ [ensureAppUser] App user already exists. No changes made.`
      )
    }

    const coreUserRef = doc(db, 'users', uid)
    await updateDoc(coreUserRef, {
      userOf: arrayUnion(tenantId)
    })

    console.log(
      `✅ [ensureAppUser] App User ensured with role: ${role} and tenantId ensured in core user.`
    )

    if (typeof onSuccess === 'function') {
      console.log(
        '📢 [ensureAppUser] Calling onSuccess callback for redirection.'
      )
      onSuccess()
    }
  }

  return { ensureAppUser }
}
