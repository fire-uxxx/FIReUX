<template>
  <ClientOnly>
    <UApp>
      <pre>Firestore User: {{ user }} end</pre>
      <div class="actions">
        <UButton @click="createUser()" variant="soft" color="primary">
          Create User
        </UButton>
        <UButton @click="onboardUser()" variant="soft" color="info">
          Onboard User
        </UButton>
        <UButton @click="updateUser({ display_name: 'Test Updated' })" variant="soft" color="warning">
          Update User Info
        </UButton>
        <UButton @click="deleteUser" variant="soft" color="neutral">
          Delete User
        </UButton>
      </div>
    </UApp>
  </ClientOnly>
</template>

<script setup lang="ts">
const { user, createUser, onboardUser, updateUser, deleteUser } = useUser()
</script>