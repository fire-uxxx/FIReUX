import { doc } from 'firebase/firestore'
import type { DocumentReference } from 'firebase/firestore'
import { useFirestore, useDocument } from 'vuefire'

export function useApp() {
  const db = useFirestore()
  const {
    public: { APP_ID }
  } = useRuntimeConfig()

  const appDocRef = computed<DocumentReference<App> | null>(() =>
    APP_ID ? (doc(db, 'apps', APP_ID) as DocumentReference<App>) : null
  )

  const { data: app } = useDocument<App>(appDocRef)

  const isInitialised = computed(() => {
    if (!app.value) return null // Still loading
    return !!app.value.admin_ids?.length
  })

  return {
    app,
    isInitialised, 
    ...useAppEnsure()
  }
}
