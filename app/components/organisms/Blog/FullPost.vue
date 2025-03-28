<template>
  <div class="full-post-container">
    <img
      v-if="post.featuredImage"
      :src="post.featuredImage"
      alt="Featured Image"
      class="featured-image"
    />
    <h1 class="post-title">{{ post.title }}</h1>
    <p class="reading-time">{{ post.readingTime }} min read</p>
    <div class="post-content" v-html="post.content"></div>
    <div class="cta-container" v-if="post.cta_link">
      <NuxtLink :to="post.cta_link" class="cta-button">Explore More</NuxtLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
  post: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.full-post-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: left;
}

.featured-image {
  width: 100%;
  height: auto;
  margin-bottom: 20px;
}

.post-title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--ui-text-dark);
}

.reading-time {
  font-size: 0.9rem;
  color: var(--ui-text-muted);
  margin-bottom: 20px;
}

.post-content {
  font-size: 1rem;
  color: var(--ui-text-muted);
  line-height: 1.6;
  margin-bottom: 20px;
}

.cta-container {
  text-align: center;
}

.cta-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: var(--ui-primary);
  color: white;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.cta-button:hover {
  background-color: var(--ui-primary-dark);
}
</style>