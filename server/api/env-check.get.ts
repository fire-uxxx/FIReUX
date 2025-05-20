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
    firebaseApiKey: runtimeConfig.public.firebaseApiKey,
    firebaseAuthDomain: runtimeConfig.public.firebaseAuthDomain,
    firebaseProjectId: runtimeConfig.public.firebaseProjectId,
    firebaseStorageBucket: runtimeConfig.public.firebaseStorageBucket,
    firebaseAppId: runtimeConfig.public.firebaseAppId,
    stripePublishableKey: runtimeConfig.public.stripePublishableKey,
    stripeSecretKey: runtimeConfig.stripeSecretKey,
    appId: runtimeConfig.public.appId,
    domain: runtimeConfig.public.domain,
    pwaAppName: runtimeConfig.public.pwaAppName,
    pwaAppShortName: runtimeConfig.public.pwaAppShortName,
    pwaThemeColor: runtimeConfig.public.pwaThemeColor,
    appName: runtimeConfig.public.appName,
    appIcon: runtimeConfig.public.appIcon,
    pwaBackgroundColor: runtimeConfig.public.pwaBackgroundColor,
    pin: runtimeConfig.public.pin
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
