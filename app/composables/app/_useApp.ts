// ~/composables/useApp.ts
import { doc } from 'firebase/firestore'
import type { DocumentReference } from 'firebase/firestore'
import { useFirestore, useDocument } from 'vuefire'

export function useApp() {
  const db = useFirestore()
  const {
    public: { appId }
  } = useRuntimeConfig()

  const appDocRef = computed<DocumentReference<App> | null>(() =>
    appId ? (doc(db, 'apps', appId) as DocumentReference<App>) : null
  )

  const { data: app } = useDocument<App>(appDocRef)

  const isInitialised = computed(() => {
    if (app.value === undefined) return undefined // Waiting for Firestore
    if (app.value === null) return false // App doesn't exist
    return !!app.value.admin_ids?.length // App exists, check if admin_ids populated
  })

  return {
    app,
    isInitialised,
    ...useAppEnsure(),
    ...useAppOnboarding()
  }
}
