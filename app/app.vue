<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <UModal
      :open="isInitialised === false"
      prevent-close
      title="🚫 Blocked"
      description="This app needs to be initialized."
    >
      <template #body>
        <OrganismsAppOnboarding />
      </template>
    </UModal>
  </UApp>
</template>

<script setup>
useHead({
  link: [{ rel: 'manifest', href: '/manifest.webmanifest' }]
})

const { isInitialised } = useApp()
</script>

<style scoped>
/* No debug styles needed */
</style>