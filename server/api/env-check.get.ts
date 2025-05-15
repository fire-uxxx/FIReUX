
export default defineEventHandler(() => {
  const isValidEnv = (val: unknown) =>
    typeof val === 'string' && val.trim().length > 0

  const runtimeConfig = useRuntimeConfig()

  const requiredVars = [
    runtimeConfig.public.FIREBASE_API_KEY,
    runtimeConfig.public.FIREBASE_AUTH_DOMAIN,
    runtimeConfig.public.FIREBASE_PROJECT_ID,
    runtimeConfig.public.FIREBASE_STORAGE_BUCKET,
    runtimeConfig.public.FIREBASE_APP_ID,
    runtimeConfig.public.STRIPE_PUBLISHABLE_KEY,
    runtimeConfig.STRIPE_SECRET_KEY,
    runtimeConfig.public.APP_ID,
    runtimeConfig.public.DOMAIN,
    runtimeConfig.public.PWA_APP_NAME,
    runtimeConfig.public.PIN
  ]

  return requiredVars.every(isValidEnv)
})
