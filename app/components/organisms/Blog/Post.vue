<template>
  <article v-if="post">
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <small v-if="!post.is_published">(Draft)</small>
  </article>
  <article v-else>
    <p>Loading post...</p>
  </article>
</template>

<script setup>
defineProps({ post: Object })
</script>