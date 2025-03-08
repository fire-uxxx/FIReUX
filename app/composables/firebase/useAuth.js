import { useFirebaseAuth, useCurrentUser } from 'vuefire'
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider
} from 'firebase/auth'

export function useAuth() {
  const auth = useFirebaseAuth()
  const currentUser = useCurrentUser()

  // Auth state is either AUTHENTICATED or NOT_AUTHENTICATED
  const authState = computed(() => {
    return currentUser.value && !currentUser.value.isAnonymous
      ? 'AUTHENTICATED'
      : 'NOT_AUTHENTICATED'
  })

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.error('Google Sign-In Failed:', error.message)
    }
  }

  // Sign in with Email & Password
  const signInWithEmailPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error('Email Sign-In Failed:', error.message)
    }
  }

  // Sign up with Email & Password
  const signUpWithEmailPassword = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error('Email Sign-Up Failed:', error.message)
    }
  }

  // Sign Out
  const signOutUser = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Sign-Out Failed:', error.message)
    }
  }

  return {
    currentUser,
    authState,
    signInWithGoogle,
    signInWithEmailPassword,
    signUpWithEmailPassword,
    signOutUser
  }
}
