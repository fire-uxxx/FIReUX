<script setup>
const { data: posts } = await useAsyncData(() =>
  queryCollection('blog')
    .sort({ date: -1 })
    .find()
)
</script>

<template>
  <div class="blog">
    <h1>Blog</h1>
    <ul v-if="posts && posts.length">
      <li v-for="post in posts" :key="post._path">
        <NuxtLink :to="post._path">{{ post.title }}</NuxtLink>
      </li>
    </ul>
    <p v-else>No blog posts found.</p>
  </div>
</template>