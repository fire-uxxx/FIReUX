import { useDocument, useFirestore } from 'vuefire'
import { doc } from 'firebase/firestore'

export function useUser() {
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

  return {
    user,
    isAdmin,
    ...useUserUpdate(),
    ...useUserDelete(),
    ...useUserCreate(),
    ...useUserFetch()
  }
}
