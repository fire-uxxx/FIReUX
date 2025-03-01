<template>
  <UApp>
    <UButton>Firebase Works!</UButton>
    <div v-if="apps">
      <pre>{{ apps }}</pre>
    </div>
  </UApp>
</template>

<script setup>
const apps = useVuefireCollection('apps')
</script>