<template>
  <div class="image-settings">
    <UInput
      v-model="local.featuredImage"
      placeholder="Featured Image URL"
      label="Featured Image"
    />
    <UInput
      v-model="local.socialImage"
      placeholder="Social Share Image URL"
      label="Social Image"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { BlogPost } from '@/models/blogPost.model'

const props = defineProps<{ blogPost: BlogPost }>()
const emit = defineEmits<{ (e: 'update:blogPost', value: BlogPost): void }>()

const local = reactive({
  featuredImage: props.blogPost.featuredImage,
  socialImage: props.blogPost.socialImage
})

watch(local, () => {
  emit('update:blogPost', {
    ...props.blogPost,
    featuredImage: local.featuredImage,
    socialImage: local.socialImage
  })
})
</script>

<style scoped>
.image-settings {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
</style>