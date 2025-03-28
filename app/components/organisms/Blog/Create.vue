<template>
  <UCard>
    <form class="blog-create-form" @submit.prevent="handleSubmit">
      <!-- Title Input -->
      <div class="form-group">
        <label for="title">Title</label>
        <UInput id="title" v-model="title" placeholder="Enter the blog title" required />
      </div>

      <!-- Content Input -->
      <div class="form-group">
        <label for="content">Content</label>
        <UTextarea id="content" v-model="content" :rows="6" placeholder="Write your blog content here..." required />
      </div>

      <!-- Meta Description Input -->
      <div class="form-group">
        <label for="metaDescription">Meta Description</label>
        <UInput id="metaDescription" v-model="metaDescription" placeholder="Add a short meta description" />
      </div>

      <!-- Featured Image URL Input -->
      <div class="form-group">
        <label for="featuredImage">Featured Image URL</label>
        <UInput id="featuredImage" v-model="featuredImage" placeholder="Enter the URL for the featured image" />
      </div>

      <!-- Social Image URL Input -->
      <div class="form-group">
        <label for="socialImage">Social Image URL</label>
        <UInput id="socialImage" v-model="socialImage" placeholder="Enter the URL for the social image" />
      </div>

      <!-- Submit Button -->
      <UButton type="submit" color="primary">Create Blog Post</UButton>
    </form>
  </UCard>
</template>

<script setup>
const { createBlogPost } = useBlogPosts()

const title = ref('')
const content = ref('')
const metaDescription = ref('')
const featuredImage = ref('')
const socialImage = ref('')

const slug = computed(() => {
  return title.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
})

const handleSubmit = async () => {
  try {
    const blogData = {
      title: title.value,
      content: content.value,
      slug: slug.value,
      metaDescription: metaDescription.value,
      featuredImage: featuredImage.value,
      socialImage: socialImage.value
    }

    await createBlogPost(blogData)

    title.value = ''
    content.value = ''
    metaDescription.value = ''
    featuredImage.value = ''
    socialImage.value = ''
  } catch (error) {
    console.error('Failed to create blog post:', error)
  }
}
</script>

<style scoped>
.blog-create-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  padding: 0.5rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-s);
  font-size: 1rem;
}
</style>