import { useFirebaseAuth, useCurrentUser } from 'vuefire'
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider
} from 'firebase/auth'
import { useAppUser } from '@/composables/useAppUser' // ✅ Import onboarding logic
import { navigateTo } from '#app'

export function useAuth() {
  const auth = useFirebaseAuth()
  const currentUser = useCurrentUser()
  const { onboardAppUser } = useAppUser() // ✅ Get onboarding function

  // ✅ Auth state is either AUTHENTICATED or NOT_AUTHENTICATED
  const authState = computed(() => {
    return currentUser.value && !currentUser.value.isAnonymous
      ? 'AUTHENTICATED'
      : 'NOT_AUTHENTICATED'
  })

  // ✅ Google Sign-In with Onboarding & Redirect
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)

      console.log('✅ Google Sign-In Success - User:', result.user)

      // ✅ Ensure user is onboarded before redirecting
      await onboardAppUser(result.user.uid)

      console.log('✅ Onboarding Complete - Redirecting to /dashboard')

      return navigateTo('/dashboard', { replace: true }) // ✅ Ensure proper navigation
    } catch (error) {
      console.error('❌ Google Sign-In Failed:', error.message)
      return null // ❌ Return null on failure
    }
  }

  // ✅ Email Sign-In with Success Indicator
  const signInWithEmailPassword = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      return result.user // ✅ Return user object instead of true
    } catch (error) {
      console.error('❌ Email Sign-In Failed:', error.message)
      return null
    }
  }

  // ✅ Email Sign-Up with Success Indicator
  const signUpWithEmailPassword = async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      return result.user // ✅ Return user object instead of true
    } catch (error) {
      console.error('❌ Email Sign-Up Failed:', error.message)
      return null
    }
  }

  // ✅ Sign Out
  const signOutUser = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('❌ Sign-Out Failed:', error.message)
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
