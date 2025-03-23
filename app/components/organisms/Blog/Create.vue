<template>
  <UContainer class="widget">
    <UForm :state="post" class="form" @submit="savePost">
      <UInput v-model="post.title" placeholder="Post Title" />
      <UTextarea v-model="post.content" placeholder="Write your post..." />
      <UButton type="submit">Post</UButton>
    </UForm>
  </UContainer>
</template>

<script setup>
import { usePost } from '~/composables/firestore/documents/Blog/useBlogPosts'

const { post, savePost } = usePost()
</script>

<style scoped>
.widget {
  padding: var(--space-12);
  border: 1px dashed var(--ui-primary);
  border-radius: var(--radius-xl);
  background-color: var(--ui-bg);
}
</style>
