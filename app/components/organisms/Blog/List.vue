<template>
  <div class="blog-list">
    <OrganismsBlogCardsArticle
      v-for="post in articlePosts"
      :key="post.slug + '-article'"
      :post="post"
    />
    <OrganismsBlogCardsProduct
      v-for="post in productPosts"
      :key="post.slug + '-product'"
      :post="post"
    />
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{ posts: BlogPost[] }>()
const articlePosts = computed(() =>
  props.posts.filter(post => post.type === 'article')
)
const productPosts = computed(() =>
  props.posts.filter(post => post.type === 'product')
)
</script>
<style>
.blog-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.blog-card-link {
  text-decoration: none;
  color: inherit;
}

.blog-card {
  text-align: left;
  padding: var(--space-4);
  background: var(--ui-bg-elevated);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

.blog-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--space-2);
}

.blog-card-text {
  flex: 1;
  margin-right: var(--space-2);
}

.blog-card-title {
  font-weight: var(--font-weight-semibold);
  font-size: 1.2rem;
  margin-bottom: var(--space-1);
}

.blog-card-reading-time {
  font-size: 0.75rem;
  color: var(--ui-primary);
}

.blog-card-image {
  flex-shrink: 0;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.blog-card-thumbnail {
  height: 15px;
  width: auto;
  object-fit: cover;
}

.blog-card-content {
  font-size: 0.875rem;
  color: var(--ui-secondary);
}
</style>
