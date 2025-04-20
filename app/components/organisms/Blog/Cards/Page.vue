<template>
  <pre>{{ post }}</pre>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  post: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
/* No styles for now */
</style>
