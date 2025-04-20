<template>
  <pre>{{ product }}</pre>
</template>

<script setup lang="ts">

defineProps({
  product: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
/* No styles for now */
</style>