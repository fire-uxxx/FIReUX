import { useCurrentUser } from 'vuefire'

export default defineNuxtRouteMiddleware(async () => {
  if (!import.meta.client) return // ✅ Ensure this only runs on the client

  const currentUser = useCurrentUser()

  console.log(
    '[isAuthWare] 🔥 Middleware executed - Waiting for Firebase auth...'
  )

  // ✅ Wait until Firebase authentication is resolved
  while (!currentUser.value?.uid && currentUser.value === undefined) {
    console.log('[isAuthWare] ⏳ Waiting for Firebase auth...')
    await new Promise(resolve => setTimeout(resolve, 500)) // ✅ Prevents infinite loop
  }

  console.log(
    '[isAuthWare] 🔥 Firebase auth resolved - currentUser:',
    currentUser.value
  )

  // ✅ Redirect if authenticated & not anonymous
  if (currentUser.value?.uid && !currentUser.value.isAnonymous) {
    console.log(
      '[isAuthWare] ✅ Authenticated & not anonymous - Redirecting to /dashboard'
    )
    return await navigateTo('/dashboard', { replace: true }) // ✅ Ensure URL updates
  }

  console.log(
    '[isAuthWare] ❌ User is not authenticated or is anonymous - Staying on current page'
  )
})
