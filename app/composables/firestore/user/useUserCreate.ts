import { doc, setDoc } from 'firebase/firestore'
import { useFirestore, useCurrentUser } from 'vuefire'

export function useUserCreate() {
  const db = useFirestore()
  const currentUser = useCurrentUser()
  const {
    public: { APP_ID }
  } = useRuntimeConfig()

  async function createUser(): Promise<boolean> {
    if (!currentUser.value) {
      return Promise.reject('[createUser] Authenticated user required.')
    }
    try {
      const uid = currentUser.value.uid

      await setDoc(doc(db, 'users', uid), {
        id: uid,
        appIds: [APP_ID]
      })

      console.log(`[createUser] Created user document for: ${uid}`)

      // await updateDoc(doc(db, 'users', uid), { ping: 'pong' })
      console.log(
        `[createUser] Updated user document with ping:pong for: ${uid}`
      )

      return true
    } catch (error) {
      console.error(
        '[createUser] Error creating/updating user document:',
        error
      )
      return false
    }
  }

  async function onboardUser(id: string): Promise<void> {
    // Create a reference to the target user document.
    const targetUserRef = doc(db, 'users', id)
    const { data: targetUser } = useDocument<User>(targetUserRef)
    const exists = ref(false)

    // Watch until the document is available (or not).
    await new Promise<void>(resolve => {
      const stop = watchEffect(() => {
        if (targetUser.value !== undefined) {
          exists.value = !!targetUser.value
          stop()
          resolve()
        }
      })
    })

    if (exists.value) {
      console.log('[onboardUser] ✅ User already exists - Skipping creation')
    } else {
      console.log('[onboardUser] 🆕 User does not exist, creating...')
      await createUser()
      console.log('[onboardUser] ✅ User created successfully')
    }

    // Navigate to the dashboard (assumes navigateTo is available).
    await navigateTo('/dashboard', { replace: true })
  }

  return { createUser, onboardUser }
}
