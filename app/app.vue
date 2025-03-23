<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup>
useHead({
  link: [
    { rel: 'manifest', href: '/manifest.webmanifest' }
  ]
})

</script>

<style scoped></style>
