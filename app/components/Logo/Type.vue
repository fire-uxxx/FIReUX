<template>
  <div class="logo-container">
    <NuxtLink to="/">
      <img
        src="/img/logotype.png"
        alt="FIReUX Logo"
        class="logo"
        :class="logoSizeClass"
      >
    </NuxtLink>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'medium',
    validator: value => ['small', 'medium', 'large', 'hero'].includes(value) // ✅ Added x-large
  }
})

// Compute class based on size
const logoSizeClass = computed(() => ({
  'h-8': props.size === 'small',
  'h-12': props.size === 'medium',
  'h-16': props.size === 'large',
  'h-20 mt-8 mb-8': props.size === 'hero' // ✅ New size with spacing
}))
</script>

<style scoped>
.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-2);
}

.logo {
  filter: var(--shadow);
}
</style>