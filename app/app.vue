<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <UModal
      :open="hasAdmin === false"
      prevent-close
      title="🚫 Blocked"
      description="This app needs to be initialized by an admin."
    >
      <template #body>
        <OrganismsAdminOnBoarding />
      </template>
    </UModal>
  </UApp>
</template>

<script setup>
useHead({
  link: [
    { rel: 'manifest', href: '/manifest.webmanifest' }
  ]
})

const { hasAdmin } = useApp()
</script>

<style scoped></style>
