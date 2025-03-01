// plugins/firebase.client.js
import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth'

export default defineNuxtPlugin(() => {
  // Use runtime config
  const config = useRuntimeConfig().public

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

  const db = getFirestore(app)
  const auth = getAuth(app)

  if (import.meta.client) {
    onAuthStateChanged(auth, async user => {
      console.log('Auth state changed.')
      if (!user) {
        console.log('No user signed in. Signing in anonymously...')
        try {
          await signInAnonymously(auth)
          console.log('Signed in anonymously.')
        } catch (error) {
          console.error(
            'Error during anonymous sign-in:',
            error?.message || 'Unknown error'
          )
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
