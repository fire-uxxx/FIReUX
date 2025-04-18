import { doc, updateDoc } from 'firebase/firestore'
import { useFirestore, useCurrentUser } from 'vuefire'
import type { User } from '@/models/user.model'

export function useUserUpdate() {
  const db = useFirestore()
  const currentUser = useCurrentUser()

  // Generic update function that updates the current user's document.
  async function updateUser(updates: Partial<User>): Promise<void> {
    if (!currentUser.value?.uid) {
      throw new Error('No authenticated user found.')
    }
    const userRef = doc(db, 'users', currentUser.value.uid)
    if (!updates || typeof updates !== 'object') {
      throw new Error('Invalid update payload. Must be an object.')
    }
    try {
      await updateDoc(userRef, updates)
      console.log(`✅ User Updated Successfully: ${JSON.stringify(updates)}`)
    } catch (error: unknown) {
      // Use a type guard to safely access error.message if possible.
      const errorMessage =
        error instanceof Error ? error.message : String(error)
      console.error('❌ Error Updating User:', errorMessage)
      throw new Error(errorMessage)
    }
  }
  
  async function populateCurrentUser(): Promise<void> {
    const authUser = currentUser.value
    if (!authUser?.uid) {
      throw new Error('No authenticated user found.')
    }
    const updates: Partial<User> = {}
    if (authUser.email) {
      updates.email = authUser.email
    }
    const display_name = generateDisplayName(
      authUser.email ?? undefined,
      authUser.displayName ?? undefined
    )
    updates.display_name = display_name
    updates.handle = generateHandle(display_name)
    if (authUser.photoURL) {
      updates.avatar = authUser.photoURL
    }
    await updateUser(updates)
    console.log(`✅ populateCurrentUser for user ${authUser.uid}:`, updates)
  }

  // Helper function to update the user's email.
  async function updateEmail(email: string): Promise<void> {
    return updateUser({ email })
  }

  // Helper function to update the user's display name.
  async function updateDisplayName(display_name: string): Promise<void> {
    return updateUser({ display_name })
  }

  // Helper function to update the user's handle.
  async function updateHandle(handle: string): Promise<void> {
    return updateUser({ handle })
  }

  // Helper function to update the user's avatar.
  async function updateAvatar(avatar: string): Promise<void> {
    return updateUser({ avatar })
  }

  // Helper function to update a specific user's document (not necessarily the current user).
  async function updateUserFor(
    user: User,
    updates: Partial<User>
  ): Promise<void> {
    if (!user?.id) {
      throw new Error('Invalid user provided.')
    }
    const userRef = doc(db, 'users', user.id)
    try {
      await updateDoc(userRef, updates)
      console.log(
        `✅ User ${user.id} Updated Successfully: ${JSON.stringify(updates)}`
      )
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error)
      console.error(`❌ Error Updating User ${user.id}:`, errorMessage)
      throw new Error(errorMessage)
    }
  }

  // --- Helper functions for generating default values ---

  function generateDisplayName(email?: string, displayName?: string): string {
    if (displayName?.trim()) return displayName
    if (email?.trim()) return email.split('@')[0] || randomUserId()
    return randomUserId()
  }

  function generateHandle(displayName: string): string {
    return displayName.toLowerCase().replace(/\s+/g, '') || randomUserId()
  }

  function randomUserId(): string {
    return Math.random().toString(36).substring(2, 10)
  }

  return {
    updateUser,
    updateEmail,
    updateDisplayName,
    updateHandle,
    updateAvatar,
    populateCurrentUser,
    updateUserFor,
  }
}
