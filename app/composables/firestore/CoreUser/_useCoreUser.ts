// ~/composables/useCoreUser.js

import { computed } from 'vue'
import { doc } from 'firebase/firestore'
import { useDocument, useCurrentUser, useFirestore } from 'vuefire'
import type { DocumentReference } from 'firebase/firestore'

export function useCoreUser() {
  const db = useFirestore()
  const currentUser = useCurrentUser()

  const coreUserDocRef = computed<DocumentReference<CoreUser> | null>(() =>
    currentUser.value ? doc(db, 'users', currentUser.value.uid) as DocumentReference<CoreUser> : null
  )

  const { data: coreUser } = useDocument<CoreUser>(coreUserDocRef)

  return {
    coreUser,
    ...useCoreUserEnsure(),
    ...useCoreUserUpdate(),
    ...useCoreUserDelete()
  }
}
