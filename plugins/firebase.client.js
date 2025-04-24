import { defineNuxtPlugin } from '#app'
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth'

export default defineNuxtPlugin(() => {
  const {
    public: {
      FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID,
      FIREBASE_MEASUREMENT_ID
    }
  } = useRuntimeConfig()

  // ✅ Ensure only one Firebase app instance is initialized
  let app = getApps().length
    ? getApp()
    : initializeApp({
        apiKey: FIREBASE_API_KEY,
        authDomain: FIREBASE_AUTH_DOMAIN,
        projectId: FIREBASE_PROJECT_ID,
        storageBucket: FIREBASE_STORAGE_BUCKET,
        messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
        appId: FIREBASE_APP_ID,
        measurementId: FIREBASE_MEASUREMENT_ID
      })

  // ✅ Initialize Firebase Authentication
  const auth = getAuth(app)

  // ✅ Ensure anonymous sign-in if no user is logged in
  if (import.meta.client) {
    onAuthStateChanged(auth, async user => {
      if (!user) {
        try {
          await signInAnonymously(auth)
          console.log('✅ Signed in anonymously.')
        } catch (error) {
          console.error(
            '❌ Anonymous sign-in failed:',
            error?.message || 'Unknown error'
          )
        }
      }
    })
  }
})
