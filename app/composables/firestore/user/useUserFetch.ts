import { useCollection, useFirestore } from 'vuefire'
import { collection, query, where } from 'firebase/firestore'

export function useUserFetch(): {
  userCollection: Ref<User[] | undefined>
  fetchUser: (id: string) => Ref<User | null | undefined>
} {
  const { firestoreFetchDoc } = useFirestoreFetch()
  const db = useFirestore()
  const config = useRuntimeConfig()
  const appId = config.public.APP_ID

  // Query for users where appId is in the array of appIds
  const colRef = query(
    collection(db, 'users'),
    where('appIds', 'array-contains', appId)
  )
  const { data: userCollection } = useCollection<User>(colRef)

  function fetchUser(id: string): Ref<User | null | undefined> {
    return firestoreFetchDoc<User>('users', id)
  }

  return {
    userCollection,
    fetchUser
  }
}
