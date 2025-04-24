import { doc } from 'firebase/firestore'
import { useDocument, useFirestore } from 'vuefire'
import type { Ref } from 'vue'
import { computed } from 'vue'

export function useApp(): {
  app: Ref<App | null | undefined>
  hasAdmin: Ref<boolean>
} {
  const {
    public: { APP_ID, PWA_APP_NAME }
  } = useRuntimeConfig()
  const db = useFirestore()

  // Current app document reference
  const appDocRef = computed(() => (APP_ID ? doc(db, 'apps', APP_ID) : null))
  const { data: app } = useDocument<App>(appDocRef)

  // Check if the current user is an admin
  const hasAdmin = computed(
    () => Array.isArray(app.value?.admins) && app.value?.admins.length > 0
  )

  return {
    app,
    hasAdmin,
    ...useAppCreate(APP_ID, PWA_APP_NAME),
    ...useAppUpdate(APP_ID)
  }
}
