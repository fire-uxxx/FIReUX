<template>
  <div class="page">
    <h1>Blog</h1>
    <p>Welcome to our blog. Stay tuned for updates!</p>
    <OrganismsBlogList :posts="posts" />
  </div>
</template>

<script setup>
const { blogPostsCollection } = useBlogPosts()

// Fetching blog posts using the composable
const posts = blogPostsCollection()
</script>

<style scoped>
  .page {
    gap: var(--space-3);
  }
@media (min-width: 768px) {
  .page {
    gap: var(--space-20);
    max-width: 900px
  }
}
</style>