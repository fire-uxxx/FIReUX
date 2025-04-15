<template>
  <ClientOnly>
    <UApp>
      <pre v-if="currentUser">Auth User: {{ currentUser }} end</pre>
      <pre>Firestore User: {{ user }} end</pre>
      <div class="actions">
        <UButton @click="handleCreateUser" variant="soft" color="primary">
          Create User
        </UButton>
        <UButton @click="handleOnboardUser" variant="soft" color="info">
          Onboard User
        </UButton>
        <UButton @click="handleUpdateUser" variant="soft" color="warning">
          Update User Info
        </UButton>
        <UButton @click="handleDeleteUser" variant="soft" color="neutral">
          Delete User
        </UButton>
      </div>
    </UApp>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useHead, navigateTo } from 'nuxt/app'
import { useCurrentUser } from 'vuefire'
import { useUser } from '@/composables/user/useUser'
import { useUserCreate } from '@/composables/user/useUserCreate'
import { useUserUpdate } from '@/composables/user/useUserUpdate'
import { useUserDelete } from '@/composables/user/useUserDelete'

useHead({
  link: [{ rel: 'manifest', href: '/manifest.webmanifest' }]
})

// Retrieve current authentication user.
const currentUser = useCurrentUser()
// Retrieve reactive Firestore user data and other user functions.
const { user } = useUser()
// Retrieve individual functions.
const { createUser, onboardUser } = useUserCreate()
const { updateUser } = useUserUpdate()
const { deleteUser } = useUserDelete()

async function handleCreateUser() {
  try {
    const success = await createUser()
    console.log('User creation success:', success)
  } catch (error) {
    console.error('Error creating user:', error)
  }
}

async function handleOnboardUser() {
  try {
    if (currentUser.value) {
      await onboardUser(currentUser.value.uid)
      console.log('User onboarded successfully.')
    }
  } catch (error) {
    console.error('Error onboarding user:', error)
  }
}

async function handleUpdateUser() {
  try {
    // Example: update the user's display name.
    await updateUser({ display_name: 'Test Updated' })
    console.log('User updated successfully.')
  } catch (error) {
    console.error('Error updating user:', error)
  }
}

async function handleDeleteUser() {
  try {
    await deleteUser()
    console.log('User deleted successfully.')
  } catch (error) {
    console.error('Error deleting user:', error)
  }
}
</script>