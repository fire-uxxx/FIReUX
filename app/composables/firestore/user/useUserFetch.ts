import { collection, query, where } from 'firebase/firestore'
import { useCollection, useFirestore } from 'vuefire'

export function useUserFetch(): {
  userCollection: Ref<User[] | undefined>
  fetchUserById: (id: string) => Ref<User | null | undefined>
} {
  const db = useFirestore()
  const config = useRuntimeConfig()
  const appId = config.public.APP_ID

  const colRef = query(
    collection(db, 'users'),
    where('appIds', 'array-contains', appId)
  )

  const { data: userCollection } = useCollection<User>(colRef)

  const { firestoreFetchDoc } = useFirestoreFetch()

  function fetchUserById(id: string): Ref<User | null | undefined> {
    return firestoreFetchDoc<User>('users', id)
  }

  return {
    userCollection,
    fetchUserById
  }
}
