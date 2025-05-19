import { computed } from 'vue'
import { doc } from 'firebase/firestore'
import { useFirestore, useDocument, useCurrentUser } from 'vuefire'
import type { DocumentReference } from 'firebase/firestore'

export function useAppUser() {
  const db = useFirestore()
  const currentUser = useCurrentUser()
  const {
    public: { appId }
  } = useRuntimeConfig()

  const appUserDocRef = computed<DocumentReference<AppUserProfile> | null>(() =>
    currentUser.value && appId
      ? (doc(
          db,
          `users/${currentUser.value.uid}/apps/${appId}`
        ) as DocumentReference<AppUserProfile>)
      : null
  )

  const { data: appUser } = useDocument<AppUserProfile>(appUserDocRef)

  const isAdmin = computed(() => appUser.value?.role === 'admin')

  return {
    appUser,
    isAdmin,
    ...useAppUserUtils(),
    ...useAppUserEnsure(),
    ...useAppUserUpdate()
  }
}
