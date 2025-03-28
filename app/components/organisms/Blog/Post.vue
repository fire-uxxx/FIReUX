<template>
  <NuxtLink v-if="post && post.content" :to="`/blog/${post.slug}`" style="text-decoration: none; color: inherit;">
    <UCard style="text-align: left;">
      <!-- Header container with text and image -->
      <div class="header-container">
        <div class="header-text">
          <div class="post-title">{{ post.title }}</div>
          <div class="reading-time">{{ post.readingTime.replace(' min', '') }} read</div>
        </div>
        <div v-if="post.featuredImage" class="header-image">
          <img :src="post.featuredImage" alt="Featured Image" class="tiny-img">
        </div>
      </div>
      
      <!-- Post content -->
      <div>
        <span>{{ truncateContent(post.content) }}</span>
      </div>
    </UCard>
  </NuxtLink>
  
  <p v-else>Loading...</p>
</template>

<script setup>
defineProps({
  post: {
    type: Object,
    default: () => ({})
  }
})

// Method to truncate content to the first paragraph, and truncate if over 250 characters
const truncateContent = content => {
  if (content) {
    const paragraphs = content.split(/\n\s*\n/);
    const firstParagraph = paragraphs[0];
    if (firstParagraph.length > 250) {
      return firstParagraph.slice(0, 250) + '...'
    }
    return firstParagraph
  }
  return content
}
</script>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--space-1);
}

.header-text {
  flex: 1;
  margin-right: var(--space-2);
}

.header-image {
  flex-shrink: 0;
  width: 30px; /* Fixed width for the image container */
  display: flex;
  align-items: center;
  justify-content: center;
}

.tiny-img {
  height: 15px;
  width: auto;
  object-fit: cover;
}

.reading-time {
  font-size: 0.75rem;
  color: var(--ui-primary);
  margin-bottom: var(--space-0-5);
}

.post-title {
  font-weight: 600;
  font-size: 1.2rem;
  margin-bottom: var(--space-0-5);
}
</style>