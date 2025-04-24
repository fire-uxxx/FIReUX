import { computed } from 'vue'
import { useFirebaseAuth, useCurrentUser } from 'vuefire'
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider
} from 'firebase/auth'
import { getFunctions, httpsCallable } from 'firebase/functions'

export function useAuth() {
  const auth = useFirebaseAuth()
  const currentUser = useCurrentUser()
  const {
    public: { APP_ID }
  } = useRuntimeConfig()
  const setUserAppIdClaim = async user => {
    try {
      const functions = getFunctions()
      const setCustomClaims = httpsCallable(functions, 'setAppIdClaim')
      await setCustomClaims({ uid: user.uid, appId: APP_ID })
      await user.getIdToken(true)
    } catch (error) {
      console.error('❌ Failed to set custom claims:', error.message)
    }
  }

  const authState = computed(() =>
    currentUser.value && !currentUser.value.isAnonymous
      ? 'AUTHENTICATED'
      : 'NOT_AUTHENTICATED'
  )

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      await setUserAppIdClaim(result.user)
      console.log('✅ Google Sign-In Success - User:', result.user)
      return result.user // ✅ Ensure user is returned
    } catch (error) {
      console.error('❌ Google Sign-In Failed:', error.message)
    }
  }

  const signInWithEmailPassword = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      await setUserAppIdClaim(result.user)
      console.log('✅ Email Sign-In Success - User:', result.user)
      return result.user
    } catch (error) {
      console.error('❌ Email Sign-In Failed:', error.message)
      return null
    }
  }

  const signUpWithEmailPassword = async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      await setUserAppIdClaim(result.user)
      console.log('✅ Email Sign-Up Success - User:', result.user)
      return result.user
    } catch (error) {
      console.error('❌ Email Sign-Up Failed:', error.message)
      return null
    }
  }

  const signOutUser = async () => {
    try {
      await signOut(auth)
      console.log('✅ Signed out successfully')
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
