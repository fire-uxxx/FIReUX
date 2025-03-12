<template>
  <div class="loading-container">
    <ULoader size="lg" />
    <p class="loading-message">{{ message }}</p>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: 'Loading...'
  }
})
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  width: 100%;
  padding: var(--space-6);
}

.loading-message {
  margin-top: var(--space-4);
  font-size: var(--font-size-m);
  color: var(--ui-text-muted);
}
</style>