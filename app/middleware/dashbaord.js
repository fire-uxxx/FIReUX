export default defineNuxtRouteMiddleware((to, from) => {
  const user = useCurrentUser()
  if (to.path === '/dashboard' && !user.value) {
    console.log('Redirecting user from', from.path, 'to /auth')
    return navigateTo('/auth')
  }
})
