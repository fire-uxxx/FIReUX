import { deleteDoc, doc } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import type { App } from '@/models/app.model'

export function useAppDelete(appId: string, app: App) {
  const db = useFirestore()

  async function deleteApp(): Promise<void> {
    if (!app) {
      console.warn(
        `Cannot delete app. No app document available for appId: ${appId}`
      )
      return
    }
    try {
      await deleteDoc(doc(db, 'apps', appId))
      console.log(`✅ Deleted app ${appId} successfully`)
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error)
      console.error(`❌ Error deleting app ${appId}:`, errorMessage)
      throw new Error(errorMessage)
    }
  }

  return { deleteApp }
}
