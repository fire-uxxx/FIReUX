import { doc, setDoc } from 'firebase/firestore'
import { useFirestore, useCurrentUser } from 'vuefire'
import { useRuntimeConfig } from 'nuxt/app'

export function useAppCreate(appId: string) {
  const db = useFirestore()
  const currentUser = useCurrentUser()
  const {
    public: { PWA_APP_NAME }
  } = useRuntimeConfig()
  const appName = PWA_APP_NAME?.trim() || ''

  async function createApp(): Promise<void> {
    if (!currentUser.value) {
      return Promise.reject('[createApp] Authenticated user required.')
    }
    try {
      // Create the app document with an empty admins array.
      await setDoc(doc(db, 'apps', appId), {
        id: appId,
        app_name: appName,
        created_by: currentUser.value.uid,
        created_at: new Date().toISOString(),
        admins: [] // Initially no admins.
      })

      console.log(`Created app with id: ${appId}`)

      // Now call the update function to add the current user as admin.
      // We rely on useAppUpdate() to provide an addAdmin function.
      const { addAdmin } = useApp()
      await addAdmin(currentUser.value.uid)
    } catch (error) {
      console.error('[createApp] Error creating app:', error)
      throw error
    }
  }

  return { createApp }
}
