<script setup>
const { slug } = useRoute().params

const { data: post } = await useAsyncData(() =>
  queryCollection('blog')
    .where({ _path: `/blog/${slug}` })
    .first()
)
</script>

<template>
  <div v-if="post">
    <ContentRenderer :value="post" />
  </div>
  <div v-else>
    <h1>404 – Blog post not found</h1>
  </div>
</template>