export function useApp() {
  const {
    public: { APP_ID }
  } = useRuntimeConfig()
  const { firestoreFetchDoc } = useFirestoreFetch()

  // Fetch the app document from the 'apps' collection by APP_ID.
  const app: Ref<App | null | undefined> = firestoreFetchDoc<App>(
    'apps',
    APP_ID
  )

  return {
    ...useAppCreate(APP_ID),
    ...useAppRead(app),
    ...useAppUpdate(),
    ...(app.value ? useAppDelete(APP_ID, app.value) : {})
  }
}
