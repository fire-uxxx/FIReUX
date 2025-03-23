<template>
  <UContainer class="widget">
    <ClientOnly>
      <OrganismsAuthAuthenticated v-if="authState === 'AUTHENTICATED'" />
      <div v-else>
        <OrganismsAuthGoogle />
        <OrganismsAuthEmail />
      </div>
    </ClientOnly>
  </UContainer>
</template>

<script setup>
const { authState } = useAuth()
</script>

<style scoped>
.widget {
  padding: var(--space-12);
  border: 1px solid var(--ui-primary);
  border-radius: var(--radius-xl);
  background-color: var(--ui-bg);
}
</style>