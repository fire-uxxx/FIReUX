export async function useApp() {
  const nuxtApp = useNuxtApp() // Ensure we are in a valid Nuxt context
  if (!nuxtApp) {
    throw new Error('useApp must be called within a Nuxt context.')
  }

  const {
    public: { APP_ID }
  } = useRuntimeConfig()
  const { firestoreFetchDoc } = useFirestoreFetch()

  // Fetch the app document from the 'apps' collection by APP_ID.
  const app: Ref<App | null | undefined> = await firestoreFetchDoc<App>(
    'apps',
    APP_ID
  )

  return {
    ...useAppCreate(APP_ID)(), // Defer execution of useAppCreate
    ...useAppRead(app),
    ...useAppUpdate(),
    ...(app.value ? useAppDelete(APP_ID, app.value) : {})
  }
}
