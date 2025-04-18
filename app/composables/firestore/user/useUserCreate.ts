import { doc, setDoc, getDoc } from 'firebase/firestore'
import { useFirestore, useCurrentUser } from 'vuefire'
import { useRuntimeConfig, navigateTo } from 'nuxt/app'
import { useUserUpdate } from './useUserUpdate'

export function useUserCreate() {
  const { populateCurrentUser } = useUserUpdate()

  async function createUser(): Promise<boolean> {
    const db = useFirestore()
    const currentUser = useCurrentUser()
    const {
      public: { APP_ID }
    } = useRuntimeConfig()

    if (!currentUser.value) {
      return Promise.reject('[createUser] Authenticated user required.')
    }

    try {
      const uid = currentUser.value.uid

      await setDoc(doc(db, 'users', uid), {
        id: uid,
        appIds: [APP_ID]
      })
      await populateCurrentUser()
      await navigateTo('/dashboard', { replace: true })
      return true
    } catch (error) {
      console.error(
        '[createUser] Error creating/updating user document:',
        error
      )
      return false
    }
  }

  async function onboardUser(): Promise<void> {
    const db = useFirestore()
    const currentUser = useCurrentUser()

    if (!currentUser.value) {
      console.error('[onboardUser] ❌ No authenticated user')
      return
    }

    const uid = currentUser.value.uid
    const userRef = doc(db, 'users', uid)
    const snapshot = await getDoc(userRef)

    if (snapshot.exists()) {
      console.log('[onboardUser] ✅ User already exists - Skipping creation')
      await navigateTo('/dashboard', { replace: true })
    } else {
      console.log('[onboardUser] 🆕 User does not exist, creating...')
      await createUser()
      console.log('[onboardUser] ✅ User created successfully')
      await navigateTo('/dashboard', { replace: true })
    }
  }

  return { createUser, onboardUser }
}
