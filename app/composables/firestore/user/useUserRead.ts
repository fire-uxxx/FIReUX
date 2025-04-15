import { computed } from 'vue'
import { useCurrentUser, useDocument, useFirestore } from 'vuefire'
import { doc } from 'firebase/firestore'
import type { User } from '@/models/user.model'

export function useUserRead() {
  const currentUser = useCurrentUser()
  const db = useFirestore()

  // Create a reactive reference to the user's document
  const userDocRef = computed(() => {
    return currentUser.value ? doc(db, 'users', currentUser.value.uid) : null
  })

  // Retrieve the Firestore document reactively
  const { data: user } = useDocument<User>(userDocRef)

  return { user }
}
