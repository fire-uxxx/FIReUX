import { computed } from 'vue'
import { doc } from 'firebase/firestore'
import { useFirestore, useDocument, useCurrentUser } from 'vuefire'
import type { DocumentReference } from 'firebase/firestore'

export function useAppUser() {
  const db = useFirestore()
  const currentUser = useCurrentUser()
  const { public: { APP_ID } } = useRuntimeConfig()

  const appUserDocRef = computed<DocumentReference<AppUserProfile> | null>(() =>
    currentUser.value && APP_ID
      ? doc(db, `users/${currentUser.value.uid}/apps/${APP_ID}`) as DocumentReference<AppUserProfile>
      : null
  )

  const { data: appUser } = useDocument<AppUserProfile>(appUserDocRef)

  return {
    appUser,
    ...useAppUserUtils(),
    ...useAppUserEnsure()
  }
}
