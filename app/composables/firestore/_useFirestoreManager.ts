// ~/composables/useFirestoreManager.ts

import { useCurrentUser } from 'vuefire'

export function useFirestoreManager() {
  const currentUser = useCurrentUser()

  async function waitForCurrentUser() {
    while (!currentUser.value) {
      await new Promise(resolve => setTimeout(resolve, 50))
    }
    return currentUser.value
  }

  return {
    waitForCurrentUser,
    ...useFirestoreRead(),
    ...useFirestoreCreate(),
    ...useFirestoreUpdate(),
    ...useFirestoreDelete(),
    ...useFirestoreUtils()
  }
}
