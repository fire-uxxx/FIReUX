// plugins/firebase.client.ts
import { defineNuxtPlugin } from '#app'
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig().public

  // Initialize Firebase if not already initialized
  let app
  if (!getApps().length) {
    const firebaseConfig = {
      apiKey: config.FIREBASE_API_KEY,
      authDomain: config.FIREBASE_AUTH_DOMAIN,
      projectId: config.FIREBASE_PROJECT_ID,
      storageBucket: config.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID,
      appId: config.FIREBASE_APP_ID,
      measurementId: config.FIREBASE_MEASUREMENT_ID
    }
    app = initializeApp(firebaseConfig)
  } else {
    app = getApp()
  }

  // Initialize Firestore and Auth using the Firebase app
  const db = getFirestore(app)
  const auth = getAuth(app)

  // Reactively track the authentication state and sign in anonymously if needed
  if (import.meta.client) {
    onAuthStateChanged(auth, async user => {
      console.log('Auth state changed.')
      if (!user) {
        console.log('No user signed in. Attempting anonymous sign-in...')
        try {
          await signInAnonymously(auth)
          console.log('Signed in anonymously.')
        } catch (error: unknown) {
          let message = 'Unknown error'
          if (error instanceof Error) {
            message = error.message
          }
          console.error('Error during anonymous sign-in:', message)
        }
      } else {
        console.log(`User is signed in with uid: ${user.uid}`)
      }
    })
  }

  return {
    provide: {
      firebase: {
        db,
        auth
      }
    }
  }
})
