<template>
  <UCard class="card" variant="outline" @click="navigateToPost">
    <template #header>
      <h3>{{ post.title }}</h3>
    </template>
    <template #body>
      <p>{{ post.metaDescription }}</p>
      <img :src="post.featuredImage" :alt="post.title" />
    </template>
    <template #footer>
      <p>Written by {{ post.author.display_name }}</p>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { BlogPost } from '@/models/blogPost.model'

defineProps<{ post: BlogPost }>()

function navigateToPost() {
  // Logic to navigate to the blog post
}
</script>

<style scoped>
.card {
  @use '@/assets/design-system/components/card.scss' as *;
}
</style>
