// plugins/firebase.client.js
import { defineNuxtPlugin } from '#app'
import { useFirebase } from '~/composables/firebase/useFirebase'
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth'

export default defineNuxtPlugin(() => {
  const { db, auth, storage, functions } = useFirebase() // ✅ Get services from composable

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
        console.log(`User is signed in with UID: ${user.uid}`)
      }
    })
  }

  return {
    provide: {
      firebase: {
        db,
        auth,
        storage,
        functions
      }
    }
  }
})
