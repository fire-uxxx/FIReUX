<!-- COMMENT: app/pages/dashboard.vue -->
<template>
  <UContainer class="dashboard-container">
    <ClientOnly>
      <template #fallback>
        <p>Loading dashboard...</p> <!-- ✅ Prevents hydration mismatches -->
      </template>

      <template v-if="authState === 'AUTHENTICATED'">
        <h1>Welcome to your Dashboard</h1>
        <UButton @click="handleSignOut" block>Sign Out</UButton>
      </template>

      <template v-else>
        <p>Loading...</p> <!-- ✅ Prevents flickering -->
      </template>
    </ClientOnly>
  </UContainer>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth-protect' // ✅ Protects the dashboard
})
const { signOutUser, authState } = useAuth()
const router = useRouter()

// ✅ Handle sign-out
const handleSignOut = async () => {
  await signOutUser()
  router.push('/auth')
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--space-4);
}
</style>