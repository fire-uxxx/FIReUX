<template>
  <div class="blog-list">
    <OrganismsBlogCardsCell
      v-for="post in posts"
      :key="post.slug"
      :post="post"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{ posts: BlogPost[] }>()
</script>

<style>
.blog-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
</style>
