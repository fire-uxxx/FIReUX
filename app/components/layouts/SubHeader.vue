<template>
  <div class="subheader">
    <UIcon :name="icon" class="subheader-icon" />
    <h2 class="subheader-title">{{ title }}</h2>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: 'i-lucide-info'
  }
})
</script>

<style scoped>
.subheader {
  height: var(--header-height);
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0 var(--space-4);
  border-bottom: 1px solid var(--border);
  background-color: var(--background);
}

.subheader-icon {
  font-size: 1.2rem;
  color: var(--primary);
}

.subheader-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
}
</style>
