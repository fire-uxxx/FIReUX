import { ref, watchEffect } from 'vue'
import { doc } from 'firebase/firestore'
import { useFirestore, useCurrentUser, useDocument } from 'vuefire'
import { useRuntimeConfig } from 'nuxt/app'
import type { User } from '~/models/user.model'

export function useUserCreate() {
  const db = useFirestore()
  const currentUser = useCurrentUser()
  const { processImageUrl } = useMediaStorage()
  const appId = useRuntimeConfig().public.APP_ID

  async function createUser(): Promise<boolean> {
    const { createEntity } = useFirestoreCreate()
    const user = currentUser.value
    if (!user?.uid) return false

    try {
      const avatar = await processImageUrl({
        url: user.photoURL || '',
        path: `users/${user.uid}/avatar.jpg`
      })

      const display_name = generateDisplayName(user.email, user.displayName)
      const handle = generateHandle(display_name)

      const data: User & {
        email: string
        created_at: string
        appIds: string[]
      } = {
        id: user.uid,
        avatar,
        email: user.email || '',
        display_name,
        handle,
        created_at: new Date().toISOString(),
        appIds: [appId]
      }

      await createEntity('users', data)
      console.log('[createUser] ✅ User Created:', data)
      return true
    } catch (error) {
      const err = error as Error
      console.error('[createUser] ❌ Error creating user:', err.message)
      return false
    }
  }

  async function onboardUser(id: string): Promise<void> {
    const targetUserRef = doc(db, 'users', id)
    const { data: targetUser } = useDocument<User>(targetUserRef)
    const exists = ref(false)

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

    ;(await navigateTo('/dashboard', { replace: true })) as Promise<void>
  }

  function generateDisplayName(email?: string, displayName?: string): string {
    if (displayName?.trim()) return displayName
    if (email?.trim()) return email.split('@')[0] || randomUserId()
    return randomUserId()
  }

  function generateHandle(displayName: string): string {
    return displayName?.toLowerCase().replace(/\s+/g, '') || randomUserId()
  }

  function randomUserId(): string {
    return Math.random().toString(36).substring(2, 10)
  }

  return { createUser, onboardUser }
}
