import { doc, collection } from 'firebase/firestore'
import {
  useCurrentUser,
  useFirestore,
  useDocument,
  useCollection,
} from 'vuefire'

export function useUser() {
  const currentUser = useCurrentUser()
  const db = useFirestore()
  const errorInfo = null

  const userRef = computed(() =>
    currentUser.value ? doc(db, 'users', currentUser.value.uid) : null
  )
  const { data: user } = useDocument(userRef)

  function fetchUser(id) {
    return useDocument(computed(() => (id ? doc(db, 'users', id) : null)))
  }

  function usersCollection() {
    return useCollection(collection(db, 'users'))
  }

  return {
    ...useUserUpdate(),
    ...useUserDelete(),
    ...useUserCreate(),
    user,
    fetchUser,
    usersCollection,
    errorInfo
  }
}