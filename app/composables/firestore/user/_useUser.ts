import { collection, query, where, doc } from 'firebase/firestore'
import { useCollection, useDocument, useFirestore } from 'vuefire'

export function useUser(): {
  user: Ref<User | null | undefined>
  isAdmin: Ref<boolean>
  userCollection: Ref<User[] | undefined>
  fetchUserById: (id: string) => Ref<User | null | undefined>
} {
  const currentUser = useCurrentUser()
  const db = useFirestore()
  const {
    public: { APP_ID }
  } = useRuntimeConfig()

  const userDocRef = computed(() =>
    currentUser.value ? doc(db, 'users', currentUser.value.uid) : null
  )

  const { data: user } = useDocument<User>(userDocRef)

  const isAdmin = computed(() => {
    return Boolean(user.value?.adminAppIds?.includes(APP_ID))
  })

  const colRef = query(
    collection(db, 'users'),
    where('appIds', 'array-contains', APP_ID)
  )

  const { data: userCollection } = useCollection<User>(colRef, {
    ssrKey: 'users'
  })

  function fetchUserById(id: string): Ref<User | null | undefined> {
    const userDocRef = doc(db, 'users', id)
    const { data } = useDocument<User>(userDocRef)
    return data
  }

  return {
    user,
    isAdmin,
    userCollection,
    fetchUserById
  }
}
