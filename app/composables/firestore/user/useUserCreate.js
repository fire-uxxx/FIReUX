import { doc } from 'firebase/firestore'
import { useFirestore, useCurrentUser, useDocument } from 'vuefire'

export function useUserCreate() {
  const db = useFirestore()
  const currentUser = useCurrentUser()
  const { processImageUrl } = useMediaStorage()

  async function createUser() {
    const { createEntity } = useFirestoreCreate()
    const user = currentUser.value
    if (!user?.uid) return false

    try {

      const avatar = await processImageUrl({
        url: user.photoURL,
        path: `users/${user.uid}/avatar.jpg`
      })

      const display_name = generateDisplayName(user.email, user.displayName)
      const handle = generateHandle(display_name)

      const data = {
        avatar,
        email: user.email || '',
        display_name,
        handle,
        created_at: new Date().toISOString()
      }

      await createEntity('users', data)
      console.log('[createUser] ✅ User Created:', data)
      return true
    } catch (error) {
      console.error('[createUser] ❌ Error creating user:', error.message)
      return false
    }
  }

  async function onboardUser(id) {
    const targetUserRef = doc(db, 'users', id)
    const { data: targetUser } = useDocument(targetUserRef)

    if (targetUser.value) {
      console.log('[onboardUser] ✅ User already exists - Skipping creation')
      return navigateTo('/dashboard', { replace: true })
    } else {
      console.log('[onboardUser] 🆕 User does not exist, creating...')
      await createUser()
      console.log('[onboardUser] ✅ User created successfully')
      return navigateTo('/dashboard', { replace: true })
    }
  }

  function generateDisplayName(email, displayName) {
    if (displayName?.trim()) return displayName
    if (email?.trim()) return email.split('@')[0] || randomUserId()
    return randomUserId()
  }

  function generateHandle(displayName) {
    return displayName?.toLowerCase().replace(/\s+/g, '') || randomUserId()
  }

  function randomUserId() {
    return Math.random().toString(36).substring(2, 10)
  }

  return { createUser, onboardUser }
}
