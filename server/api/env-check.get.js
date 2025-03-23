export default defineEventHandler(() => {
  const isValidEnv = (val) => typeof val === 'string' && val.trim().length > 0

  return {
    GOOGLE_APPLICATION_CREDENTIALS: {
      present: isValidEnv(process.env.GOOGLE_APPLICATION_CREDENTIALS),
      docs: 'https://fireux.app/getting-started#google-application-credentials'
    },
    FIREBASE_API_KEY: {
      present: isValidEnv(process.env.FIREBASE_API_KEY),
      docs: 'https://fireux.app/getting-started#firebase-api-key'
    },
    FIREBASE_AUTH_DOMAIN: {
      present: isValidEnv(process.env.FIREBASE_AUTH_DOMAIN),
      docs: 'https://fireux.app/getting-started#firebase-auth-domain'
    },
    FIREBASE_PROJECT_ID: {
      present: isValidEnv(process.env.FIREBASE_PROJECT_ID),
      docs: 'https://fireux.app/getting-started#firebase-project-id'
    },
    FIREBASE_STORAGE_BUCKET: {
      present: isValidEnv(process.env.FIREBASE_STORAGE_BUCKET),
      docs: 'https://fireux.app/getting-started#firebase-storage-bucket'
    },
    FIREBASE_MESSAGING_SENDER_ID: {
      present: isValidEnv(process.env.FIREBASE_MESSAGING_SENDER_ID),
      docs: 'https://fireux.app/getting-started#firebase-messaging-sender-id'
    },
    FIREBASE_APP_ID: {
      present: isValidEnv(process.env.FIREBASE_APP_ID),
      docs: 'https://fireux.app/getting-started#firebase-app-id'
    },
    FIREBASE_MEASUREMENT_ID: {
      present: isValidEnv(process.env.FIREBASE_MEASUREMENT_ID),
      docs: 'https://fireux.app/getting-started#firebase-measurement-id'
    },
    STRIPE_PUBLISHABLE_KEY: {
      present: isValidEnv(process.env.STRIPE_PUBLISHABLE_KEY),
      docs: 'https://fireux.app/getting-started#stripe-publishable-key'
    },
    STRIPE_SECRET_KEY: {
      present: isValidEnv(process.env.STRIPE_SECRET_KEY),
      docs: 'https://fireux.app/getting-started#stripe-secret-key'
    },
    APP_ID: {
      present: isValidEnv(process.env.APP_ID),
      docs: 'https://fireux.app/getting-started#app-id'
    },
    DOMAIN: {
      present: isValidEnv(process.env.DOMAIN),
      docs: 'https://fireux.app/getting-started#domain'
    },
    PROJECT_NAME: {
      present: isValidEnv(process.env.PROJECT_NAME),
      docs: 'https://fireux.app/getting-started#project-name'
    },
    AUTHOR_NAME: {
      present: isValidEnv(process.env.AUTHOR_NAME),
      docs: 'https://fireux.app/getting-started#author-name'
    },
    PWA_APP_NAME: {
      present: isValidEnv(process.env.PWA_APP_NAME),
      docs: 'https://fireux.app/getting-started#pwa-app-name'
    },
    PWA_APP_SHORT_NAME: {
      present: isValidEnv(process.env.PWA_APP_SHORT_NAME),
      docs: 'https://fireux.app/getting-started#pwa-app-short-name'
    },
    PWA_THEME_COLOR: {
      present: isValidEnv(process.env.PWA_THEME_COLOR),
      docs: 'https://fireux.app/getting-started#pwa-theme-color'
    },
    PWA_BACKGROUND_COLOR: {
      present: isValidEnv(process.env.PWA_BACKGROUND_COLOR),
      docs: 'https://fireux.app/getting-started#pwa-background-color'
    },
    PIN: {
      present: isValidEnv(process.env.PIN),
      docs: 'https://fireux.app/getting-started#pin'
    }
  }
})
