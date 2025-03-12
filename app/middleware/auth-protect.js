import { useCurrentUser } from 'vuefire'

export default defineNuxtRouteMiddleware(async () => {
  if (!import.meta.client) return // ✅ Ensure this only runs on the client

  const currentUser = useCurrentUser()

  console.log(
    '[authProtect] 🔥 Middleware executed - Waiting for Firebase auth...'
  )

  // ✅ Wait until Firebase authentication is resolved
  while (!currentUser.value?.uid && currentUser.value === undefined) {
    console.log('[authProtect] ⏳ Waiting for Firebase auth...')
    await new Promise(resolve => setTimeout(resolve, 500)) // ✅ Prevents infinite loop
  }

  console.log(
    '[authProtect] 🔥 Firebase auth resolved - currentUser:',
    currentUser.value
  )

  // ✅ If no user is authenticated, redirect to /auth
  if (!currentUser.value?.uid || currentUser.value.isAnonymous) {
    console.log('[authProtect] ❌ No authenticated user - Redirecting to /auth')
    return await navigateTo('/auth', { replace: true }) // ✅ Ensure URL updates
  }

  console.log('[authProtect] ✅ User authenticated - Access granted')
})
