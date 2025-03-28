<template>
  <div v-if="posts && posts.length > 0">
    <div v-for="post in posts" :key="post.id">
      <div class="post-item">
        <OrganismsBlogPost :post="post" />
      </div>
    </div>
  </div>
  <p v-else>No posts available.</p>
</template>

<script setup>
// Accepting posts as a prop from the parent component
defineProps({
  posts: {
    type: Array,
    default: () => [] // Default value for posts
  }
})
</script>

<style scoped>
.post-item {
  margin-inline: var(--space-1); 
  margin-bottom: var(--space-3);
}
</style>