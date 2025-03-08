// composables/firebase/useFirebase.js
import { getApps, initializeApp, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFunctions } from 'firebase/functions'
import { useRuntimeConfig } from '#app'

export function useFirebase() {
  const config = useRuntimeConfig().public

  const app = getApps().length
    ? getApp()
    : initializeApp({
        apiKey: config.FIREBASE_API_KEY,
        authDomain: config.FIREBASE_AUTH_DOMAIN,
        projectId: config.FIREBASE_PROJECT_ID,
        storageBucket: config.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID,
        appId: config.FIREBASE_APP_ID,
        measurementId: config.FIREBASE_MEASUREMENT_ID
      })

  const auth = getAuth(app)
  const storage = getStorage(app)
  const functions = getFunctions(app)

  return {
    auth,
    storage,
    functions
  }
}
