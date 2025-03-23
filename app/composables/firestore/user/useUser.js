import { doc, collection, query, where, onSnapshot } from 'firebase/firestore'
import {
  useCurrentUser,
  useFirestore,
  useDocument,
  useCollection
} from 'vuefire'
import { ref } from 'vue'

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

  async function onboardUser() {
    const { createUser } = useUserCreate()
    const hasAdmin = useAdminPresence()

    if (!user.value) {
      const newUserData = {
        ...currentUser.value,
        isAdmin: !hasAdmin.value // Auto-assign admin if no admins exist
      }

      console.log('[onboardUser] User does not exist, creating...')
      await createUser(newUserData)
    }

    console.log('[onboardUser] ✅ Onboarding complete - Redirecting...')
    return navigateTo('/dashboard', { replace: true }) // ✅ Auto-redirect
  }

  function useAdminPresence() {
    const hasAdmin = ref(true)

    const adminQuery = query(
      collection(db, 'users'),
      where('isAdmin', '==', true)
    )

    onSnapshot(adminQuery, (snapshot) => {
      hasAdmin.value = !snapshot.empty
    })

    return hasAdmin
  }

  return {
    ...useUserUpdate(),
    ...useUserDelete(),
    ...useUserCreate(),
    user,
    fetchUser,
    usersCollection,
    onboardUser,
    useAdminPresence,
    errorInfo
  }
}
