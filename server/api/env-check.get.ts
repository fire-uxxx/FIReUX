export default defineEventHandler(() => {
  const isValidEnv = (val: unknown): boolean =>
    typeof val === 'string' && val.trim().length > 0

  const runtimeConfig = useRuntimeConfig()

  if (!runtimeConfig?.public) {
    return {
      isValid: false,
      requiredVars: {},
      missingVars: ['runtimeConfig.public is missing']
    }
  }

  const requiredVars = {
    FIREBASE_API_KEY: runtimeConfig.public.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: runtimeConfig.public.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: runtimeConfig.public.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: runtimeConfig.public.FIREBASE_STORAGE_BUCKET,
    FIREBASE_APP_ID: runtimeConfig.public.FIREBASE_APP_ID,
    STRIPE_PUBLISHABLE_KEY: runtimeConfig.public.STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: runtimeConfig.STRIPE_SECRET_KEY,
    APP_ID: runtimeConfig.public.APP_ID,
    DOMAIN: runtimeConfig.public.DOMAIN,
    PWA_APP_NAME: runtimeConfig.public.PWA_APP_NAME,
    PIN: runtimeConfig.public.PIN
  }

  const missingVars = Object.entries(requiredVars)
    .filter(([_, value]) => !isValidEnv(value))
    .map(([key]) => key)

  return {
    isValid: missingVars.length === 0,
    requiredVars,
    missingVars
  }
})
