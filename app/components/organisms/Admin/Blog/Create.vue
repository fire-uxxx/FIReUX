<template>
  <div class="blog-create-form">
    <div class="form-group">
      <label for="title">Title</label>
      <UInput id="title" v-model="title" required />
    </div>

    <div class="form-group">
      <label for="content">Content</label>
      <UTextarea id="content" v-model="content" rows="6" required />
    </div>

    <div class="form-group">
      <label for="metaDescription">Meta Description</label>
      <UInput id="metaDescription" v-model="metaDescription" />
    </div>

    <UButton @click="handleSubmit" type="button" color="primary">Create Blog Post</UButton>
  </div>
</template>

<script setup>
const { createBlogPost } = useBlogPostCreate()

// Set default values for testing
const title = ref('')
const content = ref('')
const metaDescription = ref('')

const slug = computed(() => {
  return title.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
})

const handleSubmit = async () => {
  try {
    console.log('Submitting blog post with the following data:')
    console.log('Title:', title.value)
    console.log('Content:', content.value)
    console.log('Slug:', slug.value)
    console.log('Meta Description:', metaDescription.value)

    // Check if fields are filled before submitting
    if (!title.value || !content.value || !metaDescription.value) {
      console.error('Missing required fields! Make sure all fields are filled in.')
      return
    }

    console.log('Form Data to Firestore:', {
      title: title.value,
      content: content.value,
      slug: slug.value,
      metaDescription: metaDescription.value
    })

    // Call the blog post creation function
    await createBlogPost({
      title: title.value,
      content: content.value,
      slug: slug.value,
      metaDescription: metaDescription.value
    })

    console.log('Blog post created successfully')

    // Reset the form fields after successful submission
    title.value = ''
    content.value = ''
    metaDescription.value = ''
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
</style>