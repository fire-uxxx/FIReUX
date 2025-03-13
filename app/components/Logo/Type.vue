<!-- COMMENT: app/components/Logo/Type.vue -->
<template>
  <UContainer>
    <NuxtLink to="/">
      <img
        src="/img/logotype.png"
        alt="FIReUX Logo"
        class="logo"
        :class="logoSizeClass"
      >
    </NuxtLink>
  </UContainer>
</template>

<script setup>

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
