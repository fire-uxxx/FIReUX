<template>
  <div class="logo-container">
    <NuxtLink to="/">
      <img src="/img/logo.png" alt="FIReUX Logo" class="logo" :class="logoSizeClass" />
    </NuxtLink>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'medium', // Default size
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  }
})

// Compute class based on size
const logoSizeClass = computed(() => `logo-${props.size}`)
</script>

<style scoped>
.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-s);
}

.logo {
  max-width: 100%;
  object-fit: contain;
  filter: var(--shadow); /* Adjust for theme */
}

/* Size Variants */
.logo-small {
  height: 30px;
}

.logo-medium {
  height: 50px;
}

.logo-large {
  height: 80px;
}
</style>