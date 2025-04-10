import { computed } from 'vue'
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore'
import { useFirestore, useDocument, useCurrentUser } from 'vuefire'
import { useRuntimeConfig } from 'nuxt/app'
import type { App } from '~/models/app.model'

export function useApp() {
  const db = useFirestore()
  const currentUser = useCurrentUser()
  const appId = useRuntimeConfig().public.APP_ID
  const appName = useRuntimeConfig().public.PWA_APP_NAME?.trim() || ''

  const appDocRef = doc(db, 'apps', appId)
  const { data: appDoc } = useDocument < App > appDocRef

  const hasAdmin = computed(() => {
    const admins = appDoc.value?.admins
    return Array.isArray(admins) && admins.length > 0
  })

  const adminQuery = query(
    collection(db, 'users'),
    where('adminAppIds', 'array-contains', appId)
  )

  async function fetchAllAdmins(): Promise<Record<string, unknown>[]> {
    const snapshot = await getDocs(adminQuery)
    return snapshot.docs.map(doc => doc.data())
  }

  async function addAdmin(uid: string) {
    await updateDoc(doc(db, 'apps', appId), {
      admins: arrayUnion(uid)
    })
    await updateDoc(doc(db, 'users', uid), {
      adminAppIds: arrayUnion(appId)
    })
    console.log(`✅ Added ${uid} as admin to ${appId}`)
  }

  async function removeAdmin(uid: string) {
    await updateDoc(doc(db, 'apps', appId), {
      admins: arrayRemove(uid)
    })
    await updateDoc(doc(db, 'users', uid), {
      adminAppIds: arrayRemove(appId)
    })
    console.log(`✅ Removed ${uid} from admins of ${appId}`)
  }

  async function createApp() {
    if (!currentUser.value) {
      return Promise.reject('[createApp] Authenticated user required.')
    }

    try {
      await setDoc(doc(db, 'apps', appId), {
        id: appId,
        app_name: appName,
        created_by: currentUser.value.uid,
        created_at: new Date().toISOString()
      })

      await addAdmin(currentUser.value.uid)

      console.log(`[createApp] Created app in 'apps' with ID: ${appId}`)
      return appId
    } catch (error) {
      console.error(`[createApp] Error creating app in 'apps':`, error)
      throw error
    }
  }

  return {
    appId,
    appName,
    hasAdmin,
    fetchAllAdmins,
    addAdmin,
    removeAdmin,
    createApp
  }
}
