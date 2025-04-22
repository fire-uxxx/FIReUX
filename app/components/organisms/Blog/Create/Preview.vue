<template>
  <div class="preview">
    <h2>{{ blogPost.title }}</h2>
    <p v-if="blogPost.author">
      <em
        >By {{ blogPost.author.display_name }} • {{ blogPost.readingTime }}</em
      >
    </p>
    <div v-if="blogPost.featuredImage" class="preview-image">
      <img :src="blogPost.featuredImage" alt="Featured" >
    </div>
    <div class="preview-content">
      <p v-for="(paragraph, index) in parsedContent" :key="index">
        {{ paragraph }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BlogPost } from '@/models/blogPost.model'

const props = defineProps<{ blogPost: Partial<BlogPost> }>()

const parsedContent = computed(() => {
  return props.blogPost.content?.split('\n').filter(Boolean) || []
})
</script>

<style scoped>
.preview {
  border: 1px solid var(--ui-border);
  padding: var(--space-6);
  border-radius: var(--radius-md);
  background: var(--ui-bg-elevated);
}
.preview-image img {
  max-width: 100%;
  border-radius: var(--radius-sm);
  margin-bottom: var(--space-4);
}
.preview-content {
  line-height: 1.6;
}
</style>
