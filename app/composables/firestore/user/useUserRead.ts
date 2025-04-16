import { computed } from 'vue'
import { useCurrentUser, useDocument, useFirestore } from 'vuefire'
import { doc } from 'firebase/firestore'
import { useRuntimeConfig } from 'nuxt/app'
import type { User } from '@/models/user.model'

export function useUserRead() {
  const currentUser = useCurrentUser()
  const db = useFirestore()
  const {
    public: { APP_ID }
  } = useRuntimeConfig()

  // Create a reactive reference to the user's document.
  const userDocRef = computed(() =>
    currentUser.value ? doc(db, 'users', currentUser.value.uid) : null
  )

  // Retrieve the Firestore document reactively.
  const { data: user } = useDocument<User>(userDocRef)

  // Compute a boolean that checks whether the current user is admin
  // by verifying if their `adminAppIds` array includes the runtime APP_ID.
  const isAdmin = computed(() => {
    return Boolean(user.value?.adminAppIds?.includes(APP_ID))
  })

  return { user, isAdmin }
}
