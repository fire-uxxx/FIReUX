import { computed } from 'vue'
import { doc, collection, query, where } from 'firebase/firestore'
import {
  useFirestore,
  useDocument,
  useCurrentUser,
  useCollection
} from 'vuefire'
import { useRuntimeConfig } from 'nuxt/app'
import type { User } from '~/models/user.model'

export function useUser() {
  const currentUser = useCurrentUser()
  const db = useFirestore()
  const appId = useRuntimeConfig().public.APP_ID

  const userRef = computed(() =>
    currentUser.value ? doc(db, 'users', currentUser.value.uid) : null
  )
  const { data: user } = useDocument < User > userRef

  function fetchUser(id: string) {
    return (
      useDocument < User > computed(() => (id ? doc(db, 'users', id) : null))
    )
  }

  function usersCollection() {
    const q = query(
      collection(db, 'users'),
      where('appIds', 'array-contains', appId)
    )
    return useCollection < User > q
  }

  return {
    ...useUserUpdate(),
    ...useUserDelete(),
    ...useUserCreate(),
    user,
    fetchUser,
    usersCollection,
    errorInfo: null
  }
}
