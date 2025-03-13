<!-- COMMENT: app/pages/auth.vue -->
<template>
  <div class="page">
    <ClientOnly>
      <MoleculesAuthForm v-if="currentUser" />
    </ClientOnly>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'redirect-if-auth' // ✅ Redirects if already logged in
})
const currentUser = useCurrentUser()
</script>
