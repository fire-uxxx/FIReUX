import { doc, setDoc, getDoc } from 'firebase/firestore'
import { useFirestore, useCurrentUser } from 'vuefire'

export function useAppCreate(appId: string, appName: string) {
  return () => {
    const db = useFirestore()
    const currentUser = useCurrentUser()

    async function createApp(): Promise<void> {
      if (!currentUser.value) {
        return Promise.reject('[createApp] Authenticated user required.')
      }
      const uid = currentUser.value.uid

      // Check that the user document exists before creating the app.
      const userRef = doc(db, 'users', uid)
      const userSnapshot = await getDoc(userRef)
      if (!userSnapshot.exists()) {
        console.error(
          '[createApp] ❌ No user document found. Onboard user first.'
        )
        return Promise.reject(
          'User document not found. Please onboard user before creating an app.'
        )
      }

      try {
        // Create the app document with an empty admins array.
        await setDoc(doc(db, 'apps', appId), {
          id: appId,
          app_name: appName,
          created_by: uid,
          created_at: new Date().toISOString(),
          admins: [] // Initially no admins.
        })
        console.log(`Created app with id: ${appId}`)

        // Now add the current user as admin.
        const { addAdmin } = useAppUpdate(appId)
        await addAdmin(uid)
        console.log(`Admin set for app ${appId} using user ${uid}`)
      } catch (error) {
        console.error('[createApp] Error creating app:', error)
        throw error
      }
    }

    return { createApp }
  }
}
