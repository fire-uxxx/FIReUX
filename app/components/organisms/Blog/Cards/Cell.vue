<template>
  <div class="card" @click="navigateToPost">
    <header class="card-header">
      <h3 class="card-title">{{ props.post.title }}</h3>
      <p class="card-meta">{{ props.post.metaDescription }}</p>
    </header>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { defineProps } from 'vue'

const props = defineProps<{ post: BlogPost }>()
const router = useRouter()

function navigateToPost() {
  router.push(`/blog/${props.post.slug}`)
}
</script>

<style scoped>
.card {
  cursor: pointer;
  padding: var(--space-4);
  background: var(--ui-bg-elevated);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s ease;
}

.card:hover {
  transform: scale(1.02);
}

.card-header {
  margin-bottom: var(--space-2);
}

.card-title {
  font-weight: var(--font-weight-semibold);
  font-size: 1.2rem;
  margin-bottom: var(--space-1);
}

.card-meta {
  font-size: 0.875rem;
  color: var(--ui-secondary);
}
</style>
