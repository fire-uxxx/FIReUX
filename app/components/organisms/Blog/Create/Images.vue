<template>
  <div class="image-settings">
    <input
      type="file"
      accept="image/*"
      @change="handleImageSelection('featuredImage', $event)"
    >
    <input
      type="file"
      accept="image/*"
      @change="handleImageSelection('socialImage', $event)"
    >
  </div>
</template>

<script setup lang="ts">


const props = defineProps<{ blogPost: Partial<BlogPost> }>()
const emit = defineEmits<{
  (e: 'update:blogPost', value: Partial<BlogPost>): void
}>()

function handleImageSelection(
  field: 'featuredImage' | 'socialImage',
  event: Event
) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    emit('update:blogPost', { ...props.blogPost, [field]: file })
  }
}
</script>

<style scoped>
.image-settings {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
</style>
